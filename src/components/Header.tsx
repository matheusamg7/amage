'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion'
import StarBorder from '@/blocks/Animations/StarBorder/StarBorder'
import Link from 'next/link'

interface NavItem {
  label: string
  href: string
}

const navItems: NavItem[] = [
  { label: 'Início', href: '#home' },
  { label: 'Sobre', href: '#about' },
  { label: 'Trabalhos', href: '#works' },
  { label: 'Equipe', href: '#team' },
  { label: 'Contato', href: '#contact' },
  { label: 'Blog', href: '/blog' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [activeSection, setActiveSection] = useState('home')
  
  const { scrollY } = useScroll()

  // Controla apenas o estado de scroll (não esconde mais)
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50)
  })

  // Detecta seção ativa
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.href.replace('#', ''))
      const currentSection = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      
      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    
    // Se for link externo (blog), navega normalmente
    if (href.startsWith('/')) {
      window.location.href = href
      return
    }
    
    // Se for âncora, faz scroll suave
    const targetId = href.replace('#', '')
    const element = document.getElementById(targetId)
    
    if (element) {
      const yOffset = -100
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 pointer-events-none"
      initial={{ y: 0 }}
      animate={{ y: 0 }}
    >
      <div className="flex justify-center px-6 py-8">
          <StarBorder
            as="nav"
            color="magenta"
            speed="4s"
            thickness={2}
            className="pointer-events-auto"
          >
            <div className="relative">
            {/* Background blur effect */}
            <motion.div
              className="absolute inset-0 backdrop-blur-md bg-black/40 rounded-[20px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: isScrolled ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />
            
            {/* Navigation items */}
            <ul className="relative flex items-center gap-2 px-6 py-1">
              {navItems.map((item, index) => {
                const isActive = activeSection === item.href.replace('#', '')
                const isHovered = hoveredIndex === index
                
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      className="relative block px-6 py-3 text-base font-medium transition-all duration-300"
                    >
                      {/* Hover background */}
                      <AnimatePresence>
                        {isHovered && (
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg backdrop-blur-sm"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.2 }}
                            layoutId="hoverBackground"
                          />
                        )}
                      </AnimatePresence>
                      
                      {/* Active indicator */}
                      {isActive && (
                        <motion.div
                          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full"
                          style={{ backgroundColor: 'magenta' }}
                          layoutId="activeIndicator"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                      
                      {/* Text with hover effect */}
                      <motion.span
                        className="relative z-10"
                        animate={{
                          color: isActive ? '#FF00FF' : isHovered ? '#E952E9' : '#FFFFFF',
                          y: isHovered ? -1 : 0,
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.label}
                      </motion.span>
                      
                      {/* Glow effect on hover */}
                      <AnimatePresence>
                        {isHovered && (
                          <motion.div
                            className="absolute inset-0 opacity-50"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            style={{
                              background: 'radial-gradient(circle at center, magenta 0%, transparent 70%)',
                              filter: 'blur(20px)',
                            }}
                          />
                        )}
                      </AnimatePresence>
                    </Link>
                  </li>
                )
              })}
            </ul>
            
            {/* Ambient glow */}
            <motion.div
              className="absolute -inset-4 opacity-30 pointer-events-none"
              animate={{
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                background: 'radial-gradient(circle at center, magenta 0%, transparent 50%)',
                filter: 'blur(40px)',
              }}
            />
          </div>
          </StarBorder>
      </div>
      
      {/* Progress bar */}
      <motion.div
        className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-magenta to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isScrolled ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        style={{ transformOrigin: 'left' }}
      />
    </motion.header>
  )
}