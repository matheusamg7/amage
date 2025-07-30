'use client'

import React, { memo, useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import PageTransition from '@/components/PageTransition'
import Noise from '@/blocks/Animations/Noise/Noise'
import { usePageTransition } from '@/contexts/PageTransitionContext'
import { ConfettiButton } from '@/components/magicui/confetti'
import { InteractiveHoverButton } from '@/components/magicui/interactive-hover-button'
import { LiquidGlassButton } from '@/components/ui/liquid-glass-button'



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
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
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
          className="text-center max-w-7xl mx-auto -translate-y-6 sm:-translate-y-14"
        >
          <motion.h1 
            className="py-4 sm:py-6 md:py-8 text-4xl xs:text-5xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-medium leading-[1.1] tracking-tight font-figtree text-white drop-shadow-2xl" 
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
            <span className="block">{isMobile ? 'O próximo nível da sua' : 'O próximo nível da sua empresa'}</span>
            <span className="block mt-2 sm:mt-4">{isMobile ? 'empresa é o digital.' : 'é o digital.'}</span>
          </motion.h1>
            
            {/* Espaçamento antes do subtítulo */}
            <div className="h-5 sm:h-7 md:h-9" />
            
            {/* Subtítulo */}
            <motion.div 
              className="flex justify-center"
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
              <p className={`text-base xs:text-lg sm:text-xl md:text-2xl text-white font-normal tracking-wide font-figtree px-4 sm:px-0 ${isMobile ? 'max-w-[280px]' : 'max-w-[600px]'}`}>
                Criamos sites profissionais com foco em resultado, autoridade e crescimento.
              </p>
            </motion.div>
            
            {/* Espaçador */}
            <div className="h-8 sm:h-8 md:h-10" />
            
            {/* Botões CTA */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 sm:gap-10 justify-center items-center px-4 sm:px-0"
              variants={ctaContainerVariants}
              initial="hidden"
              animate={isTransitionComplete ? "visible" : "hidden"}
            >
              <motion.div
                variants={ctaButtonsVariants}
                className="inline-flex"
              >
                <LiquidGlassButton
                  onClick={() => {
                    const contatoSection = document.getElementById('contato')
                    if (contatoSection) {
                      contatoSection.scrollIntoView({ behavior: 'smooth' })
                    }
                  }}
                >
                  Solicitar Orçamento
                </LiquidGlassButton>
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
                  {!isMobile && (
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                </motion.a>
              </motion.div>
            </motion.div>
        </motion.div>
      </div>
      
      {/* Botão Sites Mágicos centralizado na parte inferior */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isTransitionComplete ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.6, delay: 2.0, type: "spring" }}
        className="absolute bottom-10 sm:bottom-6 left-1/2 transform -translate-x-1/2 z-30"
      >
        <ConfettiButton 
          className={`inline-flex items-center justify-center backdrop-blur-sm border text-white transition-all duration-300 h-auto relative overflow-visible ${
            isBlocked 
              ? 'cursor-not-allowed opacity-50' 
              : 'cursor-pointer hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25'
          }`} 
          style={{ 
            padding: '12px 64px',
            borderRadius: '9999px',
            background: 'linear-gradient(135deg, #9F7AEA 0%, #B794F4 100%)',
            borderColor: 'rgba(255, 255, 255, 0.2)',
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
            
            {/* Extra sparkles for more magic */}
            <motion.div
              className="absolute top-1/4 right-1/4 w-2 h-2 bg-gradient-to-br from-purple-300 to-white rounded-full"
              animate={{
                scale: [0, 1.2, 0],
                opacity: [0, 0.7, 0],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                repeatDelay: 0.3,
                delay: 0.4,
              }}
            />
            <motion.div
              className="absolute bottom-1/4 left-1/4 w-1.5 h-1.5 bg-purple-300 rounded-full"
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 0.4,
                delay: 0.8,
              }}
            />
            <motion.div
              className="absolute top-1/2 right-1/4 w-1 h-1 bg-white rounded-full"
              animate={{
                scale: [0, 1.5, 0],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                repeatDelay: 0.6,
                delay: 1.3,
              }}
            />
            <motion.div
              className="absolute bottom-1/2 left-1/4 w-1.5 h-1.5 bg-gradient-to-tr from-white to-purple-500 rounded-full"
              animate={{
                scale: [0, 1.3, 0],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: 1.7,
                repeat: Infinity,
                repeatDelay: 0.5,
                delay: 1.7,
              }}
            />
            <motion.div
              className="absolute top-5 center w-2 h-2 bg-purple-400 rounded-full"
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 0.4, 0],
                x: [-10, 10, -10],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                repeatDelay: 0.3,
                delay: 0.2,
              }}
            />
            <motion.div
              className="absolute bottom-5 right-1/2 w-1 h-1 bg-white rounded-full"
              animate={{
                scale: [0, 2, 0],
                opacity: [0, 0.3, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 0.7,
                delay: 2.3,
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
            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-zinc-900 border border-zinc-700/50 text-zinc-300 text-xs px-6 py-3 rounded-lg backdrop-blur-md shadow-2xl shadow-black/50 whitespace-nowrap z-50"
            style={{ userSelect: 'none', padding: '16px 32px' }}
          >
            <span className="inline-flex items-center gap-1.5">
              <span>🎉</span>
              <span>Confete acabou, mas o impacto de um bom site é duradouro!</span>
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