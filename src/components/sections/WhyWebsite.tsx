'use client'

import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'

const WhatsAppWeb = dynamic(() => import('@/components/ui/whatsapp-web'), {
  ssr: false
})

export default function WhyWebsite() {
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  return (
    <section 
      id="why-website"
      style={{
        width: isMobile ? '100%' : 'calc(100% - 40px)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isMobile ? '40px 16px' : '80px 20px',
        background: 'linear-gradient(180deg, #F7F7F8 0%, #E8E8EA 100%)',
        borderRadius: isMobile ? '0' : '24px',
        margin: isMobile ? '0' : '20px auto',
        overflow: 'hidden'
      }}
    >
      {/* Tablet Container */}
      <div style={{
        width: '100%',
        maxWidth: isMobile ? '100%' : '1000px',
        aspectRatio: isMobile ? '9/16' : '16/10',
        position: 'relative',
        background: '#000',
        borderRadius: isMobile ? '12px' : '20px',
        padding: isMobile ? '8px' : '16px',
        boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.25), 0 18px 36px -18px rgba(0, 0, 0, 0.3)'
      }}>
        {/* Tablet Screen */}
        <div style={{
          width: '100%',
          height: '100%',
          background: '#111b21',
          borderRadius: '12px',
          overflow: 'hidden',
          position: 'relative'
        }}>
          <WhatsAppWeb />
        </div>
      </div>
    </section>
  )
}