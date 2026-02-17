'use client';
import { useState } from 'react';
import AppShell from '../../components/AppShell';
import { useAuth } from '../../lib/auth-context';
import { Bell, Moon, Globe, Shield, Trash2, LogOut } from 'lucide-react';

function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button onClick={onChange} className={`w-11 h-6 rounded-full transition-colors relative ${checked ? 'bg-[#6C63FF]' : 'bg-[#CBD5E1]'}`}>
      <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform shadow ${checked ? 'translate-x-5.5 left-[1.375rem]' : 'left-0.5'}`} />
    </button>
  );
}

export default function SettingsPage() {
  const { logout } = useAuth();
  const [notifications, setNotifications] = useState({ push: true, email: true, vaccine: true, appointments: true });
  const [theme, setTheme] = useState('system');
  const [lang, setLang] = useState('it');

  return (
    <AppShell>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-[#1E293B] mb-8">Impostazioni</h1>

        <div className="space-y-6">
          <div className="card">
            <div className="flex items-center gap-3 mb-5">
              <Bell className="w-5 h-5 text-[#6C63FF]" />
              <h2 className="text-lg font-bold text-[#1E293B]">Notifiche</h2>
            </div>
            <div className="space-y-4">
              {[
                { key: 'push', label: 'Notifiche push' },
                { key: 'email', label: 'Notifiche email' },
                { key: 'vaccine', label: 'Promemoria vaccinazioni' },
                { key: 'appointments', label: 'Promemoria appuntamenti' },
              ].map((n) => (
                <div key={n.key} className="flex items-center justify-between py-2">
                  <span className="text-sm text-[#475569]">{n.label}</span>
                  <Toggle
                    checked={(notifications as any)[n.key]}
                    onChange={() => setNotifications({ ...notifications, [n.key]: !(notifications as any)[n.key] })}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="flex items-center gap-3 mb-5">
              <Moon className="w-5 h-5 text-[#6C63FF]" />
              <h2 className="text-lg font-bold text-[#1E293B]">Aspetto</h2>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: 'light', label: 'Chiaro' },
                { value: 'dark', label: 'Scuro' },
                { value: 'system', label: 'Sistema' },
              ].map((t) => (
                <button
                  key={t.value}
                  onClick={() => setTheme(t.value)}
                  className={`p-3 rounded-xl text-sm font-medium border transition-colors ${theme === t.value ? 'border-[#6C63FF] bg-[#EEF2FF] text-[#6C63FF]' : 'border-[#E2E8F0] text-[#475569] hover:bg-[#F8FAFC]'}`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="flex items-center gap-3 mb-5">
              <Globe className="w-5 h-5 text-[#6C63FF]" />
              <h2 className="text-lg font-bold text-[#1E293B]">Lingua</h2>
            </div>
            <select value={lang} onChange={(e) => setLang(e.target.value)} className="input">
              <option value="it">🇮🇹 Italiano</option>
              <option value="en">🇬🇧 English</option>
              <option value="es">🇪🇸 Español</option>
              <option value="de">🇩🇪 Deutsch</option>
              <option value="fr">🇫🇷 Français</option>
            </select>
          </div>

          <div className="card">
            <div className="flex items-center gap-3 mb-5">
              <Shield className="w-5 h-5 text-[#6C63FF]" />
              <h2 className="text-lg font-bold text-[#1E293B]">Privacy</h2>
            </div>
            <div className="space-y-3">
              <button className="btn-secondary w-full text-left">Esporta i miei dati</button>
              <button className="btn-secondary w-full text-left">Cambia password</button>
            </div>
          </div>

          <div className="card border-red-200">
            <div className="flex items-center gap-3 mb-5">
              <Trash2 className="w-5 h-5 text-[#EF4444]" />
              <h2 className="text-lg font-bold text-[#EF4444]">Zona pericolosa</h2>
            </div>
            <p className="text-sm text-[#94A3B8] mb-4">Queste azioni sono irreversibili</p>
            <div className="flex gap-3">
              <button onClick={logout} className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#E2E8F0] text-sm font-medium text-[#475569] hover:bg-[#F8FAFC]">
                <LogOut className="w-4 h-4" /> Esci dall&apos;account
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-red-200 text-sm font-medium text-[#EF4444] hover:bg-red-50">
                <Trash2 className="w-4 h-4" /> Elimina account
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
