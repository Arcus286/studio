
'use client';

import * as React from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import Link from 'next/link';
import { Backlog } from '@/components/sprints/backlog';
import { useMemo, useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import Loading from '@/app/loading';
import { useSharedState } from '@/hooks/use-shared-state';

export default function ProjectBacklogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const { user, isLoading } = useAuth();
  const router = useRouter();

  const { projects, sprints } = useSharedState();
  const project = projects.find(p => p.id === id);

  const projectMember = project?.members.find(m => m.id === user?.id);
  const isProjectManager = projectMember?.role === 'Manager';
  const isAdmin = user?.userType === 'Admin';
  const canManageProject = isProjectManager || isAdmin;

  const { activeSprint, upcomingSprints } = useMemo(() => {
    if (!project) return { activeSprint: null, upcomingSprints: [] };
    const projectSprints = sprints.filter(s => s.projectId === project.id);
    const active = projectSprints.find(s => s.status === 'active');
    const upcoming = projectSprints.filter(s => s.status === 'upcoming');
    return { activeSprint: active, upcomingSprints: upcoming };
  }, [sprints, project]);
  
  const [sprintFilter, setSprintFilter] = useState<string>('backlog');

  useEffect(() => {
    if (!isLoading && !canManageProject) {
      router.replace('/dashboard');
    }
  }, [user, isLoading, router, canManageProject]);


  if (isLoading || !user || !canManageProject) {
    return <Loading />;
  }


  if (!project) {
    // This can happen on initial load while the store is hydrating
    return <div>Loading project...</div>; 
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/projects">Projects</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{project.name}</BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Backlog</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className='w-full sm:w-auto sm:min-w-[200px]'>
          <Select value={sprintFilter} onValueChange={setSprintFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by sprint..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="backlog">Backlog</SelectItem>
              {activeSprint && <SelectItem value={activeSprint.id}>{activeSprint.name} (Active)</SelectItem>}
              {upcomingSprints.map(s => (
                <SelectItem key={s.id} value={s.id}>{s.name} (Upcoming)</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <Backlog project={project} sprintFilter={sprintFilter} />
    </div>
  );
}
