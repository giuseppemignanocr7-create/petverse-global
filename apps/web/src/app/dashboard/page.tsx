'use client';
import { useEffect, useState } from 'react';
import AppShell from '../../components/AppShell';
import { useAuth } from '../../lib/auth-context';
import { api } from '../../lib/api';
import { PawPrint, Heart, Calendar, Bot, TrendingUp, Plus, Bell, Syringe } from 'lucide-react';
import Link from 'next/link';

interface Pet {
  id: string;
  name: string;
  species: string;
  breed: string | null;
  avatarUrl: string | null;
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api<Pet[]>('/pets')
      .then((data) => setPets(Array.isArray(data) ? data : []))
      .catch(() => setPets([]))
      .finally(() => setLoading(false));
  }, []);

  const stats = [
    { label: 'I miei Pet', value: pets.length, icon: PawPrint, color: '#6C63FF', bg: '#EEF2FF' },
    { label: 'Visite questo mese', value: 0, icon: Heart, color: '#EF4444', bg: '#FEF2F2' },
    { label: 'Prossimo appuntamento', value: '-', icon: Calendar, color: '#F59E0B', bg: '#FFFBEB' },
    { label: 'Conversazioni AI', value: 0, icon: Bot, color: '#4ECDC4', bg: '#F0FDFA' },
  ];

  const quickActions = [
    { label: 'Aggiungi Pet', href: '/pets/add', icon: PawPrint, color: '#6C63FF' },
    { label: 'Nuova visita', href: '/health', icon: Heart, color: '#EF4444' },
    { label: 'Chiedi all\'AI', href: '/ai-coach', icon: Bot, color: '#4ECDC4' },
    { label: 'Vaccinazioni', href: '/health', icon: Syringe, color: '#F59E0B' },
  ];

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#1E293B]">
            Ciao, {user?.fullName?.split(' ')[0] || 'Utente'}! 👋
          </h1>
          <p className="text-[#94A3B8] mt-1">Ecco il riepilogo dei tuoi pet</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="card flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: s.bg }}>
                  <Icon className="w-6 h-6" style={{ color: s.color }} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#1E293B]">{s.value}</p>
                  <p className="text-sm text-[#94A3B8]">{s.label}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="card">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold text-[#1E293B]">I miei Pet</h2>
                <Link href="/pets/add" className="btn-primary flex items-center gap-2 text-sm">
                  <Plus className="w-4 h-4" /> Aggiungi
                </Link>
              </div>

              {loading ? (
                <div className="flex justify-center py-12">
                  <div className="w-8 h-8 border-4 border-[#6C63FF] border-t-transparent rounded-full animate-spin" />
                </div>
              ) : pets.length === 0 ? (
                <div className="text-center py-12">
                  <PawPrint className="w-16 h-16 text-[#E2E8F0] mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-[#475569] mb-2">Nessun pet ancora</h3>
                  <p className="text-[#94A3B8] mb-4">Aggiungi il tuo primo animale domestico</p>
                  <Link href="/pets/add" className="btn-primary inline-flex items-center gap-2">
                    <Plus className="w-4 h-4" /> Aggiungi Pet
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {pets.map((pet) => (
                    <Link
                      key={pet.id}
                      href={`/pets/${pet.id}`}
                      className="flex items-center gap-4 p-4 rounded-xl hover:bg-[#F8FAFC] transition-colors border border-[#F1F5F9]"
                    >
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#6C63FF] to-[#4ECDC4] flex items-center justify-center text-white text-xl font-bold">
                        {pet.name[0]}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-[#1E293B]">{pet.name}</p>
                        <p className="text-sm text-[#94A3B8]">{pet.species} {pet.breed ? `· ${pet.breed}` : ''}</p>
                      </div>
                      <div className="text-[#94A3B8]">→</div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="card">
              <h2 className="text-lg font-bold text-[#1E293B] mb-4">Azioni rapide</h2>
              <div className="grid grid-cols-2 gap-3">
                {quickActions.map((a) => {
                  const Icon = a.icon;
                  return (
                    <Link
                      key={a.label}
                      href={a.href}
                      className="flex flex-col items-center gap-2 p-4 rounded-xl border border-[#F1F5F9] hover:bg-[#F8FAFC] transition-colors"
                    >
                      <Icon className="w-6 h-6" style={{ color: a.color }} />
                      <span className="text-xs font-medium text-[#475569] text-center">{a.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="card">
              <h2 className="text-lg font-bold text-[#1E293B] mb-4">Notifiche</h2>
              <div className="text-center py-6">
                <Bell className="w-10 h-10 text-[#E2E8F0] mx-auto mb-2" />
                <p className="text-sm text-[#94A3B8]">Nessuna notifica</p>
              </div>
            </div>

            <div className="card bg-gradient-to-br from-[#6C63FF] to-[#4ECDC4] text-white border-none">
              <h3 className="font-bold mb-2">PetVerse Premium ✨</h3>
              <p className="text-sm opacity-90 mb-4">Sblocca AI illimitata, report avanzati e VetBridge</p>
              <Link href="/settings" className="inline-block bg-white text-[#6C63FF] px-4 py-2 rounded-lg text-sm font-bold hover:bg-white/90">
                Scopri di più
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
