'use client';

import { useState } from 'react';
import type { Task } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { USERS } from '@/lib/data';
import { Clock, ArrowUp, ArrowDown, Minus } from 'lucide-react';
import { TaskDetailDialog } from './task-detail-dialog';
import { cn } from '@/lib/utils';
import { GitCommit, GitPullRequest, CircleDot } from 'lucide-react';

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

const TaskTypeIcon = ({ type }: { type: 'Epic' | 'Story' | 'Task' }) => {
    const className = "h-4 w-4 mr-1";
    switch (type) {
        case 'Epic':
            return <GitCommit className={cn(className, "text-purple-400")} />;
        case 'Story':
            return <GitPullRequest className={cn(className, "text-orange-400")} />;
        case 'Task':
            return <CircleDot className={cn(className, "text-blue-400")} />;
    }
}

export function KanbanCard({ task, isDragging }: KanbanCardProps) {
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const assignedUser = USERS.find(u => u.role === task.assignedRole);

  return (
    <>
      <Card
        className={`hover:shadow-lg transition-shadow bg-card/80 backdrop-blur-sm ${isDragging ? 'shadow-xl rotate-3' : ''}`}
        onClick={() => setIsDetailOpen(true)}
      >
        <CardContent className="p-4 space-y-3">
          <p className="font-semibold text-foreground">{task.title}</p>
          <p className="text-sm text-muted-foreground line-clamp-2">{task.description}</p>
           <div className="flex items-center gap-2">
                <Badge variant="outline" className="flex items-center">
                    <TaskTypeIcon type={task.type} />
                    {task.type}
                </Badge>
                <Badge variant="secondary">{task.assignedRole}</Badge>
           </div>
          <div className="flex justify-between items-center text-sm text-muted-foreground pt-2">
            <div className="flex items-center gap-3">
                {assignedUser && (
                <Avatar className="h-6 w-6">
                    <AvatarImage src={assignedUser.avatar} />
                    <AvatarFallback>{assignedUser.username.charAt(0)}</AvatarFallback>
                </Avatar>
                )}
                <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{task.timeSpent}/{task.estimatedHours}h</span>
                </div>
            </div>
             <div className="flex items-center gap-1">
                <PriorityIcon priority={task.priority} />
            </div>
          </div>
        </CardContent>
      </Card>
      <TaskDetailDialog isOpen={isDetailOpen} onOpenChange={setIsDetailOpen} task={task} />
    </>
  );
}
