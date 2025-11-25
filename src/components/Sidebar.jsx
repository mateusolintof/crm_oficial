import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, MessageSquare, KanbanSquare, Users, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar = () => {
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: MessageSquare, label: 'Inbox', path: '/inbox' },
    { icon: KanbanSquare, label: 'CRM', path: '/kanban' },
    { icon: Users, label: 'Leads', path: '/leads' },
  ];

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col sticky top-0"
    >
      <div className="p-6 border-b border-gray-100">
        <h1 className="text-2xl font-bold text-sky-600 tracking-tight">ALMA</h1>
        <p className="text-xs text-gray-400 uppercase tracking-wider mt-1">Agency CRM</p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                ? 'bg-primary text-white'
                : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`
            }
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <button className="flex items-center gap-3 px-4 py-3 w-full text-gray-500 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors">
          <Settings size={20} />
          <span>Configurações</span>
        </button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
