'use client'

import React, { memo, useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import PageTransition from '@/components/PageTransition'
import Noise from '@/blocks/Animations/Noise/Noise'
import { usePageTransition } from '@/contexts/PageTransitionContext'
import { ConfettiButton } from '@/components/magicui/confetti'
import { InteractiveHoverButton } from '@/components/magicui/interactive-hover-button'



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
      delayChildren: 1.3
    }
  }
}


const Hero = memo(function Hero() {
  const { isTransitionComplete } = usePageTransition()
  const [clickCount, setClickCount] = useState(0)
  const [isBlocked, setIsBlocked] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  
  // Estilos comuns para o título
  const titleTextStyle = {
    textShadow: '0 2px 30px rgba(139, 92, 246, 0.3), 0 0 60px rgba(139, 92, 246, 0.15)',
    letterSpacing: 'calc(-0.03em)',
    fontWeight: 500
  }
  
  
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
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={isTransitionComplete ? { 
            opacity: 1, 
            y: 0,
            scale: 1,
            transition: {
              duration: 1.2,
              ease: [0.25, 0.4, 0.25, 1],
              delay: 0.4,
              opacity: { duration: 0.8 },
              y: { 
                type: "spring",
                damping: 25,
                stiffness: 100,
                mass: 1
              },
              scale: {
                type: "spring",
                damping: 20,
                stiffness: 150
              }
            }
          } : { opacity: 0, y: 40, scale: 0.9 }}
          className="text-center max-w-7xl mx-auto -translate-y-14"
        >
          <motion.h1 
            className="py-4 sm:py-6 md:py-8 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-medium leading-[1.1] tracking-tight font-figtree text-white drop-shadow-2xl" 
            style={titleTextStyle}
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={isTransitionComplete ? { 
              opacity: 1, 
              y: 0,
              filter: "blur(0px)",
              transition: {
                duration: 1,
                ease: "easeOut",
                delay: 0.6,
                filter: { duration: 0.8 }
              }
            } : { opacity: 0, y: 20, filter: "blur(10px)" }}
          >
            <span className="block">O próximo nível da sua empresa</span>
            <span className="block mt-4">é o digital.</span>
          </motion.h1>
            
            {/* Espaçamento antes do subtítulo */}
            <div className="h-5 sm:h-7 md:h-9" />
            
            {/* Subtítulo */}
            <motion.p
              className="text-lg sm:text-xl md:text-2xl text-white font-normal tracking-wide font-figtree"
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              animate={isTransitionComplete ? { 
                opacity: 1, 
                y: 0,
                filter: "blur(0px)",
                transition: {
                  duration: 1,
                  ease: [0.25, 0.1, 0.25, 1],
                  delay: 0.9,
                  y: {
                    type: "spring",
                    damping: 20,
                    stiffness: 80
                  }
                }
              } : { opacity: 0, y: 30, filter: "blur(8px)" }}
            >
              Criamos sites profissionais com foco em resultado, autoridade e crescimento.
            </motion.p>
            
            {/* Espaçador */}
            <div className="h-6 sm:h-8 md:h-10" />
            
            {/* Botões CTA */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 sm:gap-10 justify-center items-center"
              variants={ctaContainerVariants}
              initial="hidden"
              animate={isTransitionComplete ? "visible" : "hidden"}
            >
              <motion.div
                variants={ctaButtonsVariants}
                className="inline-flex"
              >
                <motion.button
                  onClick={() => window.location.href = '#contato'}
                  style={{
                    background: '#ffffff',
                    color: '#6F278B',
                    border: 'none',
                    padding: '14px 40px',
                    fontSize: '1rem',
                    fontWeight: '500',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    fontFamily: 'Nugros, sans-serif',
                    letterSpacing: '0.02em',
                    transition: 'all 0.3s ease',
                    display: 'inline-flex',
                    alignItems: 'center'
                  }}
                  whileHover={{ 
                    scale: 1.03,
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  Começar Projeto
                </motion.button>
              </motion.div>
              
              <motion.div
                variants={ctaButtonsVariants}
                className="inline-flex"
              >
                <motion.a
                  href="#projetos"
                  className="group relative inline-flex items-center gap-2 text-white transition-all duration-300 hover:text-white/80"
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
      
      {/* Botão Sites Mágicos no canto inferior direito */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isTransitionComplete ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.6, delay: 2.0, type: "spring" }}
        className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 z-30"
      >
        <ConfettiButton 
          className={`inline-flex items-center justify-center bg-zinc-800/80 backdrop-blur-sm border border-purple-400/30 text-white transition-all duration-300 h-auto relative overflow-visible ${
            isBlocked 
              ? 'cursor-not-allowed opacity-50' 
              : 'cursor-pointer hover:scale-105 hover:border-purple-400/50'
          }`} 
          style={{ 
            padding: '12px 64px',
            borderRadius: '9999px',
          }}
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
          {/* Sparkles nas bordas */}
          <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
            {/* Top sparkles */}
            <motion.div
              className="absolute top-2 left-1/3 w-1.5 h-1.5 bg-white rounded-full"
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 0.5,
              }}
            />
            <motion.div
              className="absolute top-2 right-1/3 w-1.5 h-1.5 bg-gradient-to-r from-white to-purple-400 rounded-full"
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 0.5,
                delay: 0.3,
              }}
            />
            {/* Right sparkles */}
            <motion.div
              className="absolute top-1/3 right-3 w-1.5 h-1.5 bg-purple-400 rounded-full"
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 0.5,
                delay: 0.6,
              }}
            />
            <motion.div
              className="absolute bottom-1/3 right-3 w-1 h-1 bg-white rounded-full"
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 0.5,
                delay: 0.9,
              }}
            />
            {/* Bottom sparkles */}
            <motion.div
              className="absolute bottom-2 left-1/3 w-1.5 h-1.5 bg-gradient-to-r from-purple-400 to-white rounded-full"
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 0.5,
                delay: 1.2,
              }}
            />
            <motion.div
              className="absolute bottom-2 right-1/3 w-1 h-1 bg-purple-500 rounded-full"
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 0.5,
                delay: 1.5,
              }}
            />
            {/* Left sparkles */}
            <motion.div
              className="absolute top-1/2 left-3 w-1.5 h-1.5 bg-white rounded-full"
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 0.5,
                delay: 1.8,
              }}
            />
            <motion.div
              className="absolute top-1/3 left-3 w-1 h-1 bg-gradient-to-b from-white to-purple-400 rounded-full"
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 0.5,
                delay: 2.1,
              }}
            />
          </div>
        </ConfettiButton>
        
        {/* Mensagem engraçada */}
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute -bottom-2 -right-2 bg-zinc-900 border border-zinc-700/50 text-zinc-300 text-xs px-6 py-3 rounded-lg backdrop-blur-md shadow-2xl shadow-black/50 whitespace-nowrap z-50"
            style={{ userSelect: 'none', padding: '16px 32px' }}
          >
            <span className="inline-flex items-center gap-1.5">
              <span>🎉</span>
              <span>Confete acabou, mas a mágica dos nossos sites é real!</span>
              <a 
                href="#contato" 
                className="underline hover:text-white transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                Vamos conversar?
              </a>
            </span>
          </motion.div>
        )}
      </motion.div>
    </section>
  )
})

export default Hero