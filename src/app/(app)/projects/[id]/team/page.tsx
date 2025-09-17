
'use client';
import { notFound } from 'next/navigation';
import { useProjectStore } from '@/lib/project-store';
import { USERS } from '@/lib/data';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import Link from 'next/link';


export default function ProjectTeamPage({ params: { id } }: { params: { id: string } }) {
    const { projects } = useProjectStore();
    const project = projects.find(p => p.id === id);

    if (!project) {
        return <div>Loading project...</div>;
    }
    
    const teamMembers = USERS.filter(user => project.members.some(m => m.id === user.id));

    return (
        <div className="space-y-6">
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
                    <BreadcrumbPage>Team</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <Card>
                <div className="p-4 border-b">
                    <h2 className="text-xl font-semibold">Team Members for {project.name}</h2>
                </div>
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>User Type</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {teamMembers.map((user) => (
                        <TableRow key={user.id}>
                        <TableCell className="font-medium">
                            {user.username}
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                            {user.userType}
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </Card>
        </div>
    )
}
