'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

export default function Portfolio() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const projects = [
    { id: 1, name: 'Projeto 1', category: 'E-commerce' },
    { id: 2, name: 'Projeto 2', category: 'Institucional' },
    { id: 3, name: 'Projeto 3', category: 'Landing Page' },
    { id: 4, name: 'Projeto 4', category: 'E-commerce' },
    { id: 5, name: 'Projeto 5', category: 'Dashboard' },
    { id: 6, name: 'Projeto 6', category: 'Institucional' }
  ]

  return (
    <section 
      id="portfolio" 
      ref={ref}
      style={{
        padding: '120px 20px',
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
              marginBottom: '80px'
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 500,
              marginBottom: '20px',
              letterSpacing: '-0.03em',
              color: '#ffffff',
              fontFamily: 'Nugros, sans-serif'
            }}>
              Portfólio <span style={{ color: '#6F278B' }}>Amage</span>
            </h2>
            
            {/* Divisória minimalista */}
            <motion.div 
              style={{
                height: '1px',
                background: 'linear-gradient(to right, transparent, rgba(111, 39, 139, 0.3), transparent)',
                width: '300px',
                margin: '0 auto 20px auto'
              }}
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
            
            <p style={{
              fontSize: 'clamp(1rem, 1.5vw, 1.1rem)',
              lineHeight: '1.6',
              color: 'rgba(255, 255, 255, 0.6)',
              fontWeight: 300,
              fontFamily: 'Nugros, sans-serif',
              maxWidth: '800px',
              margin: '0 auto'
            }}>
              Veja na prática como transformamos ideias em sites que representam sua empresa com clareza, estratégia e identidade.
            </p>
          </motion.div>

          {/* Grid de projetos */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '30px',
            marginBottom: '80px'
          }}>
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '1px solid rgba(111, 39, 139, 0.2)',
                  cursor: 'pointer',
                  position: 'relative'
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                whileHover={{
                  scale: 1.02,
                  borderColor: 'rgba(111, 39, 139, 0.5)',
                  transition: { duration: 0.2 }
                }}
              >
                {/* Placeholder para imagem do projeto */}
                <div style={{
                  width: '100%',
                  height: '250px',
                  background: 'linear-gradient(135deg, rgba(111, 39, 139, 0.1), rgba(111, 39, 139, 0.05))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span style={{
                    color: 'rgba(255, 255, 255, 0.3)',
                    fontSize: '1rem',
                    fontFamily: 'Nugros, sans-serif'
                  }}>
                    {project.name}
                  </span>
                </div>
                
                {/* Categoria */}
                <div style={{
                  padding: '20px',
                  borderTop: '1px solid rgba(111, 39, 139, 0.1)'
                }}>
                  <p style={{
                    color: '#6F278B',
                    fontSize: '0.9rem',
                    fontWeight: '400',
                    fontFamily: 'Nugros, sans-serif',
                    letterSpacing: '0.05em'
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
              textAlign: 'center'
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
              Quero ver meu site aqui
            </motion.button>
          </motion.div>
        </div>
      </section>
  )
}