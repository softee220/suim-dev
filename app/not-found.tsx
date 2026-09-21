import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="py-16 text-center">
      <p className="text-accent text-sm font-medium">404</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight">
        페이지를 찾을 수 없습니다
      </h1>
      <p className="text-muted mt-4">주소가 바뀌었거나 삭제된 페이지일 수 있어요.</p>
      <Link
        href="/"
        className="bg-foreground text-background mt-8 inline-flex h-11 items-center rounded-full px-6 text-sm font-medium transition-opacity hover:opacity-80"
      >
        홈으로 돌아가기
      </Link>
    </div>
  )
}
