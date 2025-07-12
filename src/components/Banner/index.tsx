// components/Banner.tsx
import Image from 'next/image';

export function Banner() {
  return (
    <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden">
      {/* Imagem de fundo */}
      <Image
        src="/assets/img/banner.svg"
        alt="Banner"
        fill
        priority
        className="object-cover object-center"
      />

      {/* Quadro semitransparente no canto inferior esquerdo */}
      <div className="absolute inset-0 flex items-end justify-start p-6">
        <div className="bg-white/20 backdrop-blur-md rounded-lg p-6 max-w-md text-left shadow-lg">

          <h1 className="text-2xl md:text-4xl font-bold text-[#0051FE]">
            Bem-vindo ao PetGuard
          </h1>
          <p className="mt-2 text-gray-700">
            Monitore a saúde e a localização do seu pet em tempo real com segurança.
          </p>
        </div>
      </div>
    </div>
  );
}
