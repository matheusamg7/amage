'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

const faqs = [
  {
    question: "Vocês atendem empresas de qualquer cidade?",
    answer: "Sim. Atendemos 100% online e já desenvolvemos sites para empresas de diferentes regiões do país e até para cliente de fora do país."
  },
  {
    question: "Em quanto tempo o site fica pronto?",
    answer: "Sites simples podem ser entregues em até 15 dias, enquanto projetos mais completos levam no máximo 30 dias."
  },
  {
    question: "E se eu precisar de alguma alteração depois que o site ficar pronto?",
    answer: "Temos um plano de manutenção que garante suporte contínuo, ajustes sempre que necessário e atualizações para manter seu site sempre rápido, seguro e funcional."
  },
  {
    question: "O site vai aparecer no Google?",
    answer: "Sim. Todos os sites são entregues com estrutura otimizada para SEO, ajudando sua empresa a ser encontrada com mais facilidade nos buscadores."
  },
  {
    question: "Vocês criam o conteúdo do site também?",
    answer: "Sim. Ajudamos na criação de textos, estrutura e organização das informações para que o site comunique bem com o seu público, sem complicação."
  }
]

export default function FAQ() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [openIndex, setOpenIndex] = useState<number | null>(null)
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
      id="faq" 
      ref={ref}
      style={{
        paddingTop: '0px',
        paddingRight: '20px',
        paddingBottom: isMobile ? '180px' : '300px',
        paddingLeft: '20px',
        background: '#E3E3E5',
        position: 'relative'
      }}
    >
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* Título */}
        <motion.div
          style={{
            textAlign: 'center',
            marginBottom: isMobile ? '40px' : '60px'
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
            fontFamily: 'Nugros, sans-serif'
          }}>
            Dúvidas<span style={{ color: '#6F278B' }}>?</span>
          </h2>
          
          {/* Divisória minimalista */}
          <motion.div 
            style={{
              height: '1px',
              background: 'linear-gradient(to right, transparent, rgba(111, 39, 139, 0.3), transparent)',
              width: isMobile ? '200px' : '300px',
              margin: '0 auto 20px auto'
            }}
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          
        </motion.div>
        
        {/* FAQ Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              style={{
                background: '#ffffff',
                borderRadius: '16px',
                overflow: 'hidden',
                border: '1px solid rgba(111, 39, 139, 0.1)',
                cursor: 'pointer'
              }}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <div style={{
                padding: isMobile ? '20px' : '30px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <h3 style={{
                  fontSize: isMobile ? '1.1rem' : '1.2rem',
                  fontWeight: '500',
                  color: '#151515',
                  fontFamily: 'Nugros, sans-serif',
                  margin: 0
                }}>
                  {faq.question}
                </h3>
                
                <motion.div
                  animate={{ rotate: openIndex === index ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    fontSize: '1.5rem',
                    color: '#6F278B',
                    fontWeight: '300',
                    width: '30px',
                    height: '30px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  +
                </motion.div>
              </div>
              
              <motion.div
                initial={false}
                animate={{
                  height: openIndex === index ? 'auto' : 0,
                  opacity: openIndex === index ? 1 : 0
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                style={{ overflow: 'hidden' }}
              >
                <p style={{
                  padding: isMobile ? '0 20px 20px 20px' : '0 30px 30px 30px',
                  fontSize: isMobile ? '0.9rem' : '1rem',
                  lineHeight: '1.7',
                  color: '#666',
                  fontFamily: 'Nugros, sans-serif',
                  fontWeight: '300',
                  margin: 0
                }}>
                  {faq.answer}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}