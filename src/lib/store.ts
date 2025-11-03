

import { create } from 'zustand';
import type { Task, Role, KanbanColumnData } from './types';
import { TASKS as initialTasks, KANBAN_COLUMNS as initialColumns } from './data';
import { persist, createJSONStorage } from 'zustand/middleware';

interface TaskStore {
  tasks: Task[];
  columns: KanbanColumnData[];
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'timeSpent'>) => void;
  updateTask: (taskId: string, newStatus: string, timeSpent: number, updates?: Partial<Pick<Task, 'sprintId' | 'storyId' | 'dependsOn'>>) => void;
  assignTaskToSprint: (taskId: string, sprintId: string | undefined) => void;
  deleteTask: (taskId: string) => void;
  addComment: (taskId: string, comment: Omit<Task['comments'][0], 'id' | 'createdAt'>) => void;
  setTasks: (tasks: Task[]) => void;
  setColumns: (columns: KanbanColumnData[]) => void;
}

export const useStore = create<TaskStore>()(
  persist(
    (set) => ({
      tasks: initialTasks,
      columns: initialColumns,
      setTasks: (tasks) => set({ tasks }),
      setColumns: (columns) => set({ columns }),
      addTask: (task) =>
        set((state) => {
          const newTask: Task = {
            ...task,
            id: `TASK-${state.tasks.length + 1}`,
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
      updateTask: (taskId, newStatus, timeSpent, updates) =>
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
                ? { ...task, status: newStatus, timeSpent: newTimeSpent, updatedAt: new Date().toISOString(), ...updates }
                : task
            ),
          };
        }),
      assignTaskToSprint: (taskId, sprintId) => set((state) => ({
        tasks: state.tasks.map((task) =>
            task.id === taskId ? { ...task, sprintId: sprintId, updatedAt: new Date().toISOString() } : task
        ),
      })),
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
    }),
    {
      name: 'task-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
