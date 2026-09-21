import type { Metadata } from 'next'
import { Suspense } from 'react'
import FilteredPostList from '@/components/FilteredPostList'
import PostList from '@/components/PostList'
import { getAllPosts, getAllTags } from '@/lib/posts'

export const metadata: Metadata = {
  title: '블로그',
}

export default function BlogPage() {
  const posts = getAllPosts()
  const tags = getAllTags()

  return (
    <>
      <h1 className="mb-8 text-3xl font-bold tracking-tight">블로그</h1>
      {/* useSearchParams를 쓰는 컴포넌트는 Suspense 안에 둬야 페이지가 정적으로 빌드된다.
          fallback은 필터 없는 전체 목록이라 초기 HTML에도 글이 그대로 들어간다 */}
      <Suspense fallback={<PostList posts={posts} tags={tags} activeTag={null} />}>
        <FilteredPostList posts={posts} tags={tags} />
      </Suspense>
    </>
  )
}
