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
    <main className="mx-auto w-full max-w-3xl px-6 py-16">
      <article>
        <header className="mb-10">
          <h1 className="text-4xl font-bold">{meta.title}</h1>
          <p className="mt-3 text-sm text-zinc-500">
            {meta.date} · {meta.readingMinutes}분 읽기
          </p>
          {meta.tags.length > 0 && (
            <ul className="mt-3 flex flex-wrap gap-2">
              {meta.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full bg-black/[.06] px-3 py-1 text-xs dark:bg-white/[.1]"
                >
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
    </main>
  )
}
