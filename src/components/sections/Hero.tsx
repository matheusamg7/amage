'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    UnicornStudio?: {
      init: () => void
      isInitialized: boolean
    }
  }
}

export default function Hero() {
  useEffect(() => {
    // Inicializar Unicorn Studio imediatamente
    if (!window.UnicornStudio || !window.UnicornStudio.isInitialized) {
      const script = document.createElement("script")
      script.src = "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.26/dist/unicornStudio.umd.js"
      script.async = true
      script.onload = function() {
        // Inicializar imediatamente após o carregamento do script
        (window as any).UnicornStudio.init()
        if (!window.UnicornStudio) {
          window.UnicornStudio = { isInitialized: true } as any
        } else {
          window.UnicornStudio.isInitialized = true
        }
      }
      document.head.appendChild(script)
    }
  }, [])

  return (
    <section id="home" className="relative min-h-screen h-[100dvh] overflow-hidden pt-32">
      {/* Container do Unicorn Studio cobrindo toda a tela */}
      <div 
        data-us-project="mzU38O7zcRH3LBVeuupU?update=1.0.1" 
        data-us-production="true"
        data-us-lazyload="true"
        className="absolute inset-0"
        style={{ width: '100%', height: '100%' }}
      />
      
      {/* Container para conteúdo adicional sobre o Unicorn Studio */}
      <div className="relative z-10 h-full flex items-center justify-center pointer-events-none">
        {/* Conteúdo adicional pode ser adicionado aqui */}
      </div>
    </section>
  )
}