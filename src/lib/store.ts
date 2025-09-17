
import { create } from 'zustand';
import type { Task, Role } from './types';
import { TASKS as initialTasks } from './data';
import { persist, createJSONStorage } from 'zustand/middleware';

interface TaskStore {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'timeSpent'>) => void;
  updateTask: (taskId: string, newStatus: string, timeSpent: number) => void;
  deleteTask: (taskId: string) => void;
  setTasks: (tasks: Task[]) => void;
}

export const useStore = create<TaskStore>()(
  persist(
    (set) => ({
      tasks: initialTasks,
      setTasks: (tasks) => set({ tasks }),
      addTask: (task) =>
        set((state) => {
          const newTask: Task = {
            ...task,
            id: `TASK-${state.tasks.length + 1}`,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            timeSpent: 0,
            assignedRole: task.assignedRole as Role,
            storyId: task.storyId || undefined,
          };
          return { tasks: [...state.tasks, newTask] };
        }),
      updateTask: (taskId, newStatus, timeSpent) =>
        set((state) => {
           let newTimeSpent = timeSpent;
           const task = state.tasks.find(t => t.id === taskId);
           if (task) {
             if (newStatus === 'done') {
                newTimeSpent = task.estimatedHours;
             } else if (newStatus === 'to-do') {
                newTimeSpent = 0;
             }
           }

          return {
            tasks: state.tasks.map((task) =>
              task.id === taskId
                ? { ...task, status: newStatus, timeSpent: newTimeSpent, updatedAt: new Date().toISOString() }
                : task
            ),
          };
        }),
      deleteTask: (taskId) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== taskId),
        })),
    }),
    {
      name: 'task-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
