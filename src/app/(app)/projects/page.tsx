
'use client';
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ProjectList } from "@/components/projects/project-list";
import { NewProjectDialog } from "@/components/projects/new-project-dialog";
import { useAuth } from "@/hooks/use-auth";
import { useSharedState } from "@/hooks/use-shared-state";
import { useMemo } from "react";

export default function ProjectsPage() {
    const { user } = useAuth();
    const { projects } = useSharedState();
    const canCreateProjects = user?.userType === 'Manager' || user?.userType === 'Admin';

    const filteredProjects = useMemo(() => {
        if (!user) return [];
        if (user.userType === 'Admin') {
            return projects;
        }
        return projects.filter(p => p.members.some(m => m.id === user.id));
    }, [projects, user]);

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold">Projects</h1>
                    <p className="text-muted-foreground">Manage and organize your projects.</p>
                </div>
                {canCreateProjects && (
                    <NewProjectDialog>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            New Project
                        </Button>
                    </NewProjectDialog>
                )}
            </div>
            <ProjectList projects={filteredProjects} />
        </div>
    );
}
