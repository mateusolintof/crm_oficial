import React, { useState, useMemo } from 'react';
import { DndContext, DragOverlay, closestCorners, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import Column from './Column';
import LeadCard from './LeadCard';
import { useCRMStore } from '../../store/useCRMStore';

const Board = () => {
    const { leads, columns, currentPipeline, moveLead } = useCRMStore();
    const [activeId, setActiveId] = useState(null);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        })
    );

    // Filter columns for the current pipeline
    const pipelineColumns = useMemo(() => columns[currentPipeline] || [], [columns, currentPipeline]);

    // Group leads by status (column)
    const leadsByColumn = useMemo(() => {
        const grouped = {};
        pipelineColumns.forEach(col => {
            grouped[col.id] = leads.filter(l => l.pipeline === currentPipeline && l.status === col.id);
        });
        return grouped;
    }, [leads, pipelineColumns, currentPipeline]);

    const handleDragStart = (event) => {
        setActiveId(event.active.id);
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;
        setActiveId(null);

        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        // Find the lead being dragged
        const activeLead = leads.find(l => l.id === activeId);
        if (!activeLead) return;

        // Determine destination column
        let endColId;

        // Check if over a column directly
        const isOverColumn = pipelineColumns.some(col => col.id === overId);

        if (isOverColumn) {
            endColId = overId;
        } else {
            // Check if over another lead
            const overLead = leads.find(l => l.id === overId);
            if (overLead) {
                endColId = overLead.status;
            }
        }

        if (endColId && endColId !== activeLead.status) {
            moveLead(activeId, endColId);
        }
    };

    const activeLead = useMemo(() => leads.find(l => l.id === activeId), [leads, activeId]);

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <div className="flex gap-6 h-full overflow-x-auto pb-4">
                {pipelineColumns.map((column) => (
                    <Column
                        key={column.id}
                        id={column.id}
                        title={column.title}
                        leads={leadsByColumn[column.id] || []}
                        count={(leadsByColumn[column.id] || []).length}
                    />
                ))}
            </div>
            <DragOverlay>
                {activeLead ? <LeadCard lead={activeLead} /> : null}
            </DragOverlay>
        </DndContext>
    );
};

export default Board;
