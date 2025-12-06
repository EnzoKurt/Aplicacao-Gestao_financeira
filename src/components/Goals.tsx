import { useState } from 'react';
import { Target, Plus, TrendingUp, Calendar, DollarSign, AlertCircle, Edit } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { GoalUpdateModal } from './GoalUpdateModal';

const initialGoals = [
  {
    id: 1,
    nome: 'Fundo de Emergência',
    valorAlvo: 20000,
    valorAtual: 12500,
    dataInicio: '2025-01-01',
    dataAlvo: '2025-12-31',
    categoria: 'Poupança'
  },
  {
    id: 2,
    nome: 'Viagem de Férias',
    valorAlvo: 8000,
    valorAtual: 3200,
    dataInicio: '2025-03-01',
    dataAlvo: '2025-12-15',
    categoria: 'Lazer'
  },
  {
    id: 3,
    nome: 'Curso de Especialização',
    valorAlvo: 5000,
    valorAtual: 4100,
    dataInicio: '2025-02-01',
    dataAlvo: '2025-08-01',
    categoria: 'Educação'
  }
];

export function Goals() {
  const [goals, setGoals] = useState(initialGoals);
  const [showForm, setShowForm] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    valorAlvo: '',
    valorAtual: '',
    dataInicio: new Date().toISOString().split('T')[0],
    dataAlvo: '',
    categoria: 'Poupança'
  });
  const [selectedGoal, setSelectedGoal] = useState(null);

  // Funcionalidade 3: Definir Meta Financeira (seguindo diagrama de sequência)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Validação na Tela/Metas
      if (!formData.nome || !formData.valorAlvo || !formData.dataAlvo) {
        toast.error('Por favor, preencha todos os campos obrigatórios');
        setIsProcessing(false);
        return;
      }

      const valorAlvo = parseFloat(formData.valorAlvo);
      const valorAtual = parseFloat(formData.valorAtual || '0');

      if (valorAlvo <= 0) {
        toast.error('O valor alvo deve ser maior que zero');
        setIsProcessing(false);
        return;
      }

      if (valorAtual > valorAlvo) {
        toast.error('O valor atual não pode ser maior que o valor alvo');
        setIsProcessing(false);
        return;
      }

      // Validar data alvo
      const dataAlvo = new Date(formData.dataAlvo);
      const dataInicio = new Date(formData.dataInicio);
      if (dataAlvo <= dataInicio) {
        toast.error('A data alvo deve ser posterior à data de início');
        setIsProcessing(false);
        return;
      }

      // Simular processamento do MetaController
      toast.loading('Validando categoria...', { id: 'meta-process' });
      await new Promise(resolve => setTimeout(resolve, 500));

      // Buscar/Validar categoria
      const categoriasValidas = ['Poupança', 'Lazer', 'Educação', 'Investimento', 'Compra'];
      if (!categoriasValidas.includes(formData.categoria)) {
        toast.error('Categoria inválida', { id: 'meta-process' });
        setIsProcessing(false);
        return;
      }

      // Persistir nova meta
      toast.loading('Salvando meta...', { id: 'meta-process' });
      await new Promise(resolve => setTimeout(resolve, 500));

      const newGoal = {
        id: Date.now(),
        nome: formData.nome,
        valorAlvo: valorAlvo,
        valorAtual: valorAtual,
        dataInicio: formData.dataInicio,
        dataAlvo: formData.dataAlvo,
        categoria: formData.categoria
      };

      setGoals([...goals, newGoal]);

      // Feedback de sucesso
      toast.success('Meta financeira criada com sucesso!', {
        id: 'meta-process',
        description: `${formData.nome} - R$ ${valorAlvo.toFixed(2)}`
      });

      // Resetar formulário
      setFormData({
        nome: '',
        valorAlvo: '',
        valorAtual: '',
        dataInicio: new Date().toISOString().split('T')[0],
        dataAlvo: '',
        categoria: 'Poupança'
      });
      setShowForm(false);
    } catch (error) {
      toast.error('Erro ao criar meta financeira', { id: 'meta-process' });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleUpdateGoal = async (goalId: number, newValue: number) => {
    const goal = goals.find(g => g.id === goalId);
    if (!goal) return;

    if (newValue < 0 || newValue > goal.valorAlvo) {
      toast.error('Valor inválido para atualização');
      return;
    }

    setGoals(goals.map(g => 
      g.id === goalId ? { ...g, valorAtual: newValue } : g
    ));

    toast.success('Meta atualizada com sucesso!', {
      description: `Novo valor: R$ ${newValue.toFixed(2)}`
    });
  };

  const calculateProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const calculateDaysRemaining = (targetDate: string) => {
    const today = new Date();
    const target = new Date(targetDate);
    const diff = target.getTime() - today.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-neutral-900">Metas Financeiras</h2>
          <p className="text-neutral-600 mt-1">Defina e acompanhe suas metas de economia</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-neutral-800 text-white px-6 py-3 rounded-lg hover:bg-neutral-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Nova Meta
        </button>
      </div>

      {/* Add Goal Form */}
      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow border border-neutral-200">
          <h3 className="text-neutral-900 mb-4">Adicionar Nova Meta</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-neutral-700 mb-2">Nome da Meta</label>
                <input
                  type="text"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
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
                  <option value="Poupança">Poupança</option>
                  <option value="Lazer">Lazer</option>
                  <option value="Educação">Educação</option>
                  <option value="Investimento">Investimento</option>
                  <option value="Compra">Compra</option>
                </select>
              </div>
              <div>
                <label className="block text-neutral-700 mb-2">Valor Alvo (R$)</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.valorAlvo}
                  onChange={(e) => setFormData({ ...formData, valorAlvo: e.target.value })}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-500"
                  required
                />
              </div>
              <div>
                <label className="block text-neutral-700 mb-2">Valor Atual (R$)</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.valorAtual}
                  onChange={(e) => setFormData({ ...formData, valorAtual: e.target.value })}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-500"
                  required
                />
              </div>
              <div>
                <label className="block text-neutral-700 mb-2">Data de Início</label>
                <input
                  type="date"
                  value={formData.dataInicio}
                  onChange={(e) => setFormData({ ...formData, dataInicio: e.target.value })}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-500"
                  required
                />
              </div>
              <div>
                <label className="block text-neutral-700 mb-2">Data Alvo</label>
                <input
                  type="date"
                  value={formData.dataAlvo}
                  onChange={(e) => setFormData({ ...formData, dataAlvo: e.target.value })}
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
                  'Salvar Meta'
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

      {/* Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {goals.map((goal) => {
          const progress = calculateProgress(goal.valorAtual, goal.valorAlvo);
          const daysRemaining = calculateDaysRemaining(goal.dataAlvo);
          const valorRestante = goal.valorAlvo - goal.valorAtual;

          return (
            <div key={goal.id} className="bg-white p-6 rounded-lg shadow border border-neutral-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center">
                    <Target className="w-6 h-6 text-neutral-700" />
                  </div>
                  <div>
                    <h3 className="text-neutral-900">{goal.nome}</h3>
                    <p className="text-neutral-500">{goal.categoria}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleUpdateGoal(goal.id, goal.valorAtual)}
                  className="bg-neutral-200 text-neutral-700 px-3 py-2 rounded-lg hover:bg-neutral-300 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </button>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-neutral-700">Progresso</span>
                  <span className="text-neutral-900">{progress.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-neutral-200 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-neutral-700 h-full rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Values */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-neutral-600">Valor Atual</span>
                  <span className="text-neutral-900">R$ {goal.valorAtual.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-600">Valor Alvo</span>
                  <span className="text-neutral-900">R$ {goal.valorAlvo.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-600">Faltam</span>
                  <span className="text-neutral-900">R$ {valorRestante.toFixed(2)}</span>
                </div>
              </div>

              {/* Footer */}
              <div className="pt-4 border-t border-neutral-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-neutral-600">
                    <Calendar className="w-4 h-4" />
                    <span>{daysRemaining} dias restantes</span>
                  </div>
                  <button
                    onClick={() => setSelectedGoal(goal)}
                    className="flex items-center gap-1 text-neutral-700 hover:text-neutral-900 bg-neutral-100 hover:bg-neutral-200 px-3 py-1 rounded-lg transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    Atualizar
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Update Modal */}
      {selectedGoal && (
        <GoalUpdateModal
          goal={selectedGoal}
          onClose={() => setSelectedGoal(null)}
          onUpdate={handleUpdateGoal}
        />
      )}

      {/* Summary */}
      <div className="bg-white p-6 rounded-lg shadow border border-neutral-200">
        <h3 className="text-neutral-900 mb-4">Resumo das Metas</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-neutral-50 rounded-lg">
            <p className="text-neutral-600 mb-2">Total em Metas</p>
            <p className="text-neutral-900">
              R$ {goals.reduce((acc, goal) => acc + goal.valorAlvo, 0).toFixed(2)}
            </p>
          </div>
          <div className="p-4 bg-neutral-50 rounded-lg">
            <p className="text-neutral-600 mb-2">Valor Acumulado</p>
            <p className="text-neutral-900">
              R$ {goals.reduce((acc, goal) => acc + goal.valorAtual, 0).toFixed(2)}
            </p>
          </div>
          <div className="p-4 bg-neutral-800 text-white rounded-lg">
            <p className="text-neutral-300 mb-2">Progresso Geral</p>
            <p className="text-white">
              {(
                (goals.reduce((acc, goal) => acc + goal.valorAtual, 0) /
                  goals.reduce((acc, goal) => acc + goal.valorAlvo, 0)) *
                100
              ).toFixed(1)}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}