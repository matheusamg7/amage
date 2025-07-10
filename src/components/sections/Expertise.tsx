'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import TextPressure from '@/blocks/TextAnimations/TextPressure/TextPressure'

export default function Expertise() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

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
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-2xl p-8 hover:border-purple-500/50 transition-all duration-300"
            >
              <h3 className="text-2xl font-bold text-white mb-2">{service.title}</h3>
              <h4 className="text-xl text-purple-400 mb-4">{service.subtitle}</h4>
              <p className="text-gray-400 mb-6">{service.description}</p>
              <div className="space-y-2">
                {service.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Includes Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-3xl border border-purple-500/30 p-12"
        >
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            TODOS OS NOSSOS SITES INCLUEM:
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {includes.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                className="text-center"
              >
                <h4 className="text-xl font-semibold text-white mb-2">{item.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}