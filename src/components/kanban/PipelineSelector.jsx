import React from 'react';

const PipelineSelector = ({ pipelines, currentPipeline, onSelect, pipelineStats, formatCurrency }) => {
    return (
        <div className="flex bg-slate-100 p-1 rounded-lg mb-4 w-fit border border-border shadow-sm">
            {pipelines.map((pipeline) => {
                const isActive = currentPipeline === pipeline.id;
                const stats = pipelineStats?.[pipeline.id];
                return (
                    <button
                        key={pipeline.id}
                        onClick={() => onSelect(pipeline.id)}
                        className={`px-3.5 py-2 text-sm font-medium rounded-md transition-all ${
                            isActive
                                ? 'bg-primary text-white shadow-sm'
                                : 'text-slate-600 hover:bg-white'
                        }`}
                    >
                        <div className="flex flex-col items-start">
                            <span>{pipeline.name}</span>
                            {stats && (
                                <span className={`text-[11px] ${isActive ? 'text-primary-soft/90' : 'text-slate-500'}`}>
                                    {stats.count} deals · {formatCurrency ? formatCurrency(stats.totalValue) : stats.totalValue}
                                </span>
                            )}
                        </div>
                    </button>
                );
            })}
        </div>
    );
};

export default PipelineSelector;
