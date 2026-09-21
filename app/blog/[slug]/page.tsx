import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import rehypeHighlight from 'rehype-highlight'
import remarkGfm from 'remark-gfm'
import 'highlight.js/styles/github-dark.css'
import { mdxComponents } from '@/components/MDXComponents'
import { getPostBySlug, getPostSlugs } from '@/lib/posts'

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

  return (
    <article>
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
              <li key={tag} className="bg-surface rounded-full px-3 py-1 text-xs">
                {tag}
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
    </article>
  )
}
