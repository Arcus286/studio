'use client';

import type { Project } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Folder, Calendar, CheckCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { USERS } from '@/lib/data';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const projectMembers = USERS.filter(user => project.members.some(m => m.id === user.id));

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{backgroundColor: project.color}}>
                    <Folder className="h-6 w-6 text-white/80" />
                </div>
                <div>
                    <CardTitle className="text-lg">
                        <Link href={`/projects/${project.id}/board`} className="hover:underline">{project.name}</Link>
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">{project.key}</p>
                </div>
            </div>
            <Badge variant={project.status === 'active' ? 'default' : 'secondary'}>
                {project.status}
            </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground h-10 line-clamp-2">{project.description}</p>
        
        <div>
            <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-medium text-muted-foreground">Completion</span>
                <span className="text-xs font-bold">{project.completion}%</span>
            </div>
            <Progress value={project.completion} className="h-2" />
        </div>
        
        <div className="flex justify-between items-center text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{format(new Date(project.createdAt), 'PP')}</span>
            </div>
            <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                <span>{project.issues} Issues</span>
            </div>
        </div>
        
        <div className="flex items-center justify-between border-t pt-4">
            <div className="flex -space-x-2">
            {projectMembers.map(member => (
                <div key={member.id} className="h-8 w-8 border-2 border-card rounded-full bg-muted flex items-center justify-center text-xs font-semibold" title={member.username}>
                    {member.username.charAt(0)}
                </div>
            ))}
            </div>
            <Button variant="outline" size="sm" asChild>
                <Link href={`/projects/${project.id}/board`}>View Board</Link>
            </Button>
        </div>

      </CardContent>
    </Card>
  );
}
