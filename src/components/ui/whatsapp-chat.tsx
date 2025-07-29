'use client'

import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { Send, Check } from 'lucide-react'

interface Message {
  id: number
  text: string
  isUser: boolean
  time: string
  isTyping?: boolean
}

const messages = [
  {
    text: "Vou ser direto com você: enquanto você lê isso, alguém está procurando exatamente o que você vende.",
    delay: 1000
  },
  {
    text: "Mas adivinha quem eles vão encontrar? Não é você. 😕",
    delay: 3000
  },
  {
    text: "Sabe por quê? Porque no mundo de hoje, se você não está no Google, você simplesmente não existe. E olha que não estou exagerando - 97% dos consumidores procuram negócios locais online.",
    delay: 5000
  },
  {
    text: "Ter um site hoje não é mais sobre 'estar na internet'. É sobre:\n\n✅ Ser encontrado 24/7\n✅ Parecer profissional\n✅ Converter visitantes em clientes\n✅ Economizar tempo com automação\n✅ Competir de igual pra igual",
    delay: 9000
  },
  {
    text: "Quer saber como podemos ajudar seu negócio a crescer online? Digite 'quero um orçamento' abaixo 👇",
    delay: 13000
  }
]

export default function WhatsAppChat() {
  const [displayedMessages, setDisplayedMessages] = useState<Message[]>([])
  const [userInput, setUserInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [hasUserResponded, setHasUserResponded] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [displayedMessages])

  useEffect(() => {
    if (currentMessageIndex < messages.length && !hasUserResponded) {
      const timer = setTimeout(() => {
        setIsTyping(true)
        
        setTimeout(() => {
          const newMessage: Message = {
            id: Date.now(),
            text: messages[currentMessageIndex].text,
            isUser: false,
            time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
          }
          
          setDisplayedMessages(prev => [...prev, newMessage])
          setIsTyping(false)
          setCurrentMessageIndex(prev => prev + 1)
        }, 1500)
      }, messages[currentMessageIndex].delay)

      return () => clearTimeout(timer)
    }
  }, [currentMessageIndex, hasUserResponded])

  const handleSendMessage = () => {
    if (userInput.trim()) {
      const userMessage: Message = {
        id: Date.now(),
        text: userInput,
        isUser: true,
        time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      }
      
      setDisplayedMessages(prev => [...prev, userMessage])
      setHasUserResponded(true)
      
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
            setDisplayedMessages(prev => [...prev, responseMessage])
            setIsTyping(false)
            
            setTimeout(() => {
              window.open('https://wa.me/5554996299799?text=Olá! Quero fazer um orçamento para um site.', '_blank')
            }, 1500)
          }, 1500)
        }, 500)
      }
      
      setUserInput('')
    }
  }

  return (
    <div style={{
      width: '100%',
      maxWidth: '400px',
      height: '600px',
      background: '#e5ddd5',
      borderRadius: '12px',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
    }}>
      {/* Header */}
      <div style={{
        background: '#075e54',
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #6F278B 0%, #B794F4 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '18px',
          fontWeight: 'bold',
          color: 'white'
        }}>
          A
        </div>
        <div style={{ flex: 1 }}>
          <h4 style={{ 
            margin: 0, 
            fontSize: '16px', 
            fontWeight: 600, 
            color: 'white' 
          }}>
            AMAGE
          </h4>
          <p style={{ 
            margin: 0, 
            fontSize: '13px', 
            color: 'rgba(255,255,255,0.7)' 
          }}>
            online
          </p>
        </div>
      </div>

      {/* Messages */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='pattern' x='0' y='0' width='40' height='40' patternUnits='userSpaceOnUse'%3E%3Ccircle cx='20' cy='20' r='1' fill='%23ccc' opacity='0.3'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100' height='100' fill='url(%23pattern)'/%3E%3C/svg%3E")`
      }}>
        {displayedMessages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              display: 'flex',
              justifyContent: message.isUser ? 'flex-end' : 'flex-start',
              marginBottom: '4px'
            }}
          >
            <div style={{
              maxWidth: '70%',
              padding: '8px 12px',
              borderRadius: '7.5px',
              background: message.isUser ? '#dcf8c6' : 'white',
              boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
              position: 'relative'
            }}>
              <p style={{
                margin: 0,
                fontSize: '14px',
                color: '#303030',
                whiteSpace: 'pre-wrap',
                lineHeight: '1.4'
              }}>
                {message.text}
              </p>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                marginTop: '4px',
                justifyContent: 'flex-end'
              }}>
                <span style={{
                  fontSize: '11px',
                  color: '#667781'
                }}>
                  {message.time}
                </span>
                {message.isUser && (
                  <Check size={16} color="#53bdeb" />
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
              gap: '4px',
              padding: '8px 12px',
              background: 'white',
              borderRadius: '7.5px',
              width: 'fit-content',
              boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
            }}
          >
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#667781',
              animation: 'bounce 1.4s infinite',
              animationDelay: '0s'
            }} />
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#667781',
              animation: 'bounce 1.4s infinite',
              animationDelay: '0.2s'
            }} />
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#667781',
              animation: 'bounce 1.4s infinite',
              animationDelay: '0.4s'
            }} />
          </motion.div>
        )}
        
        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <div style={{
        padding: '10px',
        background: '#f0f0f0',
        display: 'flex',
        gap: '10px',
        alignItems: 'center'
      }}>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Digite uma mensagem"
          style={{
            flex: 1,
            padding: '10px 15px',
            borderRadius: '24px',
            border: 'none',
            background: 'white',
            fontSize: '14px',
            outline: 'none'
          }}
        />
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSendMessage}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: '#075e54',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <Send size={20} color="white" />
        </motion.button>
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