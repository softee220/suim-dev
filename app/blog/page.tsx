import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'

export const metadata: Metadata = {
  title: '블로그',
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-16">
      <h1 className="mb-8 text-3xl font-bold">블로그</h1>
      {posts.length === 0 ? (
        <p className="text-zinc-600 dark:text-zinc-400">아직 작성된 글이 없습니다.</p>
      ) : (
        <ul className="space-y-8">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="group block">
                <h2 className="text-xl font-semibold group-hover:underline">
                  {post.title}
                </h2>
                <p className="mt-1 text-sm text-zinc-500">
                  {post.date} · {post.readingMinutes}분 읽기
                </p>
                <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                  {post.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
