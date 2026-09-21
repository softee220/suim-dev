import Link from 'next/link'
import PostCard from '@/components/PostCard'
import ProjectCard from '@/components/ProjectCard'
import { projects } from '@/content/portfolio'
import { getAllPosts } from '@/lib/posts'
import { siteConfig } from '@/lib/site'

const RECENT_POST_COUNT = 3

export default function Home() {
  const recentPosts = getAllPosts().slice(0, RECENT_POST_COUNT)
  const featuredProjects = projects.filter((project) => project.featured)

  return (
    <>
      <section className="pb-12 sm:pb-16">
        <h1 className="text-4xl leading-tight font-bold tracking-tight sm:text-5xl">
          안녕하세요,
          <br />
          {siteConfig.author}입니다.
        </h1>
        <p className="text-muted mt-6 max-w-xl text-lg leading-8">
          {siteConfig.description}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/blog"
            className="bg-foreground text-background inline-flex h-11 items-center rounded-full px-6 text-sm font-medium transition-opacity hover:opacity-80"
          >
            블로그 글 보기
          </Link>
          <Link
            href="/portfolio"
            className="border-border hover:bg-surface inline-flex h-11 items-center rounded-full border px-6 text-sm font-medium transition-colors"
          >
            포트폴리오 보기
          </Link>
        </div>
      </section>

      {featuredProjects.length > 0 && (
        <section className="pb-12 sm:pb-16">
          <div className="mb-4 flex items-baseline justify-between">
            <h2 className="text-xl font-semibold">프로젝트</h2>
            <Link href="/portfolio" className="text-accent text-sm hover:underline">
              전체 보기
            </Link>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {featuredProjects.map((project) => (
              <li key={project.title}>
                <ProjectCard project={project} />
              </li>
            ))}
          </ul>
        </section>
      )}

      <section>
        <div className="mb-4 flex items-baseline justify-between">
          <h2 className="text-xl font-semibold">최근 글</h2>
          <Link href="/blog" className="text-accent text-sm hover:underline">
            전체 보기
          </Link>
        </div>
        {recentPosts.length === 0 ? (
          <p className="text-muted">아직 작성된 글이 없습니다.</p>
        ) : (
          <ul className="space-y-4">
            {recentPosts.map((post) => (
              <li key={post.slug}>
                <PostCard post={post} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  )
}
