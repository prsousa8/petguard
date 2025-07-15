import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'secreta-temporaria';

export async function POST(req: Request) {
  const { email, senha } = await req.json();

  if (!email || !senha) {
    return NextResponse.json({ erro: 'Email e senha são obrigatórios' }, { status: 400 });
  }

  const usuario = await prisma.usuario.findUnique({ where: { email } });
  if (!usuario) {
    return NextResponse.json({ erro: 'Usuário não encontrado' }, { status: 404 });
  }

  const senhaValida = await bcrypt.compare(senha, usuario.senha);
  if (!senhaValida) {
    return NextResponse.json({ erro: 'Senha incorreta' }, { status: 401 });
  }

  // Gera token JWT
  const token = jwt.sign(
    { id: usuario.id, nome: usuario.nome, email: usuario.email },
    JWT_SECRET,
    { expiresIn: '1d' }
  );

  return NextResponse.json({ mensagem: 'Login realizado com sucesso', token });
}
