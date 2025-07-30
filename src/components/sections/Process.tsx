'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

export default function Process() {
  const containerRef = useRef(null)
  const [isMobile, setIsMobile] = useState(true) // Começa como true para evitar problemas de SSR
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
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

  // Slower horizontal scroll
  const globalX = useTransform(scrollYProgress, [0, 1], ['0vw', '-300vw'])

  // Step 1 transforms
  const opacity1 = useTransform(scrollYProgress, [0, 0.325, 0.425], [1, 1, 0.2])
  const scale1 = useTransform(scrollYProgress, [0, 0.325, 0.425], [1, 1, 0.9])
  const blur1 = useTransform(scrollYProgress, [0, 0.325, 0.425], [0, 0, 8])

  // Step 2 transforms
  const opacity2 = useTransform(scrollYProgress, [0.208, 0.308, 0.358, 0.458], [0.2, 1, 1, 0.2])
  const scale2 = useTransform(scrollYProgress, [0.208, 0.308, 0.358, 0.458], [0.9, 1, 1, 0.9])
  const blur2 = useTransform(scrollYProgress, [0.208, 0.308, 0.358, 0.458], [8, 0, 0, 8])

  // Step 3 transforms
  const opacity3 = useTransform(scrollYProgress, [0.541, 0.641, 0.691, 0.791], [0.2, 1, 1, 0.2])
  const scale3 = useTransform(scrollYProgress, [0.541, 0.641, 0.691, 0.791], [0.9, 1, 1, 0.9])
  const blur3 = useTransform(scrollYProgress, [0.541, 0.641, 0.691, 0.791], [8, 0, 0, 8])

  // Step 4 transforms
  const opacity4 = useTransform(scrollYProgress, [0.875, 0.975, 1, 1], [0.2, 1, 1, 1])
  const scale4 = useTransform(scrollYProgress, [0.875, 0.975, 1, 1], [0.9, 1, 1, 1])
  const blur4 = useTransform(scrollYProgress, [0.875, 0.975, 1, 1], [8, 0, 0, 0])

  // Create blur filters
  const blurFilter1 = useTransform(blur1, (v) => `blur(${v}px)`)
  const blurFilter2 = useTransform(blur2, (v) => `blur(${v}px)`)
  const blurFilter3 = useTransform(blur3, (v) => `blur(${v}px)`)
  const blurFilter4 = useTransform(blur4, (v) => `blur(${v}px)`)

  // Progress bar transform
  const progressScaleX = useTransform(scrollYProgress, [0, 1], [0, 1])

  const stepTransforms = [
    { opacity: opacity1, scale: scale1, filter: blurFilter1 },
    { opacity: opacity2, scale: scale2, filter: blurFilter2 },
    { opacity: opacity3, scale: scale3, filter: blurFilter3 },
    { opacity: opacity4, scale: scale4, filter: blurFilter4 }
  ]

  return (
    <section 
      id="processo" 
      ref={containerRef}
      style={{
        background: '#000000',
        position: 'relative',
        minHeight: isMobile ? 'auto' : '100vh'
      }}
    >
      {isMobile ? (
        // Mobile Version
        <div style={{ padding: '60px 20px' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              textAlign: 'center',
              marginBottom: '60px'
            }}
          >
            <h2 style={{ 
              fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
              fontWeight: 700,
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
          </motion.div>

          <div style={{
            position: 'relative',
            maxWidth: '400px',
            margin: '0 auto'
          }}>

            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                style={{
                  position: 'relative',
                  marginBottom: index < steps.length - 1 ? '60px' : '0',
                  paddingLeft: '60px'
                }}
              >


                {/* Linha conectora apenas entre as bolinhas */}
                {index < steps.length - 1 && (
                  <div
                    style={{
                      position: 'absolute',
                      left: '20px',
                      top: '50%',
                      width: '2px',
                      height: 'calc(100% + 60px)',
                      background: 'rgba(111, 39, 139, 0.2)',
                      zIndex: 0
                    }}
                  >
                    <motion.div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: '#6F278B',
                        transformOrigin: 'top'
                      }}
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: false, amount: 0.2 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    />
                  </div>
                )}

                {/* Bolinha */}
                <motion.div
                  style={{
                    position: 'absolute',
                    left: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    background: '#000',
                    border: '2px solid #6F278B',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 2
                  }}
                  whileInView={{
                    scale: [1, 1.2, 1],
                    borderColor: ['#6F278B', '#ffffff', '#6F278B']
                  }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: '#6F278B'
                  }} />
                </motion.div>

                <motion.div
                  style={{
                    background: 'rgba(111, 39, 139, 0.05)',
                    border: '1px solid rgba(111, 39, 139, 0.2)',
                    borderRadius: '12px',
                    padding: '20px'
                  }}
                >
                  <div style={{
                    fontSize: '0.75rem',
                    fontWeight: '400',
                    color: '#9B4FBF',
                    fontFamily: 'Nugros, sans-serif',
                    marginBottom: '8px',
                    letterSpacing: '0.1em'
                  }}>
                    ETAPA {step.number}
                  </div>
                  
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: '500',
                    color: '#ffffff',
                    fontFamily: 'Nugros, sans-serif',
                    letterSpacing: '-0.02em',
                    lineHeight: '1.2'
                  }}>
                    {step.title}
                  </h3>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        // Desktop Version
        <>
          <div style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}>
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

            <div style={{
              position: 'absolute',
              top: '10%',
              textAlign: 'center',
              zIndex: 10
            }}>
              <motion.h2 style={{ 
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 700,
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
                {/* Step 1 */}
                <motion.div
                  style={{
                    width: '100vw',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: opacity1,
                    scale: scale1,
                    filter: blurFilter1
                  }}
                >
                  <div style={{
                    fontSize: '1.2rem',
                    fontWeight: '400',
                    color: '#9B4FBF',
                    fontFamily: 'Nugros, sans-serif',
                    marginBottom: '20px',
                    letterSpacing: '0.05em'
                  }}>
                    ETAPA 01
                  </div>
                  
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
                    Imersão e Planejamento
                  </h3>
                  
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
                    {steps[0].description}
                  </p>
                </motion.div>

                {/* Step 2 */}
                <motion.div
                  style={{
                    width: '100vw',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: opacity2,
                    scale: scale2,
                    filter: blurFilter2
                  }}
                >
                  <div style={{
                    fontSize: '1.2rem',
                    fontWeight: '400',
                    color: '#9B4FBF',
                    fontFamily: 'Nugros, sans-serif',
                    marginBottom: '20px',
                    letterSpacing: '0.05em'
                  }}>
                    ETAPA 02
                  </div>
                  
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
                    Design e Protótipo
                  </h3>
                  
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
                    {steps[1].description}
                  </p>
                </motion.div>

                {/* Step 3 */}
                <motion.div
                  style={{
                    width: '100vw',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: opacity3,
                    scale: scale3,
                    filter: blurFilter3
                  }}
                >
                  <div style={{
                    fontSize: '1.2rem',
                    fontWeight: '400',
                    color: '#9B4FBF',
                    fontFamily: 'Nugros, sans-serif',
                    marginBottom: '20px',
                    letterSpacing: '0.05em'
                  }}>
                    ETAPA 03
                  </div>
                  
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
                    Desenvolvimento
                  </h3>
                  
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
                    {steps[2].description}
                  </p>
                </motion.div>

                {/* Step 4 */}
                <motion.div
                  style={{
                    width: '100vw',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: opacity4,
                    scale: scale4,
                    filter: blurFilter4
                  }}
                >
                  <div style={{
                    fontSize: '1.2rem',
                    fontWeight: '400',
                    color: '#9B4FBF',
                    fontFamily: 'Nugros, sans-serif',
                    marginBottom: '20px',
                    letterSpacing: '0.05em'
                  }}>
                    ETAPA 04
                  </div>
                  
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
                    Entrega e Publicação
                  </h3>
                  
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
                    {steps[3].description}
                  </p>
                </motion.div>
              </div>
            </motion.div>

            <div style={{
              position: 'absolute',
              bottom: '15%',
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
                  scaleX: progressScaleX,
                  transformOrigin: 'left'
                }}
              />
            </div>
          </div>

          <div style={{ height: `${steps.length * 150}vh` }} />
        </>
      )}
    </section>
  )
}