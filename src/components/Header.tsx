'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion'
import StarBorder from '@/blocks/Animations/StarBorder/StarBorder'
import Link from 'next/link'
import { usePageTransition } from '@/contexts/PageTransitionContext'

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
  const { isTransitionComplete } = usePageTransition()
  
  const { scrollY } = useScroll()

  // Controla apenas o estado de scroll (não esconde mais)
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50)
  })

  // Detecta seção ativa
  useEffect(() => {
    // Se estiver no blog, marca blog como ativo
    if (window.location.pathname === '/blog') {
      setActiveSection('blog')
      return
    }
    
    const handleScroll = () => {
      const sections = navItems.map(item => item.href.replace('#', ''))
      const currentSection = sections.find(section => {
        if (section === 'blog') return false
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
    handleScroll() // Chama imediatamente
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    
    // Se for link externo (blog), navega normalmente
    if (href.startsWith('/') && !href.startsWith('/#')) {
      window.location.href = href
      return
    }
    
    // Se estiver em outra página e for uma âncora, volta para home
    if (window.location.pathname !== '/' && href.startsWith('#')) {
      // Se for #home, vai para a raiz limpa
      if (href === '#home') {
        window.location.href = '/'
      } else {
        window.location.href = '/' + href
      }
      return
    }
    
    // Se for âncora e estiver na home, faz scroll suave
    const targetId = href.replace('#', '')
    const element = document.getElementById(targetId)
    
    if (element) {
      const yOffset = -100
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  if (!isTransitionComplete) return null

  return (
    <motion.header
      className="fixed top-8 right-8 z-50"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ 
        duration: 0.4, 
        ease: [0.25, 0.1, 0.25, 1]
      }}
    >
      <nav className="pointer-events-auto">
        {/* Navigation items */}
        <ul className="flex flex-row items-center gap-6 font-mono tracking-wider">
              {navItems.map((item, index) => {
                const isActive = item.href === '/blog' 
                  ? activeSection === 'blog' 
                  : activeSection === item.href.replace('#', '')
                const isHovered = hoveredIndex === index
                
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      className="relative block px-3 py-2 text-sm font-medium transition-all duration-300 uppercase"
                    >
                      {/* Hover underline effect */}
                      <AnimatePresence>
                        {isHovered && (
                          <motion.div
                            className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-600 to-pink-600"
                            initial={{ scaleX: 0, opacity: 0 }}
                            animate={{ scaleX: 1, opacity: 1 }}
                            exit={{ scaleX: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            style={{ transformOrigin: 'right' }}
                          />
                        )}
                      </AnimatePresence>
                      
                      {/* Active indicator - small dot below */}
                      {isActive && (
                        <motion.div
                          className="absolute bottom-[-8px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
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
                      
                    </Link>
                  </li>
                )
              })}
            </ul>
      </nav>
    </motion.header>
  )
}