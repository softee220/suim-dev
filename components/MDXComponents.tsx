import type { MDXComponents } from 'mdx/types'
import Image from 'next/image'
import { cloneElement, isValidElement } from 'react'
import CodeBlock from './CodeBlock'

// MDX 안에서 쓰이는 HTML 요소를 커스텀 컴포넌트로 교체한다.
// 색상은 globals.css의 토큰(border, surface, muted, accent)만 사용한다.
type FigureProps = {
  src: string
  alt: string
  /** MDX에서는 JS 표현식({800})이 막혀 있어 문자열("800")로 받는다 */
  width: number | string
  height: number | string
  /** 사진 아래 설명 (없으면 alt를 쓴다) */
  caption?: string
  /** 사진 출처 */
  credit?: string
}

/** 글 안에 넣는 사진. MDX에서 <Figure src="..." alt="..." width="800" height="500" />로 쓴다 */
function Figure({ src, alt, width, height, caption, credit }: FigureProps) {
  return (
    <figure className="my-8">
      <Image
        src={src}
        alt={alt}
        width={Number(width)}
        height={Number(height)}
        sizes="(min-width: 768px) 720px, 100vw"
        className="border-border w-full rounded-xl border"
      />
      <figcaption className="text-muted mt-2 text-center text-sm">
        {caption ?? alt}
        {credit && <span className="opacity-70"> · 사진: {credit}</span>}
      </figcaption>
    </figure>
  )
}

type ScreenshotProps = Pick<FigureProps, 'src' | 'alt' | 'width' | 'height'>

/** FigureGroup 안에서 쓰는 사진 한 장 (캡션 없이 사진만) */
function Screenshot({ src, alt, width, height }: ScreenshotProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={Number(width)}
      height={Number(height)}
      sizes="(min-width: 480px) 224px, 50vw"
      className="border-border w-full rounded-xl border"
    />
  )
}

/** 휴대폰 화면처럼 세로로 긴 사진을 두 장씩 나란히 놓는다. 안에 <Screenshot />을 넣어 쓴다 */
function FigureGroup({
  caption,
  children,
}: {
  caption?: string
  children: React.ReactNode
}) {
  return (
    <figure className="my-8">
      <div className="mx-auto grid max-w-md grid-cols-2 items-start gap-3 sm:gap-4">
        {children}
      </div>
      {caption && (
        <figcaption className="text-muted mt-2 text-center text-sm">{caption}</figcaption>
      )}
    </figure>
  )
}

export const mdxComponents: MDXComponents = {
  Figure,
  FigureGroup,
  Screenshot,
  h1: (props) => (
    <h1 className="mt-10 mb-4 text-3xl font-bold tracking-tight" {...props} />
  ),
  h2: (props) => (
    <h2 className="mt-12 mb-4 text-2xl font-semibold tracking-tight" {...props} />
  ),
  h3: (props) => <h3 className="mt-8 mb-3 text-xl font-semibold" {...props} />,
  p: (props) => <p className="my-5 leading-8" {...props} />,
  a: (props) => (
    <a className="text-accent underline underline-offset-4 hover:opacity-80" {...props} />
  ),
  ul: (props) => <ul className="my-5 list-disc space-y-2 pl-6 leading-8" {...props} />,
  ol: (props) => <ol className="my-5 list-decimal space-y-2 pl-6 leading-8" {...props} />,
  blockquote: (props) => (
    <blockquote className="border-border text-muted my-5 border-l-4 pl-4" {...props} />
  ),
  hr: (props) => <hr className="border-border my-10" {...props} />,
  pre: ({ children }) => {
    // 코드 블록은 <pre><code class="hljs language-xx">…</code></pre> 구조로 온다
    if (!isValidElement<{ className?: string }>(children)) {
      return <CodeBlock>{children}</CodeBlock>
    }

    const className = children.props.className ?? ''
    const language = /language-([\w-]+)/.exec(className)?.[1]
    // 언어를 지정하지 않은 코드 블록에는 hljs가 안 붙어 인라인 코드처럼 보이므로 직접 붙인다
    const code = className.includes('hljs')
      ? children
      : cloneElement(children, { className: `hljs ${className}`.trim() })

    return <CodeBlock language={language}>{code}</CodeBlock>
  },
  // rehype-highlight가 코드 블록의 code에 hljs 클래스를 붙이므로 인라인 코드와 구분된다
  code: ({ className, ...props }) =>
    className?.includes('hljs') ? (
      <code className={className} {...props} />
    ) : (
      <code
        className="bg-surface rounded px-1.5 py-0.5 font-mono text-[0.9em]"
        {...props}
      />
    ),
  table: (props) => (
    <div className="my-5 overflow-x-auto">
      <table className="w-full border-collapse text-sm" {...props} />
    </div>
  ),
  th: (props) => (
    <th className="border-border bg-surface border px-3 py-2 text-left" {...props} />
  ),
  td: (props) => <td className="border-border border px-3 py-2" {...props} />,
}
