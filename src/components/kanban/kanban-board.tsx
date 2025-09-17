
'use client';
import { DragDropContext, OnDragEndResponder } from '@hello-pangea/dnd';
import type { Task, TaskStatus, KanbanColumnData } from '@/lib/types';
import { KanbanColumn } from './kanban-column';
import { useState, useEffect } from 'react';
import { TimeLogDialog } from './time-log-dialog';
import { useToast } from '@/hooks/use-toast';
import { useStore } from '@/lib/store';

type KanbanBoardProps = {
  tasks: Task[];
  highlightedStatus?: TaskStatus | 'all' | null;
};

export function KanbanBoard({ tasks: initialTasks, highlightedStatus }: KanbanBoardProps) {
  const { toast } = useToast();
  const [timeLogTask, setTimeLogTask] = useState<Task | null>(null);
  const { tasks, updateTask, columns } = useStore();

  const onDragEnd: OnDragEndResponder = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    const sourceColId = source.droppableId;
    const destColId = destination.droppableId;

    const draggedTask = tasks.find(t => t.id === result.draggableId);
    if (!draggedTask) return;

    // Time logging logic
    if (sourceColId === 'to-do' && destColId === 'in-progress') {
      setTimeLogTask(draggedTask);
      return;
    }

    updateTask(draggedTask.id, destColId as TaskStatus, draggedTask.timeSpent);
    
    const destColumn = columns.find(c => c.id === destColId);
    toast({
        title: `Task "${draggedTask.title}" moved`,
        description: `Status updated to ${destColumn?.title || destColId}.`,
    });
  };
  
  const handleTimeLog = (hours: number) => {
    if (timeLogTask) {
        updateTask(timeLogTask.id, 'in-progress', hours);
         const destColumn = columns.find(c => c.id === 'in-progress');
        toast({
            title: `Task "${timeLogTask.title}" moved`,
            description: `Status updated to ${destColumn?.title || 'in-progress'}.`,
        });
    }
    setTimeLogTask(null);
  };


  const groupedTasks: Record<string, Task[]> = columns.reduce((acc, col) => {
    acc[col.id] = [];
    return acc;
  }, {} as Record<string, Task[]>);

  initialTasks.forEach(task => {
      if (groupedTasks[task.status]) {
        groupedTasks[task.status].push(task);
      }
  });


  return (
    <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {columns.map(column => (
                <KanbanColumn key={column.id} column={column} tasks={groupedTasks[column.id] || []} highlightedStatus={highlightedStatus} />
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
