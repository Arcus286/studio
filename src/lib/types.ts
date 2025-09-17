
export type UserType = 'Admin' | 'Manager' | 'User';
export type Role = 'Frontend' | 'Backend' | 'Designer' | 'Developer' | 'Admin' | 'Manager' | 'None';

export type User = {
  id: string;
  username: string;
  email: string;
  password?: string;
  userType: UserType;
  role: Role;
  status: 'pending' | 'active';
  designation?: string;
  phoneNumber?: string;
  bio?: string;
};

export type KanbanColumnData = {
  id: string;
  title: string;
  color: string;
};


export type TaskStatus = string;
export type Priority = 'Low' | 'Medium' | 'High';
export type TaskType = 'Bug' | 'Task' | 'Story';


export type Task = {
  id: string;
  projectId: string;
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
  deadline?: string;
  storyId?: string;
};

export type ProjectMember = {
    id: string;
}

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
    members: ProjectMember[]; // array of user ids
};

export type Notification = {
    id: string;
    title: string;
    message: string;
    createdAt: string;
    read: boolean;
};
