'use client';

import { useState } from 'react';
import { SubmenuTabs } from '../SubMenuTabs';
import { HistoricoVacinacaoPet } from '../HistoricoVacinacaoPet';
import { ModalAdicionarVacina } from '../ModalAdicionarVacina';

export function DiarioPet({ petId }: { petId?: number }) {
  const [abaSelecionada, setAbaSelecionada] = useState('vacinas');
  const [showModalVacina, setShowModalVacina] = useState(false);

  const handleAdicionarVacina = () => {
    if (!petId) {
      alert('Você precisa selecionar um pet para adicionar uma vacina.');
      return;
    }
    setShowModalVacina(true);
  };

  return (
    <div>
      <SubmenuTabs
        tabs={[
          { label: 'Vacinas', value: 'vacinas' },
          { label: 'Alimentação', value: 'alimentacao' },
          { label: 'Exercícios', value: 'exercicios' },
        ]}
        defaultValue="vacinas"
        onChange={setAbaSelecionada}
      />

      {abaSelecionada === 'vacinas' && (
        <div>
          {petId ? (
            <HistoricoVacinacaoPet petId={petId} />
          ) : (
            <p className="mb-4 text-gray-500">
              Nenhum pet selecionado. Selecione um pet para ver ou adicionar vacinas.
            </p>
          )}

          {showModalVacina && petId && (
            <ModalAdicionarVacina
              petId={petId}
              onClose={() => setShowModalVacina(false)}
              onVacinaAdicionada={() => {
                setShowModalVacina(false);
              }}
            />
          )}
        </div>
      )}
    </div>
  );
}
