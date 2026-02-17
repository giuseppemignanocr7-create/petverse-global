'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api, setToken, setRefreshToken, clearTokens, getToken } from './api';

interface User {
  id: string;
  email: string;
  fullName: string | null;
  avatarUrl: string | null;
  subscriptionTier: string;
}

interface AuthCtx {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (fullName: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthCtx>({} as AuthCtx);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (token) {
      api<{ user: User }>('/users/me')
        .then((d) => setUser(d.user ?? d as any))
        .catch(() => clearTokens())
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const data = await api('/auth/login', { method: 'POST', body: { email, password } });
    setToken(data.accessToken);
    setRefreshToken(data.refreshToken);
    setUser(data.user);
  };

  const register = async (fullName: string, email: string, password: string) => {
    const data = await api('/auth/register', { method: 'POST', body: { fullName, email, password } });
    setToken(data.accessToken);
    setRefreshToken(data.refreshToken);
    setUser(data.user);
  };

  const logout = () => {
    clearTokens();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
