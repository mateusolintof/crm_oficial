import { create } from 'zustand';

const initialPipelines = [
    { id: 'sales', name: 'Vendas' },
    { id: 'support', name: 'Atendimento' },
    { id: 'onboarding', name: 'Onboarding' },
];

const initialColumns = {
    sales: [
        { id: 'new', title: 'Novos Leads', color: 'bg-blue-500' },
        { id: 'qualified', title: 'Qualificados IA', color: 'bg-emerald-500' },
        { id: 'negotiation', title: 'Em Negociação', color: 'bg-amber-500' },
        { id: 'contract', title: 'Contrato', color: 'bg-indigo-500' },
        { id: 'closed', title: 'Fechados', color: 'bg-purple-500' },
    ],
    support: [
        { id: 'ticket_open', title: 'Aberto', color: 'bg-red-500' },
        { id: 'ticket_progress', title: 'Em Andamento', color: 'bg-yellow-500' },
        { id: 'ticket_resolved', title: 'Resolvido', color: 'bg-green-500' },
    ],
    onboarding: [
        { id: 'kickoff', title: 'Kickoff', color: 'bg-blue-500' },
        { id: 'setup', title: 'Configuração', color: 'bg-purple-500' },
        { id: 'training', title: 'Treinamento', color: 'bg-amber-500' },
        { id: 'live', title: 'Go Live', color: 'bg-green-500' },
    ]
};

const initialLeads = [
    { id: '1', company: 'Tech Solutions Ltd', contact: 'João Silva', value: 'R$ 15.000', date: '12 Out', tags: ['Novo', 'Enterprise'], pipeline: 'sales', status: 'new' },
    { id: '2', company: 'Marketing Digital Pro', contact: 'Ana Santos', value: 'R$ 8.500', date: '11 Out', tags: ['Quente'], pipeline: 'sales', status: 'qualified' },
    { id: '3', company: 'Consultoria ABC', contact: 'Carlos Oliveira', value: 'R$ 22.000', date: '10 Out', tags: ['Contrato'], pipeline: 'sales', status: 'negotiation' },
    { id: '4', company: 'E-commerce X', contact: 'Mariana Costa', value: 'R$ 12.000', date: '09 Out', tags: ['Qualificado IA'], pipeline: 'sales', status: 'qualified' },
    { id: '5', company: 'Startup Y', contact: 'Pedro Souza', value: 'R$ 50.000', date: '08 Out', tags: ['Enterprise'], pipeline: 'sales', status: 'contract' },
];

export const useCRMStore = create((set) => ({
    pipelines: initialPipelines,
    columns: initialColumns,
    leads: initialLeads,
    currentPipeline: 'sales',

    setPipeline: (pipelineId) => set({ currentPipeline: pipelineId }),

    addLead: (lead) => set((state) => ({ leads: [...state.leads, lead] })),

    updateLeadStatus: (leadId, newStatus) => set((state) => ({
        leads: state.leads.map((lead) =>
            lead.id === leadId ? { ...lead, status: newStatus } : lead
        ),
    })),

    moveLead: (leadId, newStatus) => set((state) => ({
        leads: state.leads.map((lead) =>
            lead.id === leadId ? { ...lead, status: newStatus } : lead
        ),
    })),
}));
