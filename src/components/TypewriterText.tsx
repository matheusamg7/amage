'use client'

import React, { useState, useEffect } from 'react'

interface TypewriterTextProps {
  text: string
  isExiting?: boolean
  onExitComplete?: () => void
  className?: string
  style?: React.CSSProperties
}

const TypewriterText: React.FC<TypewriterTextProps> = ({ 
  text, 
  isExiting = false,
  onExitComplete,
  className = '',
  style = {}
}) => {
  const [displayText, setDisplayText] = useState('')
  const typeDelay = 60 // 60ms entre cada letra na digitação - mais rápido
  const backspaceDelay = 40 // 40ms entre cada letra no backspace - mais rápido
  
  useEffect(() => {
    let timer: NodeJS.Timeout
    
    if (!isExiting) {
      // Digitação
      let currentIndex = 0
      setDisplayText('')
      
      timer = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayText(text.slice(0, currentIndex + 1))
          currentIndex++
        } else {
          clearInterval(timer)
        }
      }, typeDelay)
    } else {
      // Backspace
      let currentLength = text.length
      
      timer = setInterval(() => {
        if (currentLength > 0) {
          setDisplayText(text.slice(0, currentLength - 1))
          currentLength--
        } else {
          clearInterval(timer)
          onExitComplete?.()
        }
      }, backspaceDelay)
    }
    
    return () => clearInterval(timer)
  }, [text, isExiting, onExitComplete])
  
  return (
    <span className={`inline-block ${className}`} style={style}>
      {displayText || '\u00A0'}
    </span>
  )
}

export default TypewriterText