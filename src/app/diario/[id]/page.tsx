'use client';

import { useState } from 'react';
import { SubmenuTabs } from '@/components/SubMenuTabs';
import { HistoricoVacinacaoPet } from '@/components/HistoricoVacinacaoPet';
import { HistoricoAlimentacaoPet } from '@/components/HistoricoAlimentacaoPet';
import { HistoricoExerciciosPet } from '@/components/HistoricoExerciciosPet';

export function DiarioPet({ petId }: { petId: number }) {
  const [abaSelecionada, setAbaSelecionada] = useState('vacinas');

  return (
    <>
      <SubmenuTabs
        tabs={[
          { label: 'Vacinas', value: 'vacinas' },
          { label: 'Alimentação', value: 'alimentacao' },
          { label: 'Exercícios', value: 'exercicios' },
        ]}
        defaultValue="vacinas"
        onChange={setAbaSelecionada}
      />

      {abaSelecionada === 'vacinas' && <HistoricoVacinacaoPet petId={petId} />}
      {abaSelecionada === 'alimentacao' && <HistoricoAlimentacaoPet petId={petId} />}
      {abaSelecionada === 'exercicios' && <HistoricoExerciciosPet petId={petId} />}
    </>
  );
}
