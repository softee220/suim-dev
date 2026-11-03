import type { Metadata } from 'next'
import ProjectCard from '@/components/ProjectCard'
import {
  awards,
  education,
  experiences,
  profile,
  projectCategories,
  projects,
  skills,
  type Experience,
  type TimelineItem,
} from '@/content/portfolio'

export const metadata: Metadata = {
  title: '소개',
}

function SectionTitle({ children }: { children: string }) {
  return <h2 className="mb-5 text-2xl font-semibold tracking-tight">{children}</h2>
}

function Timeline({ children }: { children: React.ReactNode }) {
  return <ol className="border-border space-y-8 border-l pl-6">{children}</ol>
}

function TimelineDot() {
  return (
    <span
      aria-hidden="true"
      className="bg-accent absolute top-2 -left-[28.5px] h-2 w-2 rounded-full"
    />
  )
}

function ExperienceItem({ experience }: { experience: Experience }) {
  return (
    <li className="relative">
      <TimelineDot />
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
  )
}

function TimelineListItem({ item }: { item: TimelineItem }) {
  return (
    <li className="relative">
      <TimelineDot />
      <h3 className="text-lg font-semibold">{item.title}</h3>
      <p className="text-muted mt-1 text-sm">{item.period}</p>
      {item.description && <p className="mt-3 leading-7">{item.description}</p>}
    </li>
  )
}

export default function AboutPage() {
  const projectSections = projectCategories
    .map((category) => ({
      ...category,
      projects: projects.filter((project) => project.category === category.id),
    }))
    .filter((section) => section.projects.length > 0)

  return (
    <>
      <h1 className="mb-12 text-3xl font-bold tracking-tight">소개</h1>

      <div className="space-y-16">
        <section>
          <SectionTitle>자기소개</SectionTitle>
          <div className="space-y-4 leading-8">
            {profile.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {profile.resumeUrl && (
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-foreground text-background inline-flex h-9 items-center rounded-full px-4 text-sm font-medium transition-opacity hover:opacity-80"
              >
                이력서 PDF ↓
              </a>
            )}
            {profile.contacts.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="border-border hover:bg-surface inline-flex h-9 items-center rounded-full border px-4 text-sm transition-colors"
              >
                {label}
              </a>
            ))}
          </div>
        </section>

        {experiences.length > 0 && (
          <section>
            <SectionTitle>경력 · 활동</SectionTitle>
            <Timeline>
              {experiences.map((experience) => (
                <ExperienceItem
                  key={`${experience.organization}-${experience.period}`}
                  experience={experience}
                />
              ))}
            </Timeline>
          </section>
        )}

        {projectSections.length > 0 && (
          <section id="projects" className="scroll-mt-24">
            <SectionTitle>프로젝트</SectionTitle>
            <div className="space-y-10">
              {projectSections.map(({ id, label, projects }) => (
                <div key={id}>
                  <h3 className="text-muted mb-4 text-sm font-semibold tracking-wide uppercase">
                    {label}
                  </h3>
                  <ul className="grid gap-4 sm:grid-cols-2">
                    {projects.map((project) => (
                      <li key={project.slug}>
                        <ProjectCard project={project} />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

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

        {education.length > 0 && (
          <section>
            <SectionTitle>학력</SectionTitle>
            <Timeline>
              {education.map((item) => (
                <TimelineListItem key={`${item.title}-${item.period}`} item={item} />
              ))}
            </Timeline>
          </section>
        )}

        {awards.length > 0 && (
          <section>
            <SectionTitle>수상 · 자격증</SectionTitle>
            <Timeline>
              {awards.map((item) => (
                <TimelineListItem key={`${item.title}-${item.period}`} item={item} />
              ))}
            </Timeline>
          </section>
        )}
      </div>
    </>
  )
}
