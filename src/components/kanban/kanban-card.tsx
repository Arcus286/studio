

'use client';

import { useState } from 'react';
import type { Task } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, ArrowUp, ArrowDown, Minus, Bug, CalendarClock, Layers, CircleDot, Lock } from 'lucide-react';
import { TaskDetailDialog } from './task-detail-dialog';
import { cn } from '@/lib/utils';
import { USERS } from '@/lib/data';
import { format, isPast, differenceInDays } from 'date-fns';
import { useStore } from '@/lib/store';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

type KanbanCardProps = {
  task: Task;
  isDragging: boolean;
};

const PriorityIcon = ({ priority }: { priority: 'Low' | 'Medium' | 'High' }) => {
    switch (priority) {
        case 'High':
            return <ArrowUp className="h-4 w-4 text-red-500" />;
        case 'Medium':
            return <ArrowUp className="h-4 w-4 text-yellow-500" />;
        case 'Low':
            return <ArrowDown className="h-4 w-4 text-green-500" />;
        default:
            return <Minus className="h-4 w-4 text-muted-foreground" />;
    }
};

const TaskTypeIcon = ({ type }: { type: 'Bug' | 'Task' | 'Story' }) => {
    const className = "h-4 w-4 mr-1";
    switch (type) {
        case 'Bug':
            return <Bug className={cn(className, "text-red-500")} />;
        case 'Task':
            return <CircleDot className={cn(className, "text-blue-400")} />;
        case 'Story':
            return <Layers className={cn(className, "text-green-500")} />;
    }
}

const DeadlineDisplay = ({ deadline }: { deadline: string }) => {
    const dueDate = new Date(deadline);
    const isOverdue = isPast(dueDate) && differenceInDays(new Date(), dueDate) > 0;
    const days = differenceInDays(dueDate, new Date());

    let text, color;

    if (isOverdue) {
        text = 'Overdue';
        color = 'text-red-500';
    } else if (days === 0) {
        text = 'Due today';
        color = 'text-yellow-500';
    } else if (days === 1) {
        text = 'Due tomorrow';
        color = 'text-yellow-500';
    } else {
        text = `Due in ${days} days`;
        color = 'text-muted-foreground';
    }

    return (
        <div className={cn("flex items-center gap-1.5", color)}>
            <CalendarClock className="h-4 w-4" />
            <span>{format(dueDate, "MMM d")}</span>
            <span className="hidden md:inline">- {text}</span>
        </div>
    )
}

const ChildTask = ({ task, onTaskClick }: { task: Task; onTaskClick: (task: Task) => void }) => {
    const assignedUser = USERS.find(u => u.role === task.assignedRole);
    return (
        <div 
            className="flex items-center justify-between p-2 rounded-md bg-card/50 hover:bg-card cursor-pointer"
            onClick={() => onTaskClick(task)}
        >
            <div className="flex items-center gap-2">
                <TaskTypeIcon type={task.type} />
                <span className="text-xs font-medium truncate">{task.title}</span>
            </div>
            <div className="flex items-center gap-2">
                {assignedUser && (
                     <Badge variant="outline" className="text-xs">{assignedUser.username}</Badge>
                )}
                 <PriorityIcon priority={task.priority} />
            </div>
        </div>
    )
}

export function KanbanCard({ task, isDragging }: KanbanCardProps) {
  const [detailTask, setDetailTask] = useState<Task | null>(null);
  const assignedUser = USERS.find(u => u.role === task.assignedRole);
  const { tasks: allTasks } = useStore();
  
  const childTasks = task.type === 'Story' 
    ? allTasks.filter(t => t.storyId === task.id && t.status === task.status) 
    : [];

  const blockingTasks = (task.dependsOn || [])
    .map(depId => allTasks.find(t => t.id === depId))
    .filter(t => t && t.status !== 'done');
  const isBlocked = blockingTasks.length > 0;

  const handleCardClick = () => {
    setDetailTask(task);
  }
  
  const handleChildTaskClick = (child: Task) => {
    setDetailTask(child);
  }

  const handleOpenChange = (isOpen: boolean) => {
      if (!isOpen) {
          setDetailTask(null);
      }
  }
  
  if (task.type === 'Story') {
    return (
        <>
            <Card
                className={cn(
                'transition-all bg-muted/20 border-l-4 border-green-500',
                isDragging && 'shadow-2xl scale-105 ring-2 ring-primary'
                )}
            >
                <CardContent className="p-3 space-y-2">
                    <div className="flex justify-between items-start cursor-pointer" onClick={handleCardClick}>
                        <p className="font-semibold text-foreground pr-2 flex items-center gap-2">
                            <TaskTypeIcon type={task.type} />
                            {task.title}
                        </p>
                        <Badge variant="outline" className="shrink-0">{task.id}</Badge>
                    </div>
                     <div className="pl-6 space-y-1">
                        {childTasks.length > 0 ? (
                            childTasks.map(child => (
                                <ChildTask key={child.id} task={child} onTaskClick={handleChildTaskClick} />
                            ))
                        ) : (
                             <p className="text-xs text-muted-foreground px-2 py-1">No tasks in this story.</p>
                        )}
                    </div>
                </CardContent>
            </Card>
            {detailTask && <TaskDetailDialog isOpen={!!detailTask} onOpenChange={handleOpenChange} task={detailTask} />}
        </>
    )
  }

  return (
    <>
      <Card
        className={cn(
          'transition-all bg-card/80 backdrop-blur-sm cursor-pointer',
          'hover:shadow-xl hover:ring-2 hover:ring-primary/50 hover:-translate-y-1',
          isDragging && 'shadow-2xl scale-105 ring-2 ring-primary',
          isBlocked && 'opacity-70'
        )}
        onClick={handleCardClick}
      >
        <CardContent className="p-4 space-y-3">
          <div className="flex justify-between items-start">
            <p className="font-semibold text-foreground pr-2">{task.title}</p>
            <Badge variant="outline" className="shrink-0">{task.id}</Badge>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">{task.description}</p>
           <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="outline" className="flex items-center flex-shrink-0">
                    <TaskTypeIcon type={task.type} />
                    {task.type}
                </Badge>
                <Badge variant="secondary" className="flex-shrink-0">{task.assignedRole}</Badge>
           </div>
          <div className="flex justify-between items-center text-sm text-muted-foreground pt-2">
            <div className="flex items-center gap-3">
                {isBlocked ? (
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div className="flex items-center gap-1.5 text-yellow-600">
                                    <Lock className="h-4 w-4" />
                                    <span>Blocked</span>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Blocked by: {blockingTasks.map(t => t?.title).join(', ')}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                ) : task.deadline ? (
                    <DeadlineDisplay deadline={task.deadline} />
                ) : (
                    <div className="flex items-center gap-1 flex-shrink-0">
                        <Clock className="h-4 w-4" />
                        <span>{task.timeSpent}/{task.estimatedHours}h</span>
                    </div>
                )}
            </div>
             <div className="flex items-center gap-2">
                <PriorityIcon priority={task.priority} />
                {assignedUser && (
                    <span className="truncate w-16 text-right">{assignedUser.username}</span>
                )}
            </div>
          </div>
        </CardContent>
      </Card>
      {detailTask && <TaskDetailDialog isOpen={!!detailTask} onOpenChange={handleOpenChange} task={detailTask} />}
    </>
  );
}
