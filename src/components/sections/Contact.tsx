'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  return (
    <section ref={ref} className="min-h-screen px-8 py-20 flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left side - Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              Vamos criar algo
              <span className="text-[#6F278B]"> incrível</span> juntos
            </h2>
            
            <p className="text-lg text-gray-400 mb-8">
              Tem um projeto em mente? Adoraríamos ouvir sobre ele. 
              Entre em contato e vamos transformar suas ideias em realidade.
            </p>

            <div className="space-y-6">
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

              <div>
                <h3 className="text-sm text-gray-500 uppercase tracking-wider mb-2">Social</h3>
                <div className="flex gap-4">
                  {['Instagram', 'LinkedIn', 'Behance'].map((social) => (
                    <motion.a
                      key={social}
                      href="#"
                      whileHover={{ scale: 1.1 }}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {social}
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right side - Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Nome</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-gray-900/50 border border-gray-800 rounded-lg px-4 py-3 focus:outline-none focus:border-[#6F278B] transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-gray-900/50 border border-gray-800 rounded-lg px-4 py-3 focus:outline-none focus:border-[#6F278B] transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Mensagem</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={6}
                  className="w-full bg-gray-900/50 border border-gray-800 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-600 transition-colors resize-none"
                  required
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-[#6F278B] hover:bg-[#6F278B]/90 transition-colors duration-300 rounded-lg py-4 font-medium"
              >
                Enviar Mensagem
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 pt-8 border-t border-gray-800 text-center text-gray-500"
        >
          <p>© 2024 AMAGE. Todos os direitos reservados.</p>
        </motion.div>
      </div>
    </section>
  )
}