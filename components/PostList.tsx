import Link from 'next/link'
import type { PostMeta, TagCount } from '@/lib/posts'
import PostCard from './PostCard'
import TagLink from './TagLink'

type PostListProps = {
  posts: PostMeta[]
  tags: TagCount[]
  activeTag: string | null
}

/** 태그 필터와 글 카드 목록. 어떤 태그가 선택됐는지는 activeTag로 받는다 */
export default function PostList({ posts, tags, activeTag }: PostListProps) {
  const visiblePosts = activeTag
    ? posts.filter((post) => post.tags.includes(activeTag))
    : posts

  return (
    <>
      {tags.length > 0 && (
        <nav aria-label="태그 필터" className="mb-8">
          <ul className="flex flex-wrap gap-2">
            <li>
              <Link
                href="/blog"
                scroll={false}
                aria-current={activeTag === null ? 'true' : undefined}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  activeTag === null
                    ? 'bg-foreground text-background'
                    : 'bg-surface text-muted hover:text-foreground'
                }`}
              >
                전체<span className="ml-1 opacity-60">{posts.length}</span>
              </Link>
            </li>
            {tags.map(({ tag, count }) => (
              <li key={tag}>
                <TagLink tag={tag} count={count} active={tag === activeTag} />
              </li>
            ))}
          </ul>
        </nav>
      )}

      {visiblePosts.length === 0 ? (
        <div className="text-muted py-8">
          {activeTag ? (
            <>
              <p>‘{activeTag}’ 태그가 붙은 글이 없습니다.</p>
              <Link
                href="/blog"
                className="text-accent mt-2 inline-block hover:underline"
              >
                전체 글 보기
              </Link>
            </>
          ) : (
            <p>아직 작성된 글이 없습니다.</p>
          )}
        </div>
      ) : (
        <ul className="space-y-4">
          {visiblePosts.map((post) => (
            <li key={post.slug}>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
