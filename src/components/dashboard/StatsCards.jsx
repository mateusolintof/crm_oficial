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
            tone: 'primary',
        },
        {
            label: 'Leads Qualificados',
            value: '48',
            trend: '+5% vs mês anterior',
            trendUp: true,
            icon: Users,
            tone: 'neutral',
        },
        {
            label: 'Taxa de Conversão',
            value: '18.2%',
            trend: '-2% vs mês anterior',
            trendUp: false,
            icon: TrendingUp,
            tone: 'warning',
        },
        {
            label: 'Deals Fechados',
            value: '12',
            trend: '+3 vs mês anterior',
            trendUp: true,
            icon: CheckCircle,
            tone: 'success',
        },
    ];

    const toneStyles = {
        primary: 'bg-primary-soft text-primary',
        success: 'bg-emerald-50 text-emerald-700',
        warning: 'bg-amber-50 text-amber-700',
        neutral: 'bg-slate-100 text-slate-700',
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
                <div key={index} className="card flex flex-col justify-between hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <p className="text-sm font-medium text-slate-600">{stat.label}</p>
                            <h3 className="text-2xl font-bold text-ink mt-1">{stat.value}</h3>
                        </div>
                        <div className={`p-3 rounded-xl ${toneStyles[stat.tone]}`}>
                            <stat.icon size={20} />
                        </div>
                    </div>
                    <div className={`text-xs font-semibold ${stat.trendUp ? 'text-emerald-600' : 'text-danger'}`}>
                        {stat.trend}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default StatsCards;
