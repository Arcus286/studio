
import { create } from 'zustand';
import type { Sprint } from './types';
import { SPRINTS as initialSprints } from './data';
import { persist, createJSONStorage } from 'zustand/middleware';
import { useStore } from './store'; // Import the task store

interface SprintStore {
  sprints: Sprint[];
  addSprint: (sprint: Omit<Sprint, 'id' | 'status'>) => void;
  startSprint: (sprintId: string, projectId: string) => void;
  completeSprint: (sprintId: string, projectId: string) => void;
  setSprints: (sprints: Sprint[]) => void;
}

export const useSprintStore = create<SprintStore>()(
  persist(
    (set, get) => ({
      sprints: initialSprints,
      setSprints: (sprints) => set({ sprints }),
      addSprint: (sprint) =>
        set((state) => {
          const newSprint: Sprint = {
            ...sprint,
            id: `SPRINT-${state.sprints.length + 1}`,
            status: 'upcoming',
          };
          return { sprints: [...state.sprints, newSprint] };
        }),
      startSprint: (sprintId, projectId) => {
        set((state) => {
          // Deactivate any other active sprint for the same project
          const updatedSprints = state.sprints.map((s) => {
            if (s.projectId === projectId && s.status === 'active') {
              return { ...s, status: 'upcoming' as 'upcoming' };
            }
            if (s.id === sprintId) {
              return { ...s, status: 'active' as 'active' };
            }
            return s;
          });
          return { sprints: updatedSprints };
        });
      },
      completeSprint: (sprintId, projectId) => {
        const { tasks, setTasks } = useStore.getState();
        const sprintToComplete = get().sprints.find(s => s.id === sprintId);

        if (sprintToComplete) {
            const unfinishedTasks = tasks.filter(
                (task) => task.sprintId === sprintId && task.status !== 'done'
            );
            
            // Move unfinished tasks back to the backlog (by unsetting sprintId)
            const updatedTasks = tasks.map(task => 
                unfinishedTasks.some(ut => ut.id === task.id) 
                    ? { ...task, sprintId: undefined, status: 'to-do' as 'to-do' } 
                    : task
            );

            setTasks(updatedTasks);
        }

        set((state) => ({
          sprints: state.sprints.map((s) =>
            s.id === sprintId ? { ...s, status: 'completed' as 'completed' } : s
          ),
        }));
      },
    }),
    {
      name: 'sprint-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
