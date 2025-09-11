'use server';

import { revalidatePath } from 'next/cache';
import { notFound } from 'next/navigation';
import { z } from 'zod';
import type { Task, TaskStatus } from '@/lib/types';
import { suggestTaskStatus as suggestTaskStatusFlow, SuggestTaskStatusOutput } from '@/ai/flows/suggest-task-status';

// In-memory store for tasks
let tasks: Task[] = [
  {
    id: '1',
    title: 'Implement user authentication',
    description: 'Set up NextAuth.js with email/password provider and connect to a database.',
    status: 'Done',
    createdAt: new Date('2023-10-01T10:00:00Z'),
    updatedAt: new Date('2023-10-02T15:30:00Z'),
  },
  {
    id: '2',
    title: 'Design the main dashboard UI',
    description: 'Create mockups and wireframes for the main dashboard, including task list and sidebar navigation.',
    status: 'In Progress',
    createdAt: new Date('2023-10-03T09:00:00Z'),
    updatedAt: new Date('2023-10-05T11:00:00Z'),
  },
  {
    id: '3',
    title: 'Set up project structure',
    description: 'Initialize a new Next.js project, install necessary dependencies like Tailwind CSS and shadcn/ui.',
    status: 'To Do',
    createdAt: new Date('2023-10-05T14:00:00Z'),
    updatedAt: new Date('2023-10-05T14:00:00Z'),
  },
];

const CreateTaskSchema = z.object({
  title: z.string().min(1, 'Title is required.'),
  description: z.string().min(1, 'Description is required.'),
});

export type CreateTaskState = {
  errors?: {
    title?: string[];
    description?: string[];
  };
  message?: string | null;
} | null;

export async function createTask(prevState: CreateTaskState, formData: FormData): Promise<CreateTaskState> {
  const validatedFields = CreateTaskSchema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Failed to create task. Please check the fields.',
    };
  }

  try {
    const newTask: Task = {
      id: `${Date.now()}`,
      title: validatedFields.data.title,
      description: validatedFields.data.description,
      status: 'To Do',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    tasks.unshift(newTask);

    revalidatePath('/');
    return { message: 'Task created successfully.' };
  } catch (error) {
    return { message: 'Database Error: Failed to Create Task.' };
  }
}

export async function getTasks(): Promise<Task[]> {
  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return tasks;
}

export async function getTask(id: string): Promise<Task> {
  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 500));
  const task = tasks.find((task) => task.id === id);
  if (!task) {
    notFound();
  }
  return task;
}

export async function updateTaskStatus(id: string, status: TaskStatus) {
  const taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex === -1) {
    return { error: 'Task not found.' };
  }
  tasks[taskIndex].status = status;
  tasks[taskIndex].updatedAt = new Date();
  
  revalidatePath('/');
  revalidatePath(`/tasks/${id}`);
  return { success: true };
}

export async function getSuggestedStatus(taskDescription: string): Promise<SuggestTaskStatusOutput> {
  // We'll use the description as "recent activity" for simplicity
  const result = await suggestTaskStatusFlow({ taskDescription, recentActivity: taskDescription });
  return result;
}
