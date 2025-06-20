'use client'

import { motion } from 'framer-motion'
import PixelTrail from '@/blocks/Animations/PixelTrail/PixelTrail'
import RotatingText from '@/blocks/TextAnimations/RotatingText/RotatingText'

export default function Hero() {
  return (
    <section className="relative min-h-screen h-[100dvh] overflow-hidden">
      {/* Container com PixelTrail e conteúdo juntos */}
      <div className="relative h-full flex items-center justify-center">
        {/* Pixel Trail Background */}
        <PixelTrail
          gridSize={30}
          trailSize={0.08}
          maxAge={400}
          interpolate={3}
          color="#6F278B"
          className="absolute inset-0 z-0"
        />

        {/* Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 md:px-8 w-full max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold mb-8 text-white">
              AMAGE
            </h1>
            
            <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-200">
              <RotatingText
                texts={[
                  "Criamos Experiências",
                  "Transformamos Ideias",
                  "Inovamos Digital",
                  "Conectamos Marcas"
                ]}
                className="inline-block"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-16"
          >
            <button className="px-8 py-4 border-2 border-[#6F278B] bg-[#6F278B] text-white hover:bg-transparent hover:text-[#6F278B] transition-all duration-300 tracking-wider font-medium">
              CONHECER MAIS
            </button>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-[#6F278B]/30 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-[#6F278B]/60 rounded-full mt-2" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}