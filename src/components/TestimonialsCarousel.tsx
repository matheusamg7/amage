'use client'

import { motion } from 'framer-motion'
import React from 'react'

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
  return (
    <div style={{
      width: '100%',
      overflow: 'hidden',
      maskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)'
    }}>
      <motion.div
        animate={{
          x: ['0%', '-50%']
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop"
        }}
        style={{
          display: 'flex',
          gap: '30px'
        }}
      >
        {/* Duplicar os testimonials para criar loop infinito */}
        {[...testimonials, ...testimonials].map((testimonial, index) => (
          <div
            key={index}
            style={{
              minWidth: '400px',
              padding: '40px',
              borderRadius: '16px',
              border: '1px solid rgba(111, 39, 139, 0.2)',
              background: 'rgba(255, 255, 255, 0.02)',
              boxShadow: '0 10px 30px rgba(111, 39, 139, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '280px'
            }}
          >
            <p style={{
              fontSize: '1.1rem',
              lineHeight: '1.7',
              color: '#666',
              fontFamily: 'Nugros, sans-serif',
              fontWeight: 300,
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
          </div>
        ))}
      </motion.div>
    </div>
  )
}