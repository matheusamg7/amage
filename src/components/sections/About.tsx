'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import TextPressure from '@/blocks/TextAnimations/TextPressure/TextPressure'

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="about" ref={ref} className="min-h-screen flex items-center justify-center px-8 py-20" style={{ 
      background: 'linear-gradient(to bottom, #F5F0F8, #FAF8FC)',
      position: 'relative',
      borderTopLeftRadius: '40px',
      borderTopRightRadius: '40px'
    }}>
    </section>
  )
}