'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export default function Footer() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const socialLinks = [
    { name: 'WhatsApp', emoji: '📱', url: 'https://wa.me/5511999999999' },
    { name: 'Instagram', emoji: '📸', url: 'https://instagram.com/amage' },
    { name: 'Facebook', emoji: '👥', url: 'https://facebook.com/amage' },
    { name: 'YouTube', emoji: '📺', url: 'https://youtube.com/@amage' }
  ]

  return (
    <footer 
      ref={ref}
      style={{
        background: '#000000',
        padding: '48px 24px',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)'
      }}
    >
      <div style={{ 
        maxWidth: '1280px', 
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '32px'
      }}>
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#ffffff',
            letterSpacing: '-1px',
            display: 'flex',
            alignItems: 'center'
          }}>
            <span style={{ 
              display: 'inline-block',
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: '#6F278B',
              marginRight: '8px'
            }} />
            amage
          </div>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            display: 'flex',
            gap: '24px',
            alignItems: 'center'
          }}
        >
          {socialLinks.map((social, index) => (
            <motion.a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: '24px',
                textDecoration: 'none',
                display: 'inline-block',
                transition: 'transform 0.3s ease'
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
              whileHover={{ 
                scale: 1.2,
                rotate: [0, -10, 10, -10, 0]
              }}
              whileTap={{ scale: 0.9 }}
              title={social.name}
            >
              {social.emoji}
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* Copyright */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.4 }}
        style={{
          textAlign: 'center',
          marginTop: '32px',
          paddingTop: '24px',
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          color: 'rgba(255, 255, 255, 0.5)',
          fontSize: '14px'
        }}
      >
        © 2024 AMAGE. Todos os direitos reservados.
      </motion.div>
    </footer>
  )
}