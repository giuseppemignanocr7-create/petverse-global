'use client';
import AppShell from '../../components/AppShell';
import { Heart, Syringe, Calendar, Pill, Plus, FileText } from 'lucide-react';
import Link from 'next/link';

export default function HealthPage() {
  const sections = [
    { title: 'Vaccinazioni', desc: 'Gestisci il calendario vaccinale', icon: Syringe, color: '#6C63FF', bg: '#EEF2FF', count: 0 },
    { title: 'Visite veterinarie', desc: 'Storico e prossimi appuntamenti', icon: Calendar, color: '#EF4444', bg: '#FEF2F2', count: 0 },
    { title: 'Farmaci', desc: 'Terapie e promemoria dosaggi', icon: Pill, color: '#F59E0B', bg: '#FFFBEB', count: 0 },
    { title: 'Cartella clinica', desc: 'Tutti i documenti sanitari', icon: FileText, color: '#22C55E', bg: '#F0FDF4', count: 0 },
  ];

  return (
    <AppShell>
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#1E293B]">Salute</h1>
            <p className="text-[#94A3B8] mt-1">Gestisci la salute dei tuoi pet</p>
          </div>
          <button className="btn-primary flex items-center gap-2">
            <Plus className="w-4 h-4" /> Nuova visita
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          {sections.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.title} className="card hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: s.bg }}>
                    <Icon className="w-6 h-6" style={{ color: s.color }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-[#1E293B]">{s.title}</h3>
                      <span className="text-sm text-[#94A3B8]">{s.count} record</span>
                    </div>
                    <p className="text-sm text-[#94A3B8] mt-1">{s.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="card">
          <h2 className="text-lg font-bold text-[#1E293B] mb-4">Prossimi appuntamenti</h2>
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-[#E2E8F0] mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-[#475569] mb-2">Nessun appuntamento programmato</h3>
            <p className="text-[#94A3B8] mb-4">Prenota la prossima visita veterinaria</p>
            <button className="btn-primary inline-flex items-center gap-2">
              <Plus className="w-4 h-4" /> Prenota visita
            </button>
          </div>
        </div>

        <div className="card mt-6 bg-gradient-to-r from-[#FEF2F2] to-[#FFF7ED] border-red-100">
          <div className="flex items-center gap-4">
            <Heart className="w-10 h-10 text-[#EF4444]" />
            <div>
              <h3 className="font-bold text-[#1E293B]">VetBridge</h3>
              <p className="text-sm text-[#64748B]">Condividi la cartella clinica del tuo pet direttamente con il veterinario tramite QR code</p>
            </div>
            <button className="btn-secondary ml-auto shrink-0">Attiva</button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
