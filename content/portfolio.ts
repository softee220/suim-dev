// 포트폴리오에 보이는 내용은 이 파일만 고치면 된다.
// '회사/기관명', '프로젝트 이름'처럼 자리표시자로 남겨 둔 항목을 본인의 내용으로 바꾸세요.

export type Link = { label: string; href: string }

export type Experience = {
  organization: string
  role: string
  period: string
  bullets: string[]
}

export type Project = {
  title: string
  period: string
  description: string
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
  // 이메일은 mailto:주소 형태로 적는다. 빈 배열이면 연락처 영역이 숨겨진다
  contacts: [
    { label: 'GitHub', href: 'https://github.com/your-id' },
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
    title: 'suim-dev',
    period: '2026.09 –',
    description:
      'MDX로 글을 쓰고 Vercel로 배포하는 기술 블로그 겸 포트폴리오 사이트입니다. 태그 필터, 다크모드, 코드 블록 복사 기능을 직접 구현했습니다.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'MDX'],
    links: [],
    featured: true,
  },
  {
    title: '프로젝트 이름',
    period: '2026.03 – 2026.05',
    description:
      '프로젝트가 해결하는 문제와 본인이 맡은 역할, 결과를 두세 문장으로 적어주세요.',
    tags: ['사용한 기술', '을 여기에'],
    links: [{ label: 'GitHub', href: 'https://github.com/softee220' }],
    featured: true,
  },
]

export const skills: SkillGroup[] = [
  { category: 'Frontend', items: ['TypeScript', 'React', 'Next.js', 'Tailwind CSS'] },
  { category: 'Tools', items: ['Git', 'GitHub', 'Vercel', 'ESLint', 'Prettier'] },
]
