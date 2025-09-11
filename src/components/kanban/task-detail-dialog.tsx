'use client';

import { useState } from 'react';
import type { Task } from '@/lib/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { USERS } from '@/lib/data';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { format, parseISO } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { CalendarDays, Users } from 'lucide-react';
import { GitCommit, GitPullRequest, CircleDot } from 'lucide-react';
import { cn } from '@/lib/utils';

type TaskDetailDialogProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  task: Task;
};

const TaskTypeIcon = ({ type, className }: { type: 'Epic' | 'Story' | 'Task', className?: string }) => {
    const baseClassName = "h-5 w-5";
    switch (type) {
        case 'Epic':
            return <GitCommit className={cn(baseClassName, "text-purple-400", className)} />;
        case 'Story':
            return <GitPullRequest className={cn(baseClassName, "text-orange-400", className)} />;
        case 'Task':
            return <CircleDot className={cn(baseClassName, "text-blue-400", className)} />;
    }
}

export function TaskDetailDialog({ isOpen, onOpenChange, task }: TaskDetailDialogProps) {
  const { user } = useAuth();
  const isAdmin = user?.role === 'Admin';
  const { toast } = useToast();

  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  
  const handleSave = () => {
    // In a real app, this would be a server action
    console.log({ title, description });
    toast({
        title: 'Task Updated',
        description: `"${title}" has been saved.`
    });
    onOpenChange(false);
  };
  
  const progressPercentage = task.estimatedHours > 0 ? (task.timeSpent / task.estimatedHours) * 100 : 0;
  const assignedUser = USERS.find(u => u.role === task.assignedRole);


  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl p-0">
        <DialogHeader className="p-6 pb-4">
          <div className="flex items-center gap-3">
             <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
                <TaskTypeIcon type={task.type} className="h-6 w-6" />
             </div>
            <div>
                <DialogTitle className="text-xl">{title}</DialogTitle>
                <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline">{task.type}</Badge>
                    <Badge variant="secondary">{task.status}</Badge>
                </div>
            </div>
          </div>
        </DialogHeader>
        
        <div className="px-6 space-y-6 max-h-[60vh] overflow-y-auto">
            <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Description</h3>
                <p className="text-sm text-foreground">{description}</p>
            </div>
            
            <Separator />

            <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-3">Task Progress</h3>
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">{task.timeSpent}h / {task.estimatedHours}h</span>
                    <span className="text-sm font-semibold">{Math.round(progressPercentage)}%</span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
            </div>

            <Separator />

            <div>
                <h3 className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-3">
                    <Users className="h-4 w-4" />
                    Team Members (1)
                </h3>
                 {assignedUser && (
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                        <div className="flex-1">
                            <p className="font-semibold text-foreground">{assignedUser.username}</p>
                            <p className="text-xs text-muted-foreground">{assignedUser.email}</p>
                        </div>
                        <Badge variant="outline">{assignedUser.role}</Badge>
                    </div>
                )}
            </div>
        </div>

        <DialogFooter className="p-6 bg-muted/30 border-t flex justify-between items-center">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CalendarDays className="h-4 w-4" />
                <span>Created on {format(parseISO(task.createdAt), "MMM d, yyyy")}</span>
            </div>
             <div className="flex items-center gap-2">
                {isAdmin && <Button onClick={handleSave}>Save Changes</Button>}
             </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
