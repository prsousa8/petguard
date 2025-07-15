import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'secreta-temporaria';

function verificarToken(req: NextRequest) {
  const token = req.headers.get('authorization')?.split(' ')[1];
  if (!token) throw new Error('Token não fornecido');
  try {
    const payload: any = jwt.verify(token, JWT_SECRET);
    return payload.id as number;
  } catch {
    throw new Error('Token inválido');
  }
}

// GET: listar pets do usuário autenticado
export async function GET(req: NextRequest) {
  try {
    const usuarioId = verificarToken(req);
    const pets = await prisma.pet.findMany({
      where: { usuarioId },
      orderBy: { id: 'asc' },
    });
    return NextResponse.json(pets);
  } catch (e: any) {
    return NextResponse.json({ erro: e.message }, { status: 401 });
  }
}

// POST: adicionar novo pet para o usuário autenticado
export async function POST(req: NextRequest) {
  try {
    const usuarioId = verificarToken(req);
    const { nome, raca, idade, descricao } = await req.json();

    if (!nome || !raca || !idade) {
      return NextResponse.json({ erro: 'Nome, raça e idade são obrigatórios' }, { status: 400 });
    }

    const novoPet = await prisma.pet.create({
      data: {
        nome,
        raca,
        idade,
        descricao,  // pode ser undefined se não passar
        usuarioId,
      },
    });

    return NextResponse.json(novoPet, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ erro: e.message }, { status: 401 });
  }
}

