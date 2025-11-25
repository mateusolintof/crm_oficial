import React from 'react';
import { DollarSign, Users, TrendingUp, CheckCircle } from 'lucide-react';

const StatsCards = () => {
    const stats = [
        {
            label: 'Vendas Totais',
            value: 'R$ 124.500',
            trend: '+12% vs mês anterior',
            trendUp: true,
            icon: DollarSign,
            color: 'text-sky-600',
            bg: 'bg-sky-100',
        },
        {
            label: 'Leads Qualificados',
            value: '48',
            trend: '+5% vs mês anterior',
            trendUp: true,
            icon: Users,
            color: 'text-emerald-600',
            bg: 'bg-emerald-100',
        },
        {
            label: 'Taxa de Conversão',
            value: '18.2%',
            trend: '-2% vs mês anterior',
            trendUp: false,
            icon: TrendingUp,
            color: 'text-amber-600',
            bg: 'bg-amber-100',
        },
        {
            label: 'Deals Fechados',
            value: '12',
            trend: '+3 vs mês anterior',
            trendUp: true,
            icon: CheckCircle,
            color: 'text-indigo-600',
            bg: 'bg-indigo-100',
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
                <div key={index} className="card flex flex-col justify-between hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <p className="text-sm font-medium text-secondary">{stat.label}</p>
                            <h3 className="text-2xl font-bold text-primary mt-1">{stat.value}</h3>
                        </div>
                        <div className={`p-3 rounded-lg ${stat.bg} ${stat.color}`}>
                            <stat.icon size={20} />
                        </div>
                    </div>
                    <div className={`text-xs font-medium ${stat.trendUp ? 'text-success' : 'text-danger'}`}>
                        {stat.trend}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default StatsCards;
