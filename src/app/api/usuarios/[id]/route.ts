import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import prisma from '@/lib/prisma';


export async function GET(req: Request, { params }: { params: { id: string } }) {
  const auth = req.headers.get('authorization');
  const token = auth?.split(' ')[1];

  if (!token) return NextResponse.json({ error: 'Sem token' }, { status: 401 });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number };

    if (decoded.id.toString() !== params.id) {
      return NextResponse.json({ error: 'Acesso negado' }, { status: 403 });
    }

    const usuario = await prisma.usuario.findUnique({
      where: { id: Number(params.id) },
      select: { id: true, nome: true, email: true }, // só o necessário
    });

    return NextResponse.json(usuario);
  } catch (err) {
    return NextResponse.json({ error: 'Token inválido' }, { status: 401 });
  }
}
