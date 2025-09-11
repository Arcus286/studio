
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
  'To Do': 'bg-blue-500/20 text-blue-500 border-t-blue-500',
  'In Progress': 'bg-yellow-500/20 text-yellow-500 border-t-yellow-500',
  'In Review': 'bg-purple-500/20 text-purple-500 border-t-purple-500',
  'Done': 'bg-green-500/20 text-green-500 border-t-green-500',
};


export function KanbanColumn({ status, tasks, highlightedStatus }: KanbanColumnProps) {
  const statusClassName = `status-${status.replace(' ', '-')}`;

  return (
    <div className="flex flex-col">
      <div className={cn("p-3 rounded-t-lg flex items-center justify-between border-t-4", statusColors[status])}>
        <h2 className="text-lg font-semibold text-foreground">
          {columnTitles[status]}
        </h2>
        <span className={cn("text-sm font-normal h-6 w-6 flex items-center justify-center rounded-full", statusColors[status])}>
            {tasks.length}
          </span>
      </div>
      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={cn(`p-3 space-y-4 rounded-b-lg min-h-[500px] transition-colors`, statusClassName,
              snapshot.isDraggingOver ? 'bg-opacity-30' : 'bg-opacity-10'
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
                      isHighlighted={highlightedStatus === 'all' || highlightedStatus === task.status}
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
