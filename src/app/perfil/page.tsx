'use client';

import { PerfilDono } from "@/components/PerfilDono";
import { PerfilPet } from "@/components/PerfilPet";
import { SubmenuTabs } from "@/components/SubMenuTabs";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function Perfil() {
  const [abaSelecionada, setAbaSelecionada] = useState('dono');
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <>
      <section className="max-w-3xl mx-auto px-4 py-8">
        <SubmenuTabs
          tabs={[
            { label: 'Dono', value: 'dono' },
            { label: 'Pet', value: 'pet' },
          ]}
          defaultValue="dono"
          onChange={(value) => setAbaSelecionada(value)}
        />

        {abaSelecionada === 'dono' ? <PerfilDono /> : <PerfilPet />}
      </section>

      {/* Botão fixo no canto inferior direito */}
      <button
        onClick={handleLogout}
        className="fixed bottom-6 right-6 bg-red-500 text-white px-5 py-2 rounded-full shadow-lg hover:bg-red-600 transition z-50"
      >
        Sair
      </button>
    </>
  );
}
