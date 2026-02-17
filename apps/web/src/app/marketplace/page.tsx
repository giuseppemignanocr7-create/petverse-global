'use client';
import AppShell from '../../components/AppShell';
import { ShoppingBag, Search, Star, Tag } from 'lucide-react';

export default function MarketplacePage() {
  const categories = [
    { name: 'Cibo', emoji: '🍖' }, { name: 'Giochi', emoji: '🎾' },
    { name: 'Salute', emoji: '💊' }, { name: 'Accessori', emoji: '🎀' },
    { name: 'Toelettatura', emoji: '🛁' }, { name: 'Cucce', emoji: '🏠' },
  ];

  const products = [
    { id: 1, name: 'Crocchette Premium Cane', price: 45.99, rating: 4.8, reviews: 234, category: 'Cibo', img: '🍖' },
    { id: 2, name: 'Pallina Indistruttibile', price: 12.99, rating: 4.6, reviews: 189, category: 'Giochi', img: '🎾' },
    { id: 3, name: 'Antiparassitario Naturale', price: 28.50, rating: 4.9, reviews: 312, category: 'Salute', img: '💊' },
    { id: 4, name: 'Cuccia Ortopedica L', price: 89.99, rating: 4.7, reviews: 156, category: 'Cucce', img: '🏠' },
    { id: 5, name: 'Shampoo Delicato Bio', price: 15.99, rating: 4.5, reviews: 98, category: 'Toelettatura', img: '🛁' },
    { id: 6, name: 'Collare GPS Tracker', price: 59.99, rating: 4.4, reviews: 267, category: 'Accessori', img: '📍' },
  ];

  return (
    <AppShell>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#1E293B]">Marketplace</h1>
          <p className="text-[#94A3B8] mt-1">Prodotti raccomandati per i tuoi pet</p>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
          <input type="text" placeholder="Cerca prodotti..." className="input pl-11" />
        </div>

        <div className="card mb-6 bg-gradient-to-r from-[#6C63FF] to-[#4ECDC4] text-white border-none">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium opacity-80">Offerta speciale</p>
              <h3 className="text-xl font-bold mt-1">-20% su tutti i prodotti salute</h3>
              <p className="text-sm opacity-80 mt-1">Usa il codice PETCARE20</p>
            </div>
            <Tag className="w-16 h-16 opacity-30" />
          </div>
        </div>

        <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
          <button className="px-4 py-2 rounded-full text-sm font-medium bg-[#6C63FF] text-white whitespace-nowrap">Tutti</button>
          {categories.map((c) => (
            <button key={c.name} className="px-4 py-2 rounded-full text-sm font-medium bg-white border border-[#E2E8F0] text-[#475569] hover:bg-[#F8FAFC] whitespace-nowrap">
              {c.emoji} {c.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {products.map((p) => (
            <div key={p.id} className="card hover:shadow-lg transition-shadow cursor-pointer group">
              <div className="w-full h-32 rounded-xl bg-[#F8FAFC] flex items-center justify-center text-5xl mb-4 group-hover:scale-105 transition-transform">
                {p.img}
              </div>
              <p className="text-xs text-[#6C63FF] font-medium mb-1">{p.category}</p>
              <h3 className="font-bold text-[#1E293B] mb-2">{p.name}</h3>
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
                  <span className="text-sm font-medium">{p.rating}</span>
                </div>
                <span className="text-xs text-[#94A3B8]">({p.reviews} recensioni)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-[#1E293B]">€{p.price}</span>
                <button className="btn-primary text-xs px-3 py-1.5">Aggiungi</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
