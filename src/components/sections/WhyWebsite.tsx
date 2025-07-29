'use client'

import dynamic from 'next/dynamic'

const WhatsAppWeb = dynamic(() => import('@/components/ui/whatsapp-web'), {
  ssr: false
})

export default function WhyWebsite() {
  return (
    <section 
      id="why-website"
      style={{
        width: 'calc(100% - 40px)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 20px',
        background: 'linear-gradient(180deg, #F7F7F8 0%, #E8E8EA 100%)',
        borderRadius: '24px',
        margin: '20px auto',
        overflow: 'hidden'
      }}
    >
      {/* Tablet Container */}
      <div style={{
        width: '100%',
        maxWidth: '1000px',
        aspectRatio: '16/10',
        position: 'relative',
        background: '#000',
        borderRadius: '20px',
        padding: '16px',
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