import React, { useState } from 'react';
import { Search, Filter, MoreVertical, Mail, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

const mockLeads = [
    {
        id: 1,
        name: 'João Silva',
        company: 'Tech Solutions',
        email: 'joao@techsolutions.com',
        phone: '+55 11 98765-4321',
        value: 'R$ 5.000',
        stage: 'Qualificado',
        source: 'Instagram',
        created: '20 Nov 2025',
        tags: ['Quente', 'Prioridade'],
    },
    {
        id: 2,
        name: 'Maria Costa',
        company: 'Marketing Pro',
        email: 'maria@marketingpro.com',
        phone: '+55 21 91234-5678',
        value: 'R$ 12.000',
        stage: 'Negociação',
        source: 'Google Ads',
        created: '18 Nov 2025',
        tags: ['Qualificado IA'],
    },
    {
        id: 3,
        name: 'Pedro Santos',
        company: 'Design Studio',
        email: 'pedro@designstudio.com',
        phone: '+55 11 99876-5432',
        value: 'R$ 3.500',
        stage: 'Novo',
        source: 'Indicação',
        created: '15 Nov 2025',
        tags: ['Novo'],
    },
    {
        id: 4,
        name: 'Ana Souza',
        company: 'Retail Corp',
        email: 'ana@retailcorp.com',
        phone: '+55 31 98765-1234',
        value: 'R$ 25.000',
        stage: 'Fechado',
        source: 'LinkedIn',
        created: '10 Nov 2025',
        tags: ['VIP', 'Fechado'],
    },
    {
        id: 5,
        name: 'Carlos Lima',
        company: 'E-commerce Plus',
        email: 'carlos@ecommerceplus.com',
        phone: '+55 11 91111-2222',
        value: 'R$ 8.000',
        stage: 'Follow Up',
        source: 'Facebook',
        created: '12 Nov 2025',
        tags: ['Follow Up'],
    },
];

const getStageColor = (stage) => {
    switch (stage) {
        case 'Novo': return 'bg-blue-100 text-blue-700';
        case 'Qualificado': return 'bg-emerald-100 text-emerald-700';
        case 'Negociação': return 'bg-amber-100 text-amber-700';
        case 'Fechado': return 'bg-indigo-100 text-indigo-700';
        case 'Follow Up': return 'bg-purple-100 text-purple-700';
        default: return 'bg-gray-100 text-gray-700';
    }
};

const LeadList = () => {
    const [leads, setLeads] = useState(mockLeads);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredLeads = leads.filter((lead) =>
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.company.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Gestão de Leads</h1>
                    <p className="text-gray-500 mt-1">Visualize e gerencie todos os seus leads</p>
                </div>
                <button className="btn btn-primary">+ Novo Lead</button>
            </div>

            {/* Search & Filters */}
            <div className="card p-4">
                <div className="flex gap-3">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Buscar por nome ou empresa..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                        />
                    </div>
                    <button className="btn btn-ghost gap-2">
                        <Filter size={18} />
                        Filtros
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                                    Lead
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                                    Contato
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                                    Valor
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                                    Estágio
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                                    Origem
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                                    Criado
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-bold text-gray-600 uppercase tracking-wider">
                                    Ações
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredLeads.map((lead, index) => (
                                <motion.tr
                                    key={lead.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center text-white font-bold text-sm">
                                                {lead.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div>
                                                <div className="font-bold text-gray-900 text-sm">{lead.name}</div>
                                                <div className="text-xs text-gray-500">{lead.company}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2 text-xs text-gray-600">
                                                <Mail size={12} className="text-gray-400" />
                                                {lead.email}
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-gray-600">
                                                <Phone size={12} className="text-gray-400" />
                                                {lead.phone}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="font-bold text-gray-900 text-sm">{lead.value}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStageColor(lead.stage)}`}>
                                            {lead.stage}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                        {lead.source}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {lead.created}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <button className="text-gray-400 hover:text-gray-600">
                                            <MoreVertical size={18} />
                                        </button>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredLeads.length === 0 && (
                    <div className="text-center py-12 text-gray-400">
                        <p>Nenhum lead encontrado</p>
                    </div>
                )}
            </div>

            {/* Stats Footer */}
            <div className="grid grid-cols-4 gap-4">
                <div className="card text-center">
                    <p className="text-2xl font-bold text-gray-900">{leads.length}</p>
                    <p className="text-sm text-gray-500 mt-1">Total de Leads</p>
                </div>
                <div className="card text-center">
                    <p className="text-2xl font-bold text-emerald-600">
                        {leads.filter(l => l.stage === 'Qualificado').length}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">Qualificados</p>
                </div>
                <div className="card text-center">
                    <p className="text-2xl font-bold text-amber-600">
                        {leads.filter(l => l.stage === 'Negociação').length}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">Em Negociação</p>
                </div>
                <div className="card text-center">
                    <p className="text-2xl font-bold text-indigo-600">
                        {leads.filter(l => l.stage === 'Fechado').length}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">Fechados</p>
                </div>
            </div>
        </div>
    );
};

export default LeadList;
