'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Loader from '@/components/Loader'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Works from '@/components/sections/Works'
import Contact from '@/components/sections/Contact'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Previne scroll durante o loading
    document.body.style.overflow = isLoading ? 'hidden' : 'unset'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isLoading])

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loader"
            exit={{ 
              x: "-100%",
              transition: {
                duration: 0.8,
                ease: [0.76, 0, 0.24, 1]
              }
            }}
          >
            <Loader onLoadComplete={() => setIsLoading(false)} />
          </motion.div>
        ) : (
          <motion.main 
            key="content"
            className="bg-black text-white"
            initial={{ 
              x: "100%"
            }}
            animate={{ 
              x: 0,
              transition: {
                duration: 0.8,
                ease: [0.76, 0, 0.24, 1]
              }
            }}
          >
            <Hero />
            <About />
            <Works />
            <Contact />
          </motion.main>
        )}
      </AnimatePresence>
    </>
  )
}