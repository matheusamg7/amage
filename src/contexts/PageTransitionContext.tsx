'use client'

import { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { usePathname } from 'next/navigation'

interface PageTransitionContextType {
  isTransitionComplete: boolean
  setTransitionComplete: (complete: boolean) => void
}

const PageTransitionContext = createContext<PageTransitionContextType | undefined>(undefined)

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const [isTransitionComplete, setTransitionComplete] = useState(false)
  const pathname = usePathname()
  
  // Reset quando mudar de página
  useEffect(() => {
    // Se estamos em uma página que não é a home, marca como completo
    if (pathname !== '/') {
      setTransitionComplete(true)
    }
  }, [pathname])

  return (
    <PageTransitionContext.Provider value={{ isTransitionComplete, setTransitionComplete }}>
      {children}
    </PageTransitionContext.Provider>
  )
}

export function usePageTransition() {
  const context = useContext(PageTransitionContext)
  if (!context) {
    throw new Error('usePageTransition must be used within PageTransitionProvider')
  }
  return context
}