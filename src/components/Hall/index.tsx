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
            <div className="bg-gray-100 w-64 p-4 rounded-xl shadow-md flex flex-col items-center text-center">
              <div className="w-32 h-32 relative rounded-full overflow-hidden mb-3">
                <Image src={pet.imagem} alt={pet.nome} fill className="object-cover" />
              </div>
              <h3 className="text-lg font-semibold text-[#009FFF]">{pet.nome}</h3>
              <p className="text-sm text-gray-600 mt-1">{pet.descricao}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
