'use client';

type ModalConfirmarExcluirProps = {
  petNome: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ModalConfirmarExcluir({ petNome, onConfirm, onCancel }: ModalConfirmarExcluirProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center"
     style={{ backgroundColor: 'rgba(44, 62, 80, 0.5)' }}>
      <div className="bg-white rounded-lg p-6 w-80 shadow-lg">
        <h2 className="text-2xl font-semibold text-indigo-700">Confirmar exclusão</h2>
        <p className="mb-6 text-gray-400">Tem certeza que deseja excluir o pet <strong>{petNome}</strong>?</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="px-5 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 transition"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}
