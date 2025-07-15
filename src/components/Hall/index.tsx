'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

const pets = [
  {
    nome: 'Onix',
    imagem: '/assets/img/onix.svg',
    descricao: 'Campeão da semana 🏆',
  },
  {
    nome: 'Tita',
    imagem: '/assets/img/tita.svg',
    descricao: 'Mais passeios realizados',
  },
  {
    nome: 'Pipoca',
    imagem: '/assets/img/pipoca.svg',
    descricao: 'Amigo mais ativo',
  },
  {
    nome: 'Mel',
    imagem: '/assets/img/mel.jpg',
    descricao: 'Destaque em saúde',
  },
  {
    nome: 'Otto',
    imagem: '/assets/img/otto.jpg',
    descricao: 'O mais curioso',
  },
];

export function HallDaFama() {
  return (
    <section className="py-12 text-center max-w-4xl mx-auto px-4">

      <h2 className="text-3xl font-bold text-[#00917E] mb-6">Hall da Fama</h2>

      <Swiper
        modules={[Autoplay, Navigation]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        navigation
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {pets.map((pet, index) => (
          <SwiperSlide key={index}>
            <div className="w-56 rounded-xl shadow-lg overflow-hidden bg-gray-100">
              {/* Parte superior azul */}
              <div className="bg-blue-200 h-24 w-full" />

              {/* Imagem sobreposta */}
              <div className="flex justify-center -mt-12">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md relative">
                  <Image src={pet.imagem} alt={pet.nome} fill className="object-cover" />
                </div>
              </div>

              {/* Parte inferior com texto */}
              <div className="bg-gray-100 p-5 pt-6 text-center">
                <h3 className="text-lg font-semibold text-indigo-700">{pet.nome}</h3>
                <p className="text-sm text-gray-600 mt-1">{pet.descricao}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
