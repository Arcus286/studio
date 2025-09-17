
import { Droppable, Draggable } from '@hello-pangea/dnd';
import type { Task, TaskStatus, KanbanColumnData } from '@/lib/types';
import { KanbanCard } from './kanban-card';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/use-auth';

type KanbanColumnProps = {
  column: KanbanColumnData;
  tasks: Task[];
  highlightedStatus?: TaskStatus | 'all' | null;
};

const titleColors: Record<string, string> = {
    'border-blue-500': 'text-blue-500',
    'border-yellow-500': 'text-yellow-500',
    'border-purple-500': 'text-purple-500',
    'border-green-500': 'text-green-500',
    'border-gray-500': 'text-gray-500',
    'border-red-500': 'text-red-500',
    'border-cyan-500': 'text-cyan-500',
    'border-orange-500': 'text-orange-500',
};


export function KanbanColumn({ column, tasks, highlightedStatus }: KanbanColumnProps) {
  const { user } = useAuth();
  
  return (
    <div className={cn(
      "flex flex-col rounded-xl border", 
      column.color,
      (highlightedStatus === 'all' || highlightedStatus === column.id) && 'animate-flash'
      )}>
      <div className={cn("p-3 flex items-center justify-between")}>
        <h2 className={cn("text-lg font-semibold", titleColors[column.color] || 'text-foreground')}>
          {column.title}
        </h2>
        <span className={cn("text-sm font-normal h-6 w-6 flex items-center justify-center rounded-full bg-background")}>
            {tasks.length}
          </span>
      </div>
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={cn(`p-3 space-y-4 rounded-b-lg min-h-[500px] transition-colors`, 
              snapshot.isDraggingOver ? 'bg-black/10' : 'bg-transparent'
            )}
          >
            {tasks.map((task, index) => {
              const isDraggable = user?.role === 'Admin' || user?.role === task.assignedRole;
              return (
              <Draggable key={task.id} draggableId={task.id} index={index} isDragDisabled={!isDraggable}>
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
            )})}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
