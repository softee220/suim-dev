import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '내 이름 | 기술 블로그 & 포트폴리오',
  description: '기록하며 성장하는 개발자의 기술 블로그 겸 포트폴리오입니다.',
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  )
}
