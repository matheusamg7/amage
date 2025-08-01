'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

const benefits = [
  {
    title: 'Design Exclusivo',
    text: 'Nada de templates. Seu site único como seu negócio.'
  },
  {
    title: 'Performance Superior',
    text: 'Carregamento ultra-rápido para não perder clientes.'
  },
  {
    title: '100% Responsivo',
    text: 'Perfeito em qualquer tela: celular, tablet ou desktop.'
  },
  {
    title: 'Otimizado para SEO',
    text: 'Preparado para ranquear no Google desde o dia 1.'
  },
  {
    title: 'Painel Administrativo',
    text: 'Você no controle: altere textos e imagens facilmente.'
  },
  {
    title: 'Suporte Humanizado',
    text: 'Time sempre próximo, não é robô nem terceirizado.'
  }
]

export default function ServicesBenefits() {
  const containerRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])
  const y = useTransform(scrollYProgress, [0, 0.3], [50, 0])

  useEffect(() => {
    const checkSize = () => {
      setIsMobile(window.innerWidth <= 640)
    }
    
    checkSize()
    window.addEventListener('resize', checkSize)
    return () => window.removeEventListener('resize', checkSize)
  }, [])

  return (
    <section 
      ref={containerRef}
      className="services-benefits-section"
      style={{
        background: '#000',
        padding: isMobile ? '0px 20px 80px 20px' : '80px 40px 140px 40px',
        position: 'relative',
        fontFamily: 'Nugros, sans-serif'
      }}
    >

      {/* Floating Dots - Otimizado */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              width: '2px',
              height: '2px',
              borderRadius: '50%',
              background: i % 2 === 0 ? 'rgba(111, 39, 139, 0.3)' : 'rgba(0, 180, 216, 0.2)',
              left: `${(i * 25) + 5}%`,
              willChange: 'transform'
            }}
            animate={{
              y: ['100vh', '-100vh']
            }}
            transition={{
              duration: 30 + (i * 3),
              repeat: Infinity,
              delay: i * 4,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <motion.div
        style={{ 
          textAlign: 'center',
          maxWidth: '1200px',
          margin: '0 auto',
          width: '100%',
          opacity,
          y,
          position: 'relative'
        }}
      >
        {/* Título apenas no mobile */}
        {isMobile && (
          <h2
            style={{
              fontSize: '1.5rem',
              fontWeight: 500,
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
              fontFamily: 'Nugros, sans-serif',
              color: '#fff',
              marginBottom: '40px',
              textAlign: 'center'
            }}
          >
            Nossos sites possuem:
          </h2>
        )}
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: isMobile ? '20px' : '60px',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              className="benefit-item"
              style={{
                textAlign: 'left',
                padding: '25px',
                border: '1px solid rgba(111, 39, 139, 0.4)',
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '16px'
              }}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ 
                opacity: 1, 
                x: 0,
                transition: {
                  delay: index * 0.1,
                  duration: 0.6
                }
              }}
              viewport={{ once: true }}
              whileHover={{
                x: 10,
                borderColor: '#6F278B',
                scale: 1.02,
                transition: { duration: 0.1 }
              }}
            >
              <motion.span
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.2 }}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '2px',
                  background: '#00B4D8'
                }}
              />
              
              <h4 style={{
                fontSize: '1.1rem',
                fontWeight: 400,
                color: '#ffffff',
                marginBottom: '10px'
              }}>
                {benefit.title}
              </h4>
              <p style={{
                fontSize: '0.9rem',
                lineHeight: 1.6,
                color: 'rgba(255, 255, 255, 0.5)',
                fontWeight: 300
              }}>
                {benefit.text}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}