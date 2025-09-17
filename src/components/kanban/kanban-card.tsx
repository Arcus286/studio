
'use client';

import { useState } from 'react';
import type { Task } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, ArrowUp, ArrowDown, Minus, Bug, CalendarClock } from 'lucide-react';
import { TaskDetailDialog } from './task-detail-dialog';
import { cn } from '@/lib/utils';
import { CircleDot } from 'lucide-react';
import { USERS } from '@/lib/data';
import { format, isPast, differenceInDays } from 'date-fns';

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

const TaskTypeIcon = ({ type }: { type: 'Bug' | 'Task' }) => {
    const className = "h-4 w-4 mr-1";
    switch (type) {
        case 'Bug':
            return <Bug className={cn(className, "text-red-500")} />;
        case 'Task':
            return <CircleDot className={cn(className, "text-blue-400")} />;
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

export function KanbanCard({ task, isDragging }: KanbanCardProps) {
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const assignedUser = USERS.find(u => u.role === task.assignedRole);

  return (
    <>
      <Card
        className={cn(
          'transition-all bg-card/80 backdrop-blur-sm cursor-pointer',
          'hover:shadow-xl hover:ring-2 hover:ring-primary/50 hover:-translate-y-1',
          isDragging && 'shadow-2xl scale-105 ring-2 ring-primary'
        )}
        onClick={() => setIsDetailOpen(true)}
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
                {task.deadline && <DeadlineDisplay deadline={task.deadline} />}
                {!task.deadline && (
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
      <TaskDetailDialog isOpen={isDetailOpen} onOpenChange={setIsDetailOpen} task={task} />
    </>
  );
}
