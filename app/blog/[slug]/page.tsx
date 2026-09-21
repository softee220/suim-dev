import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import rehypeHighlight from 'rehype-highlight'
import remarkGfm from 'remark-gfm'
import 'highlight.js/styles/github-dark.css'
import { mdxComponents } from '@/components/MDXComponents'
import TagLink from '@/components/TagLink'
import { getAdjacentPosts, getPostBySlug, getPostSlugs, type PostMeta } from '@/lib/posts'

// content/blog에 없는 slug는 404로 처리한다
export const dynamicParams = false

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata(
  props: PageProps<'/blog/[slug]'>
): Promise<Metadata> {
  const { slug } = await props.params
  const post = getPostBySlug(slug)
  if (!post) return {}

  return { title: post.meta.title, description: post.meta.description }
}

export default async function PostPage(props: PageProps<'/blog/[slug]'>) {
  const { slug } = await props.params
  const post = getPostBySlug(slug)
  if (!post) notFound()
  const { meta, content } = post
  const { newer, older } = getAdjacentPosts(slug)

  return (
    <article>
      <Link
        href="/blog"
        className="text-muted hover:text-foreground mb-6 inline-block text-sm"
      >
        ← 블로그
      </Link>
      <header className="border-border mb-10 border-b pb-8">
        <h1 className="text-3xl leading-tight font-bold tracking-tight sm:text-4xl">
          {meta.title}
        </h1>
        <p className="text-muted mt-3 text-sm">
          <time dateTime={meta.date}>{meta.date}</time> · {meta.readingMinutes}분 읽기
        </p>
        {meta.tags.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {meta.tags.map((tag) => (
              <li key={tag}>
                <TagLink tag={tag} />
              </li>
            ))}
          </ul>
        )}
      </header>
      <MDXRemote
        source={content}
        components={mdxComponents}
        options={{
          mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeHighlight] },
        }}
      />
      {(newer || older) && (
        <nav
          aria-label="이전/다음 글"
          className="border-border mt-16 grid gap-4 border-t pt-8 sm:grid-cols-2"
        >
          {older ? (
            <AdjacentLink post={older} label="← 이전 글" />
          ) : (
            <span className="hidden sm:block" />
          )}
          {newer && <AdjacentLink post={newer} label="다음 글 →" align="right" />}
        </nav>
      )}
    </article>
  )
}

function AdjacentLink({
  post,
  label,
  align = 'left',
}: {
  post: PostMeta
  label: string
  align?: 'left' | 'right'
}) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`border-border hover:bg-surface rounded-xl border p-4 transition-colors ${
        align === 'right' ? 'sm:text-right' : ''
      }`}
    >
      <span className="text-muted text-xs">{label}</span>
      <span className="mt-1 block font-medium">{post.title}</span>
    </Link>
  )
}
