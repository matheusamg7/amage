'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { TrendingUp, Users, Clock, Globe, Shield, Target } from 'lucide-react'

const reasons = [
  {
    icon: Globe,
    title: "Presença Digital 24/7",
    description: "Seu negócio nunca fecha. Clientes podem te encontrar a qualquer hora, de qualquer lugar."
  },
  {
    icon: Users,
    title: "Credibilidade Instantânea",
    description: "93% dos consumidores julgam uma empresa pela qualidade do seu site. Primeira impressão importa."
  },
  {
    icon: TrendingUp,
    title: "Aumento de Vendas",
    description: "Sites profissionais convertem 5x mais visitantes em clientes. Cada visitante é uma oportunidade."
  },
  {
    icon: Target,
    title: "Marketing Eficiente",
    description: "Custo 62% menor que marketing tradicional. Resultados mensuráveis e campanhas direcionadas."
  },
  {
    icon: Shield,
    title: "Vantagem Competitiva",
    description: "46% das pequenas empresas não têm site. Destaque-se da concorrência agora."
  },
  {
    icon: Clock,
    title: "Economia de Tempo",
    description: "Automatize atendimentos, agendamentos e vendas. Mais tempo para focar no que importa."
  }
]

export default function WhyWebsite() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  return (
    <section 
      ref={containerRef}
      id="why-website"
      style={{
        background: '#ffffff',
        padding: '120px 20px',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Título e Introdução */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{
            textAlign: 'center',
            marginBottom: '80px'
          }}
        >
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 500,
            marginBottom: '24px',
            letterSpacing: '-0.03em',
            color: '#151515',
            fontFamily: 'Nugros, sans-serif',
          }}>
            Por que sua empresa <span style={{ color: '#6F278B' }}>precisa</span> de um site?
          </h2>
          
          <p style={{
            fontSize: 'clamp(1.2rem, 2vw, 1.5rem)',
            lineHeight: '1.6',
            color: '#555',
            fontWeight: 300,
            fontFamily: 'Nugros, sans-serif',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            Em um mundo onde <strong style={{ color: '#151515' }}>85% dos consumidores</strong> pesquisam online antes de comprar, 
            não ter um site é <strong style={{ color: '#151515' }}>perder vendas todos os dias</strong>.
          </p>
        </motion.div>

        {/* Grid de Razões */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '30px'
        }}>
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              whileHover={{ 
                y: -5,
                boxShadow: '0 20px 40px rgba(111, 39, 139, 0.1)',
                transition: { duration: 0.3 }
              }}
              style={{
                background: '#FAFAFA',
                borderRadius: '16px',
                padding: '40px',
                border: '1px solid rgba(111, 39, 139, 0.1)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Gradiente sutil */}
              <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '150px',
                height: '150px',
                background: 'radial-gradient(circle, rgba(111, 39, 139, 0.05) 0%, transparent 70%)',
                borderRadius: '50%',
                transform: 'translate(50%, -50%)'
              }} />
              
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, #6F278B 0%, #B794F4 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '24px',
                  position: 'relative',
                  zIndex: 1
                }}
              >
                <reason.icon size={28} color="#ffffff" strokeWidth={1.5} />
              </motion.div>
              
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 600,
                marginBottom: '12px',
                color: '#151515',
                fontFamily: 'Nugros, sans-serif',
                position: 'relative',
                zIndex: 1
              }}>
                {reason.title}
              </h3>
              
              <p style={{
                fontSize: '1rem',
                lineHeight: '1.7',
                color: '#666',
                fontWeight: 300,
                fontFamily: 'Nugros, sans-serif',
                position: 'relative',
                zIndex: 1
              }}>
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}