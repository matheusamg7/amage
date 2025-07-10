'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import TextPressure from '@/blocks/TextAnimations/TextPressure/TextPressure'

// Variantes de animação
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.5, // Maior delay inicial
      duration: 0.6
    }
  }
}

const titleVariants = {
  hidden: { 
    opacity: 0, 
    y: 80,
    filter: "blur(20px)"
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1.4,
      ease: [0.19, 1, 0.22, 1],
      delay: 0.2 // Pequeno delay para título
    }
  }
}

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 100,
    scale: 0.85,
    filter: "blur(15px)",
    rotateX: -15
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    rotateX: 0,
    transition: {
      duration: 1.2,
      ease: [0.25, 0.46, 0.45, 0.94] // Easing mais suave
    }
  }
}

const includeContainerVariants = {
  hidden: { 
    opacity: 0,
    scale: 0.9,
    y: 60
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: [0.25, 0.46, 0.45, 0.94],
      staggerChildren: 0.1,
      delayChildren: 0.8 // Delay maior para aparecer depois dos cards
    }
  }
}

const includeItemVariants = {
  hidden: { 
    opacity: 0,
    scale: 0.7,
    y: 30,
    rotateY: -20
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    rotateY: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
}

export default function Expertise() {
  const ref = useRef(null)
  const titleRef = useRef(null)
  
  // Ajustando para a seção só animar quando estiver mais visível na tela
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-25%", // Só anima quando 25% da seção já estiver visível
    amount: 0.2 // Requer que 20% do elemento esteja visível
  })
  
  // Trigger separado para o título, para animar primeiro
  const isTitleInView = useInView(titleRef, {
    once: true,
    margin: "-20%",
    amount: 0.5
  })

  const services = [
    {
      title: "E-commerces",
      subtitle: "Lojas Virtuais que Vendem",
      description: "Plataforma completa para você vender online com segurança e escalar seu faturamento.",
      features: ["Checkout otimizado", "Gestão de produtos fácil"]
    },
    {
      title: "Sites Institucionais",
      subtitle: "Sites Institucionais Profissionais",
      description: "Sua empresa bem representada com um site que transmite credibilidade e gera negócios.",
      features: ["Design sob medida", "Conteúdo gerenciável", "Formulários inteligentes"]
    },
    {
      title: "Landing Pages",
      subtitle: "Landing Pages de Alta Conversão",
      description: "Páginas estratégicas para suas campanhas gerarem resultados extraordinários.",
      features: ["Foco total em conversão", "Integração com anúncios", "Testes A/B inclusos"]
    }
  ]

  const includes = [
    {
      title: "Design Exclusivo",
      description: "Nada de templates. Seu site único como seu negócio."
    },
    {
      title: "Performance Superior",
      description: "Carregamento ultra-rápido para não perder clientes."
    },
    {
      title: "100% Responsivo",
      description: "Perfeito em qualquer tela: celular, tablet ou desktop."
    },
    {
      title: "Otimizado para SEO",
      description: "Preparado para ranquear no Google desde o dia 1."
    },
    {
      title: "Painel Administrativo",
      description: "Você no controle: altere textos e imagens facilmente."
    },
    {
      title: "Suporte Humanizado",
      description: "Time sempre próximo, não é robô nem terceirizado."
    }
  ]

  return (
    <section id="expertise" ref={ref} className="min-h-screen flex flex-col items-center justify-start px-8 pt-8 pb-20">
      <div className="w-full max-w-7xl mx-auto">
        {/* Top Spacer */}
        <div className="h-8 md:h-12" />
        {/* Title */}
        <motion.div
          ref={titleRef}
          variants={titleVariants}
          initial="hidden"
          animate={isTitleInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold">
            <TextPressure 
              text="Especialistas Na Criação de:"
              className="text-white"
            />
          </h2>
        </motion.div>

        {/* Spacer */}
        <div className="h-8 md:h-12" />

        {/* Services Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          style={{ perspective: 1000 }}
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={cardVariants}
              whileHover={{
                scale: 1.02,
                y: -5,
                rotateY: 3,
                transition: {
                  type: "spring",
                  stiffness: 200,
                  damping: 20
                }
              }}
              className="relative group"
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
                initial={false}
              />
              <div className="relative bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-2xl p-8 group-hover:border-purple-500/50 transition-all duration-300">
                <h3 className="text-2xl font-bold text-white mb-2">{service.title}</h3>
                <h4 className="text-xl text-purple-400 mb-4">{service.subtitle}</h4>
                <p className="text-gray-400 mb-6">{service.description}</p>
                <motion.div 
                  className="space-y-2"
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.15,
                        delayChildren: 1.5 // Aparecer depois do card
                      }
                    }
                  }}
                >
                  {service.features.map((feature) => (
                    <motion.div 
                      key={feature} 
                      className="flex items-center gap-2"
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        visible: { 
                          opacity: 1, 
                          x: 0,
                          transition: { duration: 0.4 }
                        }
                      }}
                    >
                      <span className="text-green-400">✓</span>
                      <span className="text-gray-300">{feature}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Includes Section */}
        <motion.div
          variants={includeContainerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative overflow-hidden"
        >
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-blue-600/10 rounded-3xl blur-3xl"
            animate={{
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
          <div className="relative bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-3xl border border-purple-500/30 p-12 backdrop-blur-sm">
            <motion.h3 
              className="text-3xl font-bold text-white text-center mb-12"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { duration: 0.6, ease: [0.19, 1, 0.22, 1] }
                }
              }}
            >
              TODOS OS NOSSOS SITES INCLUEM:
            </motion.h3>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.05
                  }
                }
              }}
            >
              {includes.map((item) => (
                <motion.div
                  key={item.title}
                  variants={includeItemVariants}
                  whileHover={{ 
                    scale: 1.05,
                    transition: { type: "spring", stiffness: 400 }
                  }}
                  className="text-center group cursor-pointer"
                >
                  <motion.div
                    className="relative"
                    whileHover={{ y: -2 }}
                  >
                    <h4 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors duration-300">{item.title}</h4>
                    <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">{item.description}</p>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}