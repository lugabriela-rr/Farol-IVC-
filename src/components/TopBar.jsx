import React from 'react';
import { BookOpen, Library, Map, Moon, Sun, TowerControl } from 'lucide-react';

const tabs = [
  { id: 'analise', label: 'Análise Geral', icon: TowerControl },
  { id: 'construtor', label: 'Construtor de Mapas', icon: Map },
  { id: 'atlas', label: 'Atlas Digital', icon: Library },
  { id: 'metodologia', label: 'Metodologia', icon: BookOpen }
];

const TopBar = ({ activeTab, onTabChange, isDarkMode, onToggleTheme }) => (
  <header className="topbar">
    <div className="topbar-brand">
      <img src="/assets/logo_sem_fundo_ivc.png" alt="Farol IVC" />
      <span>FAROL IVC</span>
    </div>

    <nav className="topbar-tabs" aria-label="Seções do geoportal">
      {tabs.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          className={`topbar-tab ${activeTab === id ? 'active' : ''}`}
          onClick={() => onTabChange(id)}
          aria-current={activeTab === id ? 'page' : undefined}
          title={label}
        >
          <Icon size={16} strokeWidth={1.8} />
          <span>{label}</span>
        </button>
      ))}
    </nav>

    <button
      className="theme-toggle"
      onClick={onToggleTheme}
      aria-label={isDarkMode ? 'Ativar tema claro' : 'Ativar tema escuro'}
      title={isDarkMode ? 'Tema claro' : 'Tema escuro'}
    >
      {isDarkMode ? <Sun size={17} strokeWidth={1.8} /> : <Moon size={17} strokeWidth={1.8} />}
    </button>
  </header>
);

export default TopBar;
