import Link from 'next/link'
import { siteConfig } from '@/lib/site'
import NavLinks from './NavLinks'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  return (
    <header className="border-border bg-background/80 sticky top-0 z-10 border-b backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-3xl items-center justify-between gap-4 px-6">
        <Link href="/" className="text-lg font-bold tracking-tight">
          {siteConfig.name}
        </Link>
        <div className="flex items-center gap-2">
          <NavLinks />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
