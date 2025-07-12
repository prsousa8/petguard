// components/Card.tsx
import Image from 'next/image';

type CardProps = {
  icon: string;
  title: string;
  description: string;
};

export function Card({ icon, title, description }: CardProps) {
  return (
    <div className="bg-gray-100 rounded-xl p-6 shadow-md flex flex-col items-center text-center gap-4 w-70">
      {/* Ícone */}
      <Image
        src={icon}
        alt={title}
        width={30}
        height={30}
      />

      {/* Texto */}
      <div>
        <h3 className="text-lg font-semibold text-[#009FFF]">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
}
