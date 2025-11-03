
'use client';
import { DragDropContext, OnDragEndResponder } from '@hello-pangea/dnd';
import type { Task, TaskStatus, KanbanColumnData } from '@/lib/types';
import { KanbanColumn } from './kanban-column';
import { useState, useMemo } from 'react';
import { TimeLogDialog } from './time-log-dialog';
import { useToast } from '@/hooks/use-toast';
import { useStore } from '@/lib/store';

type KanbanBoardProps = {
  tasks: Task[];
  highlightedStatus?: TaskStatus | 'all' | null;
};

export function KanbanBoard({ tasks, highlightedStatus }: KanbanBoardProps) {
  const { toast } = useToast();
  const [timeLogTask, setTimeLogTask] = useState<Task | null>(null);
  const { updateTask, columns } = useStore();

  const onDragEnd: OnDragEndResponder = (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    const sourceColId = source.droppableId;
    const destColId = destination.droppableId as TaskStatus;

    if (sourceColId === destColId) return;

    const draggedTask = tasks.find(t => t.id === draggableId);
    if (!draggedTask) return;

    // Time logging logic
    if (sourceColId === 'to-do' && destColId === 'in-progress') {
      setTimeLogTask(draggedTask);
      // The actual update will happen in handleTimeLog
      return;
    }

    updateTask(draggedTask.id, { status: destColId });
    
    const destColumn = columns.find(c => c.id === destColId);
    toast({
        title: `Task "${draggedTask.title}" moved`,
        description: `Status updated to ${destColumn?.title || destColId}.`,
    });
  };
  
  const handleTimeLog = (hours: number) => {
    if (timeLogTask) {
        updateTask(timeLogTask.id, { status: 'in-progress', timeSpent: hours });
        const destColumn = columns.find(c => c.id === 'in-progress');
        toast({
            title: `Task "${timeLogTask.title}" moved`,
            description: `Status updated to ${destColumn?.title || 'in-progress'}.`,
        });
    }
    setTimeLogTask(null);
  };

  const tasksByColumn = useMemo(() => {
    const grouped: Record<string, Task[]> = {};
    columns.forEach(col => {
      grouped[col.id] = [];
    });
    tasks.forEach(task => {
      if (grouped[task.status]) {
        grouped[task.status].push(task);
      }
    });
    return grouped;
  }, [tasks, columns]);


  return (
    <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {columns.map(column => (
                <KanbanColumn 
                  key={column.id} 
                  column={column} 
                  tasks={tasksByColumn[column.id] || []} 
                  highlightedStatus={highlightedStatus} 
                />
            ))}
        </div>
        <TimeLogDialog 
            isOpen={!!timeLogTask} 
            onClose={() => setTimeLogTask(null)}
            onConfirm={handleTimeLog}
            task={timeLogTask}
        />
    </DragDropContext>
  );
}
