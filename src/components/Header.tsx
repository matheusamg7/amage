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
  { label: 'Serviços', href: '#services' },
  { label: 'Sobre', href: '#about' },
  { label: 'Portfólio', href: '#portfolio' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [activeSection, setActiveSection] = useState('home')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDarkBackground, setIsDarkBackground] = useState(true)
  const { isTransitionComplete } = usePageTransition()
  
  const { scrollY } = useScroll()

  // Controla apenas o estado de scroll (não esconde mais)
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50)
  })

  // Detecta seção ativa e cor de fundo
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
      
      // Detecta se está em seção clara (about, faq, why-website)
      const lightSections = ['about', 'faq', 'why-website']
      const headerY = 50
      
      let isOnLightBg = false
      for (const sectionId of lightSections) {
        const element = document.getElementById(sectionId)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= headerY && rect.bottom >= headerY) {
            isOnLightBg = true
            break
          }
        }
      }
      
      setIsDarkBackground(!isOnLightBg)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Chama imediatamente
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Previne scroll quando menu mobile estiver aberto
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.top = `-${window.scrollY}px`
      document.body.style.width = '100%'
    } else {
      const scrollY = document.body.style.top
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1)
      }
    }

    // Cleanup quando componente desmontar
    return () => {
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
    }
  }, [isMobileMenuOpen])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    
    // Fecha o menu mobile se estiver aberto
    setIsMobileMenuOpen(false)
    
    
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
    <>
      <motion.header
        className="fixed top-8 right-10 z-50"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ 
          duration: 0.4, 
          ease: [0.25, 0.1, 0.25, 1]
        }}
      >
        <nav className="pointer-events-auto">
          {/* Desktop Navigation */}
          <ul className="hidden md:flex flex-row items-center gap-6 font-mono tracking-wider">
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
                    
                    
                    {/* Text with hover effect */}
                    <motion.span
                      className="relative z-10"
                      animate={{
                        color: isDarkBackground 
                          ? (isActive ? '#ffffff' : isHovered ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.8)')
                          : (isActive ? '#151515' : isHovered ? 'rgba(21, 21, 21, 0.9)' : 'rgba(21, 21, 21, 0.8)'),
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

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex flex-col items-center justify-center w-10 h-10 cursor-pointer gap-1"
            aria-label="Toggle mobile menu"
          >
            <motion.span
              className="w-5 h-0.5 rounded-full"
              style={{
                backgroundColor: isDarkBackground ? 'rgba(255, 255, 255, 0.8)' : 'rgba(21, 21, 21, 0.8)'
              }}
              animate={{
                rotate: isMobileMenuOpen ? 45 : 0,
                y: isMobileMenuOpen ? 6 : 0,
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            />
            <motion.span
              className="w-5 h-0.5 rounded-full"
              style={{
                backgroundColor: isDarkBackground ? 'rgba(255, 255, 255, 0.8)' : 'rgba(21, 21, 21, 0.8)'
              }}
              animate={{
                opacity: isMobileMenuOpen ? 0 : 1,
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            />
            <motion.span
              className="w-5 h-0.5 rounded-full"
              style={{
                backgroundColor: isDarkBackground ? 'rgba(255, 255, 255, 0.8)' : 'rgba(21, 21, 21, 0.8)'
              }}
              animate={{
                rotate: isMobileMenuOpen ? -45 : 0,
                y: isMobileMenuOpen ? -6 : 0,
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            />
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Menu Content */}
            <motion.div
              className="absolute top-0 right-0 h-full w-72 bg-black/95 backdrop-blur-md border-l border-white/10 overflow-hidden"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ 
                type: "spring", 
                stiffness: 400, 
                damping: 30 
              }}
            >
              {/* Animated Border Light */}
              <motion.div
                className="absolute left-0 top-0 w-0.5 h-20 bg-gradient-to-b from-transparent via-purple-400 to-transparent"
                animate={{
                  y: [0, 'calc(100vh - 80px)', 0],
                }}
                transition={{
                  duration: 3,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatDelay: 0.3,
                }}
              />
              <div className="flex flex-col items-center justify-center h-full space-y-8">
                {navItems.map((item, index) => {
                  const isActive = activeSection === item.href.replace('#', '')
                  
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        delay: index * 0.1,
                        duration: 0.5,
                        ease: "easeOut"
                      }}
                    >
                      <Link
                        href={item.href}
                        onClick={(e) => handleNavClick(e, item.href)}
                        className="relative block px-6 py-4 text-2xl font-medium transition-all duration-300 uppercase font-mono tracking-wider"
                      >
                        <motion.span
                          className="relative z-10"
                          animate={{
                            background: isActive ? 'linear-gradient(45deg, #9333ea, #ec4899)' : 'transparent',
                            backgroundClip: isActive ? 'text' : 'unset',
                            WebkitBackgroundClip: isActive ? 'text' : 'unset',
                            color: isActive ? 'transparent' : '#FFFFFF',
                          }}
                          transition={{ duration: 0.2 }}
                          whileHover={{ 
                            background: 'linear-gradient(45deg, #9333ea, #ec4899)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            color: 'transparent',
                            transition: { duration: 0.2 }
                          }}
                          style={{
                            background: isActive ? 'linear-gradient(45deg, #9333ea, #ec4899)' : 'transparent',
                            backgroundClip: isActive ? 'text' : 'unset',
                            WebkitBackgroundClip: isActive ? 'text' : 'unset',
                            color: isActive ? 'transparent' : '#FFFFFF',
                          }}
                        >
                          {item.label}
                        </motion.span>
                      </Link>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}