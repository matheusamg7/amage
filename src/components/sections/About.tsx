'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'

export default function About() {
  const ref = useRef(null)
  const [isMobile, setIsMobile] = useState(true) // Começa como true para evitar problemas de SSR
  const [forceVisible, setForceVisible] = useState(false)
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    // Força visibilidade após 500ms como fallback
    const timer = setTimeout(() => {
      setForceVisible(true)
    }, 500)
    
    return () => {
      window.removeEventListener('resize', checkMobile)
      clearTimeout(timer)
    }
  }, [])
  
  // Ajustar margin do useInView baseado em mobile
  const isInView = useInView(ref, { 
    once: true, 
    margin: isMobile ? "0px" : "-100px", 
    amount: isMobile ? 0.1 : 0.3 
  })
  
  // Animação baseada no scroll
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  
  const opacityTransform = useTransform(scrollYProgress, [0.15, 0.3], [0, 1])
  const yTransform = useTransform(scrollYProgress, [0.15, 0.3], [50, 0])
  const scaleTransform = useTransform(scrollYProgress, [0.15, 0.3], [0.9, 1])
  const rotateTransform = useTransform(scrollYProgress, [0.15, 0.3], [-5, 0])
  
  const opacity = isMobile ? 1 : opacityTransform
  const y = isMobile ? 0 : yTransform
  const scale = isMobile ? 1 : scaleTransform
  const rotate = isMobile ? 0 : rotateTransform

  // Debug log para mobile
  useEffect(() => {
    console.log('About Section Debug:', {
      isMobile,
      isInView,
      forceVisible,
      windowWidth: typeof window !== 'undefined' ? window.innerWidth : 'SSR'
    })
  }, [isMobile, isInView, forceVisible])

  const differentials = [
    {
      number: '01',
      title: 'Comunicação clara e próxima',
      description: 'Diálogo constante em todas as etapas, garantindo transparência e alinhamento total.'
    },
    {
      number: '02',
      title: 'Tecnologia de ponta aplicada com propósito',
      description: 'Sites rápidos, seguros e responsivos, construídos para evoluir com seu negócio.'
    },
    {
      number: '03',
      title: 'Agilidade sem comprometer a qualidade',
      description: 'Entregas mais rápidas que o mercado, sem abrir mão da excelência.'
    },
    {
      number: '04',
      title: 'Foco em resultados e conversão',
      description: 'Projetos estratégicos que geram impacto e transformam visitantes em clientes.'
    }
  ]

  return (
    <section 
      id="about" 
      ref={ref} 
      style={{
        padding: isMobile ? '60px 20px' : '120px 20px',
        background: '#E3E3E5',
        backgroundColor: '#E3E3E5',
        borderTopLeftRadius: isMobile ? '20px' : '40px',
        borderTopRightRadius: isMobile ? '20px' : '40px',
        marginTop: isMobile ? '0px' : '-40px',
        position: 'relative',
        minHeight: 'auto',
        opacity: (isMobile || forceVisible) ? 1 : undefined,
        zIndex: 1,
        isolation: 'isolate'
      }}
    >
      <div style={{ 
        maxWidth: '1400px', 
        margin: '0 auto',
        opacity: 1,
        visibility: 'visible'
      }}>
        {/* Hero Section com Mockup */}
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: isMobile ? '40px' : '100px',
          alignItems: 'center',
          marginBottom: '40px',
          marginTop: isMobile ? '0' : '-40px'
        }}>
          {/* Text Content */}
          <motion.div
            style={{ 
              maxWidth: isMobile ? '100%' : '600px',
              width: '100%',
              textAlign: isMobile ? 'center' : 'left',
              opacity: isMobile ? 1 : undefined // Força opacidade 1 no mobile
            }}
            initial={{ opacity: isMobile ? 1 : 0 }}
            animate={!isMobile && isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <h1 style={{ 
              fontSize: isMobile ? '1.75rem' : 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 700,
              lineHeight: '1.1',
              marginBottom: isMobile ? '30px' : '40px',
              letterSpacing: '-0.03em',
              color: '#151515',
              fontFamily: 'Nugros, sans-serif',
              textAlign: isMobile ? 'center' : 'left',
              opacity: 1,
              visibility: 'visible'
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
                  trabalho diferente?
                </span>
              </span>
            </h1>
            
            <p style={{ 
              fontSize: isMobile ? '0.9rem' : 'clamp(0.9rem, 1.5vw, 1.1rem)',
              lineHeight: '1.8',
              color: '#666',
              fontWeight: 400,
              marginBottom: '20px',
              letterSpacing: '0.02em',
              fontFamily: 'Nugros, sans-serif',
              textAlign: isMobile ? 'center' : 'left',
              opacity: 1,
              visibility: 'visible'
            }}>
              Na Amage, acreditamos que grandes resultados começam com <span style={{ color: '#6F278B', fontWeight: 500 }}>escuta e parceria</span>.
              Mais do que desenvolver sites, entendemos o seu negócio e criamos soluções digitais que comunicam com <span style={{ color: '#6F278B', fontWeight: 500 }}>clareza</span>, transmitem <span style={{ color: '#6F278B', fontWeight: 500 }}>autoridade</span> e geram <span style={{ color: '#6F278B', fontWeight: 500 }}>resultado</span>.
            </p>
            
            <p style={{ 
              fontSize: isMobile ? '0.9rem' : 'clamp(0.9rem, 1.5vw, 1.1rem)',
              lineHeight: '1.8',
              color: '#666',
              fontWeight: 400,
              marginBottom: '30px',
              letterSpacing: '0.02em',
              fontFamily: 'Nugros, sans-serif',
              textAlign: isMobile ? 'center' : 'left',
              opacity: 1,
              visibility: 'visible'
            }}>
              Combinamos estratégia, design e tecnologia para entregar projetos rápidos, eficazes e prontos para crescer junto com a sua empresa.
            </p>
          </motion.div>
          
          {/* SVG Background Animado - apenas desktop */}
          {!isMobile && (
            <motion.div
              style={{
                opacity: opacity as number,
                y: y as number,
                scale: scale as number,
                rotate: rotate as number,
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                willChange: 'transform, opacity',
                transform: 'translateZ(0)' // Hardware acceleration
              }}
            >
              <Image
                src="/assets/backgrounds/2.svg"
                alt="Background Pattern"
                width={700}
                loading="lazy"
                priority={false}
                height={600}
                style={{
                  opacity: 1,
                  pointerEvents: 'none',
                  userSelect: 'none',
                  marginTop: '-50px'
                }}
              />
            </motion.div>
          )}
        </div>
        
        {/* Divider */}
        <motion.div 
          style={{
            height: '1px',
            background: 'linear-gradient(to right, transparent, rgba(111, 39, 139, 0.2), transparent)',
            margin: '-20px 0 60px 0',
            transform: isMobile ? 'scaleX(1)' : undefined
          }}
          initial={{ scaleX: isMobile ? 1 : 0 }}
          animate={!isMobile && isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8 }}
        />
        
        {/* Differentials Section */}
        <div>
          {/* Title left aligned */}
          <motion.div 
            style={{ 
              marginBottom: isMobile ? '30px' : '50px',
              opacity: isMobile ? 1 : undefined,
              transform: isMobile ? 'translateX(0)' : undefined
            }}
            initial={{ opacity: isMobile ? 1 : 0, x: isMobile ? 0 : -20 }}
            animate={!isMobile && isInView ? { opacity: 1, x: 0 } : {}}
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
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
            gap: isMobile ? '30px' : '40px 50px'
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
                  textAlign: 'left',
                  opacity: isMobile ? 1 : undefined,
                  transform: isMobile ? 'translateX(0)' : undefined
                }}
                initial={{ opacity: isMobile ? 1 : 0, x: isMobile ? 0 : -30 }}
                animate={!isMobile && isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: isMobile ? 0 : 0.4 + index * 0.1 }}
              >
                <motion.h3 
                  style={{
                    fontSize: isMobile ? '1.2rem' : '1.4rem',
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
                  fontSize: isMobile ? '0.85rem' : '1rem',
                  lineHeight: '1.6',
                  color: '#666',
                  fontWeight: 400,
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
              marginTop: isMobile ? '50px' : '80px',
              textAlign: 'center',
              opacity: isMobile ? 1 : undefined,
              transform: isMobile ? 'translateY(0)' : undefined
            }}
            initial={{ opacity: isMobile ? 1 : 0, y: isMobile ? 0 : 20 }}
            animate={!isMobile && isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: isMobile ? 0 : 0.8 }}
          >
            <motion.button
              style={{
                background: '#6F278B',
                color: '#ffffff',
                border: 'none',
                padding: '14px 40px',
                fontSize: '1rem',
                fontWeight: '500',
                borderRadius: '12px',
                cursor: 'pointer',
                fontFamily: 'Nugros, sans-serif',
                letterSpacing: '0.02em',
                transition: 'all 0.3s ease',
                display: 'inline-flex',
                alignItems: 'center'
              }}
              whileHover={{ 
                scale: 1.03,
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                const contatoSection = document.getElementById('contato')
                if (contatoSection) {
                  contatoSection.scrollIntoView({ behavior: 'smooth' })
                }
              }}
            >
              Começar projeto conosco
            </motion.button>
          </motion.div>
        </div>
        
      </div>
    </section>
  )
}