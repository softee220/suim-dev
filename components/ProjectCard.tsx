'use client'

import Image from 'next/image'
import { useRef } from 'react'
import type { Link, Project, ProjectImage, ProjectVideo } from '@/content/portfolio'

// 사진 아래쪽이 카드 배경색(흰색)으로 서서히 녹아들게 하는 그라데이션
const FADE_TO_BACKGROUND =
  'linear-gradient(180deg, transparent 30%, color-mix(in srgb, var(--background) 70%, transparent) 70%, var(--background) 100%)'

/** 대표 사진: 아래로 갈수록 배경색으로 녹아들고, 그 위에 제목이 올라간다 */
function Thumbnail({
  project,
  className,
  sizes,
  children,
}: {
  project: Project
  className: string
  sizes: string
  children?: React.ReactNode
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={project.thumbnail!}
        alt=""
        fill
        sizes={sizes}
        className={`${project.thumbnailFit === 'contain' ? 'object-contain p-4 pb-10' : 'object-cover'} transition-transform duration-700 ease-out group-hover:scale-105`}
        style={{ objectPosition: project.thumbnailPosition ?? 'center' }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ background: FADE_TO_BACKGROUND }}
      />
      {children && <div className="absolute inset-x-0 bottom-0">{children}</div>}
    </div>
  )
}

function Video({ video }: { video: ProjectVideo }) {
  return (
    <figure>
      <div
        className={`border-border overflow-hidden rounded-xl border bg-black ${
          video.vertical ? 'mx-auto aspect-[9/16] w-full max-w-xs' : 'aspect-video w-full'
        }`}
      >
        {/* youtube-nocookie: 재생 전까지 추적 쿠키를 남기지 않는 YouTube 임베드 주소 */}
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?rel=0`}
          title={video.title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="h-full w-full"
        />
      </div>
      <figcaption className="text-muted mt-2 text-center text-sm">
        {video.title}
      </figcaption>
    </figure>
  )
}

function Gallery({ images, videos }: { images: ProjectImage[]; videos: ProjectVideo[] }) {
  return (
    <section>
      <h3 className="font-semibold">화면</h3>
      <div className="mt-3 space-y-6">
        {videos.map((video) => (
          <Video key={video.youtubeId} video={video} />
        ))}
        {images.map((image) => (
          <figure key={image.src}>
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              sizes="(min-width: 672px) 608px, 100vw"
              className="border-border w-full rounded-xl border"
            />
            <figcaption className="text-muted mt-2 text-center text-sm">
              {image.alt}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}

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
      <article className="card-float border-border bg-background flex h-full flex-col overflow-hidden rounded-2xl border">
        <button
          type="button"
          onClick={() => dialogRef.current?.showModal()}
          className="group flex flex-1 cursor-pointer flex-col text-left"
        >
          {project.thumbnail ? (
            <Thumbnail
              project={project}
              className="aspect-[16/10] w-full"
              sizes="(min-width: 640px) 360px, 100vw"
            >
              <div className="px-6 pb-1">
                <h3 className="text-xl font-bold tracking-tight">{project.title}</h3>
                <p className="text-muted mt-1 text-sm">{project.period}</p>
              </div>
            </Thumbnail>
          ) : (
            <div className="px-6 pt-6">
              <h3 className="group-hover:text-accent text-lg font-semibold transition-colors">
                {project.title}
              </h3>
              <p className="text-muted mt-1 text-sm">{project.period}</p>
            </div>
          )}
          <p className="text-muted mt-3 px-6 leading-7">{project.description}</p>
        </button>

        <div className="mt-4 px-6">
          <Tags tags={project.tags} />
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-4 px-6 pb-6 text-sm">
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
        {/* 스크롤해도 닫기 버튼이 오른쪽 위에 계속 보이도록 sticky로 띄운다 */}
        <div className="sticky top-0 z-10 flex h-0 justify-end">
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            aria-label="닫기"
            className="btn-glass btn-glass-icon mt-4 mr-4"
          >
            ×
          </button>
        </div>

        {project.thumbnail && (
          <Thumbnail project={project} className="aspect-[16/9] w-full" sizes="672px" />
        )}

        <div
          className={`p-6 sm:p-8 ${project.thumbnail ? 'relative -mt-20 sm:-mt-24' : ''}`}
        >
          <h2
            id={titleId}
            className="pr-10 text-2xl leading-tight font-bold tracking-tight"
          >
            {project.title}
          </h2>
          <p className="text-muted mt-3 text-sm">
            {project.period} · {project.role}
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
            {Boolean(project.gallery?.length || project.videos?.length) && (
              <Gallery images={project.gallery ?? []} videos={project.videos ?? []} />
            )}
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
