'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

const services = [
  {
    number: '001',
    title: 'E-commerces',
    subtitle: 'Lojas Virtuais que Vendem',
    description: 'Plataforma completa para você vender online com segurança e escalar seu faturamento.',
    features: [
      'Loja rápida e segura',
      'Checkout de pagamento otimizado',
      'Gestão de produtos fácil',
      'Frete automático',
      'Painel administrador'
    ]
  },
  {
    number: '002',
    title: 'Sites Institucionais',
    subtitle: 'Sites Institucionais Profissionais',
    description: 'Sua empresa bem representada com um site que transmite credibilidade e gera negócios.',
    features: [
      'Design sob medida',
      'Conteúdo gerenciável',
      'Formulários estratégicos',
      'Otimização para SEO',
      'Integração com WhatsApp'
    ]
  },
  {
    number: '003',
    title: 'Landing Pages',
    subtitle: 'Landing Pages de Alta Conversão',
    description: 'Páginas estratégicas para suas campanhas gerarem resultados extraordinários.',
    features: [
      'Foco total em conversão',
      'Integração com anúncios',
      'Formulários inteligentes',
      'Testes A/B incluídos',
      'SEO para campanhas'
    ]
  }
]


export default function Services() {
  const containerRef = useRef(null)
  const stickyRef = useRef(null)
  const [isDesktop, setIsDesktop] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [hasTriggeredPause, setHasTriggeredPause] = useState(false)

  // Scroll progress da seção inteira
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Cards aparecem progressivamente com o scroll (mais cedo)
  const card1Opacity = useTransform(scrollYProgress, [0.05, 0.25], [0, 1])
  const card1Y = useTransform(scrollYProgress, [0.05, 0.25], [60, 0])
  
  const card2Opacity = useTransform(scrollYProgress, [0.15, 0.35], [0, 1])
  const card2Y = useTransform(scrollYProgress, [0.15, 0.35], [60, 0])
  
  const card3Opacity = useTransform(scrollYProgress, [0.25, 0.45], [0, 1])
  const card3Y = useTransform(scrollYProgress, [0.25, 0.45], [60, 0])
  
  

  useEffect(() => {
    const checkSize = () => {
      setIsDesktop(window.innerWidth > 1024)
      setIsMobile(window.innerWidth <= 640)
    }
    
    checkSize()
    window.addEventListener('resize', checkSize)
    return () => window.removeEventListener('resize', checkSize)
  }, [])

  // Pausa o scroll quando todos os cards estiverem visíveis
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      // Quando o terceiro card estiver completamente visível (45%)
      if (latest >= 0.45 && latest <= 0.48 && !hasTriggeredPause) {
        setHasTriggeredPause(true)
        
        setTimeout(() => {
          const currentScrollY = window.scrollY
          
          const preventScroll = (e) => {
            e.preventDefault()
            window.scrollTo(0, currentScrollY)
          }
          
          window.addEventListener('wheel', preventScroll, { passive: false })
          window.addEventListener('touchmove', preventScroll, { passive: false })
          window.addEventListener('keydown', preventScroll, { passive: false })
          
          setTimeout(() => {
            window.removeEventListener('wheel', preventScroll)
            window.removeEventListener('touchmove', preventScroll)
            window.removeEventListener('keydown', preventScroll)
          }, 200)
        }, 50)
      }
    })
    
    return () => unsubscribe()
  }, [scrollYProgress, hasTriggeredPause])


  return (
    <>
      <style>{`
        .services-section * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        .services-grid {
          grid-gap: 0 !important;
          gap: 0 !important;
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
            padding: 60px 40px !important;
          }
          
        }
        
        @media (max-width: 640px) {
          .services-section h1 {
            font-size: 2rem !important;
          }
          
          .service-item {
            padding: 40px 20px !important;
          }
          
        }
      `}</style>

      {/* Container que define a altura do scroll */}
      <section 
        id="servicos"
        ref={containerRef}
        className="services-section"
        style={{
          position: 'relative',
          height: '250vh',
          background: '#000'
        }}
      >
        <div style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>

          {/* Floating Dots - Reduzido para melhor performance */}
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                style={{
                  position: 'absolute',
                  width: '3px',
                  height: '3px',
                  borderRadius: '50%',
                  background: i % 2 === 0 ? 'rgba(111, 39, 139, 0.4)' : 'rgba(0, 180, 216, 0.3)',
                  left: `${(i * 12) + 5}%`
                }}
                animate={{
                  y: ['100vh', '-100vh'],
                  x: [0, 50],
                  opacity: [0, 0.8, 0.8, 0]
                }}
                transition={{
                  duration: 25 + (i * 1),
                  repeat: Infinity,
                  delay: i * 2,
                  ease: "linear"
                }}
              />
            ))}
          </div>

          {/* Conteúdo dos cards */}
          <div style={{ 
            position: 'relative', 
            zIndex: 10, 
            maxWidth: '1400px', 
            margin: '0 auto',
            padding: '0 20px',
            width: '100%'
          }}>
            {/* Título sempre visível */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={{ 
                textAlign: 'center', 
                marginBottom: '80px',
                marginTop: isMobile ? '60px' : '120px'
              }}
            >
              <h1
                style={{
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  fontWeight: 500,
                  letterSpacing: '-0.03em',
                  lineHeight: 1.1,
                  fontFamily: 'Nugros, sans-serif',
                  color: '#fff',
                  marginBottom: '20px'
                }}
              >
                <span style={{ 
                  display: 'inline-block',
                  position: 'relative',
                  color: '#fff'
                }}>
                  Nossos Serviços
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
              <p style={{
                fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)',
                fontWeight: 300,
                color: 'rgba(255, 255, 255, 0.6)',
                letterSpacing: '0.02em',
                fontFamily: 'Nugros, sans-serif'
              }}>
                Soluções digitais que transformam negócios
              </p>
            </motion.div>

            {/* Grid de serviços */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: isDesktop ? 'repeat(3, 1fr)' : '1fr',
                gap: 0
              }}
              className="services-grid"
            >
              {services.map((service, index) => (
                <motion.div
                  key={service.number}
                  className="service-item"
                  style={{
                    padding: isMobile ? '40px 20px' : !isDesktop ? '60px 40px' : '80px 60px',
                    borderRight: isDesktop && index < services.length - 1 ? '1px solid rgba(111, 39, 139, 0.2)' : 'none',
                    borderBottom: !isDesktop && index < services.length - 1 ? '1px solid rgba(111, 39, 139, 0.1)' : 'none',
                    position: 'relative',
                    cursor: 'pointer',
                    opacity: index === 0 ? card1Opacity : index === 1 ? card2Opacity : card3Opacity,
                    y: index === 0 ? card1Y : index === 1 ? card2Y : card3Y
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
                        marginBottom: '20px',
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
                      marginBottom: '20px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em'
                    }}>
                      {service.subtitle}
                    </p>
                    
                    <p style={{
                      fontSize: '1rem',
                      lineHeight: 1.8,
                      color: 'rgba(255, 255, 255, 0.6)',
                      marginBottom: '30px',
                      fontWeight: 300
                    }}>
                      {service.description}
                    </p>
                    
                    <ul style={{ listStyle: 'none' }}>
                      {service.features.map((feature) => (
                        <motion.li 
                          key={feature}
                          style={{
                            padding: '6px 0',
                            fontSize: '0.9rem',
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

      </section>
    </>
  )
}