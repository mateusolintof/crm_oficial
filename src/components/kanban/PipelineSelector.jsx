import React from 'react';

const PipelineSelector = ({ pipelines, currentPipeline, onSelect }) => {
    return (
        <div className="flex bg-gray-100 p-1 rounded-lg mb-6 w-fit">
            {pipelines.map((pipeline) => (
                <button
                    key={pipeline.id}
                    onClick={() => onSelect(pipeline.id)}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${currentPipeline === pipeline.id
                        ? 'bg-primary text-white shadow-md'
                        : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                        }`}
                >
                    {pipeline.name}
                </button>
            ))}
        </div>
    );
};

export default PipelineSelector;
