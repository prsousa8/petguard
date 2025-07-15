'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Menu } from '../Menu';

export function HeaderLogado() {
    return (
        <header className="relative h-30 text-white shadow-md">
            <div className="relative z-10 max-w-6xl mx-auto px-0.5 h-full flex items-center justify-between gap-x-20">
                <Link href="/" className="text-2xl font-bold text-indigo-600">
                    PetGuard
                </Link>

                <Menu />

                <div className="flex items-center gap-4">
                    <div className="p-2 hover:bg-gray-200 rounded-full transition inline-flex items-center justify-center">
                        <Image
                            src="/assets/img/notify.svg"
                            alt="Notificações"
                            width={50}
                            height={50}
                        />
                    </div>

                    <Link href="/perfil">
                        <Image
                            src="/assets/img/login.svg"
                            alt="Perfil"
                            width={50}
                            height={50}
                            className="cursor-pointer"
                        />
                    </Link>
                </div>
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
