'use client';
import { notFound } from 'next/navigation';
import { PROJECTS, USERS } from '@/lib/data';
import { User, Role } from '@/lib/types';
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


export default function ProjectTeamPage({ params }: { params: { id: string } }) {
    const project = PROJECTS.find(p => p.id === params.id);

    if (!project) {
        notFound();
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
                        <TableHead>Role</TableHead>
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
                            {user.role}
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </Card>
        </div>
    )
}
