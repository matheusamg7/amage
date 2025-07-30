'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function Footer() {
  const [isMobile, setIsMobile] = useState(true)
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  const navLinks = [
    { name: 'Início', href: '#hero' },
    { name: 'Serviços', href: '#services' },
    { name: 'Sobre', href: '#about' },
    { name: 'Processo', href: '#processo' }
  ]

  const socialLinks = [
    { 
      name: 'Instagram', 
      href: 'https://instagram.com/amage',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
        </svg>
      )
    },
    { 
      name: 'WhatsApp', 
      href: 'https://wa.me/5511999999999',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      )
    },
    { 
      name: 'Facebook', 
      href: 'https://facebook.com/amage',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      )
    },
    { 
      name: 'YouTube', 
      href: 'https://youtube.com/@amage',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      )
    }
  ]

  return (
    <footer style={{ position: 'relative', marginTop: '-100px', zIndex: 10 }}>
      {/* Wave Divider - Novo formato */}
      <div style={{ 
        position: 'absolute',
        top: isMobile ? '-60px' : '-120px',
        left: 0,
        right: 0,
        height: isMobile ? '60px' : '120px',
        overflow: 'hidden'
      }}>
        <svg 
          viewBox="0 0 1440 120" 
          preserveAspectRatio="none"
          style={{ 
            position: 'absolute',
            bottom: 0,
            width: '100%',
            height: '100%'
          }}
        >
          {isMobile ? (
            <path 
              d="M0,120 L0,90 C240,70 480,70 720,90 C960,110 1200,110 1440,90 L1440,120 Z" 
              fill="#000000"
            />
          ) : (
            <path 
              d="M0,120 L0,60 C360,90 720,30 1080,60 C1260,75 1440,90 1440,90 L1440,120 Z" 
              fill="#000000"
            />
          )}
        </svg>
      </div>

      {/* Footer Content */}
      <div style={{
        background: '#000000',
        padding: isMobile ? '60px 20px 20px 20px' : '80px 20px 20px 20px',
        position: 'relative'
      }}>
        <div style={{ 
          maxWidth: '1400px',
          margin: '0 auto',
          display: isMobile ? 'flex' : 'grid',
          flexDirection: isMobile ? 'column' : undefined,
          gridTemplateColumns: isMobile ? undefined : '300px 1fr 320px',
          gap: isMobile ? '40px' : '60px',
          alignItems: isMobile ? 'center' : 'start'
        }}>
          {/* Logo Section */}
          <motion.div
            initial={{ opacity: 0, x: isMobile ? 0 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ 
              display: 'flex',
              flexDirection: 'column',
              alignItems: isMobile ? 'center' : 'flex-start',
              width: isMobile ? '100%' : 'auto'
            }}
          >
            <Image
              src="/logos/logoWhite.svg"
              alt="AMAGE"
              width={isMobile ? 150 : 200}
              height={isMobile ? 38 : 50}
              style={{ marginBottom: '20px' }}
            />
            
            {/* Divider */}
            <motion.div 
              style={{
                width: '120px',
                height: '1px',
                background: 'linear-gradient(to right, transparent, rgba(255, 255, 255, 0.1), transparent)',
                marginBottom: isMobile ? '20px' : '30px',
                marginLeft: isMobile ? 'auto' : '0',
                marginRight: isMobile ? 'auto' : 'auto'
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            />
            
            {/* Social Icons */}
            <div style={{ 
              display: 'flex',
              gap: isMobile ? '20px' : '25px',
              justifyContent: isMobile ? 'center' : 'flex-start'
            }}>
              <motion.a
                href="https://instagram.com/amage"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#E4405F',
                  textDecoration: 'none'
                }}
                whileHover={{ scale: 1.1, rotate: 8 }}
                transition={{ duration: 0.15 }}
              >
                <svg width={isMobile ? "24" : "28"} height={isMobile ? "24" : "28"} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/>
                </svg>
              </motion.a>
              
              <motion.a
                href="https://wa.me/5511999999999"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#25D366',
                  textDecoration: 'none'
                }}
                whileHover={{ scale: 1.1, rotate: 8 }}
                transition={{ duration: 0.15 }}
              >
                <svg width={isMobile ? "24" : "28"} height={isMobile ? "24" : "28"} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </motion.a>
              
              <motion.a
                href="https://facebook.com/amage"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#1877F2',
                  textDecoration: 'none'
                }}
                whileHover={{ scale: 1.1, rotate: 8 }}
                transition={{ duration: 0.15 }}
              >
                <svg width={isMobile ? "24" : "28"} height={isMobile ? "24" : "28"} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </motion.a>
              
              <motion.a
                href="https://youtube.com/@amage"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#FF0000',
                  textDecoration: 'none'
                }}
                whileHover={{ scale: 1.1, rotate: 8 }}
                transition={{ duration: 0.15 }}
              >
                <svg width={isMobile ? "24" : "28"} height={isMobile ? "24" : "28"} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </motion.a>
            </div>
          </motion.div>

          {/* Navigation Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ 
              display: 'flex',
              gap: isMobile ? '60px' : '60px',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'flex-start',
              width: isMobile ? '100%' : 'auto'
            }}
          >
            <div style={{ textAlign: isMobile ? 'center' : 'left' }}>
              <h3 style={{
                fontSize: isMobile ? '1rem' : '1.1rem',
                fontWeight: '600',
                color: '#ffffff',
                marginBottom: '20px',
                fontFamily: 'Nugros, sans-serif',
                letterSpacing: '0.05em'
              }}>
                NAVEGAÇÃO
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    style={{
                      color: 'rgba(255, 255, 255, 0.5)',
                      textDecoration: 'none',
                      fontSize: isMobile ? '0.9rem' : '1rem',
                      fontWeight: '400',
                      fontFamily: 'Nugros, sans-serif',
                      transition: 'color 0.3s ease',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#ffffff'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'rgba(255, 255, 255, 0.5)'
                    }}
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
            
            <div style={{ textAlign: isMobile ? 'center' : 'left' }}>
              <h3 style={{
                fontSize: isMobile ? '1rem' : '1.1rem',
                fontWeight: '600',
                color: '#ffffff',
                marginBottom: '20px',
                fontFamily: 'Nugros, sans-serif',
                letterSpacing: '0.05em'
              }}>
                SERVIÇOS
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <span style={{
                  color: 'rgba(255, 255, 255, 0.5)',
                  fontSize: isMobile ? '0.9rem' : '1rem',
                  fontFamily: 'Nugros, sans-serif'
                }}>
                  Landing Pages
                </span>
                <span style={{
                  color: 'rgba(255, 255, 255, 0.5)',
                  fontSize: isMobile ? '0.9rem' : '1rem',
                  fontFamily: 'Nugros, sans-serif'
                }}>
                  Sites Institucionais
                </span>
                <span style={{
                  color: 'rgba(255, 255, 255, 0.5)',
                  fontSize: isMobile ? '0.9rem' : '1rem',
                  fontFamily: 'Nugros, sans-serif'
                }}>
                  Aplicações Web
                </span>
              </div>
            </div>
          </motion.div>

          {/* Contact & Social */}
          <motion.div
            initial={{ opacity: 0, x: isMobile ? 0 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ 
              width: isMobile ? '100%' : 'auto',
              textAlign: isMobile ? 'center' : 'left'
            }}
          >
            <h3 style={{
              fontSize: isMobile ? '1rem' : '1.1rem',
              fontWeight: '600',
              color: '#ffffff',
              marginBottom: '20px',
              fontFamily: 'Nugros, sans-serif',
              letterSpacing: '0.05em'
            }}>
              CONTATO
            </h3>
            
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '8px', 
              marginBottom: '20px',
              alignItems: isMobile ? 'center' : 'flex-start'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: isMobile ? 'center' : 'flex-start' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#6F278B">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                <a 
                  href="https://wa.me/5554996299799"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: isMobile ? '0.9rem' : '1rem',
                    color: 'rgba(255, 255, 255, 0.6)',
                    fontFamily: 'Nugros, sans-serif',
                    textDecoration: 'none',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#ffffff'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)'
                  }}
                >
                  +55 54 9962-9799
                </a>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: isMobile ? 'center' : 'flex-start' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#6F278B">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                <span style={{
                  fontSize: isMobile ? '0.9rem' : '1rem',
                  color: 'rgba(255, 255, 255, 0.6)',
                  fontFamily: 'Nugros, sans-serif'
                }}>
                  contato@amageweb.com
                </span>
              </div>
              
              <div style={{
                fontSize: isMobile ? '0.9rem' : '1rem',
                color: 'rgba(255, 255, 255, 0.6)',
                fontFamily: 'Nugros, sans-serif',
                marginTop: '12px',
                textAlign: isMobile ? 'center' : 'left'
              }}>
                60.135.968/0001-57
              </div>
            </div>
            
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div 
          style={{
            height: '1px',
            background: 'linear-gradient(to right, transparent, rgba(255, 255, 255, 0.1), transparent)',
            margin: isMobile ? '30px 0 20px 0' : '40px 0 20px 0'
          }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        />
        
        {/* Copyright */}
        <div style={{
          textAlign: 'center'
        }}>
          <p style={{
            fontSize: isMobile ? '0.85rem' : '0.95rem',
            color: 'rgba(255, 255, 255, 0.3)',
            fontFamily: 'Nugros, sans-serif'
          }}>
            © 2024 Amage Tecnologia e Desenvolvimento. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}