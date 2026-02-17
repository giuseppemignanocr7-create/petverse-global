'use client';
import AppShell from '../../components/AppShell';
import { useAuth } from '../../lib/auth-context';
import { User, Mail, Phone, MapPin, Crown, Shield, HelpCircle, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  const { user } = useAuth();

  const menuSections = [
    {
      title: 'Account',
      items: [
        { label: 'Informazioni personali', icon: User, href: '/settings' },
        { label: 'Abbonamento', icon: Crown, href: '/settings' },
        { label: 'Privacy e sicurezza', icon: Shield, href: '/settings' },
      ],
    },
    {
      title: 'Supporto',
      items: [
        { label: 'Centro assistenza', icon: HelpCircle, href: '/settings' },
      ],
    },
  ];

  return (
    <AppShell>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-[#1E293B] mb-8">Profilo</h1>

        <div className="card mb-6">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#6C63FF] to-[#4ECDC4] flex items-center justify-center text-white text-3xl font-bold">
              {user?.fullName?.[0]?.toUpperCase() || 'U'}
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-[#1E293B]">{user?.fullName || 'Utente'}</h2>
              <p className="text-[#94A3B8] flex items-center gap-2 mt-1">
                <Mail className="w-4 h-4" /> {user?.email}
              </p>
              <div className="mt-2">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-[#EEF2FF] text-[#6C63FF]">
                  <Crown className="w-3.5 h-3.5" />
                  {user?.subscriptionTier === 'free' ? 'Piano Free' : 'Premium'}
                </span>
              </div>
            </div>
            <button className="btn-secondary text-sm">Modifica</button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: 'Pet', value: '0' },
            { label: 'Visite', value: '0' },
            { label: 'Post', value: '0' },
          ].map((s) => (
            <div key={s.label} className="card text-center">
              <p className="text-2xl font-bold text-[#1E293B]">{s.value}</p>
              <p className="text-sm text-[#94A3B8]">{s.label}</p>
            </div>
          ))}
        </div>

        {menuSections.map((section) => (
          <div key={section.title} className="mb-6">
            <h3 className="text-sm font-bold text-[#94A3B8] uppercase tracking-wider mb-3">{section.title}</h3>
            <div className="card p-0 overflow-hidden">
              {section.items.map((item, i) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`flex items-center gap-3 px-5 py-4 hover:bg-[#F8FAFC] transition-colors ${i < section.items.length - 1 ? 'border-b border-[#F1F5F9]' : ''}`}
                  >
                    <Icon className="w-5 h-5 text-[#94A3B8]" />
                    <span className="flex-1 text-sm font-medium text-[#1E293B]">{item.label}</span>
                    <ChevronRight className="w-4 h-4 text-[#CBD5E1]" />
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
