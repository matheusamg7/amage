'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export default function Logo() {
  const [isVisible, setIsVisible] = useState(false)
  const [hasLoadingFinished, setHasLoadingFinished] = useState(false)
  const { scrollY } = useScroll()

  // Verifica se o loading acabou observando mudanças no DOM
  useEffect(() => {
    const checkLoading = () => {
      // Verifica se o loader não está mais presente
      const loader = document.querySelector('[data-loader]')
      if (!loader && !hasLoadingFinished) {
        setHasLoadingFinished(true)
        setIsVisible(true)
      }
    }

    // Verifica inicialmente
    checkLoading()

    // Observa mudanças no DOM
    const observer = new MutationObserver(checkLoading)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => observer.disconnect()
  }, [hasLoadingFinished])

  // Detecta scroll e controla visibilidade do logo
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (hasLoadingFinished) {
      // Adiciona um pequeno threshold para evitar piscar
      if (latest > 60) {
        setIsVisible(false)
      } else if (latest < 40) {
        setIsVisible(true)
      }
    }
  })

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 100,
            damping: 20,
            opacity: { duration: 0.3 }
          }}
          className="fixed top-4 left-6 z-50"
        >
          <Link href="/">
            <Image
              src="/logos/logoWhite.svg"
              alt="AMAGE"
              width={100}
              height={32}
              className="h-8 w-auto"
            />
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  )
}