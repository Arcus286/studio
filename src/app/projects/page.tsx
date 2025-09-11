import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ProjectList } from "@/components/projects/project-list";
import { NewProjectDialog } from "@/components/projects/new-project-dialog";
import { PROJECTS } from "@/lib/data";

export default function ProjectsPage() {
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold">Projects</h1>
                    <p className="text-muted-foreground">Manage and organize your projects.</p>
                </div>
                <NewProjectDialog>
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        New Project
                    </Button>
                </NewProjectDialog>
            </div>
            <ProjectList projects={PROJECTS} />
        </div>
    );
}
