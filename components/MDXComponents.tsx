import type { MDXComponents } from 'mdx/types'

// MDX 안에서 쓰이는 HTML 요소를 커스텀 컴포넌트로 교체한다.
// 본격적인 타이포그래피/디자인은 3~4단계에서 다듬는다.
export const mdxComponents: MDXComponents = {
  h1: (props) => <h1 className="mt-10 mb-4 text-3xl font-bold" {...props} />,
  h2: (props) => <h2 className="mt-10 mb-3 text-2xl font-semibold" {...props} />,
  h3: (props) => <h3 className="mt-8 mb-2 text-xl font-semibold" {...props} />,
  p: (props) => <p className="my-4 leading-7" {...props} />,
  a: (props) => (
    <a className="underline underline-offset-4 hover:opacity-70" {...props} />
  ),
  ul: (props) => <ul className="my-4 list-disc space-y-1 pl-6" {...props} />,
  ol: (props) => <ol className="my-4 list-decimal space-y-1 pl-6" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="my-4 border-l-4 border-zinc-300 pl-4 text-zinc-600 dark:border-zinc-700 dark:text-zinc-400"
      {...props}
    />
  ),
  pre: (props) => <pre className="my-4 overflow-x-auto rounded-lg text-sm" {...props} />,
  // 코드 블록의 code는 rehype-highlight가 hljs 클래스를 붙이므로 인라인 코드와 구분된다
  code: ({ className, ...props }) =>
    className?.includes('hljs') ? (
      <code className={className} {...props} />
    ) : (
      <code
        className="rounded bg-black/[.06] px-1.5 py-0.5 font-mono text-[0.9em] dark:bg-white/[.1]"
        {...props}
      />
    ),
  table: (props) => (
    <div className="my-4 overflow-x-auto">
      <table className="w-full border-collapse text-sm" {...props} />
    </div>
  ),
  th: (props) => (
    <th
      className="border border-zinc-300 px-3 py-2 text-left dark:border-zinc-700"
      {...props}
    />
  ),
  td: (props) => (
    <td className="border border-zinc-300 px-3 py-2 dark:border-zinc-700" {...props} />
  ),
}
