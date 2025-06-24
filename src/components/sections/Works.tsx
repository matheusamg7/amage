'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import CardSwap, { Card } from '@/blocks/Components/CardSwap/CardSwap'

const projects = [
  {
    id: 1,
    title: "Tech Startup",
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    description: "Plataforma inovadora para gestão empresarial"
  },
  {
    id: 2,
    title: "E-commerce Fashion",
    category: "UI/UX Design",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
    description: "Redesign completo de loja virtual"
  },
  {
    id: 3,
    title: "Mobile Banking",
    category: "App Development",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop",
    description: "Aplicativo bancário com foco em UX"
  },
  {
    id: 4,
    title: "SaaS Dashboard",
    category: "Product Design",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    description: "Dashboard analítico para SaaS"
  }
]

export default function Works() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  const [dimensions, setDimensions] = useState({ width: 600, height: 400 })
  
  useEffect(() => {
    const updateDimensions = () => {
      if (window.innerWidth > 768) {
        setDimensions({ width: 600, height: 400 })
      } else {
        setDimensions({ width: 350, height: 250 })
      }
    }
    
    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  return (
    <section id="works" ref={ref} className="min-h-screen px-8 py-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            Nossos Trabalhos
          </h2>
          <p className="text-xl text-gray-400">Projetos que fazem a diferença</p>
        </motion.div>

        {/* Projects with CardSwap */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative h-[500px] sm:h-[600px] md:h-[700px] w-full max-w-full"
        >
          <CardSwap
            width={dimensions.width}
            height={dimensions.height}
            cardDistance={65}
            verticalDistance={40}
            delay={3000}
            pauseOnHover={false}
            skewAmount={4}
            easing="elastic"
          >
            {projects.map((project) => (
              <Card key={project.id} className="overflow-hidden bg-gray-900 border-gray-700">
                {/* Browser mockup */}
                <div className="h-full flex flex-col">
                  {/* Browser header */}
                  <div className="bg-gray-800 p-3 flex items-center gap-2 border-b border-gray-700">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="flex-1 bg-gray-900 rounded px-3 py-1 text-xs text-gray-400">
                      www.{project.title.toLowerCase().replace(/\s+/g, '-')}.com
                    </div>
                  </div>
                  
                  {/* Browser content */}
                  <div className="flex-1 relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    {/* Project info overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/70 to-transparent p-6">
                      <p className="text-[#00B4D8] text-xs mb-1">{project.category}</p>
                      <h3 className="text-xl font-bold mb-1">{project.title}</h3>
                      <p className="text-gray-300 text-xs">{project.description}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </CardSwap>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-16"
        >
          <button className="px-8 py-4 bg-[#6F278B] hover:bg-[#6F278B]/90 transition-colors duration-300 rounded-lg">
            VER TODOS OS PROJETOS
          </button>
        </motion.div>
      </div>
    </section>
  )
}