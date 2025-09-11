export type Role = 'Frontend' | 'Backend' | 'Designer' | 'Project Manager' | 'Admin';

export type User = {
  id: string;
  username: string;
  email: string;
  role: Role;
  avatar?: string;
};

export type TaskStatus = 'To Do' | 'In Progress' | 'Done';

export type Task = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  assignedRole: Role;
  estimatedHours: number;
  timeSpent: number;
  createdAt: string;
  updatedAt: string;
};
