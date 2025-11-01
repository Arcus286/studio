'use client';

import { KanbanBoard } from '@/components/kanban/kanban-board';
import { DashboardAnalytics } from '@/components/dashboard/dashboard-analytics';
import { useState, useMemo, useEffect } from 'react';
import type { Task, TaskStatus, Project, User } from '@/lib/types';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Search, MoreHorizontal } from 'lucide-react';
import { USERS } from '@/lib/data';
import { useStore } from '@/lib/store';
import { useSprintStore } from '@/lib/sprint-store';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '../ui/tooltip';
import { isPast } from 'date-fns';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface ProjectBoardProps {
  project: Project;
}

const generateColor = (seed: string) => {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  const h = hash % 360;
  return `hsl(${h}, 50%, 70%)`;
};


function AllMembersDialog({ members }: { members: User[] }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>All Project Members</DialogTitle>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-auto">
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead>Member</TableHead>
                <TableHead>Role</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {members.map(member => (
                <TableRow key={member.id}>
                    <TableCell className="font-medium">{member.username}</TableCell>
                    <TableCell>{member.role}</TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ProjectBoardContent({ project }: ProjectBoardProps) {
  const [highlightedStatus, setHighlightedStatus] = useState<TaskStatus | 'all' | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const allTasks = useStore((state) => state.tasks);
  const { sprints } = useSprintStore();

  const activeSprint = useMemo(() => {
    return sprints.find(s => s.projectId === project.id && s.status === 'active');
  }, [sprints, project.id]);

  const sprintTasks = useMemo(() => {
    if (!activeSprint) return [];
    return allTasks.filter(t => t.sprintId === activeSprint.id);
  }, [allTasks, activeSprint]);

  const projectMembers = useMemo(() => {
    return USERS.filter(user => project.members.some(m => m.id === user.id)).sort((a, b) => a.username.localeCompare(b.username));
  }, [project]);
  
  const visibleMembers = projectMembers.slice(0, 15);
  const hiddenMembersCount = projectMembers.length - visibleMembers.length;


  const handleAnalyticsClick = (status: TaskStatus | 'all') => {
    setHighlightedStatus(status);
    setTimeout(() => {
      setHighlightedStatus(null);
    }, 1500);
  };

  const filteredTasks = sprintTasks.filter(task => {
    // Explicitly filter out overdue tasks from being displayed on the board
    const isOverdue = task.deadline ? isPast(new Date(task.deadline)) : false;
    if (isOverdue) return false;

    if (!searchTerm) return true;

    const term = searchTerm.toLowerCase();
    const user = USERS.find(u => u.role === task.assignedRole);
    const sprint = sprints.find(s => s.id === task.sprintId);
    const story = allTasks.find(t => t.id === task.storyId);

    return task.id.toLowerCase().includes(term) ||
      task.title.toLowerCase().includes(term) ||
      task.type.toLowerCase().includes(term) ||
      (user && user.username.toLowerCase().includes(term)) ||
      (sprint && sprint.name.toLowerCase().includes(term)) ||
      (story && story.title.toLowerCase().includes(term));
  });

  return (
    <>
      <DashboardAnalytics tasks={sprintTasks} onCardClick={handleAnalyticsClick} />
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 my-6">
        <div className="flex items-center gap-2">
          <TooltipProvider>
            {visibleMembers.map(member => (
              <Tooltip key={member.id}>
                <TooltipTrigger>
                  <Avatar>
                    <AvatarFallback style={{ backgroundColor: generateColor(member.username) }}>
                      {member.username.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{member.username}</p>
                </TooltipContent>
              </Tooltip>
            ))}
            {hiddenMembersCount > 0 && (
                <AllMembersDialog members={projectMembers} />
            )}
          </TooltipProvider>
        </div>
        <div className="relative w-full sm:w-auto sm:min-w-[300px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={`Search tasks...`}
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <KanbanBoard tasks={filteredTasks} highlightedStatus={highlightedStatus} />
    </>
  );
}


export function ProjectBoard({ project }: ProjectBoardProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return <ProjectBoardContent project={project} />;
}
