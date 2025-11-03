

'use client';

import { useState, useMemo, useEffect } from 'react';
import type { Task, Comment, Sprint } from '@/lib/types';
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
import { format, parseISO, isPast, formatDistanceToNow } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { CalendarDays, Users, Bug, CalendarClock, Trash2, Send, ArrowUp, ArrowDown, Layers, Flame, Link2 } from 'lucide-react';
import { CircleDot } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useStore } from '@/lib/store';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Textarea } from '../ui/textarea';
import { ScrollArea } from '../ui/scroll-area';
import { useSprintStore } from '@/lib/sprint-store';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

type TaskDetailDialogProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  task: Task;
};

const TaskTypeIcon = ({ type, className }: { type: 'Bug' | 'Task' | 'Story', className?: string }) => {
    const baseClassName = "h-5 w-5";
    switch (type) {
        case 'Bug':
            return <Bug className={cn(baseClassName, "text-red-500", className)} />;
        case 'Task':
            return <CircleDot className={cn(baseClassName, "text-blue-400", className)} />;
        case 'Story':
            return <Layers className={cn(baseClassName, "text-green-500", className)} />;
    }
}

function CommentItem({ comment }: { comment: Comment }) {
    const user = USERS.find(u => u.id === comment.userId);

    if (!user) return null;

    return (
        <div className="flex items-start gap-3">
            <Avatar className="h-8 w-8">
                <AvatarFallback>{user.username.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
                <div className="flex items-center gap-2">
                    <p className="font-semibold text-sm">{user.username}</p>
                    <p className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                    </p>
                </div>
                <p className="text-sm text-muted-foreground">{comment.message}</p>
            </div>
        </div>
    )
}

export function TaskDetailDialog({ isOpen, onOpenChange, task: initialTask }: TaskDetailDialogProps) {
  const { user } = useAuth();
  const { deleteTask, columns, addComment, tasks, updateTask } = useStore();
  const { sprints } = useSprintStore();
  const isManager = user?.userType === 'Manager' || user?.userType === 'Admin';
  const { toast } = useToast();
  const [newComment, setNewComment] = useState('');
  const [commentSortOrder, setCommentSortOrder] = useState<'asc' | 'desc'>('desc');

  // This ensures we always have the latest task data from the store
  const task = useStore(state => state.tasks.find(t => t.id === initialTask.id)) || initialTask;
  
  const [sprintId, setSprintId] = useState(task.sprintId);
  const [storyId, setStoryId] = useState(task.storyId);
  const [dependsOn, setDependsOn] = useState(task.dependsOn || []);
  const projectSprints = sprints.filter(s => s.projectId === task.projectId);
  const projectStories = tasks.filter(t => t.projectId === task.projectId && t.type === 'Story');
  const availableDependencies = tasks.filter(t => t.projectId === task.projectId && t.id !== task.id && t.type !== 'Story');

  useEffect(() => {
    setSprintId(task.sprintId);
    setStoryId(task.storyId);
    setDependsOn(task.dependsOn || []);
  }, [task]);


  const sortedComments = useMemo(() => {
    const comments = task.comments || [];
    return [...comments].sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return commentSortOrder === 'asc' ? dateA - dateB : dateB - a;
    });
  }, [task.comments, commentSortOrder]);
  
  const handleSave = () => {
    updateTask(task.id, task.status, task.timeSpent, {
        sprintId: sprintId,
        storyId: storyId,
        dependsOn: dependsOn,
    });
    toast({
        title: 'Task Updated',
        description: `Changes to "${task.title}" have been saved.`
    });
    onOpenChange(false);
  };
  
   const handleDelete = () => {
    deleteTask(task.id);
    toast({
      variant: 'destructive',
      title: 'Task Deleted',
      description: `"${task.title}" has been deleted.`,
    });
    onOpenChange(false);
  };

  const handleAddComment = () => {
    if (!newComment.trim() || !user) return;
    addComment(task.id, { userId: user.id, message: newComment.trim() });
    setNewComment('');
  }
  
  const progressPercentage = task.estimatedHours > 0 ? (task.timeSpent / task.estimatedHours) * 100 : 0;
  const assignedUser = USERS.find(u => u.id === task.assignedUserId);
  const statusLabel = columns.find(c => c.id === task.status)?.title || task.status;
  const isOverdue = task.deadline && isPast(new Date(task.deadline));


  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[80vh] flex flex-col p-0">
        <DialogHeader className="p-6 pb-4 border-b">
          <div className="flex items-center gap-3">
             <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
                <TaskTypeIcon type={task.type} className="h-6 w-6" />
             </div>
            <div>
                <DialogTitle className="text-xl">{task.title}</DialogTitle>
                <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline">{task.type}</Badge>
                    <Badge variant="secondary">{statusLabel}</Badge>
                </div>
            </div>
          </div>
        </DialogHeader>
        
        <div className="grid grid-cols-10 flex-1 overflow-hidden">
            <div className="col-span-7 border-r p-6 overflow-y-auto">
                <div className="space-y-6">
                    <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-2">Description</h3>
                        <p className="text-sm text-foreground">{task.description}</p>
                    </div>
                    
                    <Separator />
                    
                    <div className="grid grid-cols-2 gap-6">
                        {isManager && task.type !== 'Story' && (
                            <>
                            <div>
                                <h3 className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
                                <Flame className="h-4 w-4" />
                                Sprint
                                </h3>
                                <Select value={sprintId || ''} onValueChange={(value) => setSprintId(value === 'none' ? undefined : value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Assign to a sprint..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="none">Backlog</SelectItem>
                                        {projectSprints.map(s => (
                                            <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <h3 className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
                                <Layers className="h-4 w-4" />
                                Parent Story
                                </h3>
                                <Select value={storyId || ''} onValueChange={(value) => setStoryId(value === 'none' ? undefined : value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Link to a story..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="none">None</SelectItem>
                                        {projectStories.map(s => (
                                            <SelectItem key={s.id} value={s.id}>{s.title}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            </>
                        )}
                         {task.type !== 'Story' && (
                            <div className="col-span-2">
                                <h3 className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
                                <Link2 className="h-4 w-4" />
                                Dependencies
                                </h3>
                                <Select onValueChange={(value) => setDependsOn(value === 'none' ? [] : [value])} value={dependsOn[0] || 'none'}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Blocks which task?" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="none">None</SelectItem>
                                        {availableDependencies.map(dep => (
                                            <SelectItem key={dep.id} value={dep.id}>{dep.title}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-sm font-medium text-muted-foreground mb-3">Task Progress</h3>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-muted-foreground">{task.timeSpent}h / {task.estimatedHours}h</span>
                                <span className="text-sm font-semibold">{Math.round(progressPercentage)}%</span>
                            </div>
                            <Progress value={progressPercentage} className="h-2" />
                        </div>
                         {task.deadline && (
                            <div>
                                <h3 className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-3">
                                    <CalendarClock className="h-4 w-4" />
                                    Deadline
                                </h3>
                                <div className={cn("text-sm", isOverdue ? "text-red-500 font-semibold" : "text-foreground")}>
                                   {format(parseISO(task.deadline), "MMMM d, yyyy")}
                                   {isOverdue && " (Overdue)"}
                                </div>
                            </div>
                         )}
                    </div>

                    <Separator />

                    <div>
                        <h3 className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-3">
                            <Users className="h-4 w-4" />
                            Assigned To
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
            </div>
            <div className="col-span-3 p-6 flex flex-col bg-muted/50">
                 <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-semibold">Comments</h3>
                    <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setCommentSortOrder('desc')}>
                            <ArrowDown className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setCommentSortOrder('asc')}>
                            <ArrowUp className="h-4 w-4" />
                        </Button>
                    </div>
                 </div>
                 <ScrollArea className="flex-1 -mx-6 px-6">
                     <div className="space-y-4">
                        {sortedComments.map(comment => (
                            <CommentItem key={comment.id} comment={comment} />
                        ))}
                     </div>
                 </ScrollArea>
                 <div className="mt-4 flex gap-2">
                     <Textarea 
                        placeholder="Add a comment..." 
                        className="flex-1"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        rows={2}
                     />
                     <Button size="icon" onClick={handleAddComment} disabled={!newComment.trim()}>
                        <Send className="h-4 w-4" />
                     </Button>
                 </div>
            </div>
        </div>

        <DialogFooter className="p-6 bg-muted/30 border-t flex justify-between items-center">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CalendarDays className="h-4 w-4" />
                <span>Created on {format(parseISO(task.createdAt), "MMM d, yyyy")}</span>
            </div>
             <div className="flex items-center gap-2">
                {isManager && (
                  <>
                    <Button variant="destructive" onClick={handleDelete}>
                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                    </Button>
                    <Button onClick={handleSave}>Save Changes</Button>
                  </>
                )}
             </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
