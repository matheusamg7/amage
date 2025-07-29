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
      position: 'relative',
      overflow: 'hidden',
      background: 'linear-gradient(135deg, #4A1960 0%, #6F278B 100%)',
      borderRadius: '24px',
      padding: '40px 20px'
    }}>
      
      {/* Noise texture overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.12,
        mixBlendMode: 'overlay',
        background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`
      }} />
      
      <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ maxWidth: '700px', width: '100%' }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              padding: isMobile ? '20px' : '20px 40px',
              gap: '8px',
              position: 'relative',
              zIndex: 1
            }}>
              <h2 style={{
                fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
                fontWeight: 600,
                color: '#ffffff',
                marginBottom: '16px',
                fontFamily: 'Nugros, sans-serif',
                letterSpacing: '-0.03em',
                lineHeight: '1.2'
              }}>
                {title}
              </h2>
              <p style={{
                fontSize: '1.1rem',
                color: 'rgba(255, 255, 255, 0.9)',
                marginBottom: '32px',
                fontFamily: 'Nugros, sans-serif',
                lineHeight: '1.4',
                fontWeight: 300
              }}>
                {description}
              </p>
              <motion.button
                onClick={() => window.location.href = buttonUrl}
                style={{
                  background: '#ffffff',
                  color: '#4A1960',
                  border: 'none',
                  padding: '14px 40px',
                  fontSize: '1rem',
                  fontWeight: 600,
                  borderRadius: '12px',
                  cursor: 'pointer',
                  fontFamily: 'Nugros, sans-serif',
                  letterSpacing: '0.02em',
                  display: 'inline-flex',
                  alignItems: 'center',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
                }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15)'
                }}
                whileTap={{ scale: 0.98 }}
              >
                {buttonText}
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};