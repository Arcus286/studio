'use client';

import { useState } from 'react';
import type { Task, Role } from '@/lib/types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ROLES } from '@/lib/data';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { format, parseISO } from 'date-fns';

type TaskDetailDialogProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  task: Task;
};

export function TaskDetailDialog({ isOpen, onOpenChange, task }: TaskDetailDialogProps) {
  const { user } = useAuth();
  const isAdmin = user?.role === 'Admin';
  const { toast } = useToast();

  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [assignedRole, setAssignedRole] = useState<Role>(task.assignedRole);
  const [estimatedHours, setEstimatedHours] = useState(task.estimatedHours);
  
  const handleSave = () => {
    // In a real app, this would be a server action
    console.log({ title, description, assignedRole, estimatedHours });
    toast({
        title: 'Task Updated',
        description: `"${title}" has been saved.`
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{isAdmin ? 'Edit Task' : 'Task Details'}</DialogTitle>
           <DialogDescription>
             Last updated on {format(parseISO(task.updatedAt), "MMMM d, yyyy 'at' h:mm a")}
            </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} readOnly={!isAdmin} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} readOnly={!isAdmin} className="min-h-[100px]" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label htmlFor="role">Assigned Role</Label>
                {isAdmin ? (
                     <Select value={assignedRole} onValueChange={(value) => setAssignedRole(value as Role)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                            {ROLES.filter(r => r !== 'Admin').map(role => (
                                <SelectItem key={role} value={role}>{role}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                ) : (
                    <Input value={assignedRole} readOnly />
                )}
            </div>
            <div className="space-y-2">
                <Label htmlFor="hours">Estimated Hours</Label>
                <Input id="hours" type="number" value={estimatedHours} onChange={(e) => setEstimatedHours(Number(e.target.value))} readOnly={!isAdmin} />
            </div>
          </div>
        </div>
        {isAdmin && (
            <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                <Button onClick={handleSave}>Save Changes</Button>
            </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
