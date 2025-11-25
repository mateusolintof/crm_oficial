import React from 'react';
import { motion } from 'framer-motion';
import Board from '../components/kanban/Board';
import PipelineSelector from '../components/kanban/PipelineSelector';
import { Plus } from 'lucide-react';
import { useCRMStore } from '../store/useCRMStore';
import { useUIStore } from '../store/useUIStore';
import { Button } from '../components/ui/Button';

const Kanban = () => {
    const { pipelines, currentPipeline, setPipeline } = useCRMStore();
    const { openModal } = useUIStore();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="h-full flex flex-col"
        >
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Pipeline de Vendas</h1>
                    <p className="text-gray-500 mt-1">Gerencie seus leads e oportunidades</p>
                </div>
                <Button onClick={() => openModal('create-lead')} className="gap-2">
                    <Plus size={20} />
                    Novo Lead
                </Button>
            </div>

            <PipelineSelector
                pipelines={pipelines}
                currentPipeline={currentPipeline}
                onSelect={setPipeline}
            />

            <div className="flex-1 overflow-hidden">
                <Board />
            </div>
        </motion.div>
    );
};

export default Kanban;
