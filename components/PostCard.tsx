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
      {/* 카드 전체가 링크이므로 태그는 클릭 대상이 아닌 표시용이다 */}
      {post.tags.length > 0 && (
        <ul className="text-muted mt-4 flex flex-wrap gap-x-3 gap-y-1 text-xs">
          {post.tags.map((tag) => (
            <li key={tag}>#{tag}</li>
          ))}
        </ul>
      )}
    </Link>
  )
}
