'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import Image from 'next/image';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
      });

      const contentType = response.headers.get('content-type');

      if (!response.ok) {
        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json();
          throw new Error(errorData.erro || 'Erro no login');
        } else {
          throw new Error('Erro inesperado na requisição');
        }
      }

      // Aqui garantimos que é JSON
      const data = await response.json();
      login(data.token); // ✅ Atualiza o contexto após login bem-sucedido
      router.push('/');  // ✅ Redireciona
    } catch (error: any) {
      setErro(error.message || 'Erro desconhecido');
    }
  };


  return (
    <div className="flex flex-row justify-center items-center h-screen bg-white px-4 space-x-10">
  <Image src="/assets/img/dogs.svg" width={500} height={400} alt="foto-login" />

  <div className="flex flex-col items-center">
    <form
  onSubmit={handleLogin}
  className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md space-y-6 border border-gray-200"
>
  <h2 className="text-3xl font-extrabold text-center text-indigo-700">Acesse sua conta</h2>

  {erro && (
    <p className="text-red-600 text-center font-medium bg-red-50 p-2 rounded border border-red-300">
      {erro}
    </p>
  )}

  <div className="flex flex-col space-y-1">
    <label htmlFor="email" className="text-sm font-medium text-gray-700">
      Email
    </label>
    <input
      id="email"
      type="email"
      placeholder="seuemail@exemplo.com"
      className="w-full px-4 py-2 border text-gray-400 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
    />
  </div>

  <div className="flex flex-col space-y-1">
    <label htmlFor="senha" className="text-sm font-medium text-gray-700">
      Senha
    </label>
    <input
      id="senha"
      type="password"
      placeholder="********"
      className="w-full px-4 py-2 border text-gray-400 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
      value={senha}
      onChange={(e) => setSenha(e.target.value)}
      required
    />
  </div>

  <button
    type="submit"
    className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition font-semibold text-lg shadow-sm"
  >
    Entrar
  </button>
</form>


    <p className="mt-4 text-gray-700">
      Ainda não tem uma conta?{' '}
      <Link href="/cadastro" className="text-indigo-600 hover:underline">
        Cadastre-se aqui
      </Link>
    </p>
  </div>
</div>

  );
}
