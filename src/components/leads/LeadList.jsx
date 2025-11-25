import React, { useState } from 'react';
import { Search, Filter, MoreVertical, Mail, Phone, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCRMStore } from '../../store/useCRMStore';
import { useUIStore } from '../../store/useUIStore';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Badge } from '../ui/Badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/Avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/DropdownMenu';

const getStatusBadgeVariant = (status) => {
    switch (status) {
        case 'new': return 'info';
        case 'qualified': return 'success';
        case 'negotiation': return 'warning';
        case 'contract': return 'secondary';
        case 'closed': return 'default'; // purple
        default: return 'secondary';
    }
};

const getStatusLabel = (status) => {
    const labels = {
        new: 'Novo',
        qualified: 'Qualificado',
        negotiation: 'Negociação',
        contract: 'Contrato',
        closed: 'Fechado'
    };
    return labels[status] || status;
};

const LeadList = () => {
    const { leads } = useCRMStore();
    const { openModal } = useUIStore();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredLeads = leads.filter((lead) =>
        lead.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
                <Button onClick={() => openModal('create-lead')} className="gap-2">
                    <Plus size={18} />
                    Novo Lead
                </Button>
            </div>

            {/* Search & Filters */}
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex gap-3">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <Input
                            type="text"
                            placeholder="Buscar por nome ou empresa..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                    <Button variant="outline" className="gap-2">
                        <Filter size={18} />
                        Filtros
                    </Button>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Lead</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Contato</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Valor</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Estágio</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Tags</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Data</th>
                                <th className="px-6 py-3 text-right text-xs font-bold text-gray-600 uppercase tracking-wider">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
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
                                            <Avatar>
                                                <AvatarFallback className="bg-primary/10 text-primary">
                                                    {lead.contact.split(' ').map(n => n[0]).join('')}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <div className="font-bold text-gray-900 text-sm">{lead.contact}</div>
                                                <div className="text-xs text-gray-500">{lead.company}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2 text-xs text-gray-600">
                                                <Mail size={12} className="text-gray-400" />
                                                email@exemplo.com
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-gray-600">
                                                <Phone size={12} className="text-gray-400" />
                                                +55 11 99999-9999
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="font-bold text-gray-900 text-sm">{lead.value}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <Badge variant={getStatusBadgeVariant(lead.status)}>
                                            {getStatusLabel(lead.status)}
                                        </Badge>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex gap-1">
                                            {lead.tags?.map((tag, i) => (
                                                <span key={i} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] rounded-full border border-gray-200">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {lead.date}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    <MoreVertical size={16} className="text-gray-400" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem>Editar</DropdownMenuItem>
                                                <DropdownMenuItem>Mover</DropdownMenuItem>
                                                <DropdownMenuItem className="text-red-600">Excluir</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
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
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm text-center">
                    <p className="text-2xl font-bold text-gray-900">{leads.length}</p>
                    <p className="text-sm text-gray-500 mt-1">Total de Leads</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm text-center">
                    <p className="text-2xl font-bold text-emerald-600">
                        {leads.filter(l => l.status === 'qualified').length}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">Qualificados</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm text-center">
                    <p className="text-2xl font-bold text-amber-600">
                        {leads.filter(l => l.status === 'negotiation').length}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">Em Negociação</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm text-center">
                    <p className="text-2xl font-bold text-indigo-600">
                        {leads.filter(l => l.status === 'closed').length}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">Fechados</p>
                </div>
            </div>
        </div>
    );
};

export default LeadList;
