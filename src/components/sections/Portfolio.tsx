'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'

export default function Portfolio() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Projetos em destaque primeiro, depois os demais
  const projects = [
    { 
      id: 1, 
      name: 'Capital Million', 
      category: 'Plataforma de Investimentos',
      image: '/portfolios./million-site.png',
      url: 'https://capitalmillion.com',
      featured: true,
      description: 'Plataforma moderna para investimentos e educação financeira'
    },
    { 
      id: 2, 
      name: 'Lorena Jacob', 
      category: 'E-commerce & Terapia Infantil',
      image: '/portfolios./lorena-site.jpeg',
      url: 'https://lorenajacob.com.br',
      featured: true,
      description: 'Loja online e portal de serviços terapêuticos especializados'
    },
    { 
      id: 3, 
      name: 'DB Representações', 
      category: 'Site Institucional',
      image: '/portfolios./db-site.png',
      url: 'https://deboff.com.br',
      featured: true,
      description: 'Portal corporativo para empresa de representações comerciais'
    },
    { 
      id: 4, 
      name: 'Renata Volpatto', 
      category: 'Advocacia Especializada',
      image: '/portfolios./renata-site.png',
      url: 'https://www.renatavolpatto.com',
      featured: false,
      description: 'Site institucional para escritório de advocacia'
    },
    {
      id: 5,
      name: 'Em breve',
      category: 'Novo projeto',
      image: null,
      url: null,
      featured: false,
      description: 'Novo projeto em desenvolvimento'
    },
    {
      id: 6,
      name: 'Em breve',
      category: 'Novo projeto',
      image: null,
      url: null,
      featured: false,
      description: 'Novo projeto em desenvolvimento'
    }
  ]

  return (
    <section 
      id="portfolio" 
      ref={ref}
      style={{
        padding: isMobile ? '40px 20px 60px 20px' : '60px 20px 120px 20px',
        background: '#000000',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          {/* Título e subtítulo */}
          <motion.div
            style={{
              textAlign: 'center',
              marginBottom: isMobile ? '40px' : '80px'
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 style={{
              fontSize: isMobile ? '2rem' : 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 500,
              marginBottom: '20px',
              letterSpacing: '-0.03em',
              color: '#ffffff',
              fontFamily: 'Nugros, sans-serif',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: isMobile ? '5px' : '8px',
              flexDirection: isMobile ? 'column' : 'row'
            }}>
              Portfólio 
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
                style={{
                  display: 'inline-block',
                  marginTop: isMobile ? '0' : '8px',
                  cursor: 'pointer'
                }}
              >
                <Image 
                  src="/logos/logoWhite.svg"
                  alt="Amage"
                  width={isMobile ? 120 : 160}
                  height={isMobile ? 30 : 40}
                  style={{
                    opacity: 0.9,
                    display: 'block'
                  }}
                />
              </motion.div>
            </h2>
            
          </motion.div>

          {/* Grid de projetos */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: isMobile ? '20px' : '24px',
            maxWidth: '1200px',
            marginTop: '0',
            marginRight: 'auto',
            marginBottom: isMobile ? '60px' : '100px',
            marginLeft: 'auto'
          }}>
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  border: 'none',
                  cursor: 'pointer',
                  position: 'relative'
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                onClick={() => project.url && window.open(project.url, '_blank')}
              >
                {/* Imagem do projeto - tela completa */}
                <div style={{
                  width: '100%',
                  height: isMobile ? '180px' : '200px',
                  position: 'relative',
                  overflow: 'hidden',
                  background: project.image ? '#000' : 'linear-gradient(135deg, rgba(111, 39, 139, 0.1), rgba(111, 39, 139, 0.05))'
                }}>
                  {project.image ? (
                    <>
                      <Image
                        src={project.image}
                        alt={project.name}
                        fill
                        style={{
                          objectFit: 'cover',
                          objectPosition: 'top center'
                        }}
                      />
                      
                      {/* Overlay on hover */}
                      <motion.div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background: 'rgba(111, 39, 139, 0.85)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          opacity: 0
                        }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          color: '#fff',
                          fontSize: '1rem',
                          fontWeight: '600',
                          fontFamily: 'Nugros, sans-serif'
                        }}>
                          <span>Ver projeto</span>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M7 17L17 7M17 7H7M17 7V17" />
                          </svg>
                        </div>
                      </motion.div>
                    </>
                  ) : (
                    <div style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px'
                    }}>
                      <div style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        background: 'rgba(111, 39, 139, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6F278B" strokeWidth="2">
                          <path d="M12 5v14M5 12h14" />
                        </svg>
                      </div>
                      <span style={{
                        color: 'rgba(255, 255, 255, 0.5)',
                        fontSize: '0.9rem',
                        fontFamily: 'Nugros, sans-serif'
                      }}>
                        Em breve
                      </span>
                    </div>
                  )}
                </div>
                
                {/* Informações do projeto */}
                <div style={{
                  padding: '16px 20px',
                  background: 'rgba(255, 255, 255, 0.02)'
                }}>
                  <h3 style={{
                    color: '#fff',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    marginBottom: '4px',
                    fontFamily: 'Nugros, sans-serif'
                  }}>
                    {project.name}
                  </h3>
                  <p style={{
                    color: '#6F278B',
                    fontSize: '0.85rem',
                    fontWeight: '400',
                    fontFamily: 'Nugros, sans-serif',
                    letterSpacing: '0.02em'
                  }}>
                    {project.category}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* CTA Button */}
          <motion.div
            style={{
              textAlign: 'center',
              marginTop: isMobile ? '40px' : '0'
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
            >
              Quero ver meu site aqui
            </motion.button>
          </motion.div>
        </div>
      </section>
  )
}