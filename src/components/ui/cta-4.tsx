'use client'

import { motion } from 'framer-motion';

interface Cta4Props {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonUrl?: string;
  items?: string[];
}

export const Cta4 = ({
  title = "Call to Action",
  description = "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Architecto illo praesentium nisi, accusantium quae.",
  buttonText = "Get Started",
  buttonUrl = "#",
  items = [],
}: Cta4Props) => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  
  return (
    <section style={{ 
      padding: '20px 20px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Grid Background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(135deg, #6F278B 0%, #4a1a5c 100%)'
      }} />
      
      {/* Grid Pattern */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(0deg, rgba(255,255,255,0.15) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)
        `,
        backgroundSize: '80px 80px',
        backgroundPosition: '0 0',
        maskImage: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)',
        WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)'
      }} />
      
      {/* Gradient Overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at center, transparent 0%, rgba(74, 26, 92, 0.4) 100%)'
      }} />
      
      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ maxWidth: '1000px', width: '100%' }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              padding: isMobile ? '30px 20px' : '40px',
              gap: '8px',
              position: 'relative',
              zIndex: 1
            }}>
              <h4 style={{
                fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                fontWeight: 600,
                color: '#ffffff',
                marginBottom: '8px',
                fontFamily: 'Nugros, sans-serif',
                letterSpacing: '-0.03em',
                lineHeight: '1.2'
              }}>
                {title}
              </h4>
              <p style={{
                fontSize: 'clamp(1.2rem, 2vw, 1.5rem)',
                color: 'rgba(255, 255, 255, 0.9)',
                marginBottom: '24px',
                fontFamily: 'Nugros, sans-serif',
                lineHeight: '1.4',
                fontWeight: '300'
              }}>
                {description}
              </p>
              <motion.a
                href={buttonUrl}
                style={{
                  background: '#ffffff',
                  color: '#6F278B',
                  border: 'none',
                  padding: '14px 40px',
                  fontSize: '1rem',
                  fontWeight: '500',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  fontFamily: 'Nugros, sans-serif',
                  letterSpacing: '0.02em',
                  transition: 'all 0.3s ease',
                  display: 'inline-flex',
                  alignItems: 'center',
                  textDecoration: 'none'
                }}
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
                }}
                whileTap={{ scale: 0.98 }}
              >
                {buttonText}
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};