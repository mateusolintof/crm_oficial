import React, { useState } from 'react';
import { DndContext, DragOverlay, closestCorners, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import Column from './Column';
import LeadCard from './LeadCard';

const initialData = {
    leads: {
        'lead-1': { id: 'lead-1', company: 'Tech Solutions', contact: 'João Silva', value: 'R$ 5.000', date: '24 Nov', tags: ['Novo', 'Quente'] },
        'lead-2': { id: 'lead-2', company: 'Marketing Pro', contact: 'Maria Costa', value: 'R$ 12.000', date: '23 Nov', tags: ['Qualificado IA'] },
        'lead-3': { id: 'lead-3', company: 'Design Studio', contact: 'Pedro Santos', value: 'R$ 3.500', date: '22 Nov', tags: ['Novo'] },
        'lead-4': { id: 'lead-4', company: 'Dev House', contact: 'Lucas Lima', value: 'R$ 8.000', date: '21 Nov', tags: ['Em Negociação'] },
        'lead-5': { id: 'lead-5', company: 'Retail Corp', contact: 'Ana Souza', value: 'R$ 25.000', date: '20 Nov', tags: ['Contrato'] },
    },
    columns: {
        'col-1': { id: 'col-1', title: 'Novos Leads', leadIds: ['lead-1', 'lead-3'] },
        'col-2': { id: 'col-2', title: 'Qualificados IA', leadIds: ['lead-2'] },
        'col-3': { id: 'col-3', title: 'Em Negociação', leadIds: ['lead-4'] },
        'col-4': { id: 'col-4', title: 'Fechados', leadIds: ['lead-5'] },
    },
    columnOrder: ['col-1', 'col-2', 'col-3', 'col-4'],
};

const Board = () => {
    const [data, setData] = useState(initialData);
    const [activeId, setActiveId] = useState(null);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        })
    );

    const handleDragStart = (event) => {
        setActiveId(event.active.id);
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;
        setActiveId(null);

        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        // Find source and destination columns
        const startColId = Object.keys(data.columns).find((key) =>
            data.columns[key].leadIds.includes(activeId)
        );

        // If over a column directly
        let endColId = Object.keys(data.columns).find((key) => key === overId);
        // If over a card, find its column
        if (!endColId) {
            endColId = Object.keys(data.columns).find((key) =>
                data.columns[key].leadIds.includes(overId)
            );
        }

        if (!startColId || !endColId) return;

        if (startColId === endColId) {
            // Reorder within same column
            const column = data.columns[startColId];
            const oldIndex = column.leadIds.indexOf(activeId);
            const newIndex = column.leadIds.indexOf(overId);

            if (oldIndex !== newIndex) {
                const newLeadIds = arrayMove(column.leadIds, oldIndex, newIndex);
                setData((prev) => ({
                    ...prev,
                    columns: {
                        ...prev.columns,
                        [startColId]: { ...column, leadIds: newLeadIds },
                    },
                }));
            }
        } else {
            // Move to different column
            const startCol = data.columns[startColId];
            const endCol = data.columns[endColId];

            const startLeadIds = Array.from(startCol.leadIds);
            startLeadIds.splice(startLeadIds.indexOf(activeId), 1);

            const endLeadIds = Array.from(endCol.leadIds);
            // Insert at the position of the overId if it's a card, otherwise at end
            const overIndex = endCol.leadIds.indexOf(overId);
            if (overIndex >= 0) {
                endLeadIds.splice(overIndex, 0, activeId);
            } else {
                endLeadIds.push(activeId);
            }

            setData((prev) => ({
                ...prev,
                columns: {
                    ...prev.columns,
                    [startColId]: { ...startCol, leadIds: startLeadIds },
                    [endColId]: { ...endCol, leadIds: endLeadIds },
                },
            }));
        }
    };

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <div className="flex gap-6 h-full overflow-x-auto pb-4">
                {data.columnOrder.map((colId) => {
                    const column = data.columns[colId];
                    const leads = column.leadIds.map((leadId) => data.leads[leadId]);
                    return (
                        <Column
                            key={column.id}
                            id={column.id}
                            title={column.title}
                            leads={leads}
                            count={leads.length}
                        />
                    );
                })}
            </div>
            <DragOverlay>
                {activeId ? <LeadCard lead={data.leads[activeId]} /> : null}
            </DragOverlay>
        </DndContext>
    );
};

export default Board;
