export type Role = 'Frontend' | 'Backend' | 'Designer' | 'Project Manager' | 'Admin';

export type User = {
  id: string;
  username: string;
  email: string;
  password?: string;
  role: Role;
  avatar?: string;
};

export type TaskStatus = 'To Do' | 'In Progress' | 'In Review' | 'Done';
export type Priority = 'Low' | 'Medium' | 'High';
export type TaskType = 'Epic' | 'Story' | 'Task';


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
  priority: Priority;
  type: TaskType;
};

export type Project = {
    id: string;
    name: string;
    key: string;
    description: string;
    color: string;
    status: 'active' | 'inactive';
    completion: number;
    createdAt: string;
    issues: number;
    members: string[]; // array of user emails
};
