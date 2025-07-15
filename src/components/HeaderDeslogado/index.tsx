'use client';

import Image from 'next/image';
import Link from 'next/link';

export function HeaderDeslogado() {
    return (
        <header className="header-logged-out relative h-30 text-white shadow-md">
            <div className="relative z-10 max-w-6xl mx-auto px-0.5 h-full flex items-center justify-between gap-x-20">
                <Link href="/" className="text-2xl font-bold text-indigo-600">
                    PetGuard
                </Link>
                <Link href="/login">
                    <button className="bg-transparent text-indigo-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition">
                        Entrar
                    </button>
                </Link>
            </div>
            <Image
                src="/assets/img/Group.svg"
                alt="Background decorativo"
                fill
                priority
                className="object-cover object-center -z-10"
            />
        </header>
    );
}
