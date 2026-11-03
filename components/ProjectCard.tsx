'use client'

import { useRef } from 'react'
import type { Link, Project } from '@/content/portfolio'

function Tags({ tags }: { tags: string[] }) {
  if (tags.length === 0) return null

  return (
    <ul className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <li key={tag} className="bg-surface rounded-full px-3 py-1 text-xs">
          {tag}
        </li>
      ))}
    </ul>
  )
}

function ExternalLinks({ links }: { links: Link[] }) {
  return links.map(({ label, href }) => (
    <a
      key={href}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-accent hover:underline"
    >
      {label} ↗
    </a>
  ))
}

function DetailSection({ title, children }: { title: string; children: string }) {
  return (
    <section>
      <h3 className="font-semibold">{title}</h3>
      <p className="text-muted mt-2 leading-7">{children}</p>
    </section>
  )
}

// 카드를 누르면 같은 페이지 위에 상세 설명 팝업(<dialog>)이 뜬다
export default function ProjectCard({ project }: { project: Project }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const titleId = `project-${project.slug}-title`

  return (
    <>
      <article className="border-border hover:bg-surface/50 flex h-full flex-col rounded-xl border p-5 transition-colors">
        <button
          type="button"
          onClick={() => dialogRef.current?.showModal()}
          className="group flex-1 cursor-pointer text-left"
        >
          <h3 className="text-lg font-semibold group-hover:underline">{project.title}</h3>
          <p className="text-muted mt-1 text-sm">{project.period}</p>
          <p className="text-muted mt-3 leading-7">{project.description}</p>
        </button>

        <div className="mt-4">
          <Tags tags={project.tags} />
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
          <button
            type="button"
            onClick={() => dialogRef.current?.showModal()}
            className="text-accent cursor-pointer hover:underline"
          >
            자세히 보기 →
          </button>
          <ExternalLinks links={project.links} />
        </div>
      </article>

      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        // 팝업 바깥(배경)을 누르면 닫힌다. 팝업 안쪽 클릭은 target이 dialog가 아니라서 무시된다
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close()
        }}
        className="bg-background text-foreground border-border m-auto max-h-[85vh] w-[calc(100%-2rem)] max-w-2xl overflow-y-auto rounded-2xl border p-0 shadow-xl backdrop:bg-black/50 backdrop:backdrop-blur-sm"
      >
        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <h2 id={titleId} className="text-2xl leading-tight font-bold tracking-tight">
              {project.title}
            </h2>
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              aria-label="닫기"
              className="text-muted hover:text-foreground hover:bg-surface -mt-1 -mr-2 cursor-pointer rounded-lg px-2 py-1 text-xl leading-none"
            >
              ×
            </button>
          </div>
          <p className="text-muted mt-3 text-sm">
            {project.period} · {project.team} · {project.role}
          </p>
          <p className="mt-4 leading-7">{project.description}</p>

          <div className="mt-4">
            <Tags tags={project.tags} />
          </div>
          {project.links.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-4 text-sm">
              <ExternalLinks links={project.links} />
            </div>
          )}

          <div className="border-border mt-8 space-y-8 border-t pt-8">
            <DetailSection title="문제">{project.problem}</DetailSection>
            <DetailSection title="해결">{project.solution}</DetailSection>
            <DetailSection title="결과">{project.result}</DetailSection>

            {project.troubleshooting.length > 0 && (
              <section>
                <h3 className="font-semibold">트러블슈팅</h3>
                <div className="mt-3 space-y-4">
                  {project.troubleshooting.map((item) => (
                    <div key={item.title} className="border-border rounded-xl border p-4">
                      <h4 className="font-medium">{item.title}</h4>
                      <p className="text-muted mt-2 leading-7">{item.content}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </dialog>
    </>
  )
}
