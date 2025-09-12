
import { Droppable, Draggable } from '@hello-pangea/dnd';
import type { Task, TaskStatus } from '@/lib/types';
import { KanbanCard } from './kanban-card';
import { cn } from '@/lib/utils';

type KanbanColumnProps = {
  status: TaskStatus;
  tasks: Task[];
  highlightedStatus?: TaskStatus | 'all' | null;
};

const columnTitles: Record<TaskStatus, string> = {
  'To Do': 'To Do',
  'In Progress': 'In Progress',
  'In Review': 'In Review',
  'Done': 'Done',
};

const statusColors: Record<TaskStatus, string> = {
  'To Do': 'border-blue-500',
  'In Progress': 'border-yellow-500',
  'In Review': 'border-purple-500',
  'Done': 'border-green-500',
};

const titleColors: Record<TaskStatus, string> = {
    'To Do': 'text-blue-500',
    'In Progress': 'text-yellow-500',
    'In Review': 'text-purple-500',
    'Done': 'text-green-500',
};


export function KanbanColumn({ status, tasks, highlightedStatus }: KanbanColumnProps) {
  return (
    <div className={cn(
      "flex flex-col rounded-xl border", 
      statusColors[status],
      (highlightedStatus === 'all' || highlightedStatus === status) && 'animate-flash'
      )}>
      <div className={cn("p-3 flex items-center justify-between")}>
        <h2 className={cn("text-lg font-semibold", titleColors[status])}>
          {columnTitles[status]}
        </h2>
        <span className={cn("text-sm font-normal h-6 w-6 flex items-center justify-center rounded-full bg-background")}>
            {tasks.length}
          </span>
      </div>
      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={cn(`p-3 space-y-4 rounded-b-lg min-h-[500px] transition-colors`, 
              snapshot.isDraggingOver ? 'bg-black/10' : 'bg-transparent'
            )}
          >
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <KanbanCard 
                      task={task} 
                      isDragging={snapshot.isDragging}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
