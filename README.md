# My Portfolio

Next.js + MDX + Tailwind CSS로 만드는 기술 블로그 겸 포트폴리오.

## Stack

- **Next.js** (App Router, TypeScript)
- **Tailwind CSS**
- **MDX** (`next-mdx-remote`, `gray-matter`) — 콘텐츠는 `content/blog/*.mdx`
- **Vercel** 배포 예정
- **Supabase** (선택, 조회수 등 동적 기능용 — 추후 연동)

## 개발 시작하기

```bash
npm install
npm run dev
```

http://localhost:3000 에서 확인.

## 스크립트

- `npm run dev` — 개발 서버
- `npm run build` — 프로덕션 빌드
- `npm run lint` — ESLint 검사
- `npm run format` — Prettier로 전체 포맷팅

## 폴더 구조

```
app/            Next.js App Router 페이지
content/blog/   MDX 블로그 글
components/     재사용 UI 컴포넌트
lib/            데이터 로직 (MDX 파싱, Supabase 클라이언트 등)
public/         정적 파일 (이미지 등)
```

## 진행 상황

- [x] 1단계 — 프로젝트 초기 세팅 (create-next-app, Tailwind, ESLint/Prettier)
- [ ] 2단계 — MDX 파이프라인 구축
- [ ] 3단계 — 레이아웃 & 디자인
- [ ] 4단계 — 블로그 목록·상세 페이지
- [ ] 5단계 — 포트폴리오 섹션
- [ ] 6단계 — 1차 배포 (Vercel)
- [ ] 7단계 — 동적 기능 (조회수 등, Supabase)
- [ ] 8단계 — SEO & 성능 최적화
- [ ] 9단계 — 운영 루틴
