// components/Header.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Menu } from '../Menu';

export function Header() {
  return (
    <header className="relative h-50 text-white shadow-md">

      <div className="relative z-10 max-w-6xl mx-auto px-6 h-full flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          MeuSite
        </Link>

        <Menu/>


        <Link
          href="/login"
          className="bg-white text-indigo-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
        >
          Entrar
        </Link>
      </div>

      {/* Imagem de fundo com Next/Image */}
      <Image
        src="/assets/img/Group.svg"       // ou .jpg, .png
        alt="Background decorativo"
        fill                        // faz a imagem ocupar o container todo
        priority                    // carrega imediatamente
        className="object-cover object-center -z-10"
      />
    </header>
  );
}
