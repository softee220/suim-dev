import type { Metadata } from 'next'
import PostCard from '@/components/PostCard'
import { getAllPosts } from '@/lib/posts'

export const metadata: Metadata = {
  title: '블로그',
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <>
      <h1 className="mb-8 text-3xl font-bold tracking-tight">블로그</h1>
      {posts.length === 0 ? (
        <p className="text-muted">아직 작성된 글이 없습니다.</p>
      ) : (
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post.slug}>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
