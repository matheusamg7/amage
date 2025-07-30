'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { TestimonialsCarousel } from '@/components/TestimonialsCarousel'
import { Cta4 } from '@/components/ui/cta-4'

const testimonials = [
  {
    text: "A Amage transformou completamente nossa presença digital. O site ficou moderno, rápido e nossos clientes adoraram a nova experiência.",
    name: "Carlos Eduardo Silva",
    company: "TechSolutions Ltda"
  },
  {
    text: "Profissionais excepcionais! Entregaram um site que superou todas as nossas expectativas. O suporte pós-entrega também é incrível.",
    name: "Ana Paula Martins",
    company: "Boutique Elegance"
  },
  {
    text: "O processo foi extremamente ágil e organizado. Em poucas semanas tínhamos um site profissional que realmente representa nossa marca.",
    name: "Roberto Mendes",
    company: "Mendes Consultoria"
  },
  {
    text: "Investimento que valeu cada centavo. Nossas vendas online aumentaram 150% após o lançamento do novo site.",
    name: "Juliana Costa",
    company: "Natural Foods"
  },
  {
    text: "A equipe da Amage entendeu perfeitamente nossa visão e traduziu isso em um site impressionante. Recomendo fortemente!",
    name: "Pedro Henrique",
    company: "PH Arquitetura"
  },
  {
    text: "Comunicação clara, prazos cumpridos e resultado excepcional. É difícil encontrar profissionais assim no mercado.",
    name: "Mariana Oliveira",
    company: "Clínica Bem Estar"
  }
]

export default function Development() {
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

  return (
    <section 
      id="development" 
      ref={ref}
      style={{
        paddingTop: isMobile ? '60px' : '120px',
        paddingRight: '20px',
        paddingBottom: isMobile ? '60px' : '120px',
        paddingLeft: '20px',
        background: '#E3E3E5',
        borderTopLeftRadius: isMobile ? '20px' : '40px',
        borderTopRightRadius: isMobile ? '20px' : '40px',
        marginTop: isMobile ? '-20px' : '-40px',
        position: 'relative'
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Título */}
        <motion.div
          style={{
            textAlign: 'center',
            marginBottom: isMobile ? '40px' : '60px',
            marginTop: isMobile ? '-20px' : '-40px'
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 style={{
            fontSize: isMobile ? '1.75rem' : 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 700,
            marginBottom: '20px',
            letterSpacing: '-0.03em',
            color: '#151515',
            fontFamily: 'Nugros, sans-serif',
            lineHeight: '1.2'
          }}>
            {isMobile ? (
              <>
                O que nossos<br />
                <span style={{ color: '#6F278B' }}>clientes dizem</span>
              </>
            ) : (
              <>
                O que nossos <span style={{ color: '#6F278B' }}>clientes dizem</span>
              </>
            )}
          </h2>
          
        </motion.div>
        
        {/* Testimonials Carousel */}
        <motion.div
          style={{
            marginTop: isMobile ? '40px' : '80px',
            marginBottom: isMobile ? '60px' : '120px'
          }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <TestimonialsCarousel testimonials={testimonials} duration={15} />
        </motion.div>
        
        {/* CTA Emocional */}
        <motion.div
          style={{
            marginTop: isMobile ? '60px' : '120px'
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <div style={{
            borderRadius: '20px',
            overflow: 'hidden'
          }}>
            <Cta4 
              title="Seu próximo cliente está te procurando online."
              description="Vamos garantir que ele te encontre?"
              buttonText="Solicitar orçamento"
              buttonUrl="#contact"
              items={[]}
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}