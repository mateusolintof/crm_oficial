import React from 'react';
import { UserPlus, CheckCircle, MessageSquare } from 'lucide-react';

const RecentActivity = () => {
    const activities = [
        {
            id: 1,
            user: 'Ana Silva',
            action: 'Novo lead cadastrado',
            time: '2 min atrás',
            icon: UserPlus,
            color: 'bg-blue-100 text-blue-600',
        },
        {
            id: 2,
            user: 'Carlos Souza',
            action: 'Fechou contrato com TechCorp',
            time: '1 hora atrás',
            icon: CheckCircle,
            color: 'bg-emerald-100 text-emerald-600',
        },
        {
            id: 3,
            user: 'Beatriz Costa',
            action: 'Respondeu via WhatsApp',
            time: '3 horas atrás',
            icon: MessageSquare,
            color: 'bg-green-100 text-green-600',
        },
        {
            id: 4,
            user: 'Sistema',
            action: 'Atualização automática de status',
            time: '5 horas atrás',
            icon: CheckCircle,
            color: 'bg-gray-100 text-gray-600',
        },
    ];

    return (
        <div className="card h-96 overflow-hidden flex flex-col">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Atividade Recente</h3>
            <div className="flex-1 overflow-y-auto pr-2">
                <div className="space-y-6">
                    {activities.map((activity) => (
                        <div key={activity.id} className="flex gap-4">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${activity.color}`}>
                                <activity.icon size={18} />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900">
                                    <span className="font-bold">{activity.user}</span> {activity.action}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RecentActivity;
