import type { Metadata } from 'next'
import ProjectCard from '@/components/ProjectCard'
import { projects } from '@/content/portfolio'

export const metadata: Metadata = {
  title: '프로젝트',
}

export default function ProjectsPage() {
  return (
    <>
      <h1 className="mb-8 text-3xl font-bold tracking-tight">프로젝트</h1>
      <ul className="grid gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <li key={project.slug}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </>
  )
}
