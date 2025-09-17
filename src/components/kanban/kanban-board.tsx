'use client';
import { DragDropContext, Droppable, Draggable, OnDragEndResponder } from '@hello-pangea/dnd';
import type { Task, TaskStatus, KanbanColumnData } from '@/lib/types';
import { KanbanColumn } from './kanban-column';
import { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { TimeLogDialog } from './time-log-dialog';
import { useToast } from '@/hooks/use-toast';
import { KANBAN_COLUMNS } from '@/lib/data';

type KanbanBoardProps = {
  initialTasks: Task[];
  highlightedStatus?: TaskStatus | 'all' | null;
};

export function KanbanBoard({ initialTasks, highlightedStatus }: KanbanBoardProps) {
  const { user } = useAuth();
  const [tasks, setTasks] = useState(initialTasks);
  const { toast } = useToast();
  const [timeLogTask, setTimeLogTask] = useState<Task | null>(null);
  const [columns, setColumns] = useState<KanbanColumnData[]>(KANBAN_COLUMNS);

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
      // We will update the task state after the dialog is handled
      return;
    }

    updateTaskState(draggedTask, destColId, draggedTask.timeSpent);
  };
  
  const handleTimeLog = (hours: number) => {
    if (timeLogTask) {
        updateTaskState(timeLogTask, 'in-progress', hours);
    }
    setTimeLogTask(null);
  };

  const updateTaskState = (task: Task, newStatus: TaskStatus, timeSpent: number) => {
     let newTimeSpent = timeSpent;
     if (newStatus === 'done') {
        newTimeSpent = task.estimatedHours;
     } else if (newStatus === 'to-do') {
        newTimeSpent = 0;
     }

     setTasks(prevTasks =>
        prevTasks.map(t =>
            t.id === task.id ? { ...t, status: newStatus, timeSpent: newTimeSpent, updatedAt: new Date().toISOString() } : t
        )
     );

     const destColumn = columns.find(c => c.id === newStatus);

     toast({
        title: `Task "${task.title}" moved`,
        description: `Status updated to ${destColumn?.title || newStatus}.`,
     });
  };

  const groupedTasks: Record<string, Task[]> = columns.reduce((acc, col) => {
    acc[col.id] = [];
    return acc;
  }, {} as Record<string, Task[]>);

  tasks.forEach(task => {
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
