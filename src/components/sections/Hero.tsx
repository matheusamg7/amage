'use client'

import { memo, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import PageTransition from '@/components/PageTransition'
import Noise from '@/blocks/Animations/Noise/Noise'
import { usePageTransition } from '@/contexts/PageTransitionContext'
import RotatingText from '@/blocks/TextAnimations/RotatingText/RotatingText'
import { ConfettiButton } from '@/components/magicui/confetti'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut", delay: 0.8 }
}

const Hero = memo(function Hero() {
  const { isTransitionComplete } = usePageTransition()
  const [clickCount, setClickCount] = useState(0)
  const [isBlocked, setIsBlocked] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  
  const handleConfettiClick = (event: React.MouseEvent<HTMLButtonElement>) => {
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
          className="object-cover object-center blur-sm"
        />
      </div>
      
      {/* Overlay escuro para melhor contraste com texto */}
      <div className="absolute inset-0 bg-black/30 z-10" />
      
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
          className="text-center max-w-7xl mx-auto -translate-y-28"
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
          
          <div className="py-8 text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-medium leading-none tracking-tight">
            <h1 className="bg-gradient-to-br from-white to-purple-300/40 bg-clip-text text-transparent">
              <span className="block">Desenvolvemos sites</span>
              <span className="block -mt-4 sm:-mt-6 md:-mt-8 lg:-mt-12">
                <RotatingText
                  texts={['que convertem', 'que vendem', 'que performam', 'que crescem', 'que entregam', 'que impactam']}
                  mainClassName="inline-block overflow-hidden py-2"
                  splitLevelClassName="overflow-hidden pb-1"
                  staggerFrom="last"
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-120%" }}
                  staggerDuration={0.025}
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                  rotationInterval={2500}
                />
              </span>
            </h1>
          </div>
        </motion.div>
      </div>
    </section>
  )
})

export default Hero