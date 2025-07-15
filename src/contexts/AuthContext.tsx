'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';

type AuthContextType = {
  logado: boolean;
  usuarioId: number | null;
  login: (token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  logado: false,
  usuarioId: null,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [logado, setLogado] = useState(false);
  const [usuarioId, setUsuarioId] = useState<number | null>(null);

  function login(token: string) {
    localStorage.setItem('token', token);
    try {
      const decoded: any = jwtDecode(token);
      setUsuarioId(decoded.id);
      setLogado(true);
    } catch {
      setUsuarioId(null);
      setLogado(false);
    }
  }

  function logout() {
    localStorage.removeItem('token');
    setUsuarioId(null);
    setLogado(false);
  }

  return (
    <AuthContext.Provider value={{ logado, usuarioId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
