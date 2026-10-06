import Link from 'next/link'
import type { Project } from '@/content/portfolio'

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="border-border flex h-full flex-col rounded-xl border p-5">
      <Link href={`/projects/${project.slug}`} className="group flex-1">
        <h3 className="text-lg font-semibold group-hover:underline">{project.title}</h3>
        <p className="text-muted mt-1 text-sm">{project.period}</p>
        <p className="text-muted mt-3 leading-7">{project.description}</p>
      </Link>

      {project.tags.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li key={tag} className="bg-surface rounded-full px-3 py-1 text-xs">
              {tag}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
        <Link href={`/projects/${project.slug}`} className="text-accent hover:underline">
          자세히 보기 →
        </Link>
        {project.links.map(({ label, href }) => (
          <a
            key={href}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            {label} ↗
          </a>
        ))}
      </div>
    </article>
  )
}
