'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function Process() {
  const containerRef = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const steps = [
    {
      number: '01',
      title: 'Imersão e Planejamento',
      description: 'Entendemos seu negócio, seus objetivos e o que o site precisa comunicar. Alinhamos expectativas, identificamos oportunidades e mapeamos tudo o que será feito.',
      color: '#6F278B'
    },
    {
      number: '02',
      title: 'Design e Protótipo',
      description: 'Criamos um layout alinhado à identidade da sua marca, com foco total em experiência, credibilidade e conversão. Você aprova cada detalhe antes de avançarmos.',
      color: '#8B276F'
    },
    {
      number: '03',
      title: 'Desenvolvimento',
      description: 'Transformamos o protótipo em código limpo, rápido e seguro. Usamos tecnologias atualizadas para garantir performance, responsividade e facilidade de gerenciamento.',
      color: '#276F8B'
    },
    {
      number: '04',
      title: 'Entrega e Publicação',
      description: 'Testamos tudo com você, ajustamos se necessário e publicamos seu site pronto para performar desde o primeiro acesso. Seu projeto final, com a cara da sua empresa no ar e vendendo.',
      color: '#278B6F'
    }
  ]

  // Slower horizontal scroll - first step starts at center, last step ends at center
  const globalX = useTransform(scrollYProgress, [0, 1], ['0vw', '-300vw'])

  // Create all transforms outside of render
  const stepTransforms = steps.map((_, index) => {
    // Calculate when each step is in the center of the screen
    // Each step moves 100vw, so we need to track when it's centered
    const stepWidth = 100 // vw
    const totalMovement = 300 // 0vw to -300vw = 300vw total
    
    // When is this step in the center? 
    // Step 0 starts at 0vw, already centered = 0vw movement
    // Step 1 starts at 100vw, needs to move to 0vw to be centered = 100vw movement
    // Step 2 starts at 200vw, needs to move to 0vw to be centered = 200vw movement
    // Step 3 starts at 300vw, needs to move to 0vw to be centered = 300vw movement
    
    const distanceToCenter = index * 100 // vw
    const progressWhenCentered = distanceToCenter / totalMovement
    
    // Define ranges for fade in/out based on screen position
    const isFirstStep = index === 0
    const isLastStep = index === steps.length - 1
    
    // First step starts visible, others fade in
    const fadeInStart = isFirstStep ? 0 : Math.max(0, progressWhenCentered - 0.125)
    const fadeInEnd = isFirstStep ? 0 : progressWhenCentered - 0.025
    
    // Last step stays visible
    const fadeOutStart = isLastStep ? 1 : progressWhenCentered + 0.025
    const fadeOutEnd = isLastStep ? 1 : Math.min(1, progressWhenCentered + 0.125)

    return {
      opacity: useTransform(
        scrollYProgress,
        isFirstStep ? [0, fadeOutStart, fadeOutEnd] : [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd],
        isFirstStep ? [1, 1, 0.2] : [0.2, 1, 1, isLastStep ? 1 : 0.2]
      ),
      scale: useTransform(
        scrollYProgress,
        isFirstStep ? [0, fadeOutStart, fadeOutEnd] : [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd],
        isFirstStep ? [1, 1, 0.9] : [0.9, 1, 1, isLastStep ? 1 : 0.9]
      ),
      blur: useTransform(
        scrollYProgress,
        isFirstStep ? [0, fadeOutStart, fadeOutEnd] : [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd],
        isFirstStep ? [0, 0, 8] : [8, 0, 0, isLastStep ? 0 : 8]
      )
    }
  })

  const dotTransforms = steps.map((_, index) => {
    const distanceToCenter = index * 100
    const progressWhenCentered = distanceToCenter / 300
    
    return useTransform(
      scrollYProgress,
      [
        Math.max(0, progressWhenCentered - 0.05), 
        progressWhenCentered, 
        Math.min(1, progressWhenCentered + 0.05)
      ],
      [0, 1, 0]
    )
  })

  return (
    <section 
      id="processo" 
      ref={containerRef}
      style={{
        background: '#000000',
        position: 'relative'
      }}
    >
      {/* Sticky Container */}
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}>
        {/* Background Progress */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '100%',
            background: 'linear-gradient(180deg, transparent 0%, #6F278B 50%, transparent 100%)',
            opacity: 0.1
          }}
        />

        {/* Title */}
        <div style={{
          position: 'absolute',
          top: '10%',
          textAlign: 'center',
          zIndex: 10
        }}>
          <motion.h2 style={{ 
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 500,
            lineHeight: '1.1',
            marginBottom: '20px',
            letterSpacing: '-0.03em',
            color: '#ffffff',
            fontFamily: 'Nugros, sans-serif',
            opacity: 1
          }}>
            Nosso processo de{' '}
            <span style={{ color: '#6F278B' }}>
              desenvolvimento
            </span>
          </motion.h2>
          
          {/* Divider minimalista */}
          <motion.div 
            style={{
              height: '1px',
              background: 'linear-gradient(to right, transparent, rgba(111, 39, 139, 0.3), transparent)',
              width: '300px',
              margin: '0 auto'
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </div>

        {/* Horizontal Scrolling Container */}
        <motion.div 
          style={{
            position: 'relative',
            width: '100%',
            height: '60vh',
            display: 'flex',
            alignItems: 'center',
            x: globalX
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0',
            width: 'max-content'
          }}>
            {steps.map((step, index) => {
              const transforms = stepTransforms[index]

              return (
                <motion.div
                  key={step.number}
                  style={{
                    width: '100vw',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: transforms.opacity,
                    scale: transforms.scale,
                    filter: useTransform(transforms.blur, (v) => `blur(${v}px)`)
                  }}
                >
                  {/* Small Number on Top */}
                  <div style={{
                    fontSize: '1.2rem',
                    fontWeight: '400',
                    color: '#9B4FBF',
                    fontFamily: 'Nugros, sans-serif',
                    marginBottom: '20px',
                    letterSpacing: '0.05em'
                  }}>
                    ETAPA {step.number}
                  </div>
                  
                  {/* Title */}
                  <h3 style={{
                    fontSize: '4rem',
                    fontWeight: '200',
                    marginBottom: '40px',
                    color: '#ffffff',
                    fontFamily: 'Nugros, sans-serif',
                    letterSpacing: '-0.02em',
                    lineHeight: '1',
                    textAlign: 'center'
                  }}>
                    {step.title}
                  </h3>
                  
                  {/* Description */}
                  <p style={{
                    fontSize: '1.4rem',
                    lineHeight: '1.6',
                    color: 'rgba(255, 255, 255, 0.5)',
                    fontWeight: '300',
                    fontFamily: 'Nugros, sans-serif',
                    maxWidth: '800px',
                    textAlign: 'center',
                    padding: '0 20px'
                  }}>
                    {step.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Progress Line */}
        <div style={{
          position: 'absolute',
          bottom: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '400px',
          height: '2px',
          background: 'rgba(111, 39, 139, 0.2)',
          borderRadius: '1px',
          overflow: 'hidden'
        }}>
          <motion.div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'linear-gradient(90deg, #6F278B 0%, #9B4FBF 50%, #ffffff 100%)',
              scaleX: useTransform(scrollYProgress, [0, 1], [0, 1]),
              transformOrigin: 'left'
            }}
          />
        </div>
      </div>

      {/* Increased Scroll Space for slower movement */}
      <div style={{ height: `${steps.length * 150}vh` }} />
    </section>
  )
}