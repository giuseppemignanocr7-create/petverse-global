# PetVerse Global 4.0

A complete ecosystem for pet life management: mobile app, AI coach, health records, social features, marketplace, and VetBridge.

## Tech Stack

- **Mobile**: Flutter 3.24.5 / Dart 3.5 / Riverpod
- **Backend**: NestJS 10.3 / TypeScript 5.3 / Prisma 5.8
- **Database**: PostgreSQL 16 (Supabase) + Redis 7.2
- **AI**: OpenAI GPT-4 Turbo + Pinecone
- **Payments**: Stripe
- **Cloud**: Google Cloud Platform (europe-west1)

## Project Structure

```
petverse-monorepo/
├── apps/
│   ├── mobile/          # Flutter mobile app
│   ├── backend/         # NestJS API
│   └── admin-dashboard/ # Admin web panel
├── packages/
│   ├── shared-types/    # Shared TypeScript types
│   └── api-client/      # Generated API client
├── infrastructure/
│   ├── docker/
│   ├── kubernetes/
│   └── terraform/
├── docs/
└── .github/workflows/
```

## Getting Started

### Backend
```bash
cd apps/backend
cp .env.example .env
npm install
npx prisma migrate dev
npm run start:dev
```

### Mobile
```bash
cd apps/mobile
flutter pub get
flutter run
```

## License

Proprietary - All rights reserved.
