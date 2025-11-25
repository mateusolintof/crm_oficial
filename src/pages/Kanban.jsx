import React, { useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import Board from '../components/kanban/Board';
import PipelineSelector from '../components/kanban/PipelineSelector';
import { Plus } from 'lucide-react';
import { useCRMStore } from '../store/useCRMStore';
import { useUIStore } from '../store/useUIStore';
import { Button } from '../components/ui/Button';

const Kanban = () => {
    const { pipelines, currentPipeline, setPipeline, leads, columns } = useCRMStore();
    const { openModal } = useUIStore();
    const { pipelineId } = useParams();
    const navigate = useNavigate();
    const currency = useMemo(() => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }), []);

    useEffect(() => {
        if (!pipelines.length) return;

        const exists = pipelines.some((p) => p.id === pipelineId);
        const fallback = pipelines[0]?.id;

        if (exists) {
            setPipeline(pipelineId);
        } else if (fallback) {
            setPipeline(fallback);
            navigate(`/pipelines/${fallback}`, { replace: true });
        }
    }, [pipelineId, pipelines, setPipeline, navigate]);

    const activePipeline = useMemo(
        () => pipelines.find((p) => p.id === currentPipeline),
        [pipelines, currentPipeline]
    );

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

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="h-full flex flex-col"
        >
            <div className="flex items-center justify-between mb-4">
                <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">CRM</p>
                    <h1 className="text-2xl font-bold text-ink">{activePipeline?.name}</h1>
                    <p className="text-slate-600 mt-1">Controle avançado de etapas e movimentos do pipeline</p>
                </div>
                <Button onClick={() => openModal('create-lead')} className="gap-2 rounded-xl shadow-sm">
                    <Plus size={20} />
                    Novo Lead
                </Button>
            </div>

            <PipelineSelector
                pipelines={pipelines}
                currentPipeline={currentPipeline}
                pipelineStats={pipelineStats}
                formatCurrency={currency.format}
                onSelect={(id) => navigate(`/pipelines/${id}`)}
            />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                <div className="card py-4 px-5 rounded-xl">
                    <p className="text-xs text-slate-500">Leads no pipeline</p>
                    <p className="text-2xl font-bold text-ink">{pipelineStats[currentPipeline]?.count || 0}</p>
                </div>
                <div className="card py-4 px-5 rounded-xl">
                    <p className="text-xs text-slate-500">Valor total</p>
                    <p className="text-2xl font-bold text-ink">{currency.format(pipelineStats[currentPipeline]?.totalValue || 0)}</p>
                </div>
                <div className="card py-4 px-5 rounded-xl">
                    <p className="text-xs text-slate-500">Etapas</p>
                    <p className="text-2xl font-bold text-ink">{(columns[currentPipeline] || []).length}</p>
                </div>
                <div className="card py-4 px-5 rounded-xl">
                    <p className="text-xs text-slate-500">Fechados</p>
                    <p className="text-2xl font-bold text-ink">{leads.filter(l => l.pipeline === currentPipeline && l.status === 'closed').length}</p>
                </div>
            </div>

            <div className="flex-1 overflow-hidden">
                <Board />
            </div>
        </motion.div>
    );
};

export default Kanban;
