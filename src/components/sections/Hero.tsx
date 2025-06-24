'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import PixelTrail from '@/blocks/Animations/PixelTrail/PixelTrail'
import { useImagePreloader } from '@/hooks/useImagePreloader'
import { animationConfig } from '@/config/animations'

interface HeroProps {
  noiseOpacity?: number
  noiseFrequency?: number
  noiseOctaves?: number
}

type AnimationPhase = 'initial' | 'loading' | 'background' | 'noise' | 'interactive'

const BACKGROUND_IMAGE = '/assets/backgrounds/amageBack.webp'

export default function Hero({ 
  noiseOpacity = 0.5,
  noiseFrequency = 0.9,
  noiseOctaves = 4
}: HeroProps = {}) {
  const [animationPhase, setAnimationPhase] = useState<AnimationPhase>('initial')
  const [showPixelTrail, setShowPixelTrail] = useState(false)
  const { loaded: imageLoaded, progress: imageProgress } = useImagePreloader(BACKGROUND_IMAGE)

  // Sequência de animação orquestrada
  useEffect(() => {
    if (!imageLoaded) return

    const { phases } = animationConfig.hero
    let timeouts: NodeJS.Timeout[] = []

    const runSequence = async () => {
      // Fase 1: Initial delay
      timeouts.push(
        setTimeout(() => setAnimationPhase('loading'), phases.initialDelay)
      )

      // Fase 2: Background
      timeouts.push(
        setTimeout(() => setAnimationPhase('background'), 
          phases.initialDelay + phases.loadingToBackground)
      )

      // Fase 3: Noise
      timeouts.push(
        setTimeout(() => setAnimationPhase('noise'), 
          phases.initialDelay + phases.loadingToBackground + phases.backgroundToNoise)
      )

      // Fase 4: Interactive
      timeouts.push(
        setTimeout(() => {
          setAnimationPhase('interactive')
          setShowPixelTrail(true)
        }, 
        phases.initialDelay + phases.loadingToBackground + phases.backgroundToNoise + phases.noiseToInteractive)
      )
    }

    runSequence()

    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout))
    }
  }, [imageLoaded])

  return (
    <section id="home" className="relative min-h-screen h-[100dvh] overflow-hidden bg-black pt-32">
      {/* Background elegante para loading */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: animationPhase === 'loading' && !imageLoaded ? 0.5 : 0,
        }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-gradient-radial from-[#6F278B]/20 via-[#6F278B]/10 to-transparent" />
        
        {/* Indicador de progresso sutil */}
        {!imageLoaded && (
          <motion.div
            className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-[#6F278B] to-transparent"
            initial={{ width: '0%' }}
            animate={{ width: `${imageProgress}%` }}
            transition={{ duration: 0.3, ease: 'linear' }}
          />
        )}
      </motion.div>

      {/* Background Image principal */}
      <AnimatePresence>
        {imageLoaded && animationPhase !== 'initial' && (
          <motion.div
            className="absolute inset-0 z-0 will-change-transform"
            initial={{ 
              opacity: 0,
              scale: 1.05,
              filter: 'blur(10px) brightness(0.7)',
            }}
            animate={{ 
              opacity: ['background', 'noise', 'interactive'].includes(animationPhase) ? 1 : 0,
              scale: ['background', 'noise', 'interactive'].includes(animationPhase) ? 1 : 1.05,
              filter: ['background', 'noise', 'interactive'].includes(animationPhase) 
                ? 'blur(0px) brightness(1)' 
                : 'blur(10px) brightness(0.7)',
            }}
            transition={{ 
              duration: animationConfig.hero.image.fadeInDuration,
              ease: animationConfig.hero.image.ease,
              scale: { 
                duration: animationConfig.hero.image.scaleDuration, 
                ease: animationConfig.hero.image.scaleEase 
              },
              filter: { duration: animationConfig.hero.image.blurDuration }
            }}
          >
            <Image
              src={BACKGROUND_IMAGE}
              alt="Amage Background"
              fill
              priority
              quality={100}
              className="object-cover select-none"
              sizes="100vw"
              draggable={false}
            />
            
            {/* Vignette overlay para profundidade */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Noise Overlay aprimorado */}
      <AnimatePresence>
        {['noise', 'interactive'].includes(animationPhase) && (
          <motion.div
            className="absolute inset-0 z-[1] pointer-events-none mix-blend-screen opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: noiseOpacity }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: animationConfig.hero.noise.fadeInDuration,
              ease: 'easeInOut'
            }}
          >
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='heroNoise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='${noiseFrequency}' numOctaves='${noiseOctaves}' seed='42' /%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23heroNoise)' opacity='0.3'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'repeat',
                backgroundSize: '300px 300px',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Container principal */}
      <div className="relative h-full flex items-center justify-center">
        {/* Pixel Trail com fade elegante */}
        <AnimatePresence mode="wait">
          {showPixelTrail && (
            <motion.div
              className="absolute inset-0 z-[2]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ 
                duration: animationConfig.hero.pixelTrail.fadeInDuration,
                ease: [0.25, 0.1, 0.25, 1]
              }}
            >
              <PixelTrail
                gridSize={100}
                trailSize={0.04}
                maxAge={200}
                interpolate={2}
                color="#6F278B"
                gooeyFilter={true}
                gooeyStrength={2}
                className="absolute inset-0"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading state minimalista */}
        <AnimatePresence>
          {animationPhase === 'loading' && !imageLoaded && (
            <motion.div
              className="absolute inset-0 z-10 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative">
                <motion.div
                  className="w-12 h-12 border-2 border-[#6F278B]/30 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <motion.div
                    className="absolute top-0 left-1/2 w-1 h-3 bg-[#6F278B] rounded-full -translate-x-1/2"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}