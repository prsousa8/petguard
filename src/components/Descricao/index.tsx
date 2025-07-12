// components/TituloComIcone.tsx
import Image from "next/image";

export function Descricao() {
  return (
    <div className="flex flex-col items-center text-center gap-2">
      {/* Título com ícone ao lado */}
      <div className="flex items-center gap-2 justify-center">
        <Image src="/assets/icons/Pata.svg" alt="Notificações" width={24} height={24} />
        <h2 className="text-xl font-semibold text-[#009FFF]">Projeto PetGuard</h2>
      </div>

      {/* Texto abaixo */}
      <p className="text-sm text-gray-600 max-w-xs">
        Venha fazer a diferença na vida do seu pet!
      </p>
    </div>
  );
}
