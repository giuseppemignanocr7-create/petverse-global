'use client';
import AppShell from '../../components/AppShell';
import { BookOpen, Plus, Camera, Smile, Tag } from 'lucide-react';

export default function DiaryPage() {
  return (
    <AppShell>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#1E293B]">Diario</h1>
            <p className="text-[#94A3B8] mt-1">Il diario della vita dei tuoi pet</p>
          </div>
          <button className="btn-primary flex items-center gap-2">
            <Plus className="w-4 h-4" /> Nuovo momento
          </button>
        </div>

        <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
          {['Tutti', 'Foto', 'Milestone', 'Attività', 'Salute', 'Divertimento'].map((f) => (
            <button
              key={f}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                f === 'Tutti' ? 'bg-[#6C63FF] text-white' : 'bg-white border border-[#E2E8F0] text-[#475569] hover:bg-[#F8FAFC]'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="card text-center py-16">
          <BookOpen className="w-20 h-20 text-[#E2E8F0] mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-[#475569] mb-2">Il diario è vuoto</h3>
          <p className="text-[#94A3B8] mb-6 max-w-sm mx-auto">
            Cattura i momenti speciali dei tuoi pet: foto, milestone, attività quotidiane e molto altro
          </p>
          <div className="flex justify-center gap-3">
            <button className="btn-primary inline-flex items-center gap-2">
              <Camera className="w-4 h-4" /> Aggiungi foto
            </button>
            <button className="btn-secondary inline-flex items-center gap-2">
              <Smile className="w-4 h-4" /> Registra momento
            </button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
