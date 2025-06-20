'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import ScrollFloat from '@/blocks/TextAnimations/ScrollFloat/ScrollFloat'
import ProfileCard from '@/blocks/Components/ProfileCard/ProfileCard'

const teamMembers = [
  {
    id: 1,
    name: "João Silva",
    title: "CEO & Founder",
    handle: "joaosilva",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop",
    status: "Liderando inovação"
  },
  {
    id: 2,
    name: "Maria Santos",
    title: "Creative Director",
    handle: "mariasantos",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=800&fit=crop",
    status: "Criando experiências"
  },
  {
    id: 3,
    name: "Pedro Costa",
    title: "Tech Lead",
    handle: "pedrocosta",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&h=800&fit=crop",
    status: "Desenvolvendo soluções"
  },
  {
    id: 4,
    name: "Ana Oliveira",
    title: "Marketing Head",
    handle: "anaoliveira",
    avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&h=800&fit=crop",
    status: "Estratégia digital"
  }
]

export default function Team() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="min-h-screen px-8 py-20 bg-gray-900/50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <ScrollFloat containerClassName="text-5xl md:text-6xl font-bold mb-4">
            Nossa Equipe
          </ScrollFloat>
          <p className="text-xl text-gray-400">Talentos que fazem acontecer</p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 justify-items-center">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="w-full max-w-sm"
            >
              <ProfileCard
                avatarUrl={member.avatarUrl}
                name={member.name}
                title={member.title}
                handle={member.handle}
                status={member.status}
                contactText="Conectar"
                showUserInfo={true}
                enableTilt={true}
                onContactClick={() => console.log(`Contacting ${member.name}`)}
              />
            </motion.div>
          ))}
        </div>

        {/* Team culture */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 text-center max-w-3xl mx-auto"
        >
          <p className="text-lg text-gray-300">
            Nossa equipe é formada por profissionais apaixonados por tecnologia e inovação. 
            Juntos, criamos soluções que transformam negócios e impactam positivamente a vida das pessoas.
          </p>
        </motion.div>
      </div>
    </section>
  )
}