

import { Droppable, Draggable } from '@hello-pangea/dnd';
import type { Task, TaskStatus, KanbanColumnData } from '@/lib/types';
import { KanbanCard } from './kanban-card';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/use-auth';
import { useStore } from '@/lib/store';

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
  const allTasks = useStore(state => state.tasks);
  
  // A task is a top-level task if it's not a story, or if it is a story.
  // Child tasks of stories are rendered inside the KanbanCard for the story.
  const topLevelTasks = tasks.filter(task => {
    if (task.storyId) {
      // It's a child task. Don't render it at the top level.
      // It will be rendered inside its parent story card.
      return false;
    }
    // It's a Story or a standalone Task/Bug, so render it.
    return true;
  });


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
            {topLevelTasks.map((task, index) => {
              const blockingTasks = (task.dependsOn || [])
                .map(depId => allTasks.find(t => t.id === depId))
                .filter(t => t && t.status !== 'done');
              const isBlocked = blockingTasks.length > 0;
              
              const isDraggable = (user?.userType === 'Admin' || user?.userType === 'Manager' || user?.id === task.assignedUserId) && !isBlocked;
              
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
