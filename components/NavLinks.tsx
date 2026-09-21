'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { siteConfig } from '@/lib/site'

export default function NavLinks() {
  const pathname = usePathname()

  return (
    <nav aria-label="주요 메뉴">
      <ul className="flex items-center gap-1">
        {siteConfig.nav.map(({ href, label }) => {
          const active = pathname === href || pathname.startsWith(`${href}/`)

          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={active ? 'page' : undefined}
                className={`hover:bg-surface rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                  active ? 'text-foreground' : 'text-muted hover:text-foreground'
                }`}
              >
                {label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
