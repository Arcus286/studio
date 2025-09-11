export type TaskStatus = 'To Do' | 'In Progress' | 'Done';

export type Task = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
};
