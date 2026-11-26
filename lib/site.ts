// 사이트 이름, 소개, 내비게이션은 여기서 한 번만 바꾸면 된다
export const siteConfig = {
  name: 'suim-dev',
  /** 헤더 왼쪽에 보이는 로고 문구 */
  logo: 'suimmingpool',
  author: 'suim',
  // 검색 결과·링크 미리보기에 쓰이는 사이트 설명
  description: '기록하며 성장하는 개발자의 기술 블로그 겸 포트폴리오입니다.',
  /** 홈 히어로 문구 아래 소개 문장 */
  heroIntro:
    '안녕하세요, 김수임입니다. AI와 인터랙션 사이를 헤엄치며 만든 것들과 배운 것들을 기록합니다.',
  nav: [
    { href: '/blog', label: '블로그' },
    { href: '/about', label: '소개' },
  ],
}
