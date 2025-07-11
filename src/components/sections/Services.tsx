'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

const services = [
  {
    number: '001',
    title: 'E-commerces',
    subtitle: 'Lojas Virtuais que Vendem',
    description: 'Plataforma completa para você vender online com segurança e escalar seu faturamento.',
    features: ['Checkout otimizado', 'Gestão de produtos fácil']
  },
  {
    number: '002',
    title: 'Sites Institucionais',
    subtitle: 'Sites Institucionais Profissionais',
    description: 'Sua empresa bem representada com um site que transmite credibilidade e gera negócios.',
    features: ['Design sob medida', 'Conteúdo gerenciável', 'Formulários inteligentes']
  },
  {
    number: '003',
    title: 'Landing Pages',
    subtitle: 'Landing Pages de Alta Conversão',
    description: 'Páginas estratégicas para suas campanhas gerarem resultados extraordinários.',
    features: ['Foco total em conversão', 'Integração com anúncios', 'Testes A/B inclusos']
  }
]

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

export default function Services() {
  const containerRef = useRef(null)
  const stickyRef = useRef(null)
  const [isDesktop, setIsDesktop] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  // Scroll progress da seção inteira
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Transforms baseados no scroll progress
  // Título - aparece antes do sticky começar
  const titleOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1])
  const titleY = useTransform(scrollYProgress, [0, 0.05], [100, 0])
  
  // Cards de serviços - aparecem durante o sticky (25% a 60% do scroll)
  const card1Opacity = useTransform(scrollYProgress, [0.25, 0.35], [0, 1])
  const card1Y = useTransform(scrollYProgress, [0.25, 0.35], [100, 0])
  
  const card2Opacity = useTransform(scrollYProgress, [0.35, 0.45], [0, 1])
  const card2Y = useTransform(scrollYProgress, [0.35, 0.45], [100, 0])
  
  const card3Opacity = useTransform(scrollYProgress, [0.45, 0.55], [0, 1])
  const card3Y = useTransform(scrollYProgress, [0.45, 0.55], [100, 0])
  
  // Seção de benefícios - aparece após o sticky (70% a 80%)
  const benefitsOpacity = useTransform(scrollYProgress, [0.7, 0.8], [0, 1])
  const benefitsY = useTransform(scrollYProgress, [0.7, 0.8], [100, 0])
  
  // Background effects
  const bgRotate = useTransform(scrollYProgress, [0.2, 0.6], [0, 180])
  const bgScale = useTransform(scrollYProgress, [0.2, 0.4, 0.6], [1, 1.2, 1])
  

  useEffect(() => {
    const checkSize = () => {
      setIsDesktop(window.innerWidth > 1024)
      setIsMobile(window.innerWidth <= 640)
    }
    
    checkSize()
    window.addEventListener('resize', checkSize)
    return () => window.removeEventListener('resize', checkSize)
  }, [])

  const cardTransforms = [
    { opacity: card1Opacity, y: card1Y },
    { opacity: card2Opacity, y: card2Y },
    { opacity: card3Opacity, y: card3Y }
  ]

  return (
    <>
      <style>{`
        .services-section * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        .services-section {
          font-family: 'Outfit', var(--font-outfit), sans-serif !important;
        }
        
        
        /* Reset para elementos específicos */
        .services-section h1,
        .services-section h2,
        .services-section h3,
        .services-section h4,
        .services-section p,
        .services-section ul,
        .services-section li {
          margin: 0;
          padding: 0;
          font-family: inherit;
        }
        
        /* Floating dots animation */
        @keyframes float-dot {
          from {
            transform: translateY(100vh) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          to {
            transform: translateY(-100vh) translateX(100px);
            opacity: 0;
          }
        }
        
        /* Responsive styles */
        @media (max-width: 1024px) {
          .services-grid {
            grid-template-columns: 1fr !important;
          }
          
          .service-item {
            border-right: none !important;
            border-bottom: 1px solid rgba(111, 39, 139, 0.1);
            padding: 60px 40px !important;
          }
          
          .service-item:last-child {
            border-bottom: none;
          }
        }
        
        @media (max-width: 640px) {
          .services-section h1 {
            font-size: 2rem !important;
            margin-bottom: 80px !important;
          }
          
          .service-item {
            padding: 40px 20px !important;
          }
          
          .benefit-item {
            flex: 0 0 100% !important;
          }
        }
      `}</style>

      {/* Container que define a altura do scroll */}
      <section 
        ref={containerRef}
        className="services-section"
        style={{
          position: 'relative',
          height: '400vh',
          background: '#000'
        }}
      >
        {/* Título - aparece antes do sticky */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2
        }}>
          <motion.h1
            style={{
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              fontWeight: 200,
              letterSpacing: '0.05em',
              lineHeight: 1,
              fontFamily: 'var(--font-geist-mono), monospace',
              textTransform: 'uppercase',
              textAlign: 'center',
              opacity: titleOpacity,
              y: titleY
            }}
          >
            <span style={{ display: 'block', marginBottom: '10px' }}>
              Especialistas na
            </span>
            <span style={{ 
              display: 'block',
              fontWeight: 500,
              color: '#fff'
            }}>
              <span style={{ position: 'relative', display: 'inline-block' }}>
                Criação
                <motion.span
                  style={{
                    position: 'absolute',
                    bottom: '-10px',
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: 'linear-gradient(90deg, #6F278B 0%, #00B4D8 100%)',
                    transformOrigin: 'left',
                    scaleX: titleOpacity
                  }}
                />
              </span>
              {' de:'}
            </span>
          </motion.h1>
        </div>

        {/* Container sticky que fica fixo durante o scroll dos cards */}
        <div 
          ref={stickyRef}
          className="sticky-container"
          style={{
            position: 'absolute',
            top: '100vh', // Começa após o título
            left: 0,
            right: 0,
            height: '200vh' // Altura para o sticky dos cards
          }}
        >
          <div style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}>
          {/* Background animado */}
          <motion.div
            style={{
              position: 'absolute',
              top: '-50%',
              left: '-50%',
              width: '200%',
              height: '200%',
              pointerEvents: 'none',
              rotate: bgRotate,
              scale: bgScale
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                background: 'radial-gradient(circle at 30% 50%, rgba(111, 39, 139, 0.08) 0%, transparent 50%)',
              }}
            />
          </motion.div>

          {/* Floating Dots */}
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            {[...Array(18)].map((_, i) => (
              <motion.div
                key={i}
                style={{
                  position: 'absolute',
                  width: '2px',
                  height: '2px',
                  borderRadius: '50%',
                  background: i % 2 === 0 ? 'rgba(111, 39, 139, 0.5)' : 'rgba(0, 180, 216, 0.3)',
                  left: `${(i * 5) + 10}%`
                }}
                animate={{
                  y: ['100vh', '-100vh'],
                  x: [0, 100],
                  opacity: [0, 1, 1, 0]
                }}
                transition={{
                  duration: 20 + (i * 0.5),
                  repeat: Infinity,
                  delay: i * 1,
                  ease: "linear"
                }}
              />
            ))}
          </div>

          {/* Conteúdo dos cards */}
          <div style={{ 
            position: 'relative', 
            zIndex: 1, 
            maxWidth: '1400px', 
            margin: '0 auto',
            padding: '0 20px',
            width: '100%'
          }}>

            {/* Grid de serviços */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: isDesktop ? 'repeat(3, 1fr)' : '1fr',
                gap: 0,
                marginBottom: '80px'
              }}
              className="services-grid"
            >
              {services.map((service, index) => (
                <motion.div
                  key={service.number}
                  className="service-item"
                  style={{
                    padding: isMobile ? '40px 20px' : !isDesktop ? '60px 40px' : '80px 60px',
                    borderRight: isDesktop && index < services.length - 1 ? '1px solid rgba(111, 39, 139, 0.1)' : 'none',
                    borderBottom: !isDesktop && index < services.length - 1 ? '1px solid rgba(111, 39, 139, 0.1)' : 'none',
                    position: 'relative',
                    cursor: 'pointer',
                    opacity: cardTransforms[index].opacity,
                    y: cardTransforms[index].y
                  }}
                  whileHover={{ 
                    scale: 1.02,
                    transition: { duration: 0.3 }
                  }}
                >
                  {/* Hover Background */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(135deg, transparent 0%, rgba(111, 39, 139, 0.05) 100%)',
                      pointerEvents: 'none',
                      borderRadius: '24px'
                    }}
                  />
                  
                  {/* Content */}
                  <div style={{ position: 'relative' }}>
                    <div 
                      style={{
                        fontSize: '0.875rem',
                        fontWeight: 300,
                        color: '#00B4D8',
                        marginBottom: '30px',
                        letterSpacing: '0.1em',
                        opacity: 0.6
                      }}
                    >
                      {service.number}
                    </div>
                    
                    <h3
                      style={{
                        fontSize: '2rem',
                        fontWeight: 400,
                        marginBottom: '15px',
                        letterSpacing: '-0.02em'
                      }}
                    >
                      {service.title}
                    </h3>
                    
                    <p style={{
                      fontSize: '0.875rem',
                      fontWeight: 300,
                      color: 'rgba(255, 255, 255, 0.4)',
                      marginBottom: '30px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em'
                    }}>
                      {service.subtitle}
                    </p>
                    
                    <p style={{
                      fontSize: '1rem',
                      lineHeight: 1.8,
                      color: 'rgba(255, 255, 255, 0.6)',
                      marginBottom: '40px',
                      fontWeight: 300
                    }}>
                      {service.description}
                    </p>
                    
                    <ul style={{ listStyle: 'none' }}>
                      {service.features.map((feature) => (
                        <motion.li 
                          key={feature}
                          style={{
                            padding: '12px 0',
                            fontSize: '0.95rem',
                            color: 'rgba(255, 255, 255, 0.7)',
                            fontWeight: 300,
                            position: 'relative',
                            paddingLeft: '20px'
                          }}
                          whileHover={{ paddingLeft: '30px' }}
                        >
                          <motion.span
                            style={{
                              position: 'absolute',
                              left: 0,
                              top: '50%',
                              transform: 'translateY(-50%)',
                              width: '4px',
                              height: '4px',
                              background: '#6F278B',
                              borderRadius: '50%'
                            }}
                            whileHover={{
                              width: '12px',
                              background: 'linear-gradient(90deg, #6F278B, #00B4D8)',
                              borderRadius: '2px'
                            }}
                          />
                          {feature}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
          </div>
        </div>

        {/* Seção de benefícios - fora do sticky */}
        <div style={{
          position: 'absolute',
          top: '300vh', // Após o sticky dos cards
          left: 0,
          right: 0,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px 20px'
        }}>
          <motion.div
            style={{ 
              textAlign: 'center',
              maxWidth: '1400px',
              margin: '0 auto',
              width: '100%',
              opacity: benefitsOpacity,
              y: benefitsY
            }}
          >
            <h3 style={{
              fontSize: '1rem',
              fontWeight: 300,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(255, 255, 255, 0.5)',
              marginBottom: '60px'
            }}>
              Todos os nossos sites incluem
            </h3>
            
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
        </div>
      </section>
    </>
  )
}