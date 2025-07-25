'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useEffect } from 'react'
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
  const textRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "start 0.3"]
  })

  useEffect(() => {
    if (textRef.current) {
      const text = textRef.current
      let textContent = text.textContent || ''
      
      // Replace Google with colored version
      textContent = textContent.replace('Google', 'GOOGLE_PLACEHOLDER')
      
      // Split text by paragraphs first
      const paragraphs = textContent.split('\n').filter(p => p.trim())
      
      let wordIndex = 0
      text.innerHTML = paragraphs.map((paragraph, pIndex) => {
        const words = paragraph.trim().split(' ')
        
        const wrappedWords = words.map((word) => {
          const currentIndex = wordIndex++
          let content = word
          
          // Handle Google coloring
          if (word === 'GOOGLE_PLACEHOLDER') {
            content = '<span style="font-weight: 600;"><span style="color: #4285F4;">G</span><span style="color: #EA4335;">o</span><span style="color: #FBBC05;">o</span><span style="color: #4285F4;">g</span><span style="color: #34A853;">l</span><span style="color: #EA4335;">e</span></span>'
          }
          // Highlight specific phrases
          else if (word === '93%' || word === 'das' || word === 'experiências' || word === 'online') {
            content = `<strong style="color: #6F278B; font-weight: 700;">${word}</strong>`
          }
          else if (word === '8.5' || word === 'bilhões') {
            content = `<strong style="color: #6F278B; font-weight: 700;">${word}</strong>`
          }
          else if (word === 'você' || word === 'existe,' || word === 'mas' || word === 'ninguém' || word === 'te' || word === 'vê.') {
            content = `<strong style="color: #6F278B; font-weight: 700;">${word}</strong>`
          }
          
          return `<span class="word-scroll" data-index="${currentIndex}" style="display: inline-block; opacity: 0.1; filter: blur(3px); transition: none;">${content}</span>`
        }).join(' ')
        
        return pIndex === 0 ? wrappedWords : `<br><br>${wrappedWords}`
      }).join('')
    }
  }, [])
  
  useEffect(() => {
    if (!textRef.current) return
    
    const words = textRef.current.querySelectorAll('.word-scroll')
    const totalWords = words.length
    
    return scrollYProgress.on('change', (latest) => {
      // Make animation complete much faster
      const adjustedProgress = Math.max(0, Math.min(1, latest * 2.5))
      
      words.forEach((word, index) => {
        const wordProgress = (adjustedProgress * totalWords - index) / 1.5
        const opacity = Math.max(0.1, Math.min(1, wordProgress))
        const blur = Math.max(0, 3 - wordProgress * 3)
        
        word.style.opacity = opacity.toString()
        word.style.filter = `blur(${blur}px)`
        word.style.transition = 'opacity 0.2s ease, filter 0.2s ease'
      })
    })
  }, [scrollYProgress])

  return (
    <section 
      ref={containerRef}
      id="why-website"
      style={{
        background: '#ffffff',
        padding: '80px 20px 120px 20px',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Texto com animação customizada */}
        <div style={{ marginBottom: '100px', maxWidth: '1200px', paddingLeft: '20px' }}>
          <h2 
            ref={textRef}
            style={{
              fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
              lineHeight: '1.6',
              fontWeight: 400,
              color: '#151515',
              textAlign: 'left',
              fontFamily: 'Nugros, sans-serif',
              maxWidth: '1100px'
            }}
          >
            Em um mundo onde 93% das experiências online começam em um mecanismo de busca e o Google processa mais de 8.5 bilhões de pesquisas por dia, sua ausência digital é invisibilidade comercial. Cada pesquisa é uma oportunidade perdida, cada clique que vai para o concorrente é receita que escapa.
            
            Não ter um site profissional hoje é como ter uma loja sem vitrine em uma rua movimentada - você existe, mas ninguém te vê.
          </h2>
        </div>

        {/* Lista de Razões em Grid */}
        <div style={{ 
          maxWidth: '1100px', 
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '40px',
          padding: '0 20px'
        }}>
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 0.8, 
                delay: 0.1 * index,
                ease: [0.25, 0.1, 0.25, 1]
              }}
              style={{
                background: 'rgba(111, 39, 139, 0.03)',
                borderRadius: '20px',
                padding: '40px',
                border: '1px solid rgba(111, 39, 139, 0.1)',
                position: 'relative',
                transition: 'all 0.3s ease'
              }}
              whileHover={{ 
                scale: 1.02,
                boxShadow: '0 10px 40px rgba(111, 39, 139, 0.1)'
              }}
            >
              
              {/* Ícone */}
              <div style={{ marginBottom: '20px' }}>
                <motion.div
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #6F278B 0%, #B794F4 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 10px 30px rgba(111, 39, 139, 0.2)'
                  }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <reason.icon size={28} color="#ffffff" strokeWidth={2} />
                </motion.div>
              </div>
              
              {/* Conteúdo */}
              <div>
                <h3 style={{
                  fontSize: '1.4rem',
                  fontWeight: 600,
                  marginBottom: '12px',
                  color: '#151515',
                  fontFamily: 'Nugros, sans-serif'
                }}>
                  {reason.title}
                </h3>
                
                <p style={{
                  fontSize: '1rem',
                  lineHeight: '1.6',
                  color: '#666',
                  fontWeight: 300,
                  fontFamily: 'Nugros, sans-serif'
                }}>
                  {reason.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Frase de impacto final */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.5 }}
          style={{
            textAlign: 'center',
            marginTop: '80px',
            padding: '40px 20px',
            borderTop: '1px solid rgba(111, 39, 139, 0.1)'
          }}
        >
          <h3 style={{
            fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
            fontWeight: 500,
            color: '#151515',
            fontFamily: 'Nugros, sans-serif',
            marginBottom: '16px'
          }}>
            A pergunta não é <span style={{ color: '#6F278B' }}>se</span> você precisa de um site
          </h3>
          <p style={{
            fontSize: '1.2rem',
            color: '#666',
            fontFamily: 'Nugros, sans-serif',
            fontWeight: 300
          }}>
            É <strong style={{ color: '#151515' }}>quanto tempo</strong> você vai continuar perdendo clientes para quem já tem um.
          </p>
        </motion.div>

      </div>
    </section>
  )
}