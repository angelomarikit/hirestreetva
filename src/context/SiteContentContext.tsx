import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { defaultContentMap } from '../data/contentDefaults'
import { defaultSettings } from '../data/seed'
import { contentOr, fetchContentMap, fetchSiteSettings } from '../lib/content'
import type { SiteSettings } from '../types/cms'

type SiteContentContextValue = {
  settings: SiteSettings
  content: Record<string, string>
  loading: boolean
  refresh: () => Promise<void>
  t: (key: string, fallback?: string) => string
}

const SiteContentContext = createContext<SiteContentContextValue | null>(null)

export function SiteContentProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings)
  const [content, setContent] = useState<Record<string, string>>(defaultContentMap)
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(async () => {
    const [s, c] = await Promise.all([fetchSiteSettings(), fetchContentMap()])
    setSettings(s)
    setContent(c)
    setLoading(false)
  }, [])

  useEffect(() => {
    void refresh()
  }, [refresh])

  const t = useCallback(
    (key: string, fallback = '') => contentOr(content, key, fallback),
    [content],
  )

  const value = useMemo(
    () => ({ settings, content, loading, refresh, t }),
    [settings, content, loading, refresh, t],
  )

  return <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>
}

export function useSiteContent() {
  const ctx = useContext(SiteContentContext)
  if (!ctx) throw new Error('useSiteContent must be used within SiteContentProvider')
  return ctx
}
