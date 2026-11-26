import Link from 'next/link'
import { logoFont } from '@/lib/fonts'
import { siteConfig } from '@/lib/site'
import NavLinks from './NavLinks'

export default function Header() {
  return (
    <header className="border-border/60 bg-background/70 sticky top-0 z-20 border-b backdrop-blur-md">
      <div className="mx-auto flex h-14 w-full max-w-3xl items-center justify-between gap-2 px-6">
        <Link
          href="/"
          aria-label={`${siteConfig.name} 홈`}
          className="inline-flex shrink-0 items-center whitespace-nowrap"
        >
          <span
            className={`${logoFont.className} text-xl leading-none tracking-[0.06em]`}
          >
            {siteConfig.logo}
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <NavLinks />
        </div>
      </div>
    </header>
  )
}
