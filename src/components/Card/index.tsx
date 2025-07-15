// components/Card.tsx
import Image from 'next/image';

type CardProps = {
  icon: string;
  title: string;
  description: string;
};

export function Card({ icon, title, description }: CardProps) {
  return (
    <div
      className="
    bg-gray-50
    rounded-xl
    p-6
    shadow-md
    flex flex-col items-center text-center gap-4 w-70
    transition transform duration-300 ease-in-out
    hover:shadow-xl hover:scale-[1.03] cursor-pointer
  "
    >
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
