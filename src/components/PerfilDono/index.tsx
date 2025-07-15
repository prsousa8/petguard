'use client';

import { useEffect, useState } from 'react';
import { PerfilCampo } from "../PerfilCampo";
import { PerfilImage } from "../PerfilImage";
import { PerfilText } from "../PerfilText";
import { PerfilTitulo } from "../PerfilTitulo";

export function PerfilDono() {
  const [perfil, setPerfil] = useState<any>(null);
  const [descricao, setDescricao] = useState('');
  const [telefone, setTelefone] = useState('');
  const [salvando, setSalvando] = useState(false);
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    const fetchPerfil = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      const res = await fetch('/api/perfil', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      setPerfil(data);
      setDescricao(data.descricao || '');
      setTelefone(data.telefone || '');
    };

    fetchPerfil();
  }, []);

  const handleSalvar = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    setSalvando(true);
    setMensagem('');

    const res = await fetch('/api/perfil', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ descricao, telefone }),
    });

    if (res.ok) {
      setMensagem('Perfil atualizado com sucesso!');
    } else {
      const erro = await res.json();
      setMensagem(erro.erro || 'Erro ao atualizar perfil.');
    }

    setSalvando(false);
  };

  if (!perfil) return <p>Carregando...</p>;

  return (
    <div className="space-y-6">
  <PerfilTitulo TituloInfo="Meu perfil..." />

  <div className="bg-white rounded-2xl shadow-lg border border-gray-200 flex flex-col md:flex-row gap-8 items-center md:items-start p-6 w-full max-w-5xl mx-auto">
    
    {/* Imagem do dono */}
    <PerfilImage ImageName="dono.svg" ImageAlt="Foto do dono" />

    {/* Informações do perfil */}
    <div className="flex-1 space-y-5">
      <PerfilText descricao={descricao} />

      <PerfilCampo campoTitulo="Nome" campoInfo={perfil.nome} />
      <PerfilCampo campoTitulo="Email" campoInfo={perfil.email} />

      {/* Telefone */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
        <input
          type="text"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          className="w-full border border-gray-300 text-gray-400 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Descrição */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
        <textarea
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          className="w-full border border-gray-300  text-gray-400 rounded-md px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
          rows={4}
        />
      </div>

      {/* Botão de salvar */}
      <button
        onClick={handleSalvar}
        disabled={salvando}
        className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-60"
      >
        {salvando ? 'Salvando...' : 'Salvar'}
      </button>

      {/* Mensagem de feedback */}
      {mensagem && <p className="text-sm text-green-600">{mensagem}</p>}
    </div>
  </div>
</div>

  );
}
