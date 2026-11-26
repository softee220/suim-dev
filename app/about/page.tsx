import type { Metadata } from 'next'
import Image from 'next/image'
import ContactLinks from '@/components/ContactLinks'
import ProjectCard from '@/components/ProjectCard'
import Reveal from '@/components/Reveal'
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
  return (
    <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold tracking-tight">
      <span className="bg-accent inline-block h-6 w-1 rounded-full" aria-hidden="true" />
      {children}
    </h2>
  )
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
      {item.subtitle && <p className="mt-1 font-semibold">{item.subtitle}</p>}
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
      <p className="text-accent text-xs font-semibold tracking-[0.25em] uppercase">
        About
      </p>
      <h1 className="mt-2 mb-12 text-4xl font-extrabold tracking-tight">소개</h1>

      <div className="space-y-16">
        <Reveal>
          <section>
            <SectionTitle>자기소개</SectionTitle>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
              {profile.photo && (
                <Image
                  src={profile.photo}
                  alt="프로필 사진"
                  width={796}
                  height={1024}
                  sizes="176px"
                  priority
                  // 증명사진 비율(약 3:4) 그대로 세로로 긴 타원으로 잘라 보여준다
                  className="ring-surface h-auto w-36 shrink-0 rounded-[50%] ring-4 sm:w-44"
                />
              )}
              <div className="min-w-0">
                <div className="space-y-4 leading-8">
                  {profile.headline && (
                    <p className="text-lg font-bold">{profile.headline}</p>
                  )}
                  {profile.intro.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap items-center gap-3">
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
                  <ContactLinks contacts={profile.contacts} />
                </div>
              </div>
            </div>
          </section>
        </Reveal>

        {experiences.length > 0 && (
          <Reveal>
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
          </Reveal>
        )}

        {projectSections.length > 0 && (
          <Reveal>
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
          </Reveal>
        )}

        <Reveal>
          <section>
            <SectionTitle>기술 스택</SectionTitle>
            {/* 분류 이름은 왼쪽 고정 폭 칸에, 기술들은 그 오른쪽에 한 줄로 나열한다 */}
            <dl className="space-y-4">
              {skills.map(({ category, items }) => (
                <div key={category} className="flex items-start gap-4">
                  <dt className="text-muted w-24 shrink-0 pt-1 text-sm font-medium">
                    {category}
                  </dt>
                  <dd>
                    <ul className="flex flex-wrap gap-2">
                      {items.map((item) => (
                        <li
                          key={item}
                          className="bg-surface hover:bg-accent hover:text-background rounded-full px-3 py-1 text-sm transition-colors"
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
        </Reveal>

        {education.length > 0 && (
          <Reveal>
            <section>
              <SectionTitle>학력</SectionTitle>
              <Timeline>
                {education.map((item) => (
                  <TimelineListItem key={`${item.title}-${item.period}`} item={item} />
                ))}
              </Timeline>
            </section>
          </Reveal>
        )}

        {awards.length > 0 && (
          <Reveal>
            <section>
              <SectionTitle>수상 · 자격증</SectionTitle>
              <Timeline>
                {awards.map((item) => (
                  <TimelineListItem key={`${item.title}-${item.period}`} item={item} />
                ))}
              </Timeline>
            </section>
          </Reveal>
        )}
      </div>
    </>
  )
}
