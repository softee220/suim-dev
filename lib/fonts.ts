import { Anton, Great_Vibes, Italiana } from 'next/font/google'

// 히어로 문구는 포스터처럼 두 폰트를 겹쳐 쓴다.
// 굵고 좁은 대문자(displayFont) 사이에 우아한 필기체(scriptFont)가 걸쳐 놓인다.

export const displayFont = Anton({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

export const scriptFont = Great_Vibes({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

/** 헤더 로고용: 획이 아주 가늘고 길쭉한 디스플레이 세리프 */
export const logoFont = Italiana({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})
