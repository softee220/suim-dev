// 포트폴리오에 보이는 내용은 이 파일만 고치면 된다.
// '회사/기관명', '프로젝트 이름'처럼 자리표시자로 남겨 둔 항목을 본인의 내용으로 바꾸세요.

export type Link = { label: string; href: string }

export type Experience = {
  organization: string
  role: string
  period: string
  bullets: string[]
}

export type Troubleshooting = {
  title: string
  content: string
}

export type TimelineItem = {
  period: string
  title: string
  description?: string
}

export type Project = {
  /** URL에 쓰이는 식별자. /projects/[slug] 경로에 사용된다 */
  slug: string
  title: string
  period: string
  /** 인원 구성. 예: "개인 프로젝트", "4인 팀 프로젝트" */
  team: string
  /** 팀 프로젝트에서 내가 맡은 역할 */
  role: string
  /** 목록/카드에 쓰이는 한 줄~두 문장 요약 */
  description: string
  /** 어떤 문제를 풀어야 했는지 */
  problem: string
  /** 그 문제를 어떻게 풀었는지 (내가 한 일 중심) */
  solution: string
  /** 결과. 가능하면 수치로 */
  result: string
  /** 상세 페이지에 보여줄 트러블슈팅 1~2개 */
  troubleshooting: Troubleshooting[]
  tags: string[]
  links: Link[]
  /** true면 홈 화면에도 노출된다 */
  featured?: boolean
}

export type SkillGroup = { category: string; items: string[] }

export const profile = {
  intro: [
    '기록하며 성장하는 개발자입니다.',
    '여기에 자기소개를 적어주세요. 관심 분야, 지향하는 개발자상, 강점 등을 두세 문단으로 정리하면 좋습니다.',
  ],
  // 메인 페이지에 한두 줄로 노출되는 인턴/경력 요약. 빈 문자열이면 숨겨진다
  internshipSummary: '',
  // 이력서 PDF는 public/resume.pdf에 넣고 경로를 적는다. 빈 문자열이면 버튼이 숨겨진다
  resumeUrl: '',
  // 이메일은 mailto:주소 형태로 적는다. 빈 배열이면 연락처 영역이 숨겨진다
  contacts: [
    { label: 'GitHub', href: 'https://github.com/softee220' },
    { label: 'Email', href: 'mailto:you@example.com' },
  ] satisfies Link[],
}

export const experiences: Experience[] = [
  {
    organization: '회사/기관명',
    role: '직무 (인턴, 교육 과정 등)',
    period: '2026.01 – 2026.06',
    bullets: [
      '담당한 업무나 만든 결과물을 한 줄로 적어주세요.',
      '가능하면 수치나 결과를 함께 적으면 좋습니다.',
    ],
  },
]

export const projects: Project[] = [
  {
    slug: 'suim-dev',
    title: 'suim-dev',
    period: '2026.09 –',
    team: '개인 프로젝트',
    role: '기획 · 디자인 · 개발 전체 담당',
    description:
      'MDX로 글을 쓰고 Vercel로 배포하는 기술 블로그 겸 포트폴리오 사이트입니다. 태그 필터, 다크모드, 코드 블록 복사 기능을 직접 구현했습니다.',
    problem:
      '취업 준비 과정과 프로젝트 경험을 기록하고, 이력서만으로는 보여주기 어려운 개발 과정을 보여줄 공간이 필요했습니다.',
    solution:
      'Next.js App Router와 MDX로 정적 사이트를 구성해, 글은 커밋만 하면 Vercel이 자동으로 빌드·배포하도록 만들었습니다. gray-matter로 frontmatter를 파싱하고, 다크모드·태그 필터·코드 복사 같은 UI를 직접 구현했습니다.',
    result: '여기에 배포 URL, 글 개수, 방문자 수 등 수치로 보여줄 수 있는 결과를 적어주세요.',
    troubleshooting: [
      {
        title: '여기에 트러블슈팅 제목을 적어주세요',
        content: '어떤 문제가 있었고, 어떻게 원인을 찾고, 어떻게 해결했는지 적어주세요.',
      },
    ],
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'MDX'],
    links: [],
    featured: true,
  },
  {
    slug: 'project-slug',
    title: '프로젝트 이름',
    period: '2026.03 – 2026.05',
    team: '인원 구성 (예: 4인 팀 프로젝트)',
    role: '맡은 역할 (예: 백엔드, 인증/결제 API 설계·구현)',
    description:
      '프로젝트가 해결하는 문제와 본인이 맡은 역할, 결과를 두세 문장으로 적어주세요.',
    problem: '이 프로젝트가 풀어야 했던 문제 상황을 적어주세요.',
    solution:
      '팀 전체가 뭘 했는지보다, 본인이 어떤 결정을 왜 내렸는지를 중심으로 적어주세요.',
    result: '가능하면 수치로 보여줄 수 있는 결과를 적어주세요.',
    troubleshooting: [
      {
        title: '트러블슈팅 제목',
        content: '문제 → 원인 파악 → 해결 과정을 적어주세요.',
      },
    ],
    tags: ['사용한 기술', '을 여기에'],
    links: [{ label: 'GitHub', href: 'https://github.com/softee220' }],
    featured: true,
  },
]

export const skills: SkillGroup[] = [
  { category: 'Frontend', items: ['TypeScript', 'React', 'Next.js', 'Tailwind CSS'] },
  { category: 'Tools', items: ['Git', 'GitHub', 'Vercel', 'ESLint', 'Prettier'] },
]

// 학력. 비워두면 /about에서 섹션이 숨겨진다
export const education: TimelineItem[] = []

// 수상·자격증. 비워두면 /about에서 섹션이 숨겨진다
export const awards: TimelineItem[] = []

export function getProjectSlugs(): string[] {
  return projects.map((project) => project.slug)
}

export function getProjectBySlug(slug: string): Project | null {
  return projects.find((project) => project.slug === slug) ?? null
}
