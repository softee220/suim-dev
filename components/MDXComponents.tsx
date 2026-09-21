import type { MDXComponents } from 'mdx/types'
import { cloneElement, isValidElement } from 'react'
import CodeBlock from './CodeBlock'

// MDX 안에서 쓰이는 HTML 요소를 커스텀 컴포넌트로 교체한다.
// 색상은 globals.css의 토큰(border, surface, muted, accent)만 사용한다.
export const mdxComponents: MDXComponents = {
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
