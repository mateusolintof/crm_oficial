import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { MoreHorizontal, Calendar, DollarSign } from 'lucide-react';

const LeadCard = ({ lead }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: lead.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    const getTagColor = (tag) => {
        switch (tag) {
            case 'Novo': return 'bg-primary-soft text-primary border border-primary/20';
            case 'Quente': return 'bg-amber-50 text-amber-700 border border-amber-100';
            case 'Qualificado IA': return 'bg-emerald-50 text-emerald-700 border border-emerald-100';
            case 'Contrato': return 'bg-slate-100 text-slate-700 border border-slate-200';
            default: return 'bg-slate-50 text-slate-600 border border-slate-200';
        }
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="bg-white/95 p-3 rounded-lg shadow-sm border border-border mb-2 cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow"
        >
            <div className="flex justify-between items-start mb-2">
                <div className="flex flex-wrap gap-1">
                    {lead.tags.map((tag, index) => (
                        <span key={index} className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${getTagColor(tag)}`}>
                            {tag}
                        </span>
                    ))}
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                    <MoreHorizontal size={16} />
                </button>
            </div>

            <h4 className="font-semibold text-ink text-sm mb-1">{lead.company}</h4>
            <p className="text-xs text-slate-600 mb-3">{lead.contact}</p>

            <div className="flex items-center justify-between pt-3 border-t border-border">
                <div className="flex items-center gap-1 text-xs font-semibold text-ink">
                    <DollarSign size={12} className="text-slate-400" />
                    {lead.value}
                </div>
                <div className="flex items-center gap-1 text-[11px] text-slate-500">
                    <Calendar size={12} />
                    {lead.date}
                </div>
            </div>
        </div>
    );
};

export default LeadCard;
