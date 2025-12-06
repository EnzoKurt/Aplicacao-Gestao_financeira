import { useState } from 'react';
import { Plus, Search, Filter, TrendingUp, TrendingDown, Pencil, Trash2, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner';

const initialTransactions = [
  { id: 1, descricao: 'Salário', tipo: 'Receita', valor: 5800, categoria: 'Salário', data: '2025-12-01' },
  { id: 2, descricao: 'Aluguel', tipo: 'Despesa', valor: 1500, categoria: 'Moradia', data: '2025-12-05' },
  { id: 3, descricao: 'Supermercado', tipo: 'Despesa', valor: 450, categoria: 'Alimentação', data: '2025-12-05' },
  { id: 4, descricao: 'Freelance', tipo: 'Receita', valor: 800, categoria: 'Trabalho Extra', data: '2025-12-03' },
  { id: 5, descricao: 'Internet', tipo: 'Despesa', valor: 120, categoria: 'Utilidades', data: '2025-12-05' },
  { id: 6, descricao: 'Academia', tipo: 'Despesa', valor: 150, categoria: 'Saúde', data: '2025-12-01' },
  { id: 7, descricao: 'Restaurante', tipo: 'Despesa', valor: 280, categoria: 'Alimentação', data: '2025-12-04' },
  { id: 8, descricao: 'Investimentos', tipo: 'Receita', valor: 320, categoria: 'Investimentos', data: '2025-12-02' },
];

const categorias = ['Todas', 'Salário', 'Moradia', 'Alimentação', 'Trabalho Extra', 'Utilidades', 'Saúde', 'Investimentos', 'Transporte'];

export function TransactionList() {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('Todas');
  const [filterCategory, setFilterCategory] = useState('Todas');
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    descricao: '',
    tipo: 'Despesa',
    valor: '',
    categoria: 'Alimentação',
    data: new Date().toISOString().split('T')[0]
  });

  // Funcionalidade 1: Cadastrar Despesa (seguindo diagrama de sequência)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Validar dados na Tela/Cadastro
      if (!formData.descricao || !formData.valor || parseFloat(formData.valor) <= 0) {
        toast.error('Por favor, preencha todos os campos corretamente');
        setIsProcessing(false);
        return;
      }

      // Simular processamento do Controlador
      await new Promise(resolve => setTimeout(resolve, 500));

      // Validar categoria
      const categoriaValida = categorias.filter(c => c !== 'Todas').includes(formData.categoria);
      if (!categoriaValida) {
        toast.error('Categoria inválida');
        setIsProcessing(false);
        return;
      }

      // Criar nova transação
      const newTransaction = {
        id: Date.now(),
        descricao: formData.descricao,
        tipo: formData.tipo,
        valor: parseFloat(formData.valor),
        categoria: formData.categoria,
        data: formData.data
      };

      // Persistir no sistema
      setTransactions([newTransaction, ...transactions]);

      // Feedback de sucesso
      toast.success(
        `${formData.tipo} cadastrada com sucesso!`,
        {
          description: `${formData.descricao} - R$ ${parseFloat(formData.valor).toFixed(2)}`
        }
      );

      // Resetar formulário
      setFormData({
        descricao: '',
        tipo: 'Despesa',
        valor: '',
        categoria: 'Alimentação',
        data: new Date().toISOString().split('T')[0]
      });
      setShowForm(false);
    } catch (error) {
      toast.error('Erro ao processar transação');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDelete = (id: number) => {
    const transaction = transactions.find(t => t.id === id);
    setTransactions(transactions.filter(t => t.id !== id));
    toast.success('Transação excluída com sucesso', {
      description: transaction?.descricao
    });
  };

  const filteredTransactions = transactions.filter(t => {
    const matchesSearch = t.descricao.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'Todas' || t.tipo === filterType;
    const matchesCategory = filterCategory === 'Todas' || t.categoria === filterCategory;
    return matchesSearch && matchesType && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header with Add Button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-neutral-900">Gerenciar Transações</h2>
          <p className="text-neutral-600 mt-1">Adicione e gerencie suas receitas e despesas</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-neutral-800 text-white px-6 py-3 rounded-lg hover:bg-neutral-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Nova Transação
        </button>
      </div>

      {/* Add Transaction Form */}
      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow border border-neutral-200">
          <h3 className="text-neutral-900 mb-4">Adicionar Transação</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-neutral-700 mb-2">Descrição</label>
                <input
                  type="text"
                  value={formData.descricao}
                  onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-500"
                  required
                />
              </div>
              <div>
                <label className="block text-neutral-700 mb-2">Tipo</label>
                <select
                  value={formData.tipo}
                  onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-500"
                >
                  <option value="Receita">Receita</option>
                  <option value="Despesa">Despesa</option>
                </select>
              </div>
              <div>
                <label className="block text-neutral-700 mb-2">Valor (R$)</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.valor}
                  onChange={(e) => setFormData({ ...formData, valor: e.target.value })}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-500"
                  required
                />
              </div>
              <div>
                <label className="block text-neutral-700 mb-2">Categoria</label>
                <select
                  value={formData.categoria}
                  onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-500"
                >
                  {categorias.filter(c => c !== 'Todas').map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-neutral-700 mb-2">Data</label>
                <input
                  type="date"
                  value={formData.data}
                  onChange={(e) => setFormData({ ...formData, data: e.target.value })}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-500"
                  required
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={isProcessing}
                className="bg-neutral-800 text-white px-6 py-2 rounded-lg hover:bg-neutral-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processando...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Salvar Transação
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                disabled={isProcessing}
                className="bg-neutral-200 text-neutral-700 px-6 py-2 rounded-lg hover:bg-neutral-300 transition-colors disabled:opacity-50"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow border border-neutral-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-neutral-700 mb-2">Buscar</label>
            <div className="relative">
              <Search className="w-5 h-5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar transação..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-neutral-700 mb-2">Filtrar por Tipo</label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-500"
            >
              <option value="Todas">Todas</option>
              <option value="Receita">Receita</option>
              <option value="Despesa">Despesa</option>
            </select>
          </div>
          <div>
            <label className="block text-neutral-700 mb-2">Filtrar por Categoria</label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-500"
            >
              {categorias.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Transactions List */}
      <div className="bg-white rounded-lg shadow border border-neutral-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-100 border-b border-neutral-200">
              <tr>
                <th className="px-6 py-4 text-left text-neutral-700">Data</th>
                <th className="px-6 py-4 text-left text-neutral-700">Descrição</th>
                <th className="px-6 py-4 text-left text-neutral-700">Categoria</th>
                <th className="px-6 py-4 text-left text-neutral-700">Tipo</th>
                <th className="px-6 py-4 text-right text-neutral-700">Valor</th>
                <th className="px-6 py-4 text-center text-neutral-700">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                  <td className="px-6 py-4 text-neutral-600">
                    {new Date(transaction.data).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="px-6 py-4 text-neutral-900">{transaction.descricao}</td>
                  <td className="px-6 py-4 text-neutral-600">{transaction.categoria}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full ${
                        transaction.tipo === 'Receita'
                          ? 'bg-neutral-700 text-white'
                          : 'bg-neutral-200 text-neutral-700'
                      }`}
                    >
                      {transaction.tipo === 'Receita' ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                      {transaction.tipo}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-neutral-900">
                    R$ {transaction.valor.toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(transaction.id)}
                        className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}