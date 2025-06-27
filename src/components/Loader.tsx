'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AnimatedLogo from './AnimatedLogo'
import Dither from '@/blocks/Backgrounds/Dither/Dither'

interface LoaderProps {
  onLoadComplete: () => void
}

export default function Loader({ onLoadComplete }: LoaderProps) {
  const [percentage, setPercentage] = useState(0)

  useEffect(() => {
    // Adicionar preload da imagem do Hero
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href = 'https://firebasestorage.googleapis.com/v0/b/unicorn-studio.appspot.com/o/OcNScnJlMIfjhkZmDSOMtiDDMo83%2FamageBack%20(1).png?alt=media&token=0c62cccd-56ac-4f79-99a4-a4f7bc4f1cf2'
    link.crossOrigin = 'anonymous'
    document.head.appendChild(link)
    
    const duration = 3500 // 3.5 seconds
    const interval = 20 // Update every 20ms
    const increment = 100 / (duration / interval)

    const timer = setInterval(() => {
      setPercentage(prev => {
        const next = Math.min(prev + increment, 100)
        
        // Quando chegar a 100%, aguarda um frame e chama onLoadComplete
        if (next === 100 && prev < 100) {
          requestAnimationFrame(() => {
            onLoadComplete()
          })
        }
        
        return next
      })
    }, interval)

    return () => clearInterval(timer)
  }, [onLoadComplete])

  return (
    <AnimatePresence>
      <motion.div
        data-loader
        className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Dither background */}
        <div className="absolute inset-0">
          <Dither
            waveColor={[0.5, 0.4, 0.5]}
            colorNum={4.5}
            waveAmplitude={0.09}
            waveFrequency={3}
            disableAnimation={false}
            waveSpeed={0.05}
            enableMouseInteraction={false}
            mouseRadius={0.15}
          />
        </div>
        {/* Logo AMAGE no centro */}
        <div className="relative z-10 w-full flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <AnimatedLogo className="w-[200px] xs:w-[220px] sm:w-[300px] md:w-[400px] lg:w-[500px] h-auto max-w-full" />
          </motion.div>
        </div>

        {/* Indicador de porcentagem no canto superior direito */}
        <motion.div
          className="fixed top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8 flex items-center gap-2 sm:gap-3 z-10 bg-black/70 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <motion.div
            className="w-3 h-3 sm:w-4 sm:h-4 bg-[#6F278B]"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [1, 0.8, 1]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <span className="text-white font-mono text-xs sm:text-sm font-semibold">
            {Math.floor(percentage)}%
          </span>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}