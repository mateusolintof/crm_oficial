import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import LeadCard from './LeadCard';

const Column = ({ id, title, leads, count }) => {
    const { setNodeRef } = useDroppable({ id });

    return (
        <div className="flex flex-col w-80 shrink-0">
            <div className="flex items-center justify-between mb-4 px-1">
                <div className="flex items-center gap-2">
                    <h3 className="font-bold text-gray-700 text-sm">{title}</h3>
                    <span className="bg-gray-200 text-gray-600 text-xs font-bold px-2 py-0.5 rounded-full">
                        {count}
                    </span>
                </div>
            </div>

            <div
                ref={setNodeRef}
                className="flex-1 bg-gray-50 rounded-xl p-3 border border-gray-200 min-h-[500px]"
            >
                <SortableContext items={leads.map((l) => l.id)} strategy={verticalListSortingStrategy}>
                    {leads.map((lead) => (
                        <LeadCard key={lead.id} lead={lead} />
                    ))}
                </SortableContext>
                {leads.length === 0 && (
                    <div className="h-full flex items-center justify-center text-gray-400 text-sm italic">
                        Arraste leads aqui
                    </div>
                )}
            </div>
        </div>
    );
};

export default Column;
