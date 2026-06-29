import { createContext, useContext, useEffect } from 'react'

// El layout provee setHeader; cada página publica su título + subtítulo al topbar.
export const PageHeaderContext = createContext(() => {})

export function usePageHeader(title, subtitle) {
  const setHeader = useContext(PageHeaderContext)
  useEffect(() => {
    setHeader({ title, subtitle })
  }, [title, subtitle, setHeader])
}
