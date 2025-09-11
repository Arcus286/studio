'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ROLES, TASK_TYPES, PRIORITIES } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft, PlusCircle } from 'lucide-react';
import Link from 'next/link';

const taskSchema = z.object({
  title: z.string().min(1, 'Title is required.'),
  description: z.string().min(1, 'Description is required.'),
  type: z.string().min(1, 'Please select a task type.'),
  priority: z.string().min(1, 'Please select a priority.'),
  estimatedHours: z.coerce.number().min(0.5, 'Estimated hours must be at least 0.5.'),
  assignedRole: z.string().min(1, 'Please assign a role.'),
});

type TaskFormValues = z.infer<typeof taskSchema>;

export function NewTaskForm() {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: '',
      description: '',
      type: '',
      priority: 'Medium',
      estimatedHours: 1,
      assignedRole: '',
    },
  });

  const onSubmit = (data: TaskFormValues) => {
    console.log('New task data:', data); // In real app, call server action
    toast({
      title: 'Task Created!',
      description: `"${data.title}" has been added to the board.`,
    });
    form.reset();
    router.push('/dashboard');
  };

  return (
    <div>
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold mb-2">Add New Task</h1>
        <p className="text-muted-foreground mb-6">Create a new assignment, project task, or reminder.</p>

        <Card>
            <CardHeader className='bg-primary/10'>
                 <CardTitle className="flex items-center gap-2 text-primary">
                    <PlusCircle className="h-5 w-5" />
                    Task Information
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
                <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
                    <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>What needs to be done?</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g. Complete math homework, Fix broken calculator, Study for exam" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                        control={form.control}
                        name="assignedRole"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Which course/project?</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Choose your course or project" />
                                    </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {ROLES.filter(r => r !== 'Admin').map(role => (
                                            <SelectItem key={role} value={role}>{role} Project</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Additional Details</FormLabel>
                        <FormControl>
                            <Textarea
                            placeholder="Add more details, requirements, or notes about this task..."
                            {...field}
                            />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Type of Work</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a type" />
                                        </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {TASK_TYPES.map(type => (
                                                <SelectItem key={type} value={type}>{type}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="priority"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>How urgent is this?</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select priority" />
                                        </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {PRIORITIES.map(priority => (
                                                <SelectItem key={priority} value={priority}>{priority}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="estimatedHours"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Difficulty Level (Hours)</FormLabel>
                                <FormControl>
                                    <Input type="number" min="0" step="0.5" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                   
                    <div className="flex justify-end gap-2 mt-4">
                        <Button type="button" variant="outline" onClick={() => router.push('/dashboard')}>Cancel</Button>
                        <Button type="submit">Add Task</Button>
                    </div>
                </form>
                </Form>
            </CardContent>
        </Card>
    </div>
  );
}
