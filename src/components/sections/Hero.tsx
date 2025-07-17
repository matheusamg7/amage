'use client'

import React, { memo, useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import PageTransition from '@/components/PageTransition'
import Noise from '@/blocks/Animations/Noise/Noise'
import { usePageTransition } from '@/contexts/PageTransitionContext'
import { ConfettiButton } from '@/components/magicui/confetti'
import { InteractiveHoverButton } from '@/components/magicui/interactive-hover-button'
import TypewriterText from '@/components/TypewriterText'

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

const rotatingTexts = ['convertem', 'vendem', 'performam', 'crescem', 'entregam', 'impactam']

const Hero = memo(function Hero() {
  const { isTransitionComplete } = usePageTransition()
  const [clickCount, setClickCount] = useState(0)
  const [isBlocked, setIsBlocked] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [isTextExiting, setIsTextExiting] = useState(false)
  
  // Estilos comuns para o título
  const titleTextStyle = {
    textShadow: '0 2px 30px rgba(139, 92, 246, 0.3), 0 0 60px rgba(139, 92, 246, 0.15)',
    letterSpacing: 'calc(-0.03em)',
    fontWeight: 500
  }
  
  useEffect(() => {
    if (!isTransitionComplete) return
    
    let interval: NodeJS.Timeout
    
    // Delay inicial para começar a rotação após a primeira palavra aparecer
    const initialDelay = setTimeout(() => {
      // Aguarda a primeira palavra ser digitada (convertem = 9 chars * 40ms = 360ms + margem)
      setTimeout(() => {
        // Inicia o ciclo de rotação
        interval = setInterval(() => {
          setIsTextExiting(true)
          
          // Tempo para apagar a palavra atual
          setTimeout(() => {
            setCurrentTextIndex((prev) => (prev + 1) % rotatingTexts.length)
            setIsTextExiting(false)
          }, 600) // Tempo suficiente para apagar (15 chars max * 40ms = 600ms)
        }, 3000) // Ciclo de 3 segundos - mais tempo para ler
      }, 500) // Aguarda a primeira palavra ser digitada
    }, 2000) // Sincronizado com o aparecimento do "que"
    
    return () => {
      clearTimeout(initialDelay)
      if (interval) clearInterval(interval)
    }
  }, [isTransitionComplete])
  
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
      <div className="absolute inset-0 z-10 pointer-events-none mix-blend-overlay" style={{ isolation: 'isolate' }}>
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
          className="text-center max-w-7xl mx-auto -translate-y-8"
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
          
          <motion.h1 
            className="py-4 sm:py-6 md:py-8 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-medium leading-[1.1] tracking-tight font-figtree bg-gradient-to-br from-white via-white/95 to-purple-300/60 bg-clip-text text-transparent drop-shadow-2xl" 
            aria-label={`Desenvolvemos sites que ${rotatingTexts[currentTextIndex]}`}
            style={titleTextStyle}
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
              <motion.span 
                className="block -mt-1 sm:-mt-2 md:-mt-3 lg:-mt-4 xl:-mt-6 -translate-y-3 sm:-translate-y-4 md:-translate-y-5 text-center font-figtree bg-gradient-to-br from-white via-white/95 to-purple-300/60 bg-clip-text text-transparent"
                style={titleTextStyle}
              >
                <motion.span
                  className="inline-block"
                  initial={{ opacity: 0 }}
                  animate={isTransitionComplete ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.6, delay: 2.0 }}
                >
                  que{' '}
                  <TypewriterText
                    text={rotatingTexts[currentTextIndex]}
                    isExiting={isTextExiting}
                    className=""
                    style={{}}
                  />
                </motion.span>
              </motion.span>
            </motion.h1>
            
            {/* Subtítulo */}
            <motion.p
              className="text-lg sm:text-xl md:text-2xl text-gray-300 font-normal tracking-wide font-figtree"
              initial={{ opacity: 0, y: 20 }}
              animate={isTransitionComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 2.4 }}
            >
              Seu negócio merece estar bem representado na internet.
            </motion.p>
            
            {/* Espaçador */}
            <div className="h-4 sm:h-6 md:h-8" />
            
            {/* Botões CTA */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center"
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
                  className="bg-gradient-to-r from-purple-600 to-purple-700 border-purple-500/50 text-white text-base font-medium tracking-wide [&>div>div]:bg-white [&>div:last-child]:text-purple-600"
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
                  className="group relative inline-flex items-center gap-2 text-white transition-all duration-300 hover:text-purple-300"
                >
                  <span className="text-base font-medium tracking-wide underline underline-offset-8 decoration-1">
                    Ver Nossos Projetos
                  </span>
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.a>
              </motion.div>
            </motion.div>
        </motion.div>
      </div>
    </section>
  )
})

export default Hero