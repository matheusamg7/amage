'use client'

import { useState, useEffect } from 'react'
import Loader from '@/components/Loader'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Works from '@/components/sections/Works'
import Team from '@/components/sections/Team'
import Contact from '@/components/sections/Contact'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Previne scroll durante o loading
    if (isLoading) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isLoading])

  return (
    <>
      {isLoading && (
        <Loader onLoadComplete={() => setIsLoading(false)} />
      )}
      
      <main className="bg-black text-white">
        <Hero />
        <About />
        <Works />
        <Team />
        <Contact />
      </main>
    </>
  )
}