'use client';
import { useState } from 'react';
import { useAuth } from '../../lib/auth-context';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { PawPrint, Mail, Lock, User } from 'lucide-react';

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(fullName, email, password);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Errore di registrazione');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-br from-[#F8FAFC] to-[#EEF2FF]">
      <div className="w-full max-w-md">
        <div className="flex items-center gap-3 mb-8 justify-center">
          <div className="w-12 h-12 rounded-xl bg-[#6C63FF] flex items-center justify-center">
            <PawPrint className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#1E293B]">PetVerse</h1>
            <p className="text-xs text-[#94A3B8]">Crea il tuo account</p>
          </div>
        </div>

        <div className="card">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-[#475569] mb-1.5">Nome completo</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
                <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className="input pl-11" placeholder="Mario Rossi" required />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#475569] mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input pl-11" placeholder="nome@email.com" required />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#475569] mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input pl-11" placeholder="Minimo 8 caratteri" required minLength={8} />
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full py-3 disabled:opacity-50">
              {loading ? 'Registrazione...' : 'Crea Account'}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-[#94A3B8] mt-6">
          Hai già un account? <Link href="/login" className="text-[#6C63FF] font-semibold hover:underline">Accedi</Link>
        </p>
      </div>
    </div>
  );
}
