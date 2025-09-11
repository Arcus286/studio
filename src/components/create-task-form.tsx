'use client';

import { useEffect } from 'react';
import { useFormState } from 'react-dom';
import { createTask, type CreateTaskState } from '@/lib/actions';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { SubmitButton } from './submit-button';

type CreateTaskFormProps = {
  onSuccess: () => void;
};

export function CreateTaskForm({ onSuccess }: CreateTaskFormProps) {
  const initialState: CreateTaskState = null;
  const [state, formAction] = useFormState(createTask, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state?.message && !state.errors) {
      toast({
        title: 'Success',
        description: state.message,
      });
      onSuccess();
    } else if (state?.message && state.errors) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: state.message,
      });
    }
  }, [state, toast, onSuccess]);

  return (
    <form action={formAction} className="grid gap-4 py-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" placeholder="e.g. Design new landing page" />
        {state?.errors?.title && (
          <p className="text-sm text-destructive">{state.errors.title.join(', ')}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Provide a detailed description of the task..."
        />
        {state?.errors?.description && (
          <p className="text-sm text-destructive">{state.errors.description.join(', ')}</p>
        )}
      </div>
      <SubmitButton buttonText="Create Task" />
    </form>
  );
}
