import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Download, Calendar, RefreshCw, FileText } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const categoryData = [
  { name: 'Moradia', value: 1500 },
  { name: 'Alimentação', value: 730 },
  { name: 'Transporte', value: 400 },
  { name: 'Saúde', value: 150 },
  { name: 'Utilidades', value: 120 },
  { name: 'Lazer', value: 300 },
];

const monthlyComparison = [
  { mes: 'Jan', valor: 1300 },
  { mes: 'Fev', valor: 1300 },
  { mes: 'Mar', valor: 1400 },
  { mes: 'Abr', valor: 800 },
  { mes: 'Mai', valor: 1600 },
  { mes: 'Jun', valor: 1600 },
];

const COLORS = ['#262626', '#404040', '#525252', '#737373', '#a3a3a3', '#d4d4d4'];

export function Reports() {
  const [selectedPeriod, setSelectedPeriod] = useState('Dezembro 2025');
  const [isGenerating, setIsGenerating] = useState(false);

  // Funcionalidade 2: Gerar Relatório Mensal (seguindo diagrama de sequência)
  const handleGenerateReport = async () => {
    setIsGenerating(true);
    
    try {
      // Simular busca de dados do Controlador/Lançar
      toast.loading('Buscando dados financeiros...', { id: 'report-gen' });
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Processar dados do RelatorioFinanceiro
      toast.loading('Processando relatório...', { id: 'report-gen' });
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Retornar dados processados
      toast.success('Relatório gerado com sucesso!', { 
        id: 'report-gen',
        description: `Período: ${selectedPeriod}`
      });
    } catch (error) {
      toast.error('Erro ao gerar relatório', { id: 'report-gen' });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleExportPDF = async () => {
    toast.loading('Exportando relatório em PDF...', { id: 'pdf-export' });
    await new Promise(resolve => setTimeout(resolve, 1500));
    toast.success('Relatório exportado com sucesso!', { 
      id: 'pdf-export',
      description: 'O arquivo foi salvo em Downloads'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-neutral-900">Relatórios Financeiros</h2>
          <p className="text-neutral-600 mt-1">Visualize e analise seus dados financeiros</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleGenerateReport}
            disabled={isGenerating}
            className="flex items-center gap-2 bg-neutral-600 text-white px-6 py-3 rounded-lg hover:bg-neutral-700 transition-colors disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Gerando...
              </>
            ) : (
              <>
                <RefreshCw className="w-5 h-5" />
                Gerar Relatório
              </>
            )}
          </button>
          <button 
            onClick={handleExportPDF}
            className="flex items-center gap-2 bg-neutral-800 text-white px-6 py-3 rounded-lg hover:bg-neutral-700 transition-colors"
          >
            <Download className="w-5 h-5" />
            Exportar PDF
          </button>
        </div>
      </div>

      {/* Period Selector */}
      <div className="bg-white p-6 rounded-lg shadow border border-neutral-200">
        <div className="flex items-center gap-4">
          <Calendar className="w-5 h-5 text-neutral-600" />
          <label className="text-neutral-700">Selecionar Período:</label>
          <select 
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-500"
          >
            <option>Dezembro 2025</option>
            <option>Novembro 2025</option>
            <option>Outubro 2025</option>
            <option>Último Trimestre</option>
            <option>Último Semestre</option>
            <option>Ano Completo</option>
          </select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border border-neutral-200">
          <p className="text-neutral-500">Total de Receitas</p>
          <p className="text-neutral-900 mt-2">R$ 6.920,00</p>
          <p className="text-neutral-600 mt-1">+12% vs mês anterior</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border border-neutral-200">
          <p className="text-neutral-500">Total de Despesas</p>
          <p className="text-neutral-900 mt-2">R$ 4.200,00</p>
          <p className="text-neutral-600 mt-1">-5% vs mês anterior</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border border-neutral-200">
          <p className="text-neutral-500">Saldo Líquido</p>
          <p className="text-neutral-900 mt-2">R$ 2.720,00</p>
          <p className="text-neutral-600 mt-1">+28% vs mês anterior</p>
        </div>
        <div className="bg-neutral-800 text-white p-6 rounded-lg shadow">
          <p className="text-neutral-300">Taxa de Poupança</p>
          <p className="text-white mt-2">39,3%</p>
          <p className="text-neutral-400 mt-1">Meta: 30%</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-lg shadow border border-neutral-200">
          <h3 className="text-neutral-900 mb-6">Despesas por Categoria</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {categoryData.map((item, index) => (
              <div key={item.name} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="text-neutral-700">{item.name}: R$ {item.value.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-lg shadow border border-neutral-200">
          <h3 className="text-neutral-900 mb-6">Evolução Mensal de Saldo</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyComparison}>
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
              <Bar dataKey="valor" fill="#404040" name="Saldo (R$)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Analysis */}
      <div className="bg-white p-6 rounded-lg shadow border border-neutral-200">
        <h3 className="text-neutral-900 mb-4">Análise Detalhada</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
            <div>
              <p className="text-neutral-900">Categoria com maior gasto</p>
              <p className="text-neutral-600">Moradia - Aluguel</p>
            </div>
            <p className="text-neutral-900">R$ 1.500,00</p>
          </div>
          <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
            <div>
              <p className="text-neutral-900">Maior receita do mês</p>
              <p className="text-neutral-600">Salário</p>
            </div>
            <p className="text-neutral-900">R$ 5.800,00</p>
          </div>
          <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
            <div>
              <p className="text-neutral-900">Média diária de gastos</p>
              <p className="text-neutral-600">Baseado nos últimos 30 dias</p>
            </div>
            <p className="text-neutral-900">R$ 140,00</p>
          </div>
        </div>
      </div>
    </div>
  );
}