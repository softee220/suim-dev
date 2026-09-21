export type Theme = 'light' | 'dark'

export const THEME_STORAGE_KEY = 'theme'

const DARK_QUERY = '(prefers-color-scheme: dark)'

/**
 * <head>에서 첫 페인트 전에 실행되는 스크립트.
 * 저장된 설정이 있으면 그것을, 없으면 시스템 설정을 따라 <html>에 dark 클래스를 붙인다.
 * 서버 렌더링 시점에는 사용자의 설정을 알 수 없어서 인라인 스크립트로 깜빡임을 막는다.
 */
export const themeInitScript = `(function(){var t=null;try{t=localStorage.getItem("${THEME_STORAGE_KEY}")}catch(e){}var d=t==="dark"||(t!=="light"&&matchMedia("${DARK_QUERY}").matches);document.documentElement.classList.toggle("dark",d)})()`

// 아래 함수들은 브라우저에서만 호출한다 (ThemeToggle)

export function readStoredTheme(): Theme | null {
  try {
    const value = localStorage.getItem(THEME_STORAGE_KEY)
    return value === 'light' || value === 'dark' ? value : null
  } catch {
    return null
  }
}

export function storeTheme(theme: Theme) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  } catch {
    // 저장이 막힌 환경(시크릿 모드 등)에서는 이번 방문에만 적용된다
  }
}

export function getSystemMedia() {
  return window.matchMedia(DARK_QUERY)
}

export function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark')
}

export function resolveTheme(): Theme {
  return readStoredTheme() ?? (getSystemMedia().matches ? 'dark' : 'light')
}
