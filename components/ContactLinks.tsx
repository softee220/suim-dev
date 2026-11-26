'use client'

import { useEffect, useRef, useState } from 'react'
import type { Link } from '@/content/portfolio'
import ContactIcon from './ContactIcon'

const COPIED_MESSAGE_MS = 1600

type ContactLinksProps = {
  contacts: Link[]
  /** 버튼 크기. sm은 푸터처럼 작은 자리에 쓴다 */
  size?: 'sm' | 'md'
}

/**
 * GitHub · LinkedIn · Email 아이콘 버튼 묶음.
 * 메일은 메일 앱을 여는 대신 주소를 클립보드에 복사하고 "복사됨"을 잠깐 띄운다.
 */
export default function ContactLinks({ contacts, size = 'md' }: ContactLinksProps) {
  const [copied, setCopied] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => () => clearTimeout(timerRef.current), [])

  const buttonSize = size === 'sm' ? 'h-9 w-9' : 'h-11 w-11'
  const iconSize = size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'
  const className = `border-border bg-background hover:border-accent hover:text-accent inline-flex ${buttonSize} items-center justify-center rounded-full border transition-colors`

  // 메일 앱을 여는 대신 주소를 복사한다. 클립보드를 못 쓰는 환경이면 원래대로 메일 앱을 연다
  function copyEmail(event: React.MouseEvent<HTMLAnchorElement>, href: string) {
    event.preventDefault()
    const email = href.replace(/^mailto:/, '')
    const openMailApp = () => {
      window.location.href = href
    }

    if (!navigator.clipboard) return openMailApp()
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true)
      clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => setCopied(false), COPIED_MESSAGE_MS)
    }, openMailApp)
  }

  return (
    <ul className="flex flex-wrap items-center gap-2">
      {contacts.map(({ label, href }) => {
        const isEmail = href.startsWith('mailto:')

        return (
          <li key={href} className="relative">
            <a
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              aria-label={isEmail ? `${label} 주소 복사` : label}
              title={isEmail ? '클릭해서 메일 주소 복사' : label}
              onClick={isEmail ? (event) => copyEmail(event, href) : undefined}
              className={className}
            >
              <ContactIcon label={label} className={iconSize} />
            </a>
            {isEmail && (
              <span
                role="status"
                className={`bg-foreground text-background pointer-events-none absolute right-0 bottom-full mb-2 rounded-md px-2 py-1 text-xs whitespace-nowrap transition-opacity ${
                  copied ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {copied ? '메일 주소 복사됨' : ''}
              </span>
            )}
          </li>
        )
      })}
    </ul>
  )
}
