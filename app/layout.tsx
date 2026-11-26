import type { Metadata } from 'next'
import './globals.css'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { siteConfig } from '@/lib/site'

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | 기술 블로그 & 포트폴리오`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <Header />
        <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-10 sm:py-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
