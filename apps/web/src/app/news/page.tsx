'use client';
import AppShell from '../../components/AppShell';
import { Newspaper, Clock, Eye } from 'lucide-react';

export default function NewsPage() {
  const articles = [
    { id: 1, title: 'Come preparare il tuo cane per l\'inverno', category: 'Salute', time: '5 min', views: 1240, excerpt: 'Con l\'arrivo del freddo è importante proteggere il tuo amico a quattro zampe...' },
    { id: 2, title: 'I 10 alimenti tossici per i gatti', category: 'Alimentazione', time: '3 min', views: 3420, excerpt: 'Scopri quali cibi sono pericolosi per il tuo gatto e come evitarli...' },
    { id: 3, title: 'Nuova legge sui microchip obbligatori', category: 'Leggi', time: '4 min', views: 2100, excerpt: 'Dal 2026 tutti gli animali domestici dovranno essere dotati di microchip...' },
    { id: 4, title: 'Adottare un cane adulto: guida completa', category: 'Adozione', time: '7 min', views: 890, excerpt: 'Tutto quello che devi sapere prima di adottare un cane adulto dal canile...' },
    { id: 5, title: 'Allergie primaverili nei cani: sintomi e rimedi', category: 'Salute', time: '4 min', views: 1560, excerpt: 'Anche i cani soffrono di allergie stagionali. Ecco come riconoscerle...' },
  ];

  const categories = ['Tutti', 'Salute', 'Alimentazione', 'Adozione', 'Leggi', 'Curiosità'];

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#1E293B]">News</h1>
          <p className="text-[#94A3B8] mt-1">Articoli e notizie dal mondo pet</p>
        </div>

        <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
          {categories.map((c, i) => (
            <button key={c} className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${i === 0 ? 'bg-[#6C63FF] text-white' : 'bg-white border border-[#E2E8F0] text-[#475569] hover:bg-[#F8FAFC]'}`}>
              {c}
            </button>
          ))}
        </div>

        {articles.length > 0 && (
          <div className="card mb-6 bg-gradient-to-r from-[#EEF2FF] to-[#F0FDFA] border-[#C7D2FE] cursor-pointer hover:shadow-md transition-shadow">
            <span className="text-xs font-bold text-[#6C63FF] uppercase">{articles[0].category}</span>
            <h2 className="text-xl font-bold text-[#1E293B] mt-2 mb-2">{articles[0].title}</h2>
            <p className="text-[#64748B] text-sm mb-3">{articles[0].excerpt}</p>
            <div className="flex items-center gap-4 text-xs text-[#94A3B8]">
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {articles[0].time} lettura</span>
              <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {articles[0].views} visualizzazioni</span>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {articles.slice(1).map((a) => (
            <div key={a.id} className="card flex gap-4 cursor-pointer hover:shadow-md transition-shadow">
              <div className="w-20 h-20 rounded-xl bg-[#F8FAFC] flex items-center justify-center shrink-0">
                <Newspaper className="w-8 h-8 text-[#CBD5E1]" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-xs font-bold text-[#6C63FF]">{a.category}</span>
                <h3 className="font-bold text-[#1E293B] mt-1 mb-1 truncate">{a.title}</h3>
                <p className="text-sm text-[#94A3B8] line-clamp-1">{a.excerpt}</p>
                <div className="flex items-center gap-4 mt-2 text-xs text-[#94A3B8]">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {a.time}</span>
                  <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {a.views}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
