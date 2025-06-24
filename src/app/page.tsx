'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Loader from '@/components/Loader'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Works from '@/components/sections/Works'
import TeamPlaceholder from '@/components/sections/TeamPlaceholder'
import Contact from '@/components/sections/Contact'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)

  // Verifica se veio de navegação interna após hidratação
  useEffect(() => {
    // Se veio de navegação interna, pula o loading
    if (document.referrer && document.referrer.includes(window.location.origin)) {
      setIsLoading(false)
      setShowContent(true)
    }
  }, [])

  useEffect(() => {
    // Previne scroll durante o loading
    document.body.style.overflow = isLoading ? 'hidden' : 'unset'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isLoading])

  const handleLoadComplete = () => {
    // Pequeno delay para sincronizar com a animação de saída
    setTimeout(() => {
      setIsLoading(false)
      // Delay adicional para começar a entrada do conteúdo
      setTimeout(() => {
        setShowContent(true)
      }, 100)
    }, 100)
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loader"
            exit={{ 
              opacity: 0,
              scale: 0.95,
              filter: 'blur(10px)',
              transition: {
                duration: 0.6,
                ease: [0.43, 0.13, 0.23, 0.96]
              }
            }}
          >
            <Loader onLoadComplete={handleLoadComplete} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay de transição */}
      <AnimatePresence>
        {!isLoading && !showContent && (
          <motion.div
            className="fixed inset-0 bg-black z-50"
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              transition: {
                duration: 1,
                ease: 'easeInOut'
              }
            }}
          />
        )}
      </AnimatePresence>

      {/* Conteúdo principal */}
      <AnimatePresence>
        {showContent && (
          <motion.main 
            key="content"
            className="bg-black text-white"
            initial={{ 
              opacity: 0,
            }}
            animate={{ 
              opacity: 1,
              transition: {
                duration: 1.2,
                ease: [0.25, 0.1, 0.25, 1]
              }
            }}
          >
            <Hero />
            <About />
            <Works />
            <TeamPlaceholder />
            <Contact />
          </motion.main>
        )}
      </AnimatePresence>
    </>
  )
}