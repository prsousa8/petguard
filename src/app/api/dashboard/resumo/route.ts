import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const totalUsuarios = await prisma.usuario.count();
    const totalPets = await prisma.pet.count();

    return NextResponse.json({ totalUsuarios, totalPets });
  } catch (error) {
    return NextResponse.json({ erro: 'Erro ao obter resumo' }, { status: 500 });
  }
}
