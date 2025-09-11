'use client';
import { DragDropContext, Droppable, Draggable, OnDragEndResponder } from '@hello-pangea/dnd';
import type { Task, TaskStatus } from '@/lib/types';
import { KanbanColumn } from './kanban-column';
import { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { TimeLogDialog } from './time-log-dialog';
import { useToast } from '@/hooks/use-toast';

type KanbanBoardProps = {
  initialTasks: Task[];
};

export function KanbanBoard({ initialTasks }: KanbanBoardProps) {
  const { user } = useAuth();
  const [tasks, setTasks] = useState(initialTasks);
  const { toast } = useToast();
  const [timeLogTask, setTimeLogTask] = useState<Task | null>(null);

  const onDragEnd: OnDragEndResponder = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    const sourceCol = source.droppableId as TaskStatus;
    const destCol = destination.droppableId as TaskStatus;

    const draggedTask = tasks.find(t => t.id === result.draggableId);
    if (!draggedTask) return;

    // Time logging logic
    if (sourceCol === 'To Do' && destCol === 'In Progress') {
      setTimeLogTask(draggedTask);
      // We will update the task state after the dialog is handled
      return;
    }

    updateTaskState(draggedTask, destCol, draggedTask.timeSpent);
  };
  
  const handleTimeLog = (hours: number) => {
    if (timeLogTask) {
        updateTaskState(timeLogTask, 'In Progress', hours);
    }
    setTimeLogTask(null);
  };

  const updateTaskState = (task: Task, newStatus: TaskStatus, timeSpent: number) => {
     let newTimeSpent = timeSpent;
     if (newStatus === 'Done') {
        newTimeSpent = task.estimatedHours;
     } else if (newStatus === 'To Do') {
        newTimeSpent = 0;
     }

     setTasks(prevTasks =>
        prevTasks.map(t =>
            t.id === task.id ? { ...t, status: newStatus, timeSpent: newTimeSpent, updatedAt: new Date().toISOString() } : t
        )
     );

     toast({
        title: `Task "${task.title}" moved`,
        description: `Status updated to ${newStatus}.`,
     });
  };

  const filteredTasks = user?.role === 'Admin'
    ? tasks
    : tasks.filter(task => task.assignedRole === user?.role);

  const columns: Record<TaskStatus, Task[]> = {
    'To Do': filteredTasks.filter(t => t.status === 'To Do'),
    'In Progress': filteredTasks.filter(t => t.status === 'In Progress'),
    'In Review': filteredTasks.filter(t => t.status === 'In Review'),
    'Done': filteredTasks.filter(t => t.status === 'Done'),
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(Object.keys(columns) as TaskStatus[]).map(status => (
                <KanbanColumn key={status} status={status} tasks={columns[status]} />
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
