import type { Project } from '@/content/portfolio'

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="border-border flex h-full flex-col rounded-xl border p-5">
      <h3 className="text-lg font-semibold">{project.title}</h3>
      <p className="text-muted mt-1 text-sm">{project.period}</p>
      <p className="text-muted mt-3 flex-1 leading-7">{project.description}</p>

      {project.tags.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li key={tag} className="bg-surface rounded-full px-3 py-1 text-xs">
              {tag}
            </li>
          ))}
        </ul>
      )}

      {project.links.length > 0 && (
        <ul className="mt-4 flex gap-4 text-sm">
          {project.links.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                {label} ↗
              </a>
            </li>
          ))}
        </ul>
      )}
    </article>
  )
}
