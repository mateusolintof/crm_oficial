import React, { useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, MessageSquare, Users, Settings, SplitSquareVertical } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCRMStore } from '../store/useCRMStore';

const Sidebar = () => {
  const { pipelines, leads } = useCRMStore();
  const currency = useMemo(() => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }), []);

  const pipelineStats = useMemo(() => {
    const stats = {};
    pipelines.forEach((p) => { stats[p.id] = { count: 0, totalValue: 0 }; });
    leads.forEach((lead) => {
      const numeric = Number(String(lead.value).replace(/\D/g, '')) || 0;
      if (stats[lead.pipeline]) {
        stats[lead.pipeline].count += 1;
        stats[lead.pipeline].totalValue += numeric;
      }
    });
    return stats;
  }, [pipelines, leads]);

  const coreNav = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: MessageSquare, label: 'Inbox', path: '/inbox' },
    { icon: Users, label: 'Leads', path: '/leads' },
  ];

  const baseLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2.5 rounded-xl transition-colors text-sm font-medium border border-transparent ${
      isActive
        ? 'bg-primary-soft text-primary border-primary/30 shadow-sm'
        : 'text-slate-600 hover:bg-slate-100 hover:text-ink'
    }`;

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-[260px] bg-surface/90 border-r border-border h-screen flex flex-col sticky top-0 backdrop-blur"
    >
      <div className="p-6 border-b border-border flex items-center justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.24em] text-slate-500">ALMA</p>
          <h1 className="text-xl font-semibold text-ink">CRM Studio</h1>
        </div>
        <div className="h-10 w-10 rounded-xl bg-primary text-white flex items-center justify-center font-semibold text-lg shadow-sm">
          A
        </div>
      </div>

      <div className="flex-1 p-4 space-y-6 overflow-y-auto">
        <nav className="space-y-1">
          <p className="text-[11px] uppercase tracking-wide text-slate-500 px-2">Visão geral</p>
          {coreNav.map((item) => (
            <NavLink key={item.path} to={item.path} className={baseLinkClass} end={item.path === '/'}>
              <item.icon size={18} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <nav className="space-y-2">
          <div className="flex items-center justify-between px-2">
            <p className="text-[11px] uppercase tracking-wide text-slate-500">Pipelines</p>
            <span className="text-[11px] text-slate-500">{pipelines.length}</span>
          </div>
          {pipelines.map((pipeline) => (
            <NavLink
              key={pipeline.id}
              to={`/pipelines/${pipeline.id}`}
              className={baseLinkClass}
            >
              <SplitSquareVertical size={18} />
              <div className="flex flex-col flex-1 min-w-0">
                <span className="truncate">{pipeline.name}</span>
                <span className="text-[11px] text-slate-500 font-normal">Pipeline</span>
              </div>
              <div className="text-right text-[11px] text-slate-500 font-medium">
                <div>{pipelineStats[pipeline.id]?.count || 0} deals</div>
                <div className="text-slate-700">{currency.format(pipelineStats[pipeline.id]?.totalValue || 0)}</div>
              </div>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-border bg-surface">
        <button
          type="button"
          className="flex items-center gap-3 px-4 py-3 w-full text-slate-600 hover:bg-slate-100 hover:text-ink rounded-xl transition-colors"
        >
          <Settings size={18} />
          <span className="text-sm font-medium">Configurações</span>
        </button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
