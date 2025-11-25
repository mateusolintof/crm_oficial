import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import LeadCard from './LeadCard';

const Column = ({ id, title, leads, count, color }) => {
    const { setNodeRef } = useDroppable({ id });

    return (
        <div className="flex flex-col w-72 shrink-0">
            <div className="flex items-center justify-between mb-2 px-1">
                <div className="flex items-center gap-2">
                    <span className={`h-2.5 w-2.5 rounded-full ${color || 'bg-slate-300'}`}></span>
                    <h3 className="font-semibold text-sm text-ink">{title}</h3>
                </div>
                <span className="px-2 py-0.5 text-[11px] rounded-full bg-slate-100 text-slate-600 font-semibold border border-border">
                    {count}
                </span>
            </div>

            <div
                ref={setNodeRef}
                className="flex-1 bg-white/90 rounded-lg p-3 border border-border min-h-[400px] shadow-sm"
            >
                <SortableContext items={leads.map((l) => l.id)} strategy={verticalListSortingStrategy}>
                    {leads.map((lead) => (
                        <LeadCard key={lead.id} lead={lead} />
                    ))}
                </SortableContext>
                {leads.length === 0 && (
                    <div className="h-full flex items-center justify-center text-slate-400 text-sm italic">
                        Arraste leads aqui
                    </div>
                )}
            </div>
        </div>
    );
};

export default Column;
