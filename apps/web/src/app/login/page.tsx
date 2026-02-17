'use client';
import { useState } from 'react';
import { useAuth } from '../../lib/auth-context';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { PawPrint, Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Errore di login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#6C63FF] to-[#4ECDC4] items-center justify-center p-12">
        <div className="text-center text-white max-w-md">
          <div className="w-24 h-24 rounded-3xl bg-white/20 flex items-center justify-center mx-auto mb-8">
            <PawPrint className="w-14 h-14 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4">PetVerse Global</h1>
          <p className="text-lg opacity-90">La piattaforma completa per prenderti cura dei tuoi animali domestici con intelligenza artificiale.</p>
          <div className="mt-10 grid grid-cols-3 gap-6 text-center">
            <div><p className="text-3xl font-bold">10K+</p><p className="text-sm opacity-80">Utenti attivi</p></div>
            <div><p className="text-3xl font-bold">25K+</p><p className="text-sm opacity-80">Pet registrati</p></div>
            <div><p className="text-3xl font-bold">4.9</p><p className="text-sm opacity-80">Valutazione</p></div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-[#6C63FF] flex items-center justify-center">
              <PawPrint className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold">PetVerse</h1>
          </div>

          <h2 className="text-2xl font-bold text-[#1E293B] mb-2">Bentornato!</h2>
          <p className="text-[#94A3B8] mb-8">Accedi al tuo account PetVerse</p>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-[#475569] mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input pl-11"
                  placeholder="nome@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#475569] mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input pl-11 pr-11"
                  placeholder="La tua password"
                  required
                />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8]">
                  {showPw ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full py-3 disabled:opacity-50">
              {loading ? 'Accesso in corso...' : 'Accedi'}
            </button>
          </form>

          <p className="text-center text-sm text-[#94A3B8] mt-6">
            Non hai un account?{' '}
            <Link href="/register" className="text-[#6C63FF] font-semibold hover:underline">Registrati</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
