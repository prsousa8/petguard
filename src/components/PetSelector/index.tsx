'use client';

import { useEffect, useState } from 'react';

type Pet = {
  id: number;
  nome: string;
};

export function PetSelector({ onSelect }: { onSelect: (petId: number) => void }) {
  const [pets, setPets] = useState<Pet[]>([]);
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    const fetchPets = async () => {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/pets', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setPets(data);
      if (data.length > 0) {
        setSelected(data[0].id); // seleciona o primeiro automaticamente
        onSelect(data[0].id);
      }
    };
    fetchPets();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = parseInt(e.target.value, 10);
    setSelected(id);
    onSelect(id);
  };

  return (
    <div className="mb-6">
      <label className="block mb-2 text-sm font-semibold text-gray-700">
        Selecione um pet:
      </label>
      <select
        value={selected ?? ''}
        onChange={handleChange}
        className="border border-gray-300 text-gray-400 rounded-lg px-4 py-2 w-full md:w-72 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
      >
        {pets.length === 0 && <option value="">Nenhum pet encontrado</option>}
        {pets.map((pet) => (
          <option key={pet.id} value={pet.id}>
            {pet.nome}
          </option>
        ))}
      </select>
    </div>

  );
}
