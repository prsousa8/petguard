'use client';

import { useEffect, useState } from 'react';
import { PerfilCampo } from "../PerfilCampo";
import { PerfilImage } from "../PerfilImage";
import { PerfilText } from "../PerfilText";
import { PerfilTitulo } from "../PerfilTitulo";
import { ModalPetForm } from '../ModalPetForm';
import { ModalEditarPet } from '../ModalEditarPet';
import { ModalConfirmarExcluir } from '../ModalExcluir';
import { Pencil, Trash2 } from 'lucide-react';

type Pet = {
  id: number;
  nome: string;
  raca: string;
  idade: string;
  descricao: string;
};

export function PerfilPet() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [petEditando, setPetEditando] = useState<Pet | null>(null);
  const [petExcluir, setPetExcluir] = useState<Pet | null>(null);


  const fetchPets = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch('/api/pets', {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    setPets(data);
  };

   const handleRemover = async () => {
    if (!petExcluir) return;
    const token = localStorage.getItem('token');

    await fetch(`/api/pets/${petExcluir.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setPetExcluir(null);
    fetchPets(); // Atualiza lista
  };

  useEffect(() => {
    fetchPets();
  }, []);

  return (
    <div>
      <PerfilTitulo TituloInfo='Meus Pets' />

      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Adicionar Pet
        </button>
      </div>

      {pets.map((pet) => (
  <div
    key={pet.id}
    className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-6 w-full md:w-[700px] mx-auto transition hover:shadow-xl"
  >
    {/* Topo com cor e imagem do pet */}
    <div className="bg-blue-100 p-4 flex items-center gap-4">
      <PerfilImage ImageName="pet.svg" ImageAlt={`Foto de ${pet.nome}`} />
      <div>
        <h3 className="text-xl font-bold text-indigo-700">{pet.nome}</h3>
        <p className="text-sm text-gray-600">{pet.raca} • {pet.idade}</p>
      </div>
    </div>

    {/* Conteúdo inferior com descrição e ações */}
    <div className="p-4 space-y-4 bg-gray-50">
      <PerfilText descricao={pet.descricao} />
      <PerfilCampo campoTitulo="Nome" campoInfo={pet.nome} />
      <PerfilCampo campoTitulo="Raça" campoInfo={pet.raca} />
      <PerfilCampo campoTitulo="Idade" campoInfo={pet.idade} />

      <div className="flex gap-3 pt-2 items-center">
        <button
          onClick={() => setPetEditando(pet)}
          className="p-2 rounded-full bg-yellow-400 hover:bg-yellow-500 text-white transition"
          title="Editar"
        >
          <Pencil size={18} />
        </button>

        <button
          onClick={() => setPetExcluir(pet)}
          className="p-2 rounded-full bg-red-600 hover:bg-red-700 text-white transition"
          title="Remover"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  </div>
))}


      {showModal && (
        <ModalPetForm onClose={() => setShowModal(false)} onPetAdded={fetchPets} />
      )}

      {petEditando && (
        <ModalEditarPet
          pet={petEditando}
          onClose={() => setPetEditando(null)}
          onPetUpdated={fetchPets}
        />
      )}

       {petExcluir && (
        <ModalConfirmarExcluir
          petNome={petExcluir.nome}
          onConfirm={handleRemover}
          onCancel={() => setPetExcluir(null)}
        />
      )}

    </div>
  );
}
