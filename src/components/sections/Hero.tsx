'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

declare global {
  interface Window {
    UnicornStudio?: {
      init: () => void
      isInitialized: boolean
    }
  }
}

export default function Hero() {
  const [showText, setShowText] = useState(false)

  useEffect(() => {
    // Mostrar texto após 1.5 segundos (depois do Unicorn Studio carregar)
    const timer = setTimeout(() => {
      setShowText(true)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

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
      <div className="absolute inset-x-0 top-1/4 z-10 flex justify-center">
        {showText && (
          <motion.h1 
            className="text-5xl md:text-6xl lg:text-7xl font-semibold text-white font-hubot uppercase tracking-wider text-center"
            initial={{ 
              opacity: 0,
              y: 20,
              scale: 0.95,
              filter: "blur(10px)"
            }}
            animate={{ 
              opacity: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)"
            }}
            transition={{
              duration: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94],
              filter: { duration: 0.6 }
            }}
          >
            DESENVOLVEMOS<br />SITES QUE
          </motion.h1>
        )}
      </div>
    </section>
  )
}