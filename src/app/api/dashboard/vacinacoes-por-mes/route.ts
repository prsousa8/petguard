import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function formatarMesAno(mes: number, ano: number) {
  const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  return `${meses[mes - 1]}/${ano}`;
}

export async function GET() {
  try {
    const resultado = await prisma.$queryRawUnsafe<any[]>(`
      SELECT 
        EXTRACT(MONTH FROM data) AS mes, 
        EXTRACT(YEAR FROM data) AS ano,
        COUNT(*) AS quantidade
      FROM Vacinacao
      GROUP BY ano, mes
      ORDER BY ano, mes
    `);

    const dadosFormatados = resultado.map((item) => ({
      mesAno: formatarMesAno(Number(item.mes), Number(item.ano)),
      quantidade: Number(item.quantidade),
    }));

    return NextResponse.json(dadosFormatados);
  } catch (error) {
    return NextResponse.json({ erro: 'Erro ao obter dados de vacinação' }, { status: 500 });
  }
}
