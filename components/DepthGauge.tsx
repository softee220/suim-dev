'use client'

import { useEffect, useRef } from 'react'

/** 화면 오른쪽에 붙어서 스크롤한 만큼 점이 아래로 내려가는 '수심' 게이지 (큰 화면에서만 보인다) */
export default function DepthGauge() {
  const markerRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    let frame = 0

    // 스크롤마다 리렌더링하지 않도록 state 대신 DOM을 직접 갱신한다
    function update() {
      frame = 0
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      const progress = scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0
      markerRef.current?.style.setProperty('top', `${progress * 100}%`)
    }

    function onScroll() {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className="fixed top-1/2 right-8 z-10 hidden h-56 -translate-y-1/2 xl:block"
    >
      <div className="bg-border relative h-full w-px">
        <span
          ref={markerRef}
          className="bg-accent ring-accent/25 absolute left-1/2 block h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full ring-4 transition-[top] duration-200 ease-out"
        />
      </div>
    </div>
  )
}
