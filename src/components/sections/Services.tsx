'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
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
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [isDesktop, setIsDesktop] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkSize = () => {
      setIsDesktop(window.innerWidth > 1024)
      setIsMobile(window.innerWidth <= 640)
    }
    
    checkSize()
    window.addEventListener('resize', checkSize)
    return () => window.removeEventListener('resize', checkSize)
  }, [])

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
        
        /* Expand width animation */
        @keyframes expandWidth {
          to { transform: scaleX(1); }
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
            font-size: 3rem !important;
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

      <section 
        id="services" 
        ref={ref} 
        className="services-section"
        style={{
          position: 'relative',
          minHeight: '100vh',
          padding: '160px 20px',
          overflow: 'hidden',
          background: '#000',
          color: '#fff'
        }}
      >
        {/* Animated Background Gradient */}
        <motion.div
          style={{
            position: 'fixed',
            top: '-50%',
            left: '-50%',
            width: '200%',
            height: '200%',
            pointerEvents: 'none',
            zIndex: 0
          }}
          animate={{
            rotate: [0, 120, 240, 360],
            x: ['0%', '10%', '-5%', '0%'],
            y: ['0%', '-10%', '5%', '0%']
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              background: 'radial-gradient(circle at 30% 50%, rgba(111, 39, 139, 0.08) 0%, transparent 50%)'
            }}
          />
        </motion.div>

        {/* Floating Dots */}
        <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
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
                duration: 20,
                repeat: Infinity,
                delay: i * 1,
                ease: "linear"
              }}
            />
          ))}
        </div>

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1400px', margin: '0 auto' }}>
          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
            style={{
              fontSize: 'clamp(3rem, 8vw, 6rem)',
              fontWeight: 200,
              letterSpacing: '-0.05em',
              lineHeight: 1,
              marginBottom: '120px'
            }}
          >
            <span style={{ display: 'block', marginBottom: '20px' }}>
              Especialistas na
            </span>
            <span style={{ 
              display: 'block', 
              position: 'relative',
              fontWeight: 500,
              color: '#fff'
            }}>
              Criação de:
              <motion.span
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
                style={{
                  position: 'absolute',
                  bottom: '-10px',
                  left: 0,
                  width: '120px',
                  height: '3px',
                  background: 'linear-gradient(90deg, #6F278B 0%, #00B4D8 100%)',
                  transformOrigin: 'left'
                }}
              />
            </span>
          </motion.h1>

          {/* Services Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            style={{
              display: 'grid',
              gridTemplateColumns: isDesktop ? 'repeat(3, 1fr)' : '1fr',
              gap: 0,
              marginBottom: '160px'
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
                  transition: 'all 0.6s cubic-bezier(0.23, 1, 0.320, 1)'
                }}
                whileHover={{ y: -10 }}
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
                    pointerEvents: 'none'
                  }}
                />
                
                {/* Content */}
                <div style={{ position: 'relative' }}>
                  <motion.div 
                    style={{
                      fontSize: '0.875rem',
                      fontWeight: 300,
                      color: '#00B4D8',
                      marginBottom: '30px',
                      letterSpacing: '0.1em',
                      opacity: 0.6
                    }}
                    whileHover={{ opacity: 1 }}
                  >
                    {service.number}
                  </motion.div>
                  
                  <motion.h3
                    style={{
                      fontSize: '2rem',
                      fontWeight: 400,
                      marginBottom: '15px',
                      letterSpacing: '-0.02em'
                    }}
                    whileHover={{ color: '#6F278B' }}
                  >
                    {service.title}
                  </motion.h3>
                  
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
          </motion.div>

          {/* Benefits Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.6 }}
            style={{ textAlign: 'center' }}
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
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                  style={{
                    flex: isMobile ? '0 0 100%' : '0 0 calc(50% - 15px)',
                    textAlign: 'left',
                    padding: '30px',
                    border: '1px solid rgba(111, 39, 139, 0.1)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  whileHover={{
                    x: 10,
                    borderColor: 'rgba(111, 39, 139, 0.3)'
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