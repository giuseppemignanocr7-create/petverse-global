import express from 'express';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

const app = express();
app.use(express.json());
app.use((_, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  if (_.method === 'OPTIONS') return res.status(204).end();
  next();
});

const prisma = new PrismaClient();
const SECRET = process.env.JWT_SECRET || 'dev-secret';
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'dev-refresh';
const PREFIX = '/api/v1';

// Auth middleware
function auth(req: any, res: any, next: any) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'Unauthorized' });
  try {
    req.user = jwt.verify(token, SECRET) as any;
    next();
  } catch { return res.status(401).json({ message: 'Invalid token' }); }
}

function generateTokens(userId: string, email: string) {
  const accessToken = jwt.sign({ sub: userId, email }, SECRET, { expiresIn: '7d' });
  const refreshToken = jwt.sign({ sub: userId, email }, REFRESH_SECRET, { expiresIn: '30d' });
  return { accessToken, refreshToken };
}

// ─── Health ─────────────────────────────────────────
app.get(`${PREFIX}`, (_, res) => res.json({ status: 'ok', message: 'PetVerse API v4.0', timestamp: new Date().toISOString() }));
app.get(`${PREFIX}/health`, (_, res) => res.json({ status: 'ok' }));

// ─── Auth ───────────────────────────────────────────
app.post(`${PREFIX}/auth/register`, async (req, res) => {
  try {
    const { email, password, fullName } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password required' });
    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) return res.status(409).json({ message: 'Email already registered' });
    const passwordHash = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({ data: { email, passwordHash, fullName, emailVerified: false, subscriptionTier: 'free', subscriptionStatus: 'active', onboardingCompleted: false, settings: {} } });
    const tokens = generateTokens(user.id, user.email);
    res.status(201).json({ user: { id: user.id, email: user.email, fullName: user.fullName }, ...tokens });
  } catch (e: any) { res.status(500).json({ message: e.message }); }
});

app.post(`${PREFIX}/auth/login`, async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password required' });
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.passwordHash) return res.status(401).json({ message: 'Invalid credentials' });
    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return res.status(401).json({ message: 'Invalid credentials' });
    const tokens = generateTokens(user.id, user.email);
    await prisma.user.update({ where: { id: user.id }, data: { lastLoginAt: new Date() } });
    res.json({ user: { id: user.id, email: user.email, fullName: user.fullName, subscriptionTier: user.subscriptionTier }, ...tokens });
  } catch (e: any) { res.status(500).json({ message: e.message }); }
});

app.get(`${PREFIX}/auth/me`, auth, async (req: any, res) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.sub }, select: { id: true, email: true, fullName: true, avatarUrl: true, subscriptionTier: true, subscriptionStatus: true, createdAt: true } });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (e: any) { res.status(500).json({ message: e.message }); }
});

// ─── Users ──────────────────────────────────────────
app.patch(`${PREFIX}/users/me`, auth, async (req: any, res) => {
  try {
    const user = await prisma.user.update({ where: { id: req.user.sub }, data: req.body, select: { id: true, email: true, fullName: true, phone: true, avatarUrl: true } });
    res.json(user);
  } catch (e: any) { res.status(500).json({ message: e.message }); }
});

// ─── Pets ───────────────────────────────────────────
app.get(`${PREFIX}/pets`, auth, async (req: any, res) => {
  try {
    const pets = await prisma.pet.findMany({ where: { ownerId: req.user.sub, status: 'active' }, orderBy: { createdAt: 'desc' } });
    res.json(pets);
  } catch (e: any) { res.status(500).json({ message: e.message }); }
});

app.post(`${PREFIX}/pets`, auth, async (req: any, res) => {
  try {
    const pet = await prisma.pet.create({ data: { ...req.body, ownerId: req.user.sub, status: 'active' } });
    res.status(201).json(pet);
  } catch (e: any) { res.status(500).json({ message: e.message }); }
});

app.get(`${PREFIX}/pets/:id`, auth, async (req: any, res) => {
  try {
    const pet = await prisma.pet.findFirst({ where: { id: req.params.id, ownerId: req.user.sub }, include: { healthRecords: { take: 5, orderBy: { recordDate: 'desc' } }, vaccinations: { take: 5, orderBy: { vaccinationDate: 'desc' } } } });
    if (!pet) return res.status(404).json({ message: 'Pet not found' });
    res.json(pet);
  } catch (e: any) { res.status(500).json({ message: e.message }); }
});

app.patch(`${PREFIX}/pets/:id`, auth, async (req: any, res) => {
  try {
    const pet = await prisma.pet.updateMany({ where: { id: req.params.id, ownerId: req.user.sub }, data: req.body });
    res.json(pet);
  } catch (e: any) { res.status(500).json({ message: e.message }); }
});

app.delete(`${PREFIX}/pets/:id`, auth, async (req: any, res) => {
  try {
    await prisma.pet.updateMany({ where: { id: req.params.id, ownerId: req.user.sub }, data: { status: 'archived' } });
    res.json({ message: 'Pet archived' });
  } catch (e: any) { res.status(500).json({ message: e.message }); }
});

// ─── Health Records ─────────────────────────────────
app.get(`${PREFIX}/health/:petId`, auth, async (req: any, res) => {
  try {
    const records = await prisma.healthRecord.findMany({ where: { petId: req.params.petId, pet: { ownerId: req.user.sub } }, orderBy: { recordDate: 'desc' } });
    res.json(records);
  } catch (e: any) { res.status(500).json({ message: e.message }); }
});

app.post(`${PREFIX}/health`, auth, async (req: any, res) => {
  try {
    const record = await prisma.healthRecord.create({ data: req.body });
    res.status(201).json(record);
  } catch (e: any) { res.status(500).json({ message: e.message }); }
});

// ─── Vaccinations ───────────────────────────────────
app.get(`${PREFIX}/vaccinations/:petId`, auth, async (req: any, res) => {
  try {
    const vacc = await prisma.vaccination.findMany({ where: { petId: req.params.petId }, orderBy: { vaccinationDate: 'desc' } });
    res.json(vacc);
  } catch (e: any) { res.status(500).json({ message: e.message }); }
});

// ─── Diary ──────────────────────────────────────────
app.get(`${PREFIX}/diary/:petId`, auth, async (req: any, res) => {
  try {
    const entries = await prisma.diaryEntry.findMany({ where: { petId: req.params.petId, pet: { ownerId: req.user.sub } }, orderBy: { entryDate: 'desc' }, take: 50 });
    res.json(entries);
  } catch (e: any) { res.status(500).json({ message: e.message }); }
});

app.post(`${PREFIX}/diary`, auth, async (req: any, res) => {
  try {
    const entry = await prisma.diaryEntry.create({ data: { ...req.body, userId: req.user.sub } });
    res.status(201).json(entry);
  } catch (e: any) { res.status(500).json({ message: e.message }); }
});

// ─── News ───────────────────────────────────────────
app.get(`${PREFIX}/news`, async (_, res) => {
  try {
    const articles = await prisma.newsArticle.findMany({ where: { isPublished: true }, orderBy: { publishedAt: 'desc' }, take: 20 });
    res.json(articles);
  } catch (e: any) { res.status(500).json({ message: e.message }); }
});

// ─── Marketplace ────────────────────────────────────
app.get(`${PREFIX}/marketplace/products`, async (_, res) => {
  try {
    const products = await prisma.marketplaceProduct.findMany({ where: { isActive: true }, orderBy: { createdAt: 'desc' }, take: 50 });
    res.json(products);
  } catch (e: any) { res.status(500).json({ message: e.message }); }
});

// ─── Notifications ──────────────────────────────────
app.get(`${PREFIX}/notifications`, auth, async (req: any, res) => {
  try {
    const notifs = await prisma.notificationLog.findMany({ where: { userId: req.user.sub }, orderBy: { sentAt: 'desc' }, take: 50 });
    res.json(notifs);
  } catch (e: any) { res.status(500).json({ message: e.message }); }
});

// ─── Subscriptions ──────────────────────────────────
app.get(`${PREFIX}/subscriptions/plans`, (_, res) => {
  res.json([
    { id: 'free', name: 'Free', price: 0, features: ['Fino a 2 pet', 'Diario base', 'Calendario vaccini'] },
    { id: 'premium_monthly', name: 'Premium', price: 4.99, interval: 'month', features: ['Pet illimitati', 'AI Coach', 'VetBridge', 'Nessuna pubblicità'] },
    { id: 'premium_yearly', name: 'Premium Annuale', price: 39.99, interval: 'year', features: ['Tutto Premium', '2 mesi gratis'] },
  ]);
});

// 404
app.use((_, res) => res.status(404).json({ message: 'Not found' }));

export default app;
