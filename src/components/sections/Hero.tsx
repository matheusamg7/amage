'use client'

import { memo } from 'react'
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
          className="text-center max-w-5xl mx-auto -translate-y-28"
        >
          {/* Badge Alta Performance */}
          <ConfettiButton 
            className="group inline-flex items-center gap-3 bg-zinc-800/80 backdrop-blur-sm border border-white/50 text-white rounded-full mb-8 cursor-pointer transition-all duration-300 hover:bg-zinc-700/80 hover:border-white/70 hover:scale-105 hover:shadow-lg hover:shadow-white/20 h-auto" 
            style={{ padding: '6px 28px' }}
            variant="ghost"
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
              {'Alta Performance'.split('').map((char, index) => (
                <motion.span
                  key={index}
                  className="inline-block"
                  initial={{ 
                    opacity: 0.1, 
                    color: 'rgb(82, 82, 91)',
                    textShadow: '0 0 0px rgba(255, 255, 255, 0)'
                  }}
                  animate={{ 
                    opacity: 1, 
                    color: 'rgb(255, 255, 255)',
                    textShadow: '0 0 8px rgba(255, 255, 255, 0.5)'
                  }}
                  transition={{
                    duration: 0.6,
                    delay: 1.6 + (index * 0.06),
                    ease: [0.25, 0.1, 0.25, 1]
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </span>
          </ConfettiButton>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-white font-hubot uppercase tracking-wider leading-tight">
            DESENVOLVEMOS
            <br />
            SITES QUE
          </h1>
          
          {/* Palavras animadas */}
          <div className="mt-12 h-20 flex items-center justify-center">
            <RotatingText
              texts={['CONVERTEM', 'VENDEM', 'PERFORMAM', 'CRESCEM', 'ENTREGAM', 'IMPACTAM']}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium font-mono uppercase tracking-wider"
              mainClassName="justify-center"
              elementLevelClassName="text-white"
              rotationInterval={2500}
              splitBy="characters"
              staggerDuration={0.05}
              staggerFrom="first"
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 300,
                mass: 0.5
              }}
              initial={{ 
                y: 50, 
                opacity: 0,
                rotateX: -90,
                filter: "blur(10px)"
              }}
              animate={{ 
                y: 0, 
                opacity: 1,
                rotateX: 0,
                filter: "blur(0px)"
              }}
              exit={{ 
                y: -50, 
                opacity: 0,
                rotateX: 90,
                filter: "blur(10px)"
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
})

export default Hero