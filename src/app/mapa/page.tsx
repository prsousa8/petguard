'use client';

import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import { PerfilTitulo } from '@/components/PerfilTitulo';

const MapWrapper = dynamic(() => import('@/components/MapWrapper'), {
  ssr: false,
});

export default function Localizacao() {
  useEffect(() => {
    document.title = 'Localização do Pet';
  }, []);

  return (
    <section className="max-w-4xl mx-auto p-6">
      <PerfilTitulo TituloInfo='Localização do Pet' />
      <MapWrapper className="h-[400px] w-full rounded-lg shadow-md" />
    </section>
  );
}
