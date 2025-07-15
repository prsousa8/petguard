import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'secreta-temporaria';

export async function GET(req: NextRequest) {
  const token = req.headers.get('authorization')?.split(' ')[1];
  if (!token) return NextResponse.json({ erro: 'Token não fornecido' }, { status: 401 });

  try {
    const payload: any = jwt.verify(token, JWT_SECRET);
    const perfil = await prisma.perfil.findUnique({ where: { usuarioId: payload.id } });
    if (!perfil) return NextResponse.json({ erro: 'Perfil não encontrado' }, { status: 404 });
    return NextResponse.json(perfil);
  } catch {
    return NextResponse.json({ erro: 'Token inválido' }, { status: 401 });
  }
}

export async function PUT(req: NextRequest) {
  const token = req.headers.get('authorization')?.split(' ')[1];
  if (!token) return NextResponse.json({ erro: 'Token não fornecido' }, { status: 401 });

  try {
    const payload: any = jwt.verify(token, JWT_SECRET);
    const { descricao, telefone } = await req.json();

    const perfilAtualizado = await prisma.perfil.update({
      where: { usuarioId: payload.id },
      data: { descricao, telefone },
    });

    return NextResponse.json(perfilAtualizado);
  } catch (e) {
    return NextResponse.json({ erro: 'Erro ao atualizar perfil' }, { status: 400 });
  }
}
