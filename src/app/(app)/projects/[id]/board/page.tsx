'use client'

import * as React from 'react'
import { useProjectStore } from '@/lib/project-store'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import Link from 'next/link'
import { ProjectBoard } from '@/components/projects/project-board'

function ProjectBoardPageContent({ id }: { id: string }) {
  const { projects } = useProjectStore()
  const project = projects.find((p) => p.id === id)

  if (!project) {
    return <div>Loading project...</div>
  }

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
            <BreadcrumbPage>Active Sprint</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <ProjectBoard project={project} />
    </div>
  )
}

export default function ProjectBoardPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  // ✅ unwrap the async params with React.use()
  const { id } = React.use(params)

  return <ProjectBoardPageContent id={id} />
}
