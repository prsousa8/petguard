import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { nome, email, senha } = await req.json();

  if (!nome || !email || !senha) {
    return NextResponse.json({ erro: 'Todos os campos são obrigatórios' }, { status: 400 });
  }

  const existe = await prisma.usuario.findUnique({ where: { email } });
  if (existe) {
    return NextResponse.json({ erro: 'Usuário já cadastrado' }, { status: 400 });
  }

  const senhaCriptografada = await bcrypt.hash(senha, 10);

  const novoUsuario = await prisma.usuario.create({
    data: {
      nome,
      email,
      senha: senhaCriptografada,
      perfil: {
        create: {
          nome,
          email,
          descricao: '',
          telefone: '',
          foto: 'dono.svg',
        }
      }
    },
    include: { perfil: true }
  });

  return NextResponse.json({ mensagem: 'Usuário e perfil criados com sucesso', usuario: novoUsuario });
}
