import type { MDXComponents } from 'mdx/types'

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
  pre: (props) => <pre className="my-5 overflow-x-auto rounded-lg text-sm" {...props} />,
  // 코드 블록의 code는 rehype-highlight가 hljs 클래스를 붙이므로 인라인 코드와 구분된다
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
