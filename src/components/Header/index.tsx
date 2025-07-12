// components/Header.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Menu } from '../Menu';

export function Header() {
  return (
    <header className="relative h-50 text-white shadow-md">

      <div className="relative z-10 max-w-6xl mx-auto px-0.05 h-full flex items-center justify-between gap-x-20">
        <Link href="/" className="text-2xl font-bold text-indigo-600">
          PetGuard
        </Link>

        <Menu/>


        <div className="flex items-center gap-4">
      {/* Imagem com hover que muda o fundo */}
      <div className="p-2 hover:bg-gray-200 rounded-full transition inline-flex items-center justify-center">
        <Image
          src="/assets/img/notify.svg"
          alt="Imagem com hover"
          width={50}
          height={50}
        />
      </div>

      {/* Imagem com link */}
      <Link href="/pagina-destino">
        <Image
          src="/assets/img/login.svg"
          alt="Imagem clicável"
          width={50}
          height={50}
          className="cursor-pointer"
        />
      </Link>
    </div>
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
