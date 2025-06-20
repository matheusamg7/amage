'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import TextPressure from '@/blocks/TextAnimations/TextPressure/TextPressure'

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="min-h-screen flex items-center justify-center px-8 py-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Left side - Text */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <TextPressure 
              text="Sobre a AMAGE"
              className="text-white"
            />
          </h2>
          
          <p className="text-lg text-gray-400 mb-6 leading-relaxed">
            Somos uma agência digital focada em criar experiências únicas e memoráveis. 
            Combinamos criatividade, tecnologia e estratégia para transformar ideias em 
            realidade digital.
          </p>
          
          <p className="text-lg text-gray-400 leading-relaxed">
            Nossa missão é conectar marcas ao seu público através de soluções inovadoras, 
            sempre buscando superar expectativas e entregar resultados extraordinários.
          </p>

          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#6F278B] rounded-full flex items-center justify-center">
                <span className="text-white font-bold">5+</span>
              </div>
              <span className="text-gray-300">Anos de experiência</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#00B4D8] rounded-full flex items-center justify-center">
                <span className="text-white font-bold">50+</span>
              </div>
              <span className="text-gray-300">Projetos entregues</span>
            </div>
          </div>
        </motion.div>

        {/* Right side - Visual element */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="aspect-square bg-gradient-to-br from-[#6F278B]/20 to-[#00B4D8]/10 rounded-2xl backdrop-blur-sm border border-[#6F278B]/30 p-8">
            <div className="h-full flex items-center justify-center">
              <motion.div
                animate={{ 
                  rotate: 360,
                }}
                transition={{ 
                  duration: 20, 
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="text-6xl md:text-8xl font-bold text-[#6F278B]/50"
              >
                A
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}