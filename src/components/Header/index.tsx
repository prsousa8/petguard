'use client';

import { useAuth } from '@/contexts/AuthContext';
import { HeaderLogado } from '../HeaderLogado';
import { HeaderDeslogado } from '../HeaderDeslogado';

export function Header() {
  const { logado } = useAuth();

  if (logado === null) {
    // Ainda carregando, evita piscar
    return null; // ou <div style={{ height: 60 }} />
  }

  return logado ? <HeaderLogado /> : <HeaderDeslogado />;
}
