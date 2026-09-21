import Link from 'next/link'

type TagLinkProps = {
  tag: string
  count?: number
  active?: boolean
}

/** 클릭하면 /blog에서 해당 태그의 글만 보여주는 태그 칩 */
export default function TagLink({ tag, count, active = false }: TagLinkProps) {
  return (
    <Link
      href={`/blog?tag=${encodeURIComponent(tag)}`}
      scroll={false}
      aria-current={active ? 'true' : undefined}
      className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
        active
          ? 'bg-foreground text-background'
          : 'bg-surface text-muted hover:text-foreground'
      }`}
    >
      {tag}
      {count !== undefined && <span className="ml-1 opacity-60">{count}</span>}
    </Link>
  )
}
