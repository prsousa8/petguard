// components/HistoricoExerciciosPet.tsx
'use client';

export function HistoricoExerciciosPet({ petId }: { petId: number }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold text-indigo-600">Histórico de Exercícios</h2>
      <p className="text-gray-500 mt-4">Nenhum dado registrado ainda.</p>
    </div>
  );
}
