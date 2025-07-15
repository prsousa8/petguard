'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function CadastroPage() {
  const router = useRouter();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [modalAberto, setModalAberto] = useState(false);

  const handleCadastro = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/cadastrar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, senha }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.erro || 'Erro ao cadastrar');
      }

      setModalAberto(true); // abre modal ao cadastrar com sucesso
    } catch (error: any) {
      setErro(error.message);
    }
  };

  const fecharModal = () => {
    setModalAberto(false);
    router.push('/login');
  };

  return (
    <div className="flex flex-row justify-center items-center h-screen bg-white px-4 space-x-10">
      <Image src="/assets/img/cat-family.svg" width={500} height={400} alt="foto-cadastro" />

      <div className="flex flex-col items-center">
        <form
          onSubmit={handleCadastro}
          className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md space-y-6 border border-gray-200"
        >
          <h2 className="text-3xl font-extrabold text-center text-indigo-700">Crie sua conta</h2>

          {erro && (
            <p className="text-red-600 text-center font-medium bg-red-50 p-2 rounded border border-red-300">
              {erro}
            </p>
          )}

          <div className="flex flex-col space-y-1">
            <label htmlFor="nome" className="text-sm font-medium text-gray-700">Nome</label>
            <input
              id="nome"
              type="text"
              placeholder="Seu nome completo"
              className="w-full px-4 py-2 text-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col space-y-1">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              placeholder="seuemail@exemplo.com"
              className="w-full px-4 py-2 text-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col space-y-1">
            <label htmlFor="senha" className="text-sm font-medium text-gray-700">Senha</label>
            <input
              id="senha"
              type="password"
              placeholder="********"
              className="w-full px-4 py-2 text-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition font-semibold text-lg shadow-sm"
          >
            Cadastrar
          </button>
        </form>
      </div>

      {/* Modal de sucesso */}
      {modalAberto && (
        <div className="fixed inset-0 flex items-center justify-center"
     style={{ backgroundColor: 'rgba(44, 62, 80, 0.5)' }}>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center space-y-4 w-full max-w-sm">
            <h2 className="text-xl font-semibold text-green-600">Cadastro realizado com sucesso!</h2>
            <p className="text-gray-600">Você será redirecionado para o login.</p>
            <button
              onClick={fecharModal}
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
            >
              Ir para login
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
