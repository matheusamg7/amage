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
        padding: '100px 20px',
        position: 'relative',
        fontFamily: 'Nugros, sans-serif'
      }}
    >
      <motion.div
        style={{ 
          textAlign: 'center',
          maxWidth: '1400px',
          margin: '0 auto',
          width: '100%',
          opacity,
          y
        }}
      >
        <h1 style={{
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 500,
          letterSpacing: '-0.03em',
          lineHeight: 1.1,
          fontFamily: 'Nugros, sans-serif',
          color: '#fff',
          marginBottom: '60px'
        }}>
          <span style={{ 
            display: 'inline-block',
            position: 'relative'
          }}>
            Todos os nossos sites incluem
            <span
              style={{
                position: 'absolute',
                bottom: '-10px',
                left: '20%',
                right: '20%',
                height: '2px',
                background: 'linear-gradient(90deg, rgba(111, 39, 139, 0.3) 0%, rgba(111, 39, 139, 0.8) 50%, rgba(111, 39, 139, 0.3) 100%)'
              }}
            />
          </span>
        </h1>
        
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '30px',
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              className="benefit-item"
              style={{
                flex: isMobile ? '0 0 100%' : '0 0 calc(50% - 15px)',
                textAlign: 'left',
                padding: '30px',
                border: '1px solid rgba(111, 39, 139, 0.1)',
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
                borderColor: 'rgba(111, 39, 139, 0.3)',
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
            >
              <motion.span
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.4 }}
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
                color: '#6F278B',
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