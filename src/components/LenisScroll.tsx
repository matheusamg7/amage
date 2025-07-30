'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

export default function LenisScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Desabilitar Lenis no mobile
    const isMobile = window.innerWidth < 768
    if (isMobile) {
      return
    }
    
    const lenis = new Lenis({
      duration: 1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8,
      infinite: false,
    })

    let rafId: number
    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId)
      }
      if (lenis) {
        lenis.destroy()
      }
    }
  }, [])

  return <>{children}</>
}