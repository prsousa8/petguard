'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Menu() {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Início' },
    { href: '/mapa', label: 'Mapa' },
    { href: '/dispenser', label: 'Dispenser' },
    { href: '/diario', label: 'Diário do Pet' },
    { href: '/dashboard', label: 'Dashboard' },
  ];

  return (
    <nav className="hidden md:flex gap-4 font-medium">
      {links.map(({ href, label }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={`
              text-[#0051FE] px-4 py-1 rounded-2xl transition
              ${isActive ? 'border-2 border-[#00917E]' : 'border-2 border-transparent'}
              hover:bg-white/20
            `}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
