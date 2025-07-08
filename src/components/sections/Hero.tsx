'use client'

import React, { memo, useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import PageTransition from '@/components/PageTransition'
import Noise from '@/blocks/Animations/Noise/Noise'
import { usePageTransition } from '@/contexts/PageTransitionContext'
import { ConfettiButton } from '@/components/magicui/confetti'
import { InteractiveHoverButton } from '@/components/magicui/interactive-hover-button'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut", delay: 0.8 }
}

// Variants para animação elegante e profissional
const titleVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.3 // Mais rápido ainda
    }
  }
}

const letterVariants = {
  hidden: { 
    opacity: 0,
    y: 24,
    scale: 0.94
  },
  visible: { 
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 300,
      mass: 0.8
    }
  }
}

// Variants para os botões CTA
const ctaButtonsVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 400,
      mass: 0.6,
      duration: 0.8
    }
  }
}

const ctaContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.0,
      delayChildren: 2.2
    }
  }
}

const Hero = memo(function Hero() {
  const { isTransitionComplete } = usePageTransition()
  const [clickCount, setClickCount] = useState(0)
  const [isBlocked, setIsBlocked] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [hasInitialAnimationPlayed, setHasInitialAnimationPlayed] = useState(false)
  
  const rotatingTexts = ['que convertem', 'que vendem', 'que performam', 'que crescem', 'que entregam', 'que impactam']
  
  useEffect(() => {
    if (!isTransitionComplete) return
    
    let interval: NodeJS.Timeout
    let rotationDelay: NodeJS.Timeout
    
    // Delay inicial para a primeira animação
    const initialDelay = setTimeout(() => {
      setHasInitialAnimationPlayed(true)
      
      // Inicia a rotação após o primeiro texto rotativo aparecer
      rotationDelay = setTimeout(() => {
        interval = setInterval(() => {
          setCurrentTextIndex((prev) => (prev + 1) % rotatingTexts.length)
        }, 2500)
      }, 2000) // Após primeira animação completa
    }, 800) // Mais rápido
    
    return () => {
      clearTimeout(initialDelay)
      clearTimeout(rotationDelay)
      if (interval) clearInterval(interval)
    }
  }, [isTransitionComplete, rotatingTexts.length])
  
  const handleConfettiClick = (event: React.MouseEvent<HTMLElement>) => {
    if (isBlocked) {
      event.preventDefault()
      return
    }
    
    const newCount = clickCount + 1
    setClickCount(newCount)
    
    if (newCount >= 3) {
      setIsBlocked(true)
      setShowMessage(true)
      // Não desbloqueia mais! Só com F5
    }
  }
  
  return (
    <section id="home" className="relative min-h-screen h-[100dvh] overflow-hidden">
      {/* Container da imagem */}
      <div className="absolute inset-0">
        <Image
          src="/assets/backgrounds/background.png"
          alt="Background futurista"
          fill
          priority
          quality={85}
          sizes="100vw"
          className="object-cover object-center blur-[2.8px]"
        />
      </div>
      
      {/* Overlay escuro para melhor contraste com texto */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60 z-10" />
      
      {/* Noise overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none mix-blend-overlay">
        <Noise 
          patternSize={200}
          patternScaleX={1}
          patternScaleY={1}
          patternRefreshInterval={3}
          patternAlpha={25}
        />
      </div>
      
      {/* Transição de entrada com blocos sobre o conteúdo */}
      <PageTransition />
      
      {/* Container do conteúdo */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <motion.div
          {...(isTransitionComplete ? fadeInUp : { initial: { opacity: 0 } })}
          className="text-center max-w-7xl mx-auto -translate-y-16"
        >
          {/* Badge Alta Performance */}
          <div className="relative -translate-y-4">
            <ConfettiButton 
              className={`group inline-flex items-center gap-3 bg-zinc-800/80 backdrop-blur-sm border border-white/50 text-white rounded-full mb-12 transition-all duration-300 h-auto ${
                isBlocked 
                  ? 'cursor-not-allowed opacity-50' 
                  : 'cursor-pointer hover:bg-zinc-700/80 hover:border-white/70 hover:scale-105 hover:shadow-lg hover:shadow-white/20'
              }`} 
              style={{ padding: '6px 28px' }}
              variant="ghost"
              onClickCapture={handleConfettiClick}
              disabled={isBlocked}
              options={{
                particleCount: 100,
                spread: 70,
                colors: ['#8B5CF6', '#EC4899', '#10B981', '#F59E0B'],
                startVelocity: 30,
                gravity: 0.5,
                scalar: 0.8,
              }}
            >
            <motion.span 
              className="text-base grayscale brightness-200 contrast-200 transition-transform duration-300 group-hover:rotate-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.5 }}
            >
              🚀
            </motion.span>
            <span className="text-sm font-normal tracking-wide flex">
              {'Sites Mágicos'.split('').map((char, index) => (
                <motion.span
                  key={`${char}-${index}`}
                  className="inline-block text-white"
                  initial={{ 
                    opacity: 0.4, 
                    filter: 'brightness(0.5)',
                    textShadow: '0 0 0px rgba(255, 255, 255, 0)'
                  }}
                  animate={{ 
                    opacity: 1, 
                    filter: 'brightness(1)',
                    textShadow: '0 0 8px rgba(255, 255, 255, 0.5)'
                  }}
                  transition={{
                    duration: 0.6,
                    delay: 1.6 + (index * 0.06),
                    ease: [0.25, 0.1, 0.25, 1]
                  }}
                  style={{
                    color: 'white'
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </span>
          </ConfettiButton>
          
          {/* Mensagem engraçada */}
          {showMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.8 }}
              animate={{ opacity: 1, y: -40, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute left-1/2 -translate-x-1/2 top-full mt-2 bg-zinc-900/90 border border-zinc-700/50 text-zinc-300 text-xs px-6 py-3 rounded-lg backdrop-blur-sm select-none pointer-events-none shadow-lg whitespace-nowrap"
              style={{ userSelect: 'none', padding: '16px 32px' }}
            >
              <span className="inline-flex items-center gap-1.5">
                <span>🎉</span>
                <span>Confete acabou, mas a mágica dos nossos sites é real!</span>
                <a 
                  href="#contato" 
                  className="underline hover:text-white transition-colors pointer-events-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  Vamos conversar?
                </a>
              </span>
            </motion.div>
          )}
        </div>
          
          <div className="py-4 sm:py-6 md:py-8 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-medium leading-[1.1] tracking-tight">
            <motion.h1 
              className="font-figtree font-medium bg-gradient-to-br from-white via-white/95 to-purple-300/60 bg-clip-text text-transparent drop-shadow-2xl" 
              aria-label={`Desenvolvemos sites ${rotatingTexts[currentTextIndex]}`}
              style={{ 
                textShadow: '0 2px 30px rgba(139, 92, 246, 0.3), 0 0 60px rgba(139, 92, 246, 0.15)',
                letterSpacing: '-3px'
              }}
              variants={titleVariants}
              initial="hidden"
              animate={isTransitionComplete ? "visible" : "hidden"}
            >
              {/* Primeira linha com animação suave e elegante */}
              <motion.span className="block" variants={titleVariants}>
                {"Desenvolvemos sites".split("").map((char, index) => (
                  <motion.span
                    key={`char-${index}`}
                    className="inline-block"
                    variants={letterVariants}
                    style={{
                      display: char === " " ? "inline" : "inline-block",
                      width: char === " " ? "0.3em" : "auto"
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </motion.span>
              
              {/* Segunda linha com texto rotativo */}
              <span className="block -mt-1 sm:-mt-2 md:-mt-3 lg:-mt-4 xl:-mt-6" style={{ transform: 'translateY(-20px)' }}>
                <span className="relative inline-block min-h-[1.4em] overflow-visible">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={currentTextIndex}
                      className="block font-figtree font-medium bg-gradient-to-br from-white via-white/95 to-purple-300/60 bg-clip-text text-transparent"
                      style={{ 
                        textShadow: '0 2px 30px rgba(139, 92, 246, 0.3), 0 0 60px rgba(139, 92, 246, 0.15)',
                        letterSpacing: '-3px'
                      }}
                      aria-live="polite"
                      initial={hasInitialAnimationPlayed ? { opacity: 0, y: 30 } : { opacity: 0, y: 20, scale: 0.96 }}
                      animate={hasInitialAnimationPlayed ? { opacity: 1, y: 0 } : (isTransitionComplete ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.96 })}
                      exit={{ opacity: 0, y: -16, scale: 0.98 }}
                      transition={hasInitialAnimationPlayed ? { 
                        duration: 0.5, 
                        ease: [0.25, 0.1, 0.25, 1]
                      } : {
                        type: "spring",
                        damping: 30,
                        stiffness: 400,
                        mass: 0.7,
                        delay: 2.1 // Aguarda "Desenvolvemos sites" terminar completamente
                      }}
                    >
                      {rotatingTexts[currentTextIndex]}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </span>
            </motion.h1>
            
            {/* Espaçador */}
            <div className="h-4 sm:h-6 md:h-8" />
            
            {/* Botões CTA */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center"
              style={{ transform: 'translateY(-20px)' }}
              variants={ctaContainerVariants}
              initial="hidden"
              animate={isTransitionComplete ? "visible" : "hidden"}
            >
              <motion.div
                variants={ctaButtonsVariants}
                className="inline-flex"
              >
                <InteractiveHoverButton
                  onClick={() => window.location.href = '#contato'}
                  className="bg-gradient-to-r from-purple-600 to-purple-700 border-purple-500/50 text-white hover:shadow-xl hover:shadow-purple-500/30 text-base font-medium tracking-wide [&>div>div]:bg-white [&>div:last-child]:text-purple-600"
                  style={{ padding: '10px 40px' }}
                >
                  Começar Projeto
                </InteractiveHoverButton>
              </motion.div>
              
              <motion.div
                variants={ctaButtonsVariants}
                className="inline-flex"
              >
                <motion.a
                  href="#projetos"
                  className="group relative inline-flex items-center gap-3 bg-transparent border border-purple-500/50 text-purple-300 rounded-full transition-all duration-300 hover:border-purple-400 hover:text-white hover:shadow-lg hover:shadow-purple-500/20 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black"
                  style={{ padding: '10px 40px' }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-purple-700/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></span>
                  <span className="relative z-10 text-base font-medium tracking-wide flex items-center gap-3">
                    Ver Nossos Projetos
                    <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0l-4-4m4 4l-4 4" />
                    </svg>
                  </span>
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
})

export default Hero