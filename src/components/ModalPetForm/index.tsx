'use client';

import { useState } from 'react';

export function ModalPetForm({ onClose, onPetAdded }: { onClose: () => void, onPetAdded: () => void }) {
  const [nome, setNome] = useState('');
  const [raca, setRaca] = useState('');
  const [idade, setIdade] = useState('');
  const [descricao, setDescricao] = useState(''); // novo campo

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const res = await fetch('/api/pets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ nome, raca, idade, descricao }), // envia descricao
    });

    if (res.ok) {
      onPetAdded();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center"
     style={{ backgroundColor: 'rgba(44, 62, 80, 0.5)' }}>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-2xl space-y-6 w-full max-w-md">
        <h2 className="text-2xl font-extrabold text-indigo-700">Adicionar Pet</h2>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
        />
        <input
          type="text"
          placeholder="Raça"
          value={raca}
          onChange={(e) => setRaca(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
        />
        <input
          type="text"
          placeholder="Idade"
          value={idade}
          onChange={(e) => setIdade(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
        />
        <textarea
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          rows={3}
        />

        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-5 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 transition">
            Cancelar
          </button>
          <button type="submit" className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-semibold">
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}
