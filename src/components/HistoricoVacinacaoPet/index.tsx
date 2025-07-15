'use client';

import { useEffect, useState } from 'react';
import { ModalAdicionarVacina } from '../ModalAdicionarVacina';

type Vacinacao = {
    id: number;
    vacina: string;
    data: string;
    observacao?: string;
};

export function HistoricoVacinacaoPet({ petId }: { petId: number }) {
    const [vacinacoes, setVacinacoes] = useState<Vacinacao[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    const fetchVacinacoes = async () => {
        setLoading(true);
        const token = localStorage.getItem('token');
        const res = await fetch(`/api/pets/${petId}/vacinacoes`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setVacinacoes(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchVacinacoes();
    }, [petId]);


    return (
        <div className="bg-white p-6 rounded-2xl shadow-lg space-y-6 border border-gray-200">
  <div className="flex items-center justify-between">
    <h2 className="text-2xl font-bold text-indigo-600">Histórico de Vacinação</h2>
    <button
      onClick={() => setShowModal(true)}
      className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition shadow-sm"
    >
      Adicionar Vacina
    </button>
  </div>

  {showModal && (
    <ModalAdicionarVacina
      petId={petId}
      onClose={() => setShowModal(false)}
      onVacinaAdicionada={fetchVacinacoes}
    />
  )}

  <div className="overflow-x-auto">
    <table className="w-full table-auto border-collapse text-sm">
      <thead>
        <tr className="bg-indigo-50 text-indigo-700">
          <th className="text-left p-3 border-b font-medium">Vacina</th>
          <th className="text-left p-3 border-b font-medium">Data</th>
          <th className="text-left p-3 border-b font-medium">Observação</th>
        </tr>
      </thead>
      <tbody>
        {vacinacoes.map((v) => (
          <tr key={v.id} className="hover:bg-gray-50">
            <td className="p-3 text-gray-400 border-b">{v.vacina}</td>
            <td className="p-3 text-gray-400 border-b">{new Date(v.data).toLocaleDateString()}</td>
            <td className="p-3 text-gray-400 border-b">{v.observacao || <span className="text-gray-400 italic">-</span>}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

    );
}
