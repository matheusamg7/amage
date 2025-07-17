'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="contact" ref={ref} className="px-8 py-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Entre em Contato
          </h2>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
            <div>
              <h3 className="text-sm text-gray-500 uppercase tracking-wider mb-2">Email</h3>
              <a href="mailto:contato@amage.com" className="text-xl hover:text-[#00B4D8] transition-colors">
                contato@amage.com
              </a>
            </div>

            <div>
              <h3 className="text-sm text-gray-500 uppercase tracking-wider mb-2">Telefone</h3>
              <a href="tel:+5511999999999" className="text-xl hover:text-[#00B4D8] transition-colors">
                +55 11 99999-9999
              </a>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}