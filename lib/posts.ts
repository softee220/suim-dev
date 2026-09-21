import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

const POSTS_DIR = path.join(process.cwd(), 'content', 'blog')

export type PostMeta = {
  slug: string
  title: string
  date: string // YYYY-MM-DD
  description: string
  tags: string[]
  readingMinutes: number
}

export type Post = {
  meta: PostMeta
  content: string
}

function toDateString(value: unknown): string {
  // gray-matter(js-yaml)는 따옴표 없는 2026-09-21을 Date 객체로 파싱한다
  if (value instanceof Date) return value.toISOString().slice(0, 10)
  return String(value ?? '')
}

function parsePost(slug: string, source: string): Post {
  const { data, content } = matter(source)

  return {
    meta: {
      slug,
      title: String(data.title ?? slug),
      date: toDateString(data.date),
      description: String(data.description ?? ''),
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
      readingMinutes: Math.max(1, Math.ceil(readingTime(content).minutes)),
    },
    content,
  }
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return []

  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx$/, ''))
}

export function getPostBySlug(slug: string): Post | null {
  // slug는 URL에서 오므로 content/blog 밖의 파일을 읽지 못하게 막는다
  if (slug !== path.basename(slug)) return null

  const filePath = path.join(POSTS_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null

  return parsePost(slug, fs.readFileSync(filePath, 'utf8'))
}

/** 최신 글이 먼저 오도록 정렬된 글 목록 (본문 제외) */
export function getAllPosts(): PostMeta[] {
  return getPostSlugs()
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is Post => post !== null)
    .map((post) => post.meta)
    .sort((a, b) => b.date.localeCompare(a.date))
}
