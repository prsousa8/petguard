// components/Footer.tsx
'use client';

import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 mt-10">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col items-center text-center">
        
        {/* Logo / Nome do site */}
        <div>
          <h2 className="text-xl font-bold text-indigo-600 mb-2">PetGuard</h2>
          <p className="text-sm">
            © {new Date().getFullYear()} PetGuard. Todos os direitos reservados.
          </p>
        </div>

      </div>
    </footer>
  );
}
