
import { create } from 'zustand';
import type { Task, Role, KanbanColumnData, Notification } from './types';
import { TASKS as initialTasks, KANBAN_COLUMNS as initialColumns, NOTIFICATIONS as initialNotifications } from './data';
import { persist, createJSONStorage } from 'zustand/middleware';

interface TaskStore {
  tasks: Task[];
  columns: KanbanColumnData[];
  notifications: Notification[];
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'timeSpent' | 'comments' | 'dependsOn'>) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  deleteTask: (taskId: string) => void;
  addComment: (taskId: string, comment: Omit<Task['comments'][0], 'id' | 'createdAt'>) => void;
  setTasks: (tasks: Task[]) => void;
  setColumns: (columns: KanbanColumnData[]) => void;
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt' | 'read'>) => void;
  setNotifications: (notifications: Notification[]) => void;
  markNotificationAsRead: (notificationId: string) => void;
  markAllNotificationsAsRead: () => void;
}

export const useStore = create<TaskStore>()(
  persist(
    (set) => ({
      tasks: initialTasks,
      columns: initialColumns,
      notifications: initialNotifications,
      setTasks: (tasks) => set({ tasks }),
      setColumns: (columns) => set({ columns }),
      setNotifications: (notifications) => set({ notifications }),
      addTask: (task) =>
        set((state) => {
          const maxId = state.tasks.reduce((max, t) => {
              const parts = t.id.split('-');
              const num = parseInt(parts[parts.length - 1], 10);
              return !isNaN(num) ? Math.max(max, num) : max;
          }, 0);

          const newId = `${task.type.toUpperCase()}-${String(maxId + 1).padStart(3, '0')}`;

          const newTask: Task = {
            ...task,
            id: newId,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            timeSpent: 0,
            assignedUserId: task.assignedUserId,
            storyId: task.storyId || undefined,
            comments: [],
            dependsOn: [],
          };
          return { tasks: [...state.tasks, newTask] };
        }),
      updateTask: (taskId, updates) =>
        set((state) => {
           let newTimeSpent = updates.timeSpent;
           const task = state.tasks.find(t => t.id === taskId);

           // Automatic time logging only if timeSpent is not explicitly provided in the update
           if (task && updates.timeSpent === undefined) {
             if (updates.status === 'done') {
                newTimeSpent = task.estimatedHours;
             } else if (updates.status === 'to-do') {
                newTimeSpent = 0;
             }
           }

          return {
            tasks: state.tasks.map((task) =>
              task.id === taskId
                ? { ...task, ...updates, timeSpent: newTimeSpent ?? task.timeSpent, updatedAt: new Date().toISOString() }
                : task
            ),
          };
        }),
      deleteTask: (taskId) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== taskId),
        })),
      addComment: (taskId, comment) =>
        set((state) => ({
            tasks: state.tasks.map((task) => {
                if (task.id === taskId) {
                    const newComment = {
                        ...comment,
                        id: `C${(task.comments?.length || 0) + 1}-${taskId}`,
                        createdAt: new Date().toISOString(),
                    };
                    return {
                        ...task,
                        comments: [...(task.comments || []), newComment],
                    };
                }
                return task;
            }),
        })),
        addNotification: (notification) =>
        set((state) => {
            const newNotification: Notification = {
                ...notification,
                id: `N-${Date.now()}`,
                createdAt: new Date().toISOString(),
                read: false,
            };
            return { notifications: [newNotification, ...state.notifications] };
        }),
        markNotificationAsRead: (notificationId) =>
            set((state) => ({
                notifications: state.notifications.map((n) =>
                    n.id === notificationId ? { ...n, read: true } : n
                ),
            })),
        markAllNotificationsAsRead: () =>
            set((state) => ({
                notifications: state.notifications.map((n) => ({ ...n, read: true })),
            })),
    }),
    {
      name: 'task-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
