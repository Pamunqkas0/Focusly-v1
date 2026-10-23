'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

type ThemeName = 'light' | 'dark' | 'system'
type ResolvedTheme = 'light' | 'dark'

interface ThemeContextValue {
  theme: ThemeName
  resolvedTheme: ResolvedTheme
  setTheme: (theme: string) => void
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'dark',
  resolvedTheme: 'dark',
  setTheme: () => {},
})

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeName>('dark')
  const [systemTheme, setSystemTheme] = useState<ResolvedTheme>('dark')

  useEffect(() => {
    try {
      const storedTheme = window.localStorage.getItem('theme')
      if (storedTheme === 'light' || storedTheme === 'dark' || storedTheme === 'system') {
        setThemeState(storedTheme)
      }
    } catch {
      // Keep the default theme when browser storage is unavailable.
    }

    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const syncSystemTheme = () => setSystemTheme(media.matches ? 'dark' : 'light')
    syncSystemTheme()
    media.addEventListener('change', syncSystemTheme)
    return () => media.removeEventListener('change', syncSystemTheme)
  }, [])

  const resolvedTheme: ResolvedTheme = theme === 'system' ? systemTheme : theme

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', resolvedTheme === 'dark')
    root.style.colorScheme = resolvedTheme
  }, [resolvedTheme])

  const setTheme = useCallback((nextTheme: string) => {
    if (nextTheme !== 'light' && nextTheme !== 'dark' && nextTheme !== 'system') return
    try {
      window.localStorage.setItem('theme', nextTheme)
    } catch {
      // The active tab still updates if browser storage is unavailable.
    }
    setThemeState(nextTheme)
  }, [])

  const value = useMemo(() => ({ theme, resolvedTheme, setTheme }), [theme, resolvedTheme, setTheme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  return useContext(ThemeContext)
}
