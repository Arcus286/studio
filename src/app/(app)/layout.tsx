'use client';
import { Header } from '@/components/layout/header';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
  SidebarGroup,
  SidebarGroupLabel,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  KanbanSquare,
  Folder,
  PlusCircle,
  Settings,
  LogOut,
  Users,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Loading from '../loading';
import { useEffect, useState } from 'react';
import { PROJECTS } from '@/lib/data';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';

function AppLayoutContent({ children }: { children: React.ReactNode }) {
  const { logout } = useAuth();
  const pathname = usePathname();
  const [isProjectsOpen, setIsProjectsOpen] = useState(true);

  const isProjectPage = pathname.includes('/projects/');
  const projectId = isProjectPage ? pathname.split('/')[2] : null;

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2 p-2">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-8 w-8 text-primary"
              >
                <path d="M12 3L4 9V17H20V9L12 3Z" />
                <path d="M8 21V15H16V21" />
                <path d="M10 11H14" />
            </svg>
            <span className="text-lg font-semibold">AgileBridge</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === '/dashboard'}>
                <Link href="/dashboard">
                  <LayoutDashboard />
                  Dashboard
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <Collapsible open={isProjectsOpen} onOpenChange={setIsProjectsOpen}>
              <SidebarMenuItem>
                <div className='flex items-center w-full'>
                    <SidebarMenuButton
                    asChild
                    isActive={pathname.startsWith('/projects')}
                    className="flex-1"
                  >
                    <Link href="/projects">
                      <Folder />
                      Projects
                    </Link>
                  </SidebarMenuButton>
                  <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                          <ChevronRight className={cn("h-4 w-4 transition-transform", isProjectsOpen && "rotate-90")} />
                      </Button>
                  </CollapsibleTrigger>
                </div>
              </SidebarMenuItem>
              
              <CollapsibleContent>
                <div className="ml-4 space-y-1 mt-1">
                  {PROJECTS.map(project => (
                      <SidebarMenuItem key={project.id}>
                        <SidebarMenuButton
                          asChild
                          size="sm"
                          isActive={pathname.startsWith(`/projects/${project.id}`)}
                        >
                          <Link href={`/projects/${project.id}/board`}>
                            <span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: project.color }}></span>
                            {project.name}
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>


            {isProjectPage && projectId && (
              <div className="ml-4 mt-2">
                <SidebarGroupLabel>Project Tools</SidebarGroupLabel>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname.includes('/board')}
                  >
                    <Link href={`/projects/${projectId}/board`}>
                      <KanbanSquare />
                      Board
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname.includes('/team')}
                  >
                    <Link href={`/projects/${projectId}/team`}>
                      <Users />
                      Team
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </div>
            )}
             <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname.startsWith('/settings')}
              >
                <Link href="/settings">
                  <Settings />
                  Settings
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          <SidebarGroup className="mt-4">
            <SidebarGroupLabel>Quick Actions</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname.startsWith('/tasks/new')}
                >
                  <Link href="/tasks/new">
                    <PlusCircle />
                    Add Task
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={logout}>
              <LogOut />
              Logout
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </Sidebar>
      <SidebarInset>
        <div className="flex min-h-screen w-full flex-col">
          <header className="flex h-16 items-center gap-2 border-b bg-card px-4 lg:px-6">
            <div className="md:hidden">
              <SidebarTrigger />
            </div>
            <Header />
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 bg-background">
             <div className="mx-auto w-full max-w-7xl">
                {children}
            </div>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return <Loading />;
  }
  
  const authRoutes = ['/login', '/signup', '/forgot-password'];
  if (authRoutes.includes(pathname)) {
      return <Loading />;
  }

  return <AppLayoutContent>{children}</AppLayoutContent>;
}
