'use client';
import AppShell from '../../components/AppShell';
import { Users, Plus, Heart, MessageCircle, Share2 } from 'lucide-react';

export default function CommunityPage() {
  return (
    <AppShell>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#1E293B]">Community</h1>
            <p className="text-[#94A3B8] mt-1">Connettiti con altri amanti degli animali</p>
          </div>
          <button className="btn-primary flex items-center gap-2">
            <Plus className="w-4 h-4" /> Nuovo post
          </button>
        </div>

        <div className="flex gap-3 mb-6">
          {['Feed', 'Gruppi Cucciolata', 'I miei gruppi'].map((t, i) => (
            <button key={t} className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${i === 0 ? 'bg-[#6C63FF] text-white' : 'bg-white border border-[#E2E8F0] text-[#475569] hover:bg-[#F8FAFC]'}`}>
              {t}
            </button>
          ))}
        </div>

        <div className="card text-center py-16">
          <Users className="w-20 h-20 text-[#E2E8F0] mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-[#475569] mb-2">La community ti aspetta!</h3>
          <p className="text-[#94A3B8] mb-6 max-w-md mx-auto">
            Condividi foto, consigli e storie con altri proprietari di animali. Unisciti a gruppi cucciolata per restare in contatto con i fratellini del tuo pet.
          </p>
          <div className="flex justify-center gap-3">
            <button className="btn-primary inline-flex items-center gap-2">
              <Plus className="w-4 h-4" /> Crea gruppo
            </button>
            <button className="btn-secondary inline-flex items-center gap-2">
              <Users className="w-4 h-4" /> Unisciti con codice
            </button>
          </div>
        </div>

        <div className="mt-6 card bg-gradient-to-r from-[#EEF2FF] to-[#F0FDFA] border-[#C7D2FE]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#6C63FF] flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-[#1E293B]">Gruppi Cucciolata</h3>
              <p className="text-sm text-[#64748B]">Resta in contatto con i fratellini del tuo pet! Crea o unisciti a un gruppo condividendo il codice invito.</p>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
