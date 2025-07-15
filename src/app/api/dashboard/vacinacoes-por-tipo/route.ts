import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'secreta-temporaria';

export async function GET(req: NextRequest) {
  const token = req.headers.get('authorization')?.split(' ')[1];
  const { searchParams } = new URL(req.url);
  const ano = searchParams.get('ano');

  if (!token) {
    return NextResponse.json({ erro: 'Token não fornecido' }, { status: 401 });
  }

  try {
    const payload: any = jwt.verify(token, JWT_SECRET);

    const vacinas = await prisma.vacinacao.groupBy({
      by: ['vacina'],
      where: {
        pet: { usuarioId: payload.id },
        ...(ano ? {
          data: {
            gte: new Date(`${ano}-01-01`),
            lt: new Date(`${+ano + 1}-01-01`)
          }
        } : {})
      },
      _count: true,
      orderBy: { _count: { vacina: 'desc' } }
    });

    return NextResponse.json(vacinas.map(v => ({
      vacina: v.vacina,
      quantidade: v._count
    })));
  } catch (error) {
    return NextResponse.json({ erro: 'Erro ao obter dados de vacinação por tipo' }, { status: 500 });
  }
}
