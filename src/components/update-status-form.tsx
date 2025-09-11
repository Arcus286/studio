'use client';

import { useTransition } from 'react';
import { updateTaskStatus } from '@/lib/actions';
import type { TaskStatus } from '@/lib/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

type UpdateStatusFormProps = {
  taskId: string;
  currentStatus: TaskStatus;
};

const statuses: TaskStatus[] = ['To Do', 'In Progress', 'Done'];

export function UpdateStatusForm({ taskId, currentStatus }: UpdateStatusFormProps) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleStatusChange = (newStatus: TaskStatus) => {
    startTransition(async () => {
      const result = await updateTaskStatus(taskId, newStatus);
      if (result.success) {
        toast({
          title: 'Status Updated',
          description: `Task status changed to "${newStatus}".`,
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Update Failed',
          description: result.error || 'Could not update the task status.',
        });
      }
    });
  };

  return (
    <Select
      defaultValue={currentStatus}
      onValueChange={handleStatusChange}
      disabled={isPending}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Change status" />
      </SelectTrigger>
      <SelectContent>
        {statuses.map((status) => (
          <SelectItem key={status} value={status}>
            {status}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
