import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'secreta-temporaria';

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const params = await context.params;  // aguarda params
  const petId = parseInt(params.id, 10);
  if (isNaN(petId)) {
    return NextResponse.json({ erro: 'ID inválido' }, { status: 400 });
  }

  const vacinas = await prisma.vacinacao.findMany({
    where: { petId },
    orderBy: { data: 'desc' }
  });

  return NextResponse.json(vacinas);
}

export async function POST(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const params = await context.params;  // aguarda params
  const petId = parseInt(params.id, 10);
  const token = req.headers.get('authorization')?.split(' ')[1];

  if (!token) {
    return NextResponse.json({ erro: 'Token não fornecido' }, { status: 401 });
  }

  if (isNaN(petId)) {
    return NextResponse.json({ erro: 'ID do pet inválido' }, { status: 400 });
  }

  try {
    jwt.verify(token, JWT_SECRET);

    const { vacina, data, observacao } = await req.json();

    if (!vacina || !data) {
      return NextResponse.json({ erro: 'Vacina e data são obrigatórios' }, { status: 400 });
    }

    const novaVacina = await prisma.vacinacao.create({
      data: {
        petId,
        vacina,
        data: new Date(data),
        observacao,
      },
    });

    return NextResponse.json(novaVacina);
  } catch (error) {
    return NextResponse.json({ erro: 'Erro ao registrar vacinação' }, { status: 500 });
  }
}
