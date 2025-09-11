'use client';

import { useState } from 'react';
import type { Task } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { USERS } from '@/lib/data';
import { Progress } from '../ui/progress';
import { Clock, Users } from 'lucide-react';
import { TaskDetailDialog } from './task-detail-dialog';

type KanbanCardProps = {
  task: Task;
  isDragging: boolean;
};

export function KanbanCard({ task, isDragging }: KanbanCardProps) {
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const assignedUser = USERS.find(u => u.role === task.assignedRole);
  const progress = task.estimatedHours > 0 ? (task.timeSpent / task.estimatedHours) * 100 : 0;

  return (
    <>
      <Card
        className={`hover:shadow-md transition-shadow ${isDragging ? 'shadow-lg rotate-3' : ''}`}
        onClick={() => setIsDetailOpen(true)}
      >
        <CardHeader>
          <CardTitle className="text-base">{task.title}</CardTitle>
          <Badge variant="outline" className="w-fit">{task.assignedRole}</Badge>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground line-clamp-2">{task.description}</p>
          <div className="flex justify-between items-center text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{task.timeSpent}/{task.estimatedHours}h</span>
            </div>
            {assignedUser && (
              <Avatar className="h-6 w-6">
                <AvatarImage src={assignedUser.avatar} />
                <AvatarFallback>{assignedUser.username.charAt(0)}</AvatarFallback>
              </Avatar>
            )}
          </div>
          <Progress value={progress} className="h-2" />
        </CardContent>
      </Card>
      <TaskDetailDialog isOpen={isDetailOpen} onOpenChange={setIsDetailOpen} task={task} />
    </>
  );
}
