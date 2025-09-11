'use client';

import { useState, useTransition } from 'react';
import { Button } from './ui/button';
import { Wand2, Loader2 } from 'lucide-react';
import { getSuggestedStatus, updateTaskStatus } from '@/lib/actions';
import type { Task, TaskStatus } from '@/lib/types';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import type { SuggestTaskStatusOutput } from '@/ai/flows/suggest-task-status';
import { useToast } from '@/hooks/use-toast';

type SuggestStatusButtonProps = {
  task: Task;
};

export function SuggestStatusButton({ task }: SuggestStatusButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [suggestion, setSuggestion] = useState<SuggestTaskStatusOutput | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleSuggestStatus = () => {
    startTransition(async () => {
      const result = await getSuggestedStatus(task.description);
      setSuggestion(result);
      setIsDialogOpen(true);
    });
  };

  const handleApplySuggestion = async () => {
    if (suggestion) {
      await updateTaskStatus(task.id, suggestion.suggestedStatus as TaskStatus);
      toast({
        title: 'Status Updated',
        description: `Task status updated to "${suggestion.suggestedStatus}" based on AI suggestion.`,
      });
      setIsDialogOpen(false);
    }
  };

  return (
    <>
      <Button variant="outline" onClick={handleSuggestStatus} disabled={isPending}>
        {isPending ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Wand2 className="mr-2 h-4 w-4" />
        )}
        Suggest Status
      </Button>
      {suggestion && (
        <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>AI Status Suggestion</AlertDialogTitle>
              <AlertDialogDescription>
                Based on the task details, we suggest the following status.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="my-4 rounded-lg border bg-secondary p-4">
              <p className="font-semibold text-lg text-primary">
                {suggestion.suggestedStatus}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                <span className="font-medium text-foreground">Reason:</span> {suggestion.reason}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                <span className="font-medium text-foreground">Confidence:</span> {Math.round(suggestion.confidence * 100)}%
              </p>
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleApplySuggestion}>
                Apply Suggestion
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
}
