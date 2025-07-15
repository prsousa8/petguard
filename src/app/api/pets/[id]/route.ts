import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'secreta-temporaria';

export async function PUT(req: NextRequest, context: { params: { id: string } }) {
  const { id } = context.params;

  if (!id || isNaN(Number(id))) {
    return NextResponse.json({ erro: 'ID do pet inválido' }, { status: 400 });
  }

  const petId = parseInt(id, 10);
  const token = req.headers.get('authorization')?.split(' ')[1];

  if (!token) {
    return NextResponse.json({ erro: 'Token não fornecido' }, { status: 401 });
  }

  try {
    const payload: any = jwt.verify(token, JWT_SECRET);
    const { nome, raca, idade, descricao } = await req.json();

    const pet = await prisma.pet.findUnique({ where: { id: petId } });

    if (!pet || pet.usuarioId !== payload.id) {
      return NextResponse.json({ erro: 'Pet não encontrado ou acesso negado' }, { status: 403 });
    }

    const petAtualizado = await prisma.pet.update({
      where: { id: petId },
      data: { nome, raca, idade, descricao },
    });

    return NextResponse.json(petAtualizado);
  } catch (error) {
    console.error('Erro no PUT /api/pets/[id]:', error);
    return NextResponse.json({ erro: 'Erro ao atualizar o pet' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
  const { id } = context.params;

  if (!id || isNaN(Number(id))) {
    return NextResponse.json({ erro: 'ID do pet inválido' }, { status: 400 });
  }

  const petId = parseInt(id, 10);
  const token = req.headers.get('authorization')?.split(' ')[1];

  if (!token) {
    return NextResponse.json({ erro: 'Token não fornecido' }, { status: 401 });
  }

  try {
    const payload: any = jwt.verify(token, JWT_SECRET);

    const pet = await prisma.pet.findUnique({
      where: { id: petId },
    });

    if (!pet || pet.usuarioId !== payload.id) {
      return NextResponse.json({ erro: 'Pet não encontrado ou não autorizado' }, { status: 403 });
    }

    await prisma.pet.delete({ where: { id: petId } });

    return NextResponse.json({ mensagem: 'Pet removido com sucesso' });
  } catch (error) {
    console.error('Erro ao remover o pet:', error);
    return NextResponse.json({ erro: 'Erro ao remover o pet' }, { status: 500 });
  }
}