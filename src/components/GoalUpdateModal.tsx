import { useState } from 'react';
import { X, DollarSign } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface GoalUpdateModalProps {
  goal: {
    id: number;
    nome: string;
    valorAlvo: number;
    valorAtual: number;
  };
  onClose: () => void;
  onUpdate: (goalId: number, newValue: number) => void;
}

export function GoalUpdateModal({ goal, onClose, onUpdate }: GoalUpdateModalProps) {
  const [novoValor, setNovoValor] = useState(goal.valorAtual.toString());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const valor = parseFloat(novoValor);
    
    if (isNaN(valor) || valor < 0) {
      toast.error('Valor inválido');
      return;
    }

    if (valor > goal.valorAlvo) {
      toast.error('O valor não pode ser maior que o valor alvo');
      return;
    }

    onUpdate(goal.id, valor);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-neutral-900">Atualizar Meta</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-neutral-600" />
          </button>
        </div>

        <div className="mb-6">
          <p className="text-neutral-700">{goal.nome}</p>
          <p className="text-neutral-500 mt-1">
            Valor Alvo: R$ {goal.valorAlvo.toFixed(2)}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-neutral-700 mb-2">Novo Valor Atual (R$)</label>
            <div className="relative">
              <DollarSign className="w-5 h-5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="number"
                step="0.01"
                value={novoValor}
                onChange={(e) => setNovoValor(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-500"
                autoFocus
              />
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-neutral-800 text-white py-2 rounded-lg hover:bg-neutral-700 transition-colors"
            >
              Atualizar
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-neutral-200 text-neutral-700 py-2 rounded-lg hover:bg-neutral-300 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
