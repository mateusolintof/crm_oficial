import React from 'react';
import { motion } from 'framer-motion';
import StatsCards from '../components/dashboard/StatsCards';
import RevenueChart from '../components/dashboard/RevenueChart';
import RecentActivity from '../components/dashboard/RecentActivity';

const Dashboard = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="flex items-center justify-between mb-8">
                <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Inteligência</p>
                    <h1 className="text-2xl font-bold text-ink">Dashboard</h1>
                    <p className="text-slate-600 mt-1">Visão executiva da performance comercial e atendimento</p>
                </div>
                <div className="flex gap-3">
                    <select className="bg-white border border-border text-ink text-sm rounded-xl focus:ring-primary focus:border-primary block w-full px-3 py-2 shadow-sm">
                        <option>Últimos 30 dias</option>
                        <option>Este Mês</option>
                        <option>Últimos 3 Meses</option>
                    </select>
                    <button className="btn btn-primary rounded-xl shadow-sm">Exportar Relatório</button>
                </div>
            </div>

            <StatsCards />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <RevenueChart />
                </div>
                <div>
                    <RecentActivity />
                </div>
            </div>
        </motion.div>
    );
};

export default Dashboard;
