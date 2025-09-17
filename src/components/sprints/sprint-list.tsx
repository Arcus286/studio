
'use client';

import { useSprintStore } from '@/lib/sprint-store';
import { useMemo } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Flame, CheckCircle, Play, Calendar, Flag } from 'lucide-react';
import { format, formatDistance } from 'date-fns';
import { useStore } from '@/lib/store';
import { Progress } from '../ui/progress';
import { useAuth } from '@/hooks/use-auth';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


interface SprintListProps {
  projectId: string;
}

export function SprintList({ projectId }: SprintListProps) {
  const { user } = useAuth();
  const isManager = user?.userType === 'Manager' || user?.userType === 'Admin';
  const { sprints, startSprint, completeSprint } = useSprintStore();
  const { tasks } = useStore();

  const projectSprints = useMemo(() => {
    return sprints
      .filter(s => s.projectId === projectId)
      .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
  }, [sprints, projectId]);
  
  const activeSprintExists = useMemo(() => projectSprints.some(s => s.status === 'active'), [projectSprints]);

  return (
    <div className="space-y-6">
      {projectSprints.map(sprint => {
        const sprintTasks = tasks.filter(t => t.sprintId === sprint.id);
        const doneTasks = sprintTasks.filter(t => t.status === 'done').length;
        const completion = sprintTasks.length > 0 ? (doneTasks / sprintTasks.length) * 100 : 0;
        
        const statusColors = {
            active: 'border-primary',
            upcoming: 'border-blue-500',
            completed: 'border-green-500',
        };
        const statusIcons = {
            active: <Flame className="h-5 w-5 text-primary" />,
            upcoming: <Calendar className="h-5 w-5 text-blue-500" />,
            completed: <CheckCircle className="h-5 w-5 text-green-500" />,
        };

        return (
          <Card key={sprint.id} className={statusColors[sprint.status]}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {statusIcons[sprint.status]}
                    {sprint.name}
                  </CardTitle>
                  <CardDescription>
                    {format(new Date(sprint.startDate), 'MMM d, yyyy')} - {format(new Date(sprint.endDate), 'MMM d, yyyy')}
                    ({formatDistance(new Date(sprint.endDate), new Date(sprint.startDate))})
                  </CardDescription>
                </div>
                <Badge variant={sprint.status === 'active' ? 'default' : 'secondary'}>{sprint.status}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
                {sprint.goal && (
                    <div className="flex items-start gap-3 p-3 rounded-md bg-muted/50">
                        <Flag className="h-5 w-5 text-muted-foreground mt-1" />
                        <div>
                             <h4 className="font-semibold">Sprint Goal</h4>
                             <p className="text-sm text-muted-foreground">{sprint.goal}</p>
                        </div>
                    </div>
                )}
              <div>
                <div className="flex justify-between items-center mb-1 text-sm">
                  <span className="font-medium text-muted-foreground">Progress ({doneTasks}/{sprintTasks.length} tasks)</span>
                  <span className="font-bold">{Math.round(completion)}%</span>
                </div>
                <Progress value={completion} className="h-2" />
              </div>
            </CardContent>
            {isManager && (
                <CardFooter className="flex justify-end gap-2">
                {sprint.status === 'upcoming' && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button disabled={activeSprintExists} variant="secondary">
                            <Play className="mr-2 h-4 w-4" /> Start Sprint
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                          <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure you want to start this sprint?</AlertDialogTitle>
                              <AlertDialogDescription>
                                  Starting this sprint will make it the active sprint for this project. Any other active sprints will be moved to 'upcoming'.
                              </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => startSprint(sprint.id, sprint.projectId)}>
                                  Start Sprint
                              </AlertDialogAction>
                          </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                )}
                {sprint.status === 'active' && (
                     <AlertDialog>
                      <AlertDialogTrigger asChild>
                         <Button>
                            <CheckCircle className="mr-2 h-4 w-4" /> Complete Sprint
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                          <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure you want to complete this sprint?</AlertDialogTitle>
                              <AlertDialogDescription>
                                 This will mark the sprint as completed. Any unfinished tasks will be moved back to the backlog. This action cannot be undone.
                              </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => completeSprint(sprint.id, sprint.projectId)}>
                                  Complete Sprint
                              </AlertDialogAction>
                          </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                )}
                </CardFooter>
            )}
          </Card>
        );
      })}
    </div>
  );
}
