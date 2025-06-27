'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import PixelTrail from '@/blocks/Animations/PixelTrail/PixelTrail'

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
  const [showPixelTrail, setShowPixelTrail] = useState(false)

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
        
        // Aguardar um pouco após o Unicorn Studio carregar para evitar conflito
        setTimeout(() => {
          setShowPixelTrail(true)
        }, 2000)
      }
      document.head.appendChild(script)
    } else {
      // Se já estava carregado, mostrar PixelTrail após delay
      setTimeout(() => {
        setShowPixelTrail(true)
      }, 2000)
    }
  }, [])

  return (
    <section id="home" className="relative min-h-screen h-[100dvh] overflow-hidden pt-32">
      {/* Container do Unicorn Studio cobrindo toda a tela */}
      <div 
        data-us-project="mzU38O7zcRH3LBVeuupU?update=1.0.1" 
        data-us-production="true"
        data-us-lazyload="true"
        className="absolute inset-0 z-0"
        style={{ width: '100%', height: '100%' }}
      />
      
      {/* PixelTrail animation - renderizado após Unicorn Studio */}
      {showPixelTrail && (
        <motion.div 
          className="absolute inset-0 z-5 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <PixelTrail 
            gridSize={60}
            trailSize={0.03}
            maxAge={150}
            interpolate={3}
            color="#ffffff"
            className="opacity-20 pointer-events-auto"
          />
        </motion.div>
      )}
      
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