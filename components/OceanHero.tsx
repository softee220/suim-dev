'use client'

import Link from 'next/link'
import { displayFont, scriptFont } from '@/lib/fonts'
import { useRef, type PointerEvent, type ReactNode } from 'react'

// 한 주기(1440)짜리 물결을 두 번 이어 그린 경로. 너비 200%로 깔고 -50%만큼 흘리면 끊김 없이 반복된다
function Wave({
  fill,
  duration,
  amplitude,
  offset,
}: {
  fill: string
  duration: number
  amplitude: number
  offset: number
}) {
  const mid = 60
  const top = mid - amplitude
  const d = `M0 ${mid} Q 360 ${top} 720 ${mid} T 1440 ${mid} T 2160 ${mid} T 2880 ${mid} V 120 H 0 Z`

  return (
    <svg
      className="wave absolute bottom-0 left-0 h-full w-[200%]"
      style={{ animationDuration: `${duration}s`, bottom: offset }}
      viewBox="0 0 2880 120"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path d={d} fill={fill} />
    </svg>
  )
}

type OceanHeroProps = {
  description: string
  children?: ReactNode
}

export default function OceanHero({ description, children }: OceanHeroProps) {
  const sectionRef = useRef<HTMLElement>(null)

  // 마우스 위치를 CSS 변수로 넘겨서 그라데이션 덩어리들이 살짝 따라 움직이게 한다 (패럴랙스)
  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    const el = sectionRef.current
    if (!el || event.pointerType !== 'mouse') return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--mx', String((event.clientX - rect.left) / rect.width - 0.5))
    el.style.setProperty('--my', String((event.clientY - rect.top) / rect.height - 0.5))
  }

  return (
    <section
      ref={sectionRef}
      onPointerMove={handlePointerMove}
      // 레이아웃의 max-w-3xl 컨테이너를 벗어나 화면 전체 너비로 깔고, main의 위쪽 여백도 상쇄한다
      className="relative left-1/2 -mt-10 w-screen -translate-x-1/2 overflow-hidden sm:-mt-16"
    >
      {/* 그레인 그라데이션 배경: 흐린 물빛 덩어리들이 천천히 흐르고, 위에 고운 입자를 얹는다 */}
      <div aria-hidden="true" className="absolute inset-0">
        <div
          className="absolute inset-0 transition-transform duration-1000 ease-out"
          style={{
            transform: 'translate(calc(var(--mx, 0) * 40px), calc(var(--my, 0) * 28px))',
          }}
        >
          <span className="blob blob-1" />
          <span className="blob blob-2" />
          <span className="blob blob-3" />
        </div>
        <div className="grain absolute inset-0" />
        <div className="to-background absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-b from-transparent" />
      </div>

      <div className="relative mx-auto w-full max-w-3xl px-6 pt-20 pb-44 sm:pt-28 sm:pb-52">
        <h1
          aria-label="Dive into the SUIMming pool"
          className={`${displayFont.className} text-foreground leading-[0.92] uppercase`}
          style={{ fontSize: 'clamp(2.75rem, 11vw, 6.5rem)' }}
        >
          <span aria-hidden="true" className="block whitespace-nowrap">
            Dive into the
          </span>
          <span aria-hidden="true" className="block whitespace-nowrap">
            {/* 필기체가 윗줄에 살짝 걸쳐 올라가도록 크게 키우고 위로 끌어올린다 */}
            <span
              className={`${scriptFont.className} hero-script relative z-10 -mr-[0.14em] inline-block normal-case`}
            >
              Suim
            </span>
            ming pool
          </span>
        </h1>
        <p className="text-foreground/80 mt-8 max-w-xl text-lg leading-8">
          {description}
        </p>
        {children}
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/about#projects" className="btn-glass btn-glass-primary">
            프로젝트 보기 <span aria-hidden="true">→</span>
          </Link>
          <Link href="/blog" className="btn-glass">
            블로그 글 보기
          </Link>
        </div>
      </div>

      {/* 스크롤 안내 */}
      <a
        href="#dive"
        className="text-foreground/70 hover:text-foreground absolute bottom-24 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-1 text-[10px] font-semibold tracking-[0.3em] uppercase transition-colors sm:flex"
      >
        Scroll to dive
        <svg
          className="bob h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 5v14M6 13l6 6 6-6" />
        </svg>
      </a>

      {/* 물결: 가장 앞 층은 페이지 배경색이라 아래 내용과 자연스럽게 이어진다 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 sm:h-32"
      >
        <Wave
          fill="color-mix(in srgb, var(--background) 35%, transparent)"
          duration={22}
          amplitude={34}
          offset={14}
        />
        <Wave
          fill="color-mix(in srgb, var(--background) 65%, transparent)"
          duration={16}
          amplitude={24}
          offset={6}
        />
        <Wave fill="var(--background)" duration={11} amplitude={18} offset={-2} />
      </div>
    </section>
  )
}
