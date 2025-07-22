'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function Process() {
  const containerRef = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  const steps = [
    {
      number: '01',
      title: 'Imersao e Planejamento',
      description: 'Entendemos seu negocio, seus objetivos e o que o site precisa comunicar.'
    },
    {
      number: '02',
      title: 'Design e Prototipo',
      description: 'Criamos o layout com base na identidade da marca e foco em conversao.'
    },
    {
      number: '03',
      title: 'Programacao e Testes',
      description: 'Transformamos o visual em codigo limpo, rapido e responsivo.'
    },
    {
      number: '04',
      title: 'Entrega e Publicacao',
      description: 'Validamos tudo com voce e colocamos seu site no ar, pronto pra performar.'
    }
  ]

  return (
    <section 
      id="processo" 
      ref={containerRef}
      style={{
        padding: '120px 20px',
        background: '#000000',
        position: 'relative',
        minHeight: '100vh'
      }}
    >
      <motion.div 
        style={{ 
          maxWidth: '1400px', 
          margin: '0 auto', 
          opacity 
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: '100px', textAlign: 'center' }}>
          <h2 style={{ 
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 500,
            lineHeight: '1.1',
            marginBottom: '20px',
            letterSpacing: '-0.03em',
            color: '#ffffff',
            fontFamily: 'Nugros, sans-serif'
          }}>
            Nosso processo de{' '}
            <span style={{ color: '#6F278B' }}>
              desenvolvimento
            </span>
          </h2>
          
          <p style={{ 
            fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)',
            lineHeight: '1.8',
            color: 'rgba(255, 255, 255, 0.6)',
            fontWeight: 300,
            letterSpacing: '0.02em',
            fontFamily: 'Nugros, sans-serif',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Do primeiro contato ao lancamento, cada etapa e pensada para garantir o sucesso do seu projeto.
          </p>
        </div>

        {/* Process Steps */}
        <div style={{ 
          position: 'relative',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          {/* Central vertical dashed line */}
          <div style={{
            position: 'absolute',
            left: '50%',
            top: '30px',
            bottom: '30px',
            width: '2px',
            transform: 'translateX(-50%)',
            zIndex: 0,
            overflow: 'hidden'
          }}>
            <motion.div
              style={{
                width: '100%',
                height: lineHeight,
                backgroundImage: 'repeating-linear-gradient(to bottom, #6F278B 0px, #6F278B 8px, transparent 8px, transparent 16px)',
                transformOrigin: 'top'
              }}
            />
            {/* Background dashed line */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundImage: 'repeating-linear-gradient(to bottom, rgba(111, 39, 139, 0.2) 0px, rgba(111, 39, 139, 0.2) 8px, transparent 8px, transparent 16px)'
            }} />
          </div>

          {/* Steps */}
          {steps.map((step, index) => {
            const isLeft = index % 2 === 0
            const stepProgress = useTransform(
              scrollYProgress,
              [
                (index - 0.5) / steps.length,
                (index + 0.5) / steps.length
              ],
              [0, 1]
            )

            const stepOpacity = useTransform(stepProgress, [0, 0.5, 1], [0.3, 1, 1])
            const stepX = useTransform(stepProgress, [0, 0.5, 1], [isLeft ? -50 : 50, 0, 0])

            return (
              <motion.div
                key={step.number}
                style={{
                  display: 'flex',
                  justifyContent: isLeft ? 'flex-start' : 'flex-end',
                  marginBottom: index < steps.length - 1 ? '80px' : '0',
                  position: 'relative',
                  opacity: stepOpacity,
                  x: stepX
                }}
              >
                <div style={{
                  maxWidth: '320px',
                  textAlign: isLeft ? 'left' : 'right',
                  position: 'relative'
                }}>
                  {/* Connection dotted line to center */}
                  <div style={{
                    position: 'absolute',
                    [isLeft ? 'right' : 'left']: '-60px',
                    top: '15px',
                    width: '60px',
                    height: '2px',
                    backgroundImage: 'repeating-linear-gradient(to right, rgba(111, 39, 139, 0.3) 0px, rgba(111, 39, 139, 0.3) 4px, transparent 4px, transparent 8px)'
                  }}>
                    {/* Connection dot */}
                    <div style={{
                      position: 'absolute',
                      [isLeft ? 'right' : 'left']: '-4px',
                      top: '-4px',
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: '#6F278B',
                      border: '2px solid #000000'
                    }} />
                  </div>
                  
                  <h3 style={{
                    fontSize: '1.4rem',
                    fontWeight: '500',
                    marginBottom: '10px',
                    color: '#ffffff',
                    fontFamily: 'Nugros, sans-serif',
                    letterSpacing: '-0.02em'
                  }}>
                    {step.title}
                  </h3>
                  
                  <p style={{
                    fontSize: '0.95rem',
                    lineHeight: '1.6',
                    color: 'rgba(255, 255, 255, 0.6)',
                    fontWeight: '300',
                    fontFamily: 'Nugros, sans-serif'
                  }}>
                    {step.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </section>
  )
}