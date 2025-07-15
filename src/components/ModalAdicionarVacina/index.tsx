'use client';

import { useState } from 'react';

export function ModalAdicionarVacina({ petId, onClose, onVacinaAdicionada }: {
  petId: number;
  onClose: () => void;
  onVacinaAdicionada: () => void;
}) {
  const [vacina, setVacina] = useState('');
  const [data, setData] = useState('');
  const [observacao, setObservacao] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    await fetch(`/api/pets/${petId}/vacinacoes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ vacina, data, observacao }),
    });

    onVacinaAdicionada();
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center"
     style={{ backgroundColor: 'rgba(44, 62, 80, 0.5)' }}>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg space-y-4 w-full max-w-md">
        <h2 className="text-xl font-bold text-indigo-700">Nova Vacina</h2>
        <input
          type="text"
          placeholder="Nome da Vacina"
          value={vacina}
          onChange={(e) => setVacina(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          required
        />
        <input
          type="date"
          value={data}
          onChange={(e) => setData(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          required
        />
        <textarea
          placeholder="Observações (opcional)"
          value={observacao}
          onChange={(e) => setObservacao(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
        />
        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-5 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 transition">Cancelar</button>
          <button type="submit" className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-semibold">Salvar</button>
        </div>
      </form>
    </div>
  );
}
