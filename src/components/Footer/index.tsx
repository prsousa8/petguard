// components/Footer.tsx
'use client';

import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full flex justify-center mt-10 mb-6 px-4">
      <div className="w-[90%] bg-white rounded-4xl shadow-md px-6 py-6 text-center border border-gray-200">
        <h2 className="text-2xl font-bold text-indigo-600 mb-2">PetGuard</h2>
        <p className="text-sm text-gray-600">
          © {new Date().getFullYear()} PetGuard. Todos os direitos reservados.
        </p>
        <div className="mt-3 space-x-4">
          <Link href="/sobre" className="text-indigo-500 hover:underline text-sm">
            Sobre
          </Link>
          <Link href="/contato" className="text-indigo-500 hover:underline text-sm">
            Contato
          </Link>
          <Link href="/politica" className="text-indigo-500 hover:underline text-sm">
            Política de Privacidade
          </Link>
        </div>
      </div>
    </footer>
  );
}
