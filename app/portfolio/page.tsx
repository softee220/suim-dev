import type { Metadata } from 'next'
import ProjectCard from '@/components/ProjectCard'
import { experiences, profile, projects, skills } from '@/content/portfolio'

export const metadata: Metadata = {
  title: '포트폴리오',
}

function SectionTitle({ children }: { children: string }) {
  return <h2 className="mb-5 text-2xl font-semibold tracking-tight">{children}</h2>
}

export default function PortfolioPage() {
  return (
    <>
      <h1 className="mb-12 text-3xl font-bold tracking-tight">포트폴리오</h1>

      <div className="space-y-16">
        <section>
          <SectionTitle>소개</SectionTitle>
          <div className="space-y-4 leading-8">
            {profile.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          {profile.contacts.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-3">
              {profile.contacts.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="border-border hover:bg-surface inline-flex h-9 items-center rounded-full border px-4 text-sm transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section>
          <SectionTitle>프로젝트</SectionTitle>
          <ul className="grid gap-4 sm:grid-cols-2">
            {projects.map((project) => (
              <li key={project.title}>
                <ProjectCard project={project} />
              </li>
            ))}
          </ul>
        </section>

        <section>
          <SectionTitle>기술 스택</SectionTitle>
          <dl className="space-y-5">
            {skills.map(({ category, items }) => (
              <div key={category}>
                <dt className="text-muted mb-2 text-sm font-medium">{category}</dt>
                <dd>
                  <ul className="flex flex-wrap gap-2">
                    {items.map((item) => (
                      <li
                        key={item}
                        className="bg-surface rounded-full px-3 py-1 text-sm"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {experiences.length > 0 && (
          <section>
            <SectionTitle>경력 · 인턴</SectionTitle>
            <ol className="border-border space-y-8 border-l pl-6">
              {experiences.map((experience) => (
                <li
                  key={`${experience.organization}-${experience.period}`}
                  className="relative"
                >
                  <span
                    aria-hidden="true"
                    className="bg-accent absolute top-2 -left-[28.5px] h-2 w-2 rounded-full"
                  />
                  <h3 className="text-lg font-semibold">{experience.organization}</h3>
                  <p className="text-muted mt-1 text-sm">
                    {experience.role} · {experience.period}
                  </p>
                  <ul className="mt-3 list-disc space-y-1 pl-5 leading-7">
                    {experience.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </section>
        )}
      </div>
    </>
  )
}
