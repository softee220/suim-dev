'use client'

import { useSearchParams } from 'next/navigation'
import type { PostMeta, TagCount } from '@/lib/posts'
import PostList from './PostList'

/** URL의 ?tag= 값을 읽어 PostList에 넘긴다. 페이지는 정적으로 유지되고 필터링은 브라우저에서 한다 */
export default function FilteredPostList({
  posts,
  tags,
}: {
  posts: PostMeta[]
  tags: TagCount[]
}) {
  const activeTag = useSearchParams().get('tag')

  return <PostList posts={posts} tags={tags} activeTag={activeTag} />
}
