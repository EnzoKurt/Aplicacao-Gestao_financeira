import { useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, PieChart } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const monthlyData = [
  { mes: 'Jan', receitas: 4500, despesas: 3200 },
  { mes: 'Fev', receitas: 4800, despesas: 3500 },
  { mes: 'Mar', receitas: 5200, despesas: 3800 },
  { mes: 'Abr', receitas: 4900, despesas: 4100 },
  { mes: 'Mai', receitas: 5500, despesas: 3900 },
  { mes: 'Jun', receitas: 5800, despesas: 4200 },
];

const recentTransactions = [
  { id: 1, descricao: 'Salário', tipo: 'Receita', valor: 5800, categoria: 'Salário', data: '01/12/2025' },
  { id: 2, descricao: 'Aluguel', tipo: 'Despesa', valor: 1500, categoria: 'Moradia', data: '05/12/2025' },
  { id: 3, descricao: 'Supermercado', tipo: 'Despesa', valor: 450, categoria: 'Alimentação', data: '05/12/2025' },
  { id: 4, descricao: 'Freelance', tipo: 'Receita', valor: 800, categoria: 'Trabalho Extra', data: '03/12/2025' },
  { id: 5, descricao: 'Internet', tipo: 'Despesa', valor: 120, categoria: 'Utilidades', data: '05/12/2025' },
];

export function Dashboard() {
  const totalReceitas = 6600;
  const totalDespesas = 4200;
  const saldo = totalReceitas - totalDespesas;

  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border border-neutral-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-neutral-500">Receitas do Mês</p>
              <p className="text-neutral-900 mt-2">R$ {totalReceitas.toFixed(2)}</p>
            </div>
            <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-neutral-700" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border border-neutral-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-neutral-500">Despesas do Mês</p>
              <p className="text-neutral-900 mt-2">R$ {totalDespesas.toFixed(2)}</p>
            </div>
            <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center">
              <TrendingDown className="w-6 h-6 text-neutral-700" />
            </div>
          </div>
        </div>

        <div className="bg-neutral-800 text-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-neutral-300">Saldo do Mês</p>
              <p className="text-white mt-2">R$ {saldo.toFixed(2)}</p>
            </div>
            <div className="w-12 h-12 bg-neutral-700 rounded-full flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white p-6 rounded-lg shadow border border-neutral-200">
        <h2 className="text-neutral-900 mb-6">Receitas vs Despesas (Últimos 6 Meses)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
            <XAxis dataKey="mes" stroke="#737373" />
            <YAxis stroke="#737373" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: '1px solid #e5e5e5',
                borderRadius: '8px'
              }}
            />
            <Legend />
            <Bar dataKey="receitas" fill="#404040" name="Receitas" />
            <Bar dataKey="despesas" fill="#a3a3a3" name="Despesas" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white p-6 rounded-lg shadow border border-neutral-200">
        <h2 className="text-neutral-900 mb-6">Transações Recentes</h2>
        <div className="space-y-3">
          {recentTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg border border-neutral-200"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    transaction.tipo === 'Receita' ? 'bg-neutral-700' : 'bg-neutral-300'
                  }`}
                >
                  {transaction.tipo === 'Receita' ? (
                    <TrendingUp className="w-5 h-5 text-white" />
                  ) : (
                    <TrendingDown className="w-5 h-5 text-neutral-700" />
                  )}
                </div>
                <div>
                  <p className="text-neutral-900">{transaction.descricao}</p>
                  <p className="text-neutral-500">{transaction.categoria} • {transaction.data}</p>
                </div>
              </div>
              <p
                className={
                  transaction.tipo === 'Receita' ? 'text-neutral-900' : 'text-neutral-600'
                }
              >
                {transaction.tipo === 'Receita' ? '+' : '-'}R$ {transaction.valor.toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
