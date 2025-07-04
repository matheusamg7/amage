'use client'

import { memo, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePageTransition } from '@/contexts/PageTransitionContext'

interface PageTransitionProps {
  onComplete?: () => void
}

const PageTransition = memo(function PageTransition({ onComplete }: PageTransitionProps) {
  const [isVisible, setIsVisible] = useState(true)
  const { setTransitionComplete } = usePageTransition()
  const numBlocks = 12 // Número de blocos verticais
  
  useEffect(() => {
    // Esconder a transição após a animação completar
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTransitionComplete(true) // Avisa o contexto que terminou
      onComplete?.()
    }, 800) // Tempo bem reduzido para header e logo aparecerem antes
    
    return () => {
      clearTimeout(timer)
      setTransitionComplete(false) // Reset ao desmontar
    }
  }, [onComplete, setTransitionComplete])
  
  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[100] pointer-events-none">
          <div className="absolute inset-0 flex" style={{ marginLeft: '-1px', marginRight: '-1px' }}>
            {Array.from({ length: numBlocks }).map((_, i) => {
              // Alterna a origem da animação para criar um efeito mais dinâmico
              const isEven = i % 2 === 0
              
              return (
                <motion.div
                  key={i}
                  className="relative overflow-hidden"
                  initial={{ scaleY: 1 }}
                  animate={{ scaleY: 0 }}
                  exit={{ scaleY: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.03, // Delay ainda mais rápido
                    ease: [0.87, 0, 0.13, 1], // Easing mais agressivo
                  }}
                  style={{ 
                    originY: isEven ? 1 : 0, // Alterna origem (bottom/top)
                    width: `calc(${100 / numBlocks}% + 2px)`, // Width + margem extra para cobrir gaps
                    marginLeft: i === 0 ? '1px' : '0', // Ajusta o primeiro bloco
                    marginRight: '-1px', // Sobreposição para evitar gaps
                  }}
                >
                  {/* Gradiente nos blocos para um visual mais interessante */}
                  <div 
                    className="absolute inset-0 bg-black"
                  />
                </motion.div>
              )
            })}
          </div>
        </div>
      )}
    </AnimatePresence>
  )
})

export default PageTransition