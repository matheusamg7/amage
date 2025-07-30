'use client'

import { motion, useAnimationControls, useMotionValue, animate } from 'framer-motion'
import React, { useState, useEffect, useRef } from 'react'

interface Testimonial {
  text: string
  name: string
  company: string
}

interface TestimonialsCarouselProps {
  testimonials: Testimonial[]
  duration?: number
}

export const TestimonialsCarousel = ({ testimonials, duration = 30 }: TestimonialsCarouselProps) => {
  const controls = useAnimationControls()
  const [isPaused, setIsPaused] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const [currentIndex, setCurrentIndex] = useState(0)
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const cardWidth = isMobile ? window.innerWidth - 60 : 200 // Largura do card = largura da tela - padding
  const gap = isMobile ? 20 : 12
  const totalWidth = (cardWidth + gap) * testimonials.length

  const handleDragEnd = (event: any, info: any) => {
    const offset = info.offset.x
    const velocity = info.velocity.x
    
    let newIndex = currentIndex
    
    if (offset < -100 || velocity < -500) {
      newIndex = Math.min(currentIndex + 1, testimonials.length - 1)
    } else if (offset > 100 || velocity > 500) {
      newIndex = Math.max(currentIndex - 1, 0)
    }
    
    setCurrentIndex(newIndex)
    animate(x, -newIndex * (cardWidth + gap), {
      type: "spring",
      stiffness: 300,
      damping: 30
    })
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    animate(x, -index * (cardWidth + gap), {
      type: "spring",
      stiffness: 300,
      damping: 30
    })
  }

  const handlePauseToggle = () => {
    if (isPaused) {
      controls.start({
        x: ['0%', '-50%'],
        transition: {
          duration: duration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop"
        }
      })
    } else {
      controls.stop()
    }
    setIsPaused(!isPaused)
  }

  useEffect(() => {
    if (!isMobile && !isPaused) {
      controls.start({
        x: ['0%', '-50%'],
        transition: {
          duration: duration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop"
        }
      })
    }
  }, [controls, duration, isMobile, isPaused])

  // Desktop version - carousel contínuo original
  if (!isMobile) {
    return (
      <div style={{
        width: '100%',
        overflow: 'hidden',
        maskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)',
        cursor: 'pointer'
      }}
      onClick={handlePauseToggle}
      >
        <motion.div
          animate={controls}
          style={{
            display: 'flex',
            gap: '30px'
          }}
        >
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <motion.div
              key={index}
              style={{
                minWidth: '400px',
                maxWidth: '400px',
                padding: '30px',
                borderRadius: '16px',
                border: '1px solid rgba(111, 39, 139, 0.2)',
                background: 'rgba(255, 255, 255, 0.02)',
                boxShadow: isMobile ? '0 4px 12px rgba(0, 0, 0, 0.1)' : '0 10px 30px rgba(111, 39, 139, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '240px',
                flexShrink: 0
              }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <p style={{
                fontSize: '1.1rem',
                lineHeight: '1.7',
                color: '#666',
                fontFamily: 'Nugros, sans-serif',
                fontWeight: 400,
                flexGrow: 1
              }}>
                "{testimonial.text}"
              </p>
              
              <div style={{
                marginTop: '30px'
              }}>
                <div style={{
                  fontSize: '1rem',
                  fontWeight: '500',
                  color: '#151515',
                  fontFamily: 'Nugros, sans-serif',
                  marginBottom: '4px'
                }}>
                  {testimonial.name}
                </div>
                <div style={{
                  fontSize: '0.9rem',
                  color: '#6F278B',
                  fontFamily: 'Nugros, sans-serif',
                  fontWeight: '400'
                }}>
                  {testimonial.company}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    )
  }

  // Mobile version - com drag e indicadores
  return (
    <div style={{ position: 'relative' }}>
      <div style={{
        width: '100%',
        overflow: 'hidden',
        cursor: 'grab',
        padding: '0 10px'
      }}>
        <motion.div
          drag="x"
          dragConstraints={{ left: -(testimonials.length - 1) * (cardWidth + gap), right: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
          style={{
            display: 'flex',
            gap: `${gap}px`,
            x
          }}
          whileDrag={{ cursor: 'grabbing' }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              style={{
                minWidth: `${cardWidth}px`,
                maxWidth: `${cardWidth}px`,
                padding: '24px',
                borderRadius: '16px',
                border: '1px solid rgba(111, 39, 139, 0.2)',
                background: 'rgba(255, 255, 255, 0.02)',
                boxShadow: isMobile ? '0 4px 12px rgba(0, 0, 0, 0.1)' : '0 10px 30px rgba(111, 39, 139, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '220px',
                flexShrink: 0
              }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <p style={{
                fontSize: '0.95rem',
                lineHeight: '1.6',
                color: '#666',
                fontFamily: 'Nugros, sans-serif',
                fontWeight: 400,
                flexGrow: 1
              }}>
                "{testimonial.text}"
              </p>
              
              <div style={{
                marginTop: '20px'
              }}>
                <div style={{
                  fontSize: '0.95rem',
                  fontWeight: '500',
                  color: '#151515',
                  fontFamily: 'Nugros, sans-serif',
                  marginBottom: '4px'
                }}>
                  {testimonial.name}
                </div>
                <div style={{
                  fontSize: '0.85rem',
                  color: '#6F278B',
                  fontFamily: 'Nugros, sans-serif',
                  fontWeight: '400'
                }}>
                  {testimonial.company}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Indicadores - apenas no mobile */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '8px',
        marginTop: '30px'
      }}>
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            style={{
              width: currentIndex === index ? '24px' : '8px',
              height: '8px',
              borderRadius: '4px',
              border: 'none',
              background: currentIndex === index ? '#6F278B' : 'rgba(111, 39, 139, 0.3)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              padding: 0
            }}
          />
        ))}
      </div>
    </div>
  )