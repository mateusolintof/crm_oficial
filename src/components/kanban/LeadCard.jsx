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
            case 'Novo': return 'bg-blue-100 text-blue-700';
            case 'Quente': return 'bg-amber-100 text-amber-700';
            case 'Qualificado IA': return 'bg-emerald-100 text-emerald-700';
            case 'Contrato': return 'bg-indigo-100 text-indigo-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-3 cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow"
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

            <h4 className="font-bold text-gray-900 text-sm mb-1">{lead.company}</h4>
            <p className="text-xs text-gray-500 mb-3">{lead.contact}</p>

            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="flex items-center gap-1 text-xs font-medium text-gray-700">
                    <DollarSign size={12} className="text-gray-400" />
                    {lead.value}
                </div>
                <div className="flex items-center gap-1 text-[10px] text-gray-400">
                    <Calendar size={12} />
                    {lead.date}
                </div>
            </div>
        </div>
    );
};

export default LeadCard;
