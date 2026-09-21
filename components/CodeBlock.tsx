'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

type CodeBlockProps = {
  language?: string
  children: ReactNode
}

/** 언어 라벨과 복사 버튼이 붙은 코드 블록. 배경은 highlight.js 테마(github-dark)에 맞춰 항상 어둡다 */
export default function CodeBlock({ language, children }: CodeBlockProps) {
  const preRef = useRef<HTMLPreElement>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timer = setTimeout(() => setCopied(false), 1500)
    return () => clearTimeout(timer)
  }, [copied])

  async function copy() {
    try {
      await navigator.clipboard.writeText(preRef.current?.textContent ?? '')
      setCopied(true)
    } catch {
      // 클립보드 접근이 막힌 환경에서는 조용히 넘어간다
    }
  }

  return (
    <div className="my-5 overflow-hidden rounded-lg bg-[#0d1117]">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-1.5 text-xs text-zinc-400">
        <span className="font-mono uppercase">{language ?? 'text'}</span>
        <button
          type="button"
          onClick={copy}
          aria-live="polite"
          className="rounded px-2 py-1 transition-colors hover:bg-white/10 hover:text-zinc-100"
        >
          {copied ? '복사됨' : '복사'}
        </button>
      </div>
      <pre ref={preRef} className="overflow-x-auto text-sm">
        {children}
      </pre>
    </div>
  )
}
