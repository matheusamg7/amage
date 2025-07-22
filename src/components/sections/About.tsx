'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  // Animação baseada no scroll
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  
  const opacity = useTransform(scrollYProgress, [0.15, 0.3], [0, 1])
  const y = useTransform(scrollYProgress, [0.15, 0.3], [50, 0])
  const scale = useTransform(scrollYProgress, [0.15, 0.3], [0.9, 1])
  const rotate = useTransform(scrollYProgress, [0.15, 0.3], [-5, 0])

  const differentials = [
    {
      number: '01',
      title: 'Comunicação clara e próxima',
      description: 'Valorizamos o diálogo constante com o cliente em todas as etapas, garantindo alinhamento e transparência do início ao fim.'
    },
    {
      number: '02',
      title: 'Tecnologia de ponta aplicada com propósito',
      description: 'Utilizamos soluções modernas e eficientes para garantir sites seguros, rápidos, responsivos e prontos para evoluir com o seu negócio.'
    },
    {
      number: '03',
      title: 'Agilidade sem comprometer a qualidade',
      description: 'Nosso processo otimizado permite entregas mais rápidas que o padrão do mercado, mantendo alto nível de execução.'
    },
    {
      number: '04',
      title: 'Foco em resultados e conversão',
      description: 'Cada projeto é pensado estrategicamente para gerar impacto, transmitir credibilidade e converter visitantes em oportunidades reais.'
    }
  ]

  return (
    <section 
      id="about" 
      ref={ref} 
      style={{
        padding: '120px 20px',
        background: '#fafafa',
        borderTopLeftRadius: '40px',
        borderTopRightRadius: '40px',
        marginTop: '-40px',
        position: 'relative'
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Hero Section com Mockup */}
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '100px',
          alignItems: 'center',
          marginBottom: '40px',
          marginTop: '-80px'
        }}>
          {/* Text Content */}
          <motion.div
            style={{ 
              maxWidth: '600px'
            }}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h1 style={{ 
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 500,
              lineHeight: '1.1',
              marginBottom: '40px',
              letterSpacing: '-0.03em',
              color: '#151515',
              fontFamily: 'Nugros, sans-serif'
            }}>
              <span style={{ 
                display: 'inline-block',
                position: 'relative',
                color: '#151515'
              }}>
                O que torna nosso
                <br />
                <span style={{ 
                  color: '#6F278B'
                }}>
                  trabalho diferente.
                </span>
              </span>
            </h1>
            
            <p style={{ 
              fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)',
              lineHeight: '1.8',
              color: '#666',
              fontWeight: 300,
              marginBottom: '30px',
              letterSpacing: '0.02em',
              fontFamily: 'Nugros, sans-serif'
            }}>
              Combinamos estratégia, design e tecnologia para criar 
              experiências digitais que não apenas impressionam, mas 
              geram resultados mensuráveis. Cada projeto é uma 
              oportunidade de superar expectativas e estabelecer 
              novos padrões no mercado.
            </p>
          </motion.div>
          
          {/* SVG Background Animado */}
          <motion.div
            style={{
              opacity,
              y,
              scale,
              rotate,
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Image
              src="/assets/backgrounds/2.svg"
              alt="Background Pattern"
              width={700}
              height={600}
              style={{
                opacity: 1,
                pointerEvents: 'none',
                userSelect: 'none',
                marginTop: '-170px'
              }}
            />
          </motion.div>
        </div>
        
        {/* Divider */}
        <motion.div 
          style={{
            height: '1px',
            background: 'linear-gradient(to right, transparent, rgba(111, 39, 139, 0.2), transparent)',
            margin: '-80px 0 40px 0'
          }}
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8 }}
        />
        
        {/* Differentials Section */}
        <div>
          {/* Title left aligned */}
          <motion.div 
            style={{ 
              marginBottom: '50px'
            }}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 style={{ 
              fontSize: '1.4rem',
              fontWeight: '700',
              color: '#151515',
              fontFamily: 'Nugros, sans-serif'
            }}>
              Nossos <span style={{ color: '#6F278B' }}>diferenciais</span>
            </h2>
          </motion.div>
          
          {/* Cards grid */}
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '40px 50px'
          }}>
            {differentials.map((item, index) => (
              <motion.div
                key={item.number}
                style={{
                  background: 'transparent',
                  padding: '0',
                  paddingLeft: '25px',
                  borderLeft: '3px solid #6F278B',
                  position: 'relative',
                  textAlign: 'left'
                }}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              >
                <motion.h3 
                  style={{
                    fontSize: '1.4rem',
                    fontWeight: '500',
                    marginBottom: '12px',
                    color: '#151515',
                    lineHeight: '1.3',
                    fontFamily: 'Nugros, sans-serif',
                    cursor: 'pointer',
                    transition: 'color 0.3s ease'
                  }}
                  whileHover={{ 
                    color: '#6F278B',
                    x: 5
                  }}
                >
                  {item.title}
                </motion.h3>
                <p style={{
                  fontSize: '1rem',
                  lineHeight: '1.7',
                  color: '#666',
                  fontWeight: '300',
                  fontFamily: 'Nugros, sans-serif',
                  maxWidth: '400px'
                }}>
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
          
          {/* CTA Section */}
          <motion.div 
            style={{ 
              marginTop: '80px'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <motion.button
              style={{
                background: '#6F278B',
                color: '#ffffff',
                border: 'none',
                padding: '14px 56px',
                fontSize: '1rem',
                fontWeight: '400',
                borderRadius: '9999px',
                cursor: 'pointer',
                fontFamily: 'Nugros, sans-serif',
                letterSpacing: '0.02em',
                transition: 'all 0.3s ease'
              }}
              whileHover={{ 
                scale: 1.02,
                background: '#5a1f70'
              }}
              whileTap={{ scale: 0.98 }}
            >
              Começar projeto conosco
            </motion.button>
          </motion.div>
        </div>
        
      </div>
    </section>
  )
}