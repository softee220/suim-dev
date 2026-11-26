'use client'

import { useEffect, useRef, type ReactNode } from 'react'

type RevealProps = {
  children: ReactNode
  /** 같은 줄의 카드들이 차례로 떠오르게 할 때 쓰는 지연(ms) */
  delay?: number
  className?: string
}

/** 화면에 들어오는 순간 아래에서 위로 떠오르며 나타난다. 한 번 나타나면 다시 숨기지 않는다 */
export default function Reveal({ children, delay = 0, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.setAttribute('data-visible', '')
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px -10% 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      data-reveal=""
      className={className}
      style={{ '--reveal-delay': `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </div>
  )
}
