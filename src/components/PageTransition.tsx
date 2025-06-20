'use client'

import { motion } from 'framer-motion'

interface PageTransitionProps {
  children: React.ReactNode
}

export default function PageTransition({ children }: PageTransitionProps) {
  return (
    <>
      {/* Cortina de transição */}
      <motion.div
        className="fixed inset-0 z-50 bg-[#6F278B]"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 0 }}
        exit={{ 
          scaleX: 1,
          transition: {
            duration: 0.5,
            ease: [0.76, 0, 0.24, 1]
          }
        }}
        style={{ transformOrigin: 'left' }}
      />
      
      <motion.div
        className="fixed inset-0 z-50 bg-black"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 0 }}
        exit={{ 
          scaleX: 1,
          transition: {
            duration: 0.5,
            delay: 0.1,
            ease: [0.76, 0, 0.24, 1]
          }
        }}
        style={{ transformOrigin: 'left' }}
      />

      {children}
    </>
  )
}