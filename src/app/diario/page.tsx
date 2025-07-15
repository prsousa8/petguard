'use client';

import { DiarioPet } from "@/components/DiarioPet";
import { PetSelector } from "@/components/PetSelector";
import { useState } from "react";

export default function Diario() {
  const [petIdSelecionado, setPetIdSelecionado] = useState<number | null>(null);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <PetSelector onSelect={(id) => setPetIdSelecionado(id)} />
      <DiarioPet petId={petIdSelecionado ?? undefined} />
    </div>
  );
}
