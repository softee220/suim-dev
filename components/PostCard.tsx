import Link from 'next/link'
import type { PostMeta } from '@/lib/posts'

export default function PostCard({ post }: { post: PostMeta }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="border-border hover:bg-surface block rounded-xl border p-5 transition-colors"
    >
      <h3 className="text-lg font-semibold">{post.title}</h3>
      <p className="text-muted mt-1 text-sm">
        <time dateTime={post.date}>{post.date}</time> · {post.readingMinutes}분 읽기
      </p>
      {post.description && (
        <p className="text-muted mt-3 leading-7">{post.description}</p>
      )}
    </Link>
  )
}
