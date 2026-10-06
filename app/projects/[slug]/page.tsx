import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getProjectBySlug, getProjectSlugs } from '@/content/portfolio'

// content/portfolio.ts의 projects에 없는 slug는 404로 처리한다
export const dynamicParams = false

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata(
  props: PageProps<'/projects/[slug]'>
): Promise<Metadata> {
  const { slug } = await props.params
  const project = getProjectBySlug(slug)
  if (!project) return {}

  return { title: project.title, description: project.description }
}

function Section({ title, children }: { title: string; children: string }) {
  return (
    <section>
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-muted mt-2 leading-7">{children}</p>
    </section>
  )
}

export default async function ProjectPage(props: PageProps<'/projects/[slug]'>) {
  const { slug } = await props.params
  const project = getProjectBySlug(slug)
  if (!project) notFound()

  return (
    <article>
      <Link
        href="/projects"
        className="text-muted hover:text-foreground mb-6 inline-block text-sm"
      >
        ← 프로젝트
      </Link>

      <header className="border-border mb-10 border-b pb-8">
        <h1 className="text-3xl leading-tight font-bold tracking-tight sm:text-4xl">
          {project.title}
        </h1>
        <p className="text-muted mt-3 text-sm">
          {project.period} · {project.team} · {project.role}
        </p>
        <p className="mt-4 leading-7">{project.description}</p>

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
      </header>

      <div className="space-y-10">
        <Section title="문제">{project.problem}</Section>
        <Section title="해결">{project.solution}</Section>
        <Section title="결과">{project.result}</Section>

        {project.troubleshooting.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold">트러블슈팅</h2>
            <div className="mt-4 space-y-6">
              {project.troubleshooting.map((item) => (
                <div key={item.title} className="border-border rounded-xl border p-5">
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="text-muted mt-2 leading-7">{item.content}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  )
}
