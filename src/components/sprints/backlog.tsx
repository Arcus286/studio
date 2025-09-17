
'use client';
import { useMemo } from 'react';
import { DragDropContext, Droppable, Draggable, OnDragEndResponder } from '@hello-pangea/dnd';
import { useStore } from '@/lib/store';
import { useSprintStore } from '@/lib/sprint-store';
import type { Project, Sprint, Task } from '@/lib/types';
import { KanbanCard } from '../kanban/kanban-card';
import { ScrollArea } from '../ui/scroll-area';
import { Flame, ClipboardList } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface BacklogProps {
  project: Project;
}

export function Backlog({ project }: BacklogProps) {
  const { tasks, assignTaskToSprint } = useStore();
  const { sprints } = useSprintStore();
  const { toast } = useToast();

  const backlogTasks = useMemo(() => {
    return tasks.filter(t => t.projectId === project.id && !t.sprintId);
  }, [tasks, project.id]);

  const activeSprint = useMemo(() => {
    return sprints.find(s => s.projectId === project.id && s.status === 'active');
  }, [sprints, project.id]);

  const onDragEnd: OnDragEndResponder = (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    if (source.droppableId === 'backlog' && destination.droppableId.startsWith('sprint-')) {
        const sprintId = destination.droppableId.replace('sprint-', '');
        assignTaskToSprint(draggableId, sprintId);
        toast({
            title: "Task Added to Sprint",
            description: `Task has been planned into the active sprint.`,
        });
    }
  };

  const droppableSprintId = activeSprint ? `sprint-${activeSprint.id}` : 'sprint-inactive';

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Backlog Column */}
        <div className="rounded-xl border border-dashed">
          <div className="p-4 flex items-center gap-2">
            <ClipboardList className="h-5 w-5 text-muted-foreground" />
            <h2 className="text-lg font-semibold">Backlog</h2>
            <span className="text-sm text-muted-foreground ml-auto">{backlogTasks.length} issues</span>
          </div>
          <Droppable droppableId="backlog">
            {(provided, snapshot) => (
              <ScrollArea
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={cn(
                  'h-[600px] p-4 rounded-b-xl',
                  snapshot.isDraggingOver ? 'bg-muted' : 'bg-transparent'
                )}
              >
                <div className="space-y-4">
                  {backlogTasks.map((task, index) => (
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
              </ScrollArea>
            )}
          </Droppable>
        </div>

        {/* Active Sprint Column */}
        <div className={cn("rounded-xl border", activeSprint ? 'border-primary' : 'border-dashed')}>
          <div className="p-4 flex items-center gap-2">
            <Flame className={cn("h-5 w-5", activeSprint ? 'text-primary' : 'text-muted-foreground')} />
            <h2 className="text-lg font-semibold">{activeSprint ? activeSprint.name : 'No Active Sprint'}</h2>
          </div>
           <Droppable droppableId={droppableSprintId} isDropDisabled={!activeSprint}>
            {(provided, snapshot) => (
              <ScrollArea
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={cn(
                  'h-[600px] p-4 rounded-b-xl',
                  snapshot.isDraggingOver && activeSprint ? 'bg-primary/10' : 'bg-transparent'
                )}
              >
                {activeSprint ? (
                     <div className="space-y-4">
                        {tasks.filter(t => t.sprintId === activeSprint.id).map((task, index) => (
                            <div key={task.id}>
                                <KanbanCard task={task} isDragging={false} />
                            </div>
                        ))}
                     </div>
                ) : (
                    <div className="flex items-center justify-center h-full text-muted-foreground">
                        <p>Start a sprint to plan tasks.</p>
                    </div>
                )}
                {provided.placeholder}
              </ScrollArea>
            )}
          </Droppable>
        </div>
      </div>
    </DragDropContext>
  );
}
