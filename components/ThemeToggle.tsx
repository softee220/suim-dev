'use client'

import { useLayoutEffect } from 'react'
import {
  applyTheme,
  getSystemMedia,
  readStoredTheme,
  resolveTheme,
  storeTheme,
} from '@/lib/theme'

export default function ThemeToggle() {
  // 개발 모드의 Strict Mode 재마운트가 <html>의 클래스를 지우므로 페인트 전에 다시 적용한다.
  // 저장된 설정이 없으면 시스템 설정 변경도 따라간다.
  useLayoutEffect(() => {
    applyTheme(resolveTheme())

    const media = getSystemMedia()
    const onSystemChange = () => {
      if (!readStoredTheme()) applyTheme(resolveTheme())
    }
    media.addEventListener('change', onSystemChange)
    return () => media.removeEventListener('change', onSystemChange)
  }, [])

  // 현재 테마를 state로 들고 있지 않고 DOM에서 읽는다.
  // 서버가 사용자의 테마를 알 수 없으므로 state를 쓰면 hydration 불일치가 생긴다.
  function toggle() {
    const next = document.documentElement.classList.contains('dark') ? 'light' : 'dark'
    applyTheme(next)
    storeTheme(next)
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="라이트/다크 모드 전환"
      title="라이트/다크 모드 전환"
      className="text-muted hover:bg-surface hover:text-foreground inline-flex h-9 w-9 items-center justify-center rounded-lg transition-colors"
    >
      {/* 아이콘은 CSS로 전환한다: 다크일 때 해(라이트로 전환), 라이트일 때 달(다크로 전환) */}
      <svg
        className="hidden h-5 w-5 dark:block"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
      <svg
        className="block h-5 w-5 dark:hidden"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    </button>
  )
}
