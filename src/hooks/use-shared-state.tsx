'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import type { Task, Project, Sprint, Notification, KanbanColumnData, Comment } from '@/lib/types';
import { getFullDbState, setDbValue } from '@/ai/flows/database-flow';
import Loading from '@/app/loading';
import { useAuth } from './use-auth';

interface SharedState {
  tasks: Task[];
  projects: Project[];
  sprints: Sprint[];
  notifications: Notification[];
  columns: KanbanColumnData[];
}

interface SharedStateContextType extends SharedState {
  isLoading: boolean;
  updateTasks: (tasks: Task[]) => void;
  updateProjects: (projects: Project[]) => void;
  updateSprints: (sprints: Sprint[]) => void;
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'timeSpent' | 'comments' | 'dependsOn'>) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  deleteTask: (taskId: string) => void;
  addComment: (taskId: string, comment: Omit<Comment, 'id' | 'createdAt'>) => void;
  addProject: (projectData: Omit<Project, 'id' | 'status' | 'completion' | 'createdAt' | 'issues' | 'sprints'> & { buckets?: string[] }) => void;
  updateProject: (projectId: string, updatedData: Partial<Project>) => void;
  deleteProject: (projectId: string) => void;
  addSprint: (sprint: Omit<Sprint, 'id' | 'status'>) => void;
  startSprint: (sprintId: string, projectId: string) => void;
  completeSprint: (sprintId: string, projectId: string) => void;
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt' | 'read'>) => void;
  markNotificationAsRead: (notificationId: string) => void;
  markAllNotificationsAsRead: () => void;
}

const SharedStateContext = createContext<SharedStateContextType | null>(null);

const optionalBuckets: KanbanColumnData[] = [
    { id: 'under-development', title: 'Under Development', color: 'border-cyan-500' },
    { id: 'blocked', title: 'Blocked', color: 'border-red-500' },
    { id: 'under-testing', title: 'Under Testing', color: 'border-orange-500' },
    { id: 'ready-for-deployment', title: 'Ready for Deployment', color: 'border-green-500' },
    { id: 'closed', title: 'Closed', color: 'border-gray-500' },
];

export function SharedStateProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<SharedState>({
    tasks: [],
    projects: [],
    sprints: [],
    notifications: [],
    columns: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth(); // To get current user for comments etc.


  const syncState = useCallback(async () => {
    try {
      const fullState = await getFullDbState();
      setState(fullState);
    } catch (error) {
      console.error("Failed to fetch shared state:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    syncState();
    // Optional: set up polling to refresh state periodically
    const interval = setInterval(syncState, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, [syncState]);
  
  const updateAndPersist = async <K extends keyof SharedState>(key: K, value: SharedState[K]) => {
      setState(prevState => ({ ...prevState, [key]: value }));
      await setDbValue({ key, value });
  };
  
  const addProject = async (projectData: Omit<Project, 'id' | 'status' | 'completion' | 'createdAt' | 'issues' | 'sprints'> & { buckets?: string[] }) => {
    const maxId = state.projects.reduce((max, p) => {
        const num = parseInt(p.id.split('-')[1], 10);
        return num > max ? num : max;
    }, 0);
    const newId = `PROJ-${String(maxId + 1).padStart(3, '0')}`;
    
    const newProject: Project = {
      ...projectData,
      id: newId,
      status: 'active',
      completion: 0,
      createdAt: new Date().toISOString(),
      issues: 0,
      sprints: [],
    };
    const newProjects = [...state.projects, newProject];
    await updateAndPersist('projects', newProjects);
    
    if (projectData.buckets && projectData.buckets.length > 0) {
      const newColumns = optionalBuckets.filter(b => projectData.buckets?.includes(b.id));
      const allColumns = [...state.columns, ...newColumns.filter(nc => !state.columns.some(sc => sc.id === nc.id))];
      await updateAndPersist('columns', allColumns);
    }
  };
  
  const updateProject = async (projectId: string, updatedData: Partial<Project>) => {
      const newProjects = state.projects.map(p => p.id === projectId ? { ...p, ...updatedData } : p);
      await updateAndPersist('projects', newProjects);
  };

  const deleteProject = async (projectId: string) => {
      const newProjects = state.projects.filter(p => p.id !== projectId);
      const newTasks = state.tasks.filter(t => t.projectId !== projectId);
      await updateAndPersist('projects', newProjects);
      await updateAndPersist('tasks', newTasks);
  };

  const addTask = async (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'timeSpent' | 'comments' | 'dependsOn'>) => {
      const maxId = state.tasks.reduce((max, t) => {
          const parts = t.id.split('-');
          const num = parseInt(parts[parts.length - 1], 10);
          return !isNaN(num) ? Math.max(max, num) : max;
      }, 0);
      const newId = `${taskData.type.toUpperCase()}-${String(maxId + 1).padStart(3, '0')}`;
      const newTask: Task = {
        ...taskData,
        id: newId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        timeSpent: 0,
        comments: [],
        dependsOn: [],
      };
      const newTasks = [...state.tasks, newTask];
      await updateAndPersist('tasks', newTasks);
  };
  
  const updateTask = async (taskId: string, updates: Partial<Task>) => {
      const newTasks = state.tasks.map(t => t.id === taskId ? { ...t, ...updates, updatedAt: new Date().toISOString() } : t);
      await updateAndPersist('tasks', newTasks);
  };
  
  const deleteTask = async (taskId: string) => {
      const newTasks = state.tasks.filter(t => t.id !== taskId);
      await updateAndPersist('tasks', newTasks);
  };

  const addComment = async (taskId: string, comment: Omit<Comment, 'id' | 'createdAt'>) => {
      const newTasks = state.tasks.map((task) => {
          if (task.id === taskId) {
              const newComment = {
                  ...comment,
                  id: `C${(task.comments?.length || 0) + 1}-${taskId}`,
                  createdAt: new Date().toISOString(),
              };
              return { ...task, comments: [...(task.comments || []), newComment] };
          }
          return task;
      });
      await updateAndPersist('tasks', newTasks);
  };
  
  const addSprint = async (sprintData: Omit<Sprint, 'id' | 'status'>) => {
      const maxId = state.sprints.reduce((max, s) => {
          const num = parseInt(s.id.split('-')[1], 10);
          return num > max ? num : max;
      }, 0);
      const newId = `SPRINT-${String(maxId + 1).padStart(3, '0')}`;
      const newSprint: Sprint = { ...sprintData, id: newId, status: 'upcoming' };
      const newSprints = [...state.sprints, newSprint];
      await updateAndPersist('sprints', newSprints);
  };

  const startSprint = async (sprintId: string, projectId: string) => {
      const newSprints = state.sprints.map(s => {
          if (s.projectId === projectId && s.status === 'active') return { ...s, status: 'upcoming' as const };
          if (s.id === sprintId) return { ...s, status: 'active' as const };
          return s;
      });
      await updateAndPersist('sprints', newSprints);
  };

  const completeSprint = async (sprintId: string, projectId: string) => {
      const sprintToComplete = state.sprints.find(s => s.id === sprintId);
      if (!sprintToComplete) return;

      const sprintTasks = state.tasks.filter(task => task.sprintId === sprintId);
      const doneTasks = sprintTasks.filter(t => t.status === 'done');
      const completionPercentage = sprintTasks.length > 0 ? (doneTasks.length / sprintTasks.length) * 100 : 0;
      
      const updatedTasks = state.tasks.map(task => {
          if (task.sprintId === sprintId && task.status !== 'done') {
              return { ...task, sprintId: undefined };
          }
          return task;
      });
      await updateAndPersist('tasks', updatedTasks);

      const newSprints = state.sprints.map(s => 
          s.id === sprintId ? { 
              ...s, 
              status: 'completed' as const,
              completedIssues: doneTasks.length,
              totalIssues: sprintTasks.length,
              completionPercentage: completionPercentage,
          } : s
      );
      await updateAndPersist('sprints', newSprints);
  };
  
  const addNotification = async (notificationData: Omit<Notification, 'id' | 'createdAt' | 'read'>) => {
      const newNotification: Notification = {
          ...notificationData,
          id: `N-${Date.now()}`,
          createdAt: new Date().toISOString(),
          read: false,
      };
      const newNotifications = [newNotification, ...state.notifications];
      await updateAndPersist('notifications', newNotifications);
  };
  
  const markNotificationAsRead = async (notificationId: string) => {
      const newNotifications = state.notifications.map(n => n.id === notificationId ? { ...n, read: true } : n);
      await updateAndPersist('notifications', newNotifications);
  };

  const markAllNotificationsAsRead = async () => {
      const newNotifications = state.notifications.map(n => ({...n, read: true}));
      await updateAndPersist('notifications', newNotifications);
  };


  if (isLoading) {
    return <Loading />;
  }

  return (
    <SharedStateContext.Provider value={{ 
        ...state, 
        isLoading, 
        updateTasks: (tasks) => updateAndPersist('tasks', tasks),
        updateProjects: (projects) => updateAndPersist('projects', projects),
        updateSprints: (sprints) => updateAndPersist('sprints', sprints),
        addTask,
        updateTask,
        deleteTask,
        addComment,
        addProject,
        updateProject,
        deleteProject,
        addSprint,
        startSprint,
        completeSprint,
        addNotification,
        markNotificationAsRead,
        markAllNotificationsAsRead,
    }}>
      {children}
    </SharedStateContext.Provider>
  );
}

export function useSharedState() {
  const context = useContext(SharedStateContext);
  if (!context) {
    throw new Error('useSharedState must be used within a SharedStateProvider');
  }
  return context;
}
