import { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { TransactionList } from './components/TransactionList';
import { Reports } from './components/Reports';
import { Goals } from './components/Goals';
import { LayoutDashboard, List, BarChart3, Target } from 'lucide-react';
import { Toaster } from 'sonner@2.0.3';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-neutral-50">
      <Toaster position="top-right" richColors />
      
      {/* Header */}
      <header className="bg-neutral-800 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-white">Sistema de Gestão de Finanças Pessoais</h1>
          <p className="text-neutral-300 mt-1">Controle suas receitas, despesas e metas financeiras</p>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-neutral-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-2 px-6 py-4 transition-colors ${
                activeTab === 'dashboard'
                  ? 'text-neutral-900 border-b-2 border-neutral-900'
                  : 'text-neutral-500 hover:text-neutral-700'
              }`}
            >
              <LayoutDashboard className="w-5 h-5" />
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('transactions')}
              className={`flex items-center gap-2 px-6 py-4 transition-colors ${
                activeTab === 'transactions'
                  ? 'text-neutral-900 border-b-2 border-neutral-900'
                  : 'text-neutral-500 hover:text-neutral-700'
              }`}
            >
              <List className="w-5 h-5" />
              Transações
            </button>
            <button
              onClick={() => setActiveTab('reports')}
              className={`flex items-center gap-2 px-6 py-4 transition-colors ${
                activeTab === 'reports'
                  ? 'text-neutral-900 border-b-2 border-neutral-900'
                  : 'text-neutral-500 hover:text-neutral-700'
              }`}
            >
              <BarChart3 className="w-5 h-5" />
              Relatórios
            </button>
            <button
              onClick={() => setActiveTab('goals')}
              className={`flex items-center gap-2 px-6 py-4 transition-colors ${
                activeTab === 'goals'
                  ? 'text-neutral-900 border-b-2 border-neutral-900'
                  : 'text-neutral-500 hover:text-neutral-700'
              }`}
            >
              <Target className="w-5 h-5" />
              Metas
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'transactions' && <TransactionList />}
        {activeTab === 'reports' && <Reports />}
        {activeTab === 'goals' && <Goals />}
      </main>

      {/* Footer */}
      <footer className="bg-neutral-800 text-neutral-300 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center">© 2025 Sistema de Gestão de Finanças Pessoais</p>
        </div>
      </footer>
    </div>
  );
}