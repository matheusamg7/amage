'use client'

import { memo, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import PageTransition from '@/components/PageTransition'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut", delay: 0.3 }
}

const Hero = memo(function Hero() {
  const [showContent, setShowContent] = useState(false)
  return (
    <section id="home" className="relative min-h-screen h-[100dvh] overflow-hidden">
      {/* Imagem de fundo otimizada */}
      <Image
        src="/assets/backgrounds/background.png"
        alt="Background futurista"
        fill
        priority
        quality={85}
        sizes="100vw"
        className="object-cover object-center"
      />
      
      {/* Overlay escuro para melhor contraste com texto */}
      <div className="absolute inset-0 bg-black/30 z-10" />
      
      {/* Transição de entrada com blocos sobre o conteúdo */}
      <PageTransition onComplete={() => setShowContent(true)} />
      
      {/* Container do conteúdo */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <motion.div
          {...(showContent ? fadeInUp : { initial: { opacity: 0 } })}
          className="text-center max-w-5xl mx-auto"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-white font-hubot uppercase tracking-wider leading-tight">
            DESENVOLVEMOS
            <br />
            SITES QUE
          </h1>
        </motion.div>
      </div>
    </section>
  )
})

export default Hero