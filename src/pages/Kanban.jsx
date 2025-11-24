import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Board from '../components/kanban/Board';
import PipelineSelector from '../components/kanban/PipelineSelector';
import { Plus } from 'lucide-react';

const pipelines = [
    { id: 'sales', name: 'Vendas' },
    { id: 'support', name: 'Atendimento' },
    { id: 'onboarding', name: 'Onboarding' },
];

const Kanban = () => {
    const [currentPipeline, setCurrentPipeline] = useState('sales');

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
                <button className="btn btn-primary gap-2">
                    <Plus size={20} />
                    Novo Lead
                </button>
            </div>

            <PipelineSelector
                pipelines={pipelines}
                currentPipeline={currentPipeline}
                onSelect={setCurrentPipeline}
            />

            <div className="flex-1 overflow-hidden">
                <Board />
            </div>
        </motion.div>
    );
};

export default Kanban;
