'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../lib/auth-context';
import {
  LayoutDashboard, PawPrint, Heart, BookOpen, Bot, Users,
  ShoppingBag, Newspaper, User, Settings, LogOut
} from 'lucide-react';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/pets', label: 'I miei Pet', icon: PawPrint },
  { href: '/health', label: 'Salute', icon: Heart },
  { href: '/diary', label: 'Diario', icon: BookOpen },
  { href: '/ai-coach', label: 'AI Coach', icon: Bot },
  { href: '/community', label: 'Community', icon: Users },
  { href: '/marketplace', label: 'Marketplace', icon: ShoppingBag },
  { href: '/news', label: 'News', icon: Newspaper },
];

const bottomItems = [
  { href: '/profile', label: 'Profilo', icon: User },
  { href: '/settings', label: 'Impostazioni', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-[#E2E8F0] flex flex-col z-50">
      <div className="p-6 border-b border-[#E2E8F0]">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#6C63FF] flex items-center justify-center">
            <PawPrint className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-[#1E293B]">PetVerse</h1>
            <p className="text-xs text-[#94A3B8]">Global 4.0</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`sidebar-link ${active ? 'active' : ''}`}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-[#E2E8F0] space-y-1">
        {bottomItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`sidebar-link ${active ? 'active' : ''}`}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
        <button onClick={logout} className="sidebar-link w-full text-[#EF4444] hover:bg-red-50">
          <LogOut className="w-5 h-5" />
          Esci
        </button>
      </div>

      {user && (
        <div className="p-4 border-t border-[#E2E8F0]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#6C63FF] flex items-center justify-center text-white text-sm font-bold">
              {user.fullName?.[0]?.toUpperCase() || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[#1E293B] truncate">{user.fullName || 'Utente'}</p>
              <p className="text-xs text-[#94A3B8] truncate">{user.email}</p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
