'use client';
import { useEffect, useState } from 'react';
import AppShell from '../../components/AppShell';
import { api } from '../../lib/api';
import Link from 'next/link';
import { PawPrint, Plus, Search } from 'lucide-react';

interface Pet {
  id: string;
  name: string;
  species: string;
  breed: string | null;
  sex: string | null;
  avatarUrl: string | null;
  status: string;
}

export default function PetsPage() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    api<Pet[]>('/pets')
      .then((d) => setPets(Array.isArray(d) ? d : []))
      .catch(() => setPets([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = pets.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const speciesEmoji: Record<string, string> = { dog: '🐕', cat: '🐱', bird: '🐦', rabbit: '🐰', fish: '🐠', hamster: '🐹' };

  return (
    <AppShell>
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#1E293B]">I miei Pet</h1>
            <p className="text-[#94A3B8] mt-1">{pets.length} animali registrati</p>
          </div>
          <Link href="/pets/add" className="btn-primary flex items-center gap-2">
            <Plus className="w-4 h-4" /> Aggiungi Pet
          </Link>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cerca per nome..."
            className="input pl-11"
          />
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-[#6C63FF] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="card text-center py-16">
            <PawPrint className="w-20 h-20 text-[#E2E8F0] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[#475569] mb-2">
              {search ? 'Nessun risultato' : 'Nessun pet ancora'}
            </h3>
            <p className="text-[#94A3B8] mb-6">
              {search ? 'Prova con un altro nome' : 'Aggiungi il tuo primo animale domestico per iniziare'}
            </p>
            {!search && (
              <Link href="/pets/add" className="btn-primary inline-flex items-center gap-2">
                <Plus className="w-4 h-4" /> Aggiungi Pet
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((pet) => (
              <Link
                key={pet.id}
                href={`/pets/${pet.id}`}
                className="card hover:shadow-lg transition-shadow group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#6C63FF] to-[#4ECDC4] flex items-center justify-center text-white text-2xl font-bold group-hover:scale-105 transition-transform">
                    {speciesEmoji[pet.species.toLowerCase()] || pet.name[0]}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#1E293B]">{pet.name}</h3>
                    <p className="text-sm text-[#94A3B8]">{pet.species} {pet.breed ? `· ${pet.breed}` : ''}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs px-2.5 py-1 rounded-full bg-[#ECFDF5] text-[#059669] font-medium">
                    {pet.status === 'active' ? 'Attivo' : pet.status}
                  </span>
                  {pet.sex && (
                    <span className="text-xs text-[#94A3B8]">{pet.sex === 'male' ? '♂ Maschio' : '♀ Femmina'}</span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
