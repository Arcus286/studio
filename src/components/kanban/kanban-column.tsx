import { Droppable, Draggable } from '@hello-pangea/dnd';
import type { Task, TaskStatus } from '@/lib/types';
import { KanbanCard } from './kanban-card';

type KanbanColumnProps = {
  status: TaskStatus;
  tasks: Task[];
};

const columnTitles: Record<TaskStatus, string> = {
  'To Do': 'To Do',
  'In Progress': 'In Progress',
  'Done': 'Done',
};

export function KanbanColumn({ status, tasks }: KanbanColumnProps) {
  return (
    <div className="flex flex-col">
      <div className="p-3 bg-muted rounded-t-lg border-b">
        <h2 className="text-lg font-semibold flex items-center justify-between">
          {columnTitles[status]}
          <span className="text-sm font-normal bg-primary/20 text-primary-foreground h-6 w-6 flex items-center justify-center rounded-full">
            {tasks.length}
          </span>
        </h2>
      </div>
      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={`p-3 space-y-4 rounded-b-lg bg-muted/50 min-h-[500px] transition-colors ${
              snapshot.isDraggingOver ? 'bg-primary/10' : ''
            }`}
          >
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <KanbanCard task={task} isDragging={snapshot.isDragging} />
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
