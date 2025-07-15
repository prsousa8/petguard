'use client';

import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { CardContent, CardUI } from '@/components/CardUI';

interface VacinaTipoItem {
    vacina: string;
    quantidade: number;
}

interface VacinacaoItem {
    mesAno: string;
    quantidade: number;
}

export default function DashboardPage() {
    const [totalPets, setTotalPets] = useState(0);
    const [totalUsuarios, setTotalUsuarios] = useState(0);
    const [vacinacoesPorMes, setVacinacoesPorMes] = useState<VacinacaoItem[]>([]);
    const [vacinacoesPorTipo, setVacinacoesPorTipo] = useState<VacinaTipoItem[]>([]);
    const [anoSelecionado, setAnoSelecionado] = useState<string>('');
    const [anosDisponiveis, setAnosDisponiveis] = useState<string[]>([]);

    useEffect(() => {
        fetch('/api/dashboard/resumo')
            .then((res) => res.json())
            .then((data) => {
                setTotalPets(data.totalPets);
                setTotalUsuarios(data.totalUsuarios);
            });

        fetch('/api/dashboard/vacinacoes-por-mes')
            .then((res) => res.json())
            .then((data: VacinacaoItem[]) => {
                setVacinacoesPorMes(data);

                const anos = Array.from(
                    new Set(data.map((item) => item.mesAno.split('/')[1]))
                ).sort();

                setAnosDisponiveis(anos);
                setAnoSelecionado(anos[0]);
            });
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!anoSelecionado || !token) return;

        fetch(`/api/dashboard/vacinacoes-por-tipo?ano=${anoSelecionado}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => res.json())
            .then((data: VacinaTipoItem[]) => setVacinacoesPorTipo(data));
    }, [anoSelecionado]);

    const dadosFiltrados = vacinacoesPorMes
        .filter((item) => item.mesAno.endsWith(anoSelecionado))
        .map((item) => ({
            mes: item.mesAno.split('/')[0],
            quantidade: item.quantidade,
        }));

    return (
        <section className="max-w-6xl mx-auto px-4 py-8 ">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-indigo-700">Dashboard</h1>
                <select
                    value={anoSelecionado}
                    onChange={(e) => setAnoSelecionado(e.target.value)}
                    className="border px-3 py-1 rounded text-sm shadow-sm text-gray-500"
                >
                    {anosDisponiveis.map((ano) => (
                        <option key={ano} value={ano}>{ano}</option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <CardUI className="bg-indigo-50 shadow-sm border border-indigo-200">
                    <CardContent className="p-4">
                        <p className="text-sm font-medium text-indigo-700">Total de Usuários</p>
                        <p className="text-3xl font-bold text-indigo-900">{totalUsuarios}</p>
                    </CardContent>
                </CardUI>

                <CardUI className="bg-emerald-50 shadow-sm border border-emerald-200">
                    <CardContent className="p-4">
                        <p className="text-sm font-medium text-emerald-700">Total de Pets</p>
                        <p className="text-3xl font-bold text-emerald-900">{totalPets}</p>
                    </CardContent>
                </CardUI>
            </div>


            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded shadow space-y-4">
                    <h2 className="text-lg font-semibold text-indigo-600">Vacinações por Mês</h2>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={dadosFiltrados}>
                            <XAxis dataKey="mes" />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Bar dataKey="quantidade" fill="#6366F1" radius={[6, 6, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white p-4 rounded shadow space-y-4">
                    <h2 className="text-lg font-semibold text-emerald-600">
                        Vacinações por Tipo ({anoSelecionado})
                    </h2>

                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={vacinacoesPorTipo}>
                            <XAxis dataKey="vacina" interval={0} angle={-15} textAnchor="end" height={60} />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Bar dataKey="quantidade" fill="#10B981" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </section>
    );
}
