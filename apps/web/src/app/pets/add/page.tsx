'use client';
import { useState } from 'react';
import AppShell from '../../../components/AppShell';
import { api } from '../../../lib/api';
import { useRouter } from 'next/navigation';
import { PawPrint, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AddPetPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: '', species: 'dog', breed: '', sex: 'male', microchipNumber: '',
  });

  const set = (key: string, val: string) => setForm({ ...form, [key]: val });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await api('/pets', { method: 'POST', body: { ...form, breed: form.breed || undefined, microchipNumber: form.microchipNumber || undefined } });
      router.push('/pets');
    } catch (err: any) {
      setError(err.message || 'Errore nella creazione');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell>
      <div className="max-w-2xl mx-auto">
        <Link href="/pets" className="inline-flex items-center gap-2 text-[#94A3B8] hover:text-[#475569] mb-6 text-sm">
          <ArrowLeft className="w-4 h-4" /> Torna ai pet
        </Link>

        <div className="card">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-[#EEF2FF] flex items-center justify-center">
              <PawPrint className="w-6 h-6 text-[#6C63FF]" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#1E293B]">Aggiungi Pet</h1>
              <p className="text-sm text-[#94A3B8]">Inserisci i dati del tuo animale</p>
            </div>
          </div>

          {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-[#475569] mb-1.5">Nome *</label>
              <input type="text" value={form.name} onChange={(e) => set('name', e.target.value)} className="input" placeholder="Es. Luna" required />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#475569] mb-1.5">Specie *</label>
                <select value={form.species} onChange={(e) => set('species', e.target.value)} className="input">
                  <option value="dog">🐕 Cane</option>
                  <option value="cat">🐱 Gatto</option>
                  <option value="bird">🐦 Uccello</option>
                  <option value="rabbit">🐰 Coniglio</option>
                  <option value="hamster">🐹 Criceto</option>
                  <option value="fish">🐠 Pesce</option>
                  <option value="other">Altro</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#475569] mb-1.5">Sesso</label>
                <select value={form.sex} onChange={(e) => set('sex', e.target.value)} className="input">
                  <option value="male">♂ Maschio</option>
                  <option value="female">♀ Femmina</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#475569] mb-1.5">Razza</label>
              <input type="text" value={form.breed} onChange={(e) => set('breed', e.target.value)} className="input" placeholder="Es. Golden Retriever" />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#475569] mb-1.5">Microchip</label>
              <input type="text" value={form.microchipNumber} onChange={(e) => set('microchipNumber', e.target.value)} className="input" placeholder="Numero microchip (opzionale)" />
            </div>

            <div className="flex gap-3 pt-2">
              <button type="submit" disabled={loading} className="btn-primary flex-1 py-3 disabled:opacity-50">
                {loading ? 'Salvataggio...' : 'Salva Pet'}
              </button>
              <Link href="/pets" className="btn-secondary py-3 px-6">Annulla</Link>
            </div>
          </form>
        </div>
      </div>
    </AppShell>
  );
}
