'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import PixelTrail from '@/blocks/Animations/PixelTrail/PixelTrail'

interface HeroProps {
  noiseOpacity?: number
  noiseFrequency?: number
  noiseOctaves?: number
}

export default function Hero({ 
  noiseOpacity = 0.5,
  noiseFrequency = 0.9,
  noiseOctaves = 4
}: HeroProps = {}) {
  const [showBackground, setShowBackground] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBackground(true)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="relative min-h-screen h-[100dvh] overflow-hidden">
      {/* Background Image com fade-in */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: showBackground ? 1 : 0 }}
        transition={{ duration: 2, ease: 'easeInOut' }}
      >
        <Image
          src="/assets/backgrounds/amageBack.webp"
          alt="Amage Background"
          fill
          priority
          quality={100}
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>

      {/* Noise Overlay */}
      <motion.div
        className="absolute inset-0 z-[1] pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: showBackground ? noiseOpacity : 0 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='${noiseFrequency}' numOctaves='${noiseOctaves}' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />

      {/* Container com PixelTrail e conteúdo juntos */}
      <div className="relative h-full flex items-center justify-center">
        {/* Pixel Trail Background */}
        <PixelTrail
          gridSize={100}
          trailSize={0.04}
          maxAge={200}
          interpolate={2}
          color="#6F278B"
          gooeyFilter={true}
          gooeyStrength={2}
          className="absolute inset-0 z-[2]"
        />


      </div>
    </section>
  )
}