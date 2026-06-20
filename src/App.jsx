import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  TrendingUp, 
  Calendar, 
  FileText, 
  Film, 
  ShieldCheck, 
  BarChart, 
  Sparkles,
  Flame
} from 'lucide-react';

import Dashboard from './components/Dashboard';
import BusinessKnowledge from './components/BusinessKnowledge';
import TrendResearch from './components/TrendResearch';
import ContentStrategy from './components/ContentStrategy';
import ScriptWriter from './components/ScriptWriter';
import ReelProduction from './components/ReelProduction';
import BrandQuality from './components/BrandQuality';
import PerformanceAnalyst from './components/PerformanceAnalyst';
import DailyLoop from './components/DailyLoop';

import { initialProducts, initialCalendar } from './components/mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState(initialProducts);
  const [calendar, setCalendar] = useState(initialCalendar);

  const menuItems = [
    { id: 'dashboard', name: 'CEO Command Center', icon: LayoutDashboard },
    { id: 'daily-loop', name: 'Execute Daily Loop', icon: Sparkles, highlight: true },
    { id: 'business-knowledge', name: 'Business Knowledge', icon: BookOpen },
    { id: 'trend-research', name: 'Trend Research', icon: TrendingUp },
    { id: 'content-strategy', name: 'Content Strategy', icon: Calendar },
    { id: 'script-writer', name: 'Script Writer', icon: FileText },
    { id: 'reel-production', name: 'Reel Production', icon: Film },
    { id: 'brand-quality', name: 'Brand Quality', icon: ShieldCheck },
    { id: 'performance-analyst', name: 'Performance Analyst', icon: BarChart },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard 
            products={products} 
            calendar={calendar} 
            setCalendar={setCalendar} 
            setActiveTab={setActiveTab}
          />
        );
      case 'daily-loop':
        return (
          <DailyLoop 
            products={products} 
            calendar={calendar} 
            setCalendar={setCalendar}
          />
        );
      case 'business-knowledge':
        return (
          <BusinessKnowledge 
            products={products} 
            setProducts={setProducts}
          />
        );
      case 'trend-research':
        return <TrendResearch />;
      case 'content-strategy':
        return (
          <ContentStrategy 
            calendar={calendar} 
            setCalendar={setCalendar} 
            products={products}
          />
        );
      case 'script-writer':
        return <ScriptWriter products={products} />;
      case 'reel-production':
        return <ReelProduction />;
      case 'brand-quality':
        return <BrandQuality />;
      case 'performance-analyst':
        return <PerformanceAnalyst />;
      default:
        return <Dashboard products={products} calendar={calendar} setCalendar={setCalendar} setActiveTab={setActiveTab} />;
    }
  };

  const getHeaderTitle = () => {
    const item = menuItems.find(m => m.id === activeTab);
    return item ? item.name : 'Console';
  };

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <aside className="app-sidebar">
        <div className="sidebar-header">
          <div className="brand-icon">A</div>
          <div className="brand-info">
            <h2>Asmita Gruh</h2>
            <span>AI Marketing Agency</span>
          </div>
        </div>

        <nav className="sidebar-menu">
          {menuItems.map(item => {
            const Icon = item.icon;
            const isHighlight = item.highlight;
            return (
              <div 
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`menu-item ${activeTab === item.id ? 'active' : ''}`}
                style={isHighlight && activeTab !== item.id ? {
                  border: '1px dashed var(--border-saffron)',
                  background: 'rgba(242,101,34,0.03)',
                  color: 'var(--text-primary)'
                } : {}}
              >
                <Icon 
                  size={18} 
                  color={activeTab === item.id ? 'var(--primary)' : isHighlight ? 'var(--saffron)' : 'var(--text-secondary)'} 
                />
                <span>{item.name}</span>
              </div>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <p>© 2026 Asmita Gruh Udhyog</p>
          <p style={{ fontSize: '0.7rem', marginTop: '4px', color: 'var(--primary)' }}>25+ Years of Trust</p>
        </div>
      </aside>

      {/* Main Panel Content */}
      <main className="main-content">
        <header className="dashboard-header">
          <div>
            <h1 className="divine-title text-3xl font-bold flex items-center gap-2">
              {getHeaderTitle()}
            </h1>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              Asmita Gruh Udhyog AI Marketing Operations Center
            </p>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '0.75rem', padding: '4px 10px', borderRadius: '20px', background: 'rgba(212,175,55,0.08)', border: '1px solid var(--border-gold)', color: 'var(--primary)' }} className="flex items-center gap-1">
              <Flame size={12} color="var(--primary)" />
              Agency Mode: Active
            </span>
          </div>
        </header>

        {/* Tab body rendering */}
        <section className="flex flex-col gap-6">
          {renderContent()}
        </section>
      </main>
    </div>
  );
}
