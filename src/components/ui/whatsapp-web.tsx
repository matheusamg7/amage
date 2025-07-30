'use client'

import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { Send } from 'lucide-react'

interface Message {
  id: number
  text: string
  isUser: boolean
  time: string
  status?: 'sent' | 'delivered' | 'read'
}

const initialMessages = [
  {
    text: "**Vou ser direto com você:** enquanto você lê isso, alguém está procurando exatamente o que você vende.",
    delay: 100
  },
  {
    text: "Mas adivinha quem eles vão encontrar? **Não é você.** 😕",
    delay: 2000
  },
  {
    text: "Sabe por quê? Porque no mundo de hoje, se você não está no Google, **você simplesmente não existe.**",
    delay: 3500
  },
  {
    text: "97% dos consumidores procuram negócios locais online. **Noventa e sete por cento!**",
    delay: 5000
  },
  {
    text: "Ter um site hoje não é mais sobre 'estar na internet'. É sobre:\n\n💰 Faturar enquanto você dorme;\n🎯 Ser a primeira opção do cliente;\n🚀 Automatizar vendas e agendamentos;\n📱 Atender clientes 24 horas por dia;\n🏆 Deixar a concorrência para trás.",
    delay: 6500
  },
  {
    text: "Quer saber como podemos ajudar seu negócio a crescer online? **Digite 'quero um orçamento' abaixo** 👇",
    delay: 8500
  }
]

export default function WhatsAppWeb() {
  const [messages, setMessages] = useState<Message[]>([])
  const [userInput, setUserInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const [isInputEnabled, setIsInputEnabled] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Scroll para a última mensagem quando uma nova mensagem aparecer
  useEffect(() => {
    if (chatEndRef.current && chatEndRef.current.parentElement) {
      const chatContainer = chatEndRef.current.parentElement.parentElement
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight
      }
    }
  }, [messages])
  
  // Detectar mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Detectar quando a seção está visível
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true)
          setIsTyping(true)
        }
      },
      { threshold: 0.5 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [hasStarted])

  // Simular mensagens chegando
  useEffect(() => {
    if (hasStarted && currentMessageIndex < initialMessages.length) {
      const timer = setTimeout(() => {
        setIsTyping(true)
        
        setTimeout(() => {
          const newMessage: Message = {
            id: Date.now(),
            text: initialMessages[currentMessageIndex].text,
            isUser: false,
            time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
          }
          
          setMessages(prev => [...prev, newMessage])
          setCurrentMessageIndex(prev => prev + 1)
          
          // Manter o typing indicator se ainda houver mais mensagens
          if (currentMessageIndex >= initialMessages.length - 1) {
            setIsTyping(false)
            setIsInputEnabled(true)
          }
        }, 2000)
      }, initialMessages[currentMessageIndex].delay)

      return () => clearTimeout(timer)
    }
  }, [currentMessageIndex, hasStarted])

  const handleSendMessage = () => {
    if (userInput.trim()) {
      const userMessage: Message = {
        id: Date.now(),
        text: userInput,
        isUser: true,
        time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        status: 'read'
      }
      
      setMessages(prev => [...prev, userMessage])
      
      if (userInput.toLowerCase().includes('orçamento') || userInput.toLowerCase().includes('orcamento')) {
        setTimeout(() => {
          setIsTyping(true)
          setTimeout(() => {
            const responseMessage: Message = {
              id: Date.now() + 1,
              text: "Perfeito! 🎉 Vou te redirecionar para nosso WhatsApp oficial para conversarmos melhor sobre seu projeto.",
              isUser: false,
              time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
            }
            setMessages(prev => [...prev, responseMessage])
            setIsTyping(false)
            
            setTimeout(() => {
              window.open('https://wa.me/5554996299799?text=Olá! Quero fazer um orçamento para um site.', '_blank')
            }, 1500)
          }, 1000)
        }, 500)
      }
      
      setUserInput('')
    }
  }

  return (
    <div ref={containerRef} style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      background: '#111b21',
      overflow: 'hidden',
      position: 'absolute',
      top: 0,
      left: 0
    }}>
      {/* Sidebar */}
      {!isMobile && (
      <div style={{
        width: '30%',
        minWidth: '340px',
        background: '#111b21',
        borderRight: '1px solid #222e35',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Sidebar Header */}
        <div style={{
          background: '#202c33',
          padding: '10px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '59px'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: '#6a7175',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <svg width="28" height="28" viewBox="0 0 212 212" fill="#cfd0d1">
              <path d="M106.251,0.5C164.653,0.5,212,47.846,212,106.25S164.653,212,106.25,212C47.846,212,0.5,164.654,0.5,106.25 S47.846,0.5,106.251,0.5z M106.251,120.119c44.361,0,72,20.883,72,48.779c0,13.955-10.562,26.322-25.254,26.322H59.254 C44.562,195.22,34,182.974,34,169.019C34,141.001,61.891,120.119,106.251,120.119z M106.251,33.5 c-20.484,0-37.104,16.621-37.104,37.105s16.621,37.105,37.104,37.105c20.486,0,37.106-16.621,37.106-37.105 S126.738,33.5,106.251,33.5z"/>
            </svg>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#aebac1">
                <path d="M12 20.664a9.163 9.163 0 0 1-6.521-2.702.977.977 0 0 1 1.381-1.381 7.269 7.269 0 0 0 10.024.244.977.977 0 0 1 1.313 1.445A9.192 9.192 0 0 1 12 20.664zm7.965-6.112a.977.977 0 0 1-.944-1.218 7.26 7.26 0 0 0-4.8-8.804.977.977 0 0 1 .594-1.86 9.212 9.212 0 0 1 6.092 11.169.976.976 0 0 1-.942.713zm-16.025-.39a.977.977 0 0 1-.953-.769 9.21 9.21 0 0 1 6.626-10.86.975.975 0 1 1 .52 1.882A7.259 7.259 0 0 0 4.91 13.089a.977.977 0 0 1-.97 1.073z"/>
              </svg>
            </button>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#aebac1">
                <path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
              </svg>
            </button>
          </div>
        </div>


        {/* Chats List */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            padding: '12px 16px',
            background: '#202c33',
            cursor: 'pointer',
            borderBottom: '1px solid #222e35'
          }}>
            <div style={{
              width: '49px',
              height: '49px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #6F278B 0%, #B794F4 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '15px',
              overflow: 'hidden'
            }}>
              <img 
                src="/logos/Logo zap.png" 
                alt="Amage Web"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                <h4 style={{ margin: 0, fontSize: '17px', fontWeight: 400, color: '#e9edef' }}>
                  Amage Web
                </h4>
                <span style={{ fontSize: '12px', color: '#8696a0' }}>
                  {new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#53bdeb">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                <p style={{ margin: 0, fontSize: '14px', color: isTyping ? '#25d366' : '#8696a0' }}>
                  {isTyping ? 'digitando...' : 'Clique para conversar'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}

      {/* Chat Area */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        background: '#0b141a',
        height: '100%',
        overflow: 'hidden'
      }}>
        {/* Chat Header */}
        <div style={{
          background: '#202c33',
          padding: '10px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '59px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #6F278B 0%, #B794F4 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '15px',
              overflow: 'hidden'
            }}>
              <img 
                src="/logos/Logo zap.png" 
                alt="Amage Web"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>
            <div>
              <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 400, color: '#e9edef' }}>
                Amage Web
              </h4>
              <p style={{ margin: 0, fontSize: '13px', color: '#8696a0' }}>
                online
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#8696a0">
              <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
            </button>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#8696a0">
                <path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          background: '#0b141a',
          position: 'relative',
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='pattern' x='0' y='0' width='40' height='40' patternUnits='userSpaceOnUse'%3E%3Ccircle cx='20' cy='20' r='0.5' fill='%23182229' opacity='0.5'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100' height='100' fill='url(%23pattern)'/%3E%3C/svg%3E")`,
          backgroundSize: '100px 100px',
          height: 'calc(100% - 59px - 60px)'
        }}>
          <div style={{ 
            minHeight: '100%', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'flex-end', 
            padding: isMobile ? '10px 20px' : '20px 60px'
          }}>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  display: 'flex',
                  justifyContent: message.isUser ? 'flex-end' : 'flex-start',
                  marginBottom: '8px'
                }}
              >
                <div style={{
                  maxWidth: '65%',
                  padding: '6px 9px 8px 9px',
                  borderRadius: message.isUser ? '7.5px 7.5px 0 7.5px' : '7.5px 7.5px 7.5px 0',
                  background: message.isUser ? '#005c4b' : '#202c33',
                  position: 'relative'
                }}>
                  <p style={{
                    margin: 0,
                    fontSize: isMobile ? '15px' : '17px',
                    color: '#ffffff',
                    whiteSpace: 'pre-wrap',
                    lineHeight: '22px',
                    fontWeight: 400
                  }} dangerouslySetInnerHTML={{ 
                    __html: message.text
                      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                  }} />
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    marginTop: '3px',
                    float: 'right',
                    marginLeft: '10px'
                  }}>
                    <span style={{
                      fontSize: '11px',
                      color: '#8696a0'
                    }}>
                      {message.time}
                    </span>
                    {message.isUser && message.status === 'read' && (
                      <div style={{ display: 'flex' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="#53bdeb" style={{ marginRight: '-8px' }}>
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                        </svg>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="#53bdeb">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
            
            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '6px 9px 8px 9px',
                  background: '#202c33',
                  borderRadius: '7.5px 7.5px 7.5px 0',
                  width: 'fit-content',
                  marginBottom: '8px'
                }}
              >
                <div style={{ display: 'flex', gap: '4px' }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: '#8696a0',
                    animation: 'bounce 1.4s infinite',
                    animationDelay: '0s'
                  }} />
                  <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: '#8696a0',
                    animation: 'bounce 1.4s infinite',
                    animationDelay: '0.2s'
                  }} />
                  <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: '#8696a0',
                    animation: 'bounce 1.4s infinite',
                    animationDelay: '0.4s'
                  }} />
                </div>
              </motion.div>
            )}
            
            <div ref={chatEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div style={{
          padding: '5px 10px',
          background: '#202c33',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="#8696a0">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm4 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM12 9.5c2.33 0 4.32 1.45 5.12 3.5h-1.67c-.7-1.19-1.97-2-3.45-2s-2.75.81-3.45 2H6.88C7.68 10.95 9.67 9.5 12 9.5z"/>
            </svg>
          </button>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="#8696a0" style={{ transform: 'rotate(45deg)' }}>
              <path d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5a2.5 2.5 0 0 1 5 0v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5a2.5 2.5 0 0 0 5 0V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z"/>
            </svg>
          </button>
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && isInputEnabled && handleSendMessage()}
            placeholder={isInputEnabled ? "Digite uma mensagem" : "Aguarde..."}
            disabled={!isInputEnabled}
            style={{
              flex: 1,
              padding: '9px 12px',
              borderRadius: '8px',
              border: 'none',
              background: '#2a3942',
              fontSize: '15px',
              outline: 'none',
              color: '#e9edef',
              opacity: isInputEnabled ? 1 : 0.5,
              cursor: isInputEnabled ? 'text' : 'not-allowed'
            }}
          />
          {userInput ? (
            <button 
              onClick={handleSendMessage}
              disabled={!isInputEnabled}
              style={{ 
                background: 'none', 
                border: 'none', 
                cursor: isInputEnabled ? 'pointer' : 'not-allowed', 
                padding: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: isInputEnabled ? 1 : 0.5
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#8696a0">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
              </svg>
            </button>
          ) : (
            <button 
              onClick={handleSendMessage}
              disabled={!isInputEnabled}
              style={{ 
                background: 'none', 
                border: 'none', 
                cursor: isInputEnabled ? 'pointer' : 'not-allowed', 
                padding: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: isInputEnabled ? 1 : 0.5
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#8696a0">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
              </svg>
            </button>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes bounce {
          0%, 60%, 100% {
            transform: translateY(0);
          }
          30% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  )
}