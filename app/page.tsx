import Link from 'next/link'
import DepthGauge from '@/components/DepthGauge'
import OceanHero from '@/components/OceanHero'
import PostCard from '@/components/PostCard'
import ProjectCard from '@/components/ProjectCard'
import Reveal from '@/components/Reveal'
import { profile, projects } from '@/content/portfolio'
import { getAllPosts } from '@/lib/posts'
import { siteConfig } from '@/lib/site'

const RECENT_POST_COUNT = 3
const STAGGER_MS = 90

function SectionHeading({
  eyebrow,
  title,
  href,
}: {
  eyebrow: string
  title: string
  href?: string
}) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        <p className="text-accent text-xs font-semibold tracking-[0.25em] uppercase">
          {eyebrow}
        </p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight">{title}</h2>
      </div>
      {href && (
        <Link
          href={href}
          className="text-muted hover:text-accent group inline-flex items-center gap-1 text-sm font-medium transition-colors"
        >
          전체 보기
          <span
            aria-hidden="true"
            className="transition-transform group-hover:translate-x-0.5"
          >
            →
          </span>
        </Link>
      )}
    </div>
  )
}

export default function Home() {
  const recentPosts = getAllPosts().slice(0, RECENT_POST_COUNT)
  const featuredProjects = projects.filter((project) => project.featured)

  return (
    <>
      <DepthGauge />

      <OceanHero
        description={`안녕하세요, ${siteConfig.author}입니다. ${siteConfig.description}`}
      >
        {profile.internshipSummary && (
          <p className="mt-3 max-w-xl text-sm leading-7">{profile.internshipSummary}</p>
        )}
      </OceanHero>

      <div id="dive" className="scroll-mt-20" />

      {featuredProjects.length > 0 && (
        <section className="pt-4 pb-16 sm:pb-20">
          <Reveal>
            <SectionHeading eyebrow="Projects" title="프로젝트" href="/about#projects" />
          </Reveal>
          <ul className="grid gap-4 sm:grid-cols-2">
            {featuredProjects.map((project, index) => (
              <li key={project.slug}>
                <Reveal delay={index * STAGGER_MS} className="h-full">
                  <ProjectCard project={project} />
                </Reveal>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="pb-16 sm:pb-20">
        <Reveal>
          <SectionHeading eyebrow="Logbook" title="최근 글" href="/blog" />
        </Reveal>
        {recentPosts.length === 0 ? (
          <p className="text-muted">아직 작성된 글이 없습니다.</p>
        ) : (
          <ul className="space-y-4">
            {recentPosts.map((post, index) => (
              <li key={post.slug}>
                <Reveal delay={index * STAGGER_MS}>
                  <PostCard post={post} />
                </Reveal>
              </li>
            ))}
          </ul>
        )}
      </section>

      {(profile.resumeUrl || profile.contacts.length > 0) && (
        <Reveal>
          <section className="border-border bg-surface/60 relative overflow-hidden rounded-3xl border p-8 sm:p-10">
            <p className="text-accent text-xs font-semibold tracking-[0.25em] uppercase">
              Contact
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight">같이 헤엄쳐요 🫧</h2>
            <div className="mt-6 flex flex-wrap gap-3">
              {profile.resumeUrl && (
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-foreground text-background inline-flex h-10 items-center rounded-full px-5 text-sm font-semibold transition-transform hover:-translate-y-0.5"
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
                  className="border-border bg-background hover:border-accent hover:text-accent inline-flex h-10 items-center rounded-full border px-5 text-sm transition-colors"
                >
                  {label}
                </a>
              ))}
            </div>
          </section>
        </Reveal>
      )}
    </>
  )
}
