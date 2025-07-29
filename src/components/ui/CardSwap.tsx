'use client'

import React, { useEffect, useRef, Children, ReactElement } from 'react'
import gsap from 'gsap'
import './CardSwap.css'

interface CardSwapProps {
  children: React.ReactNode
  cardDistance?: number
  verticalDistance?: number
  delay?: number
  pauseOnHover?: boolean
}

interface CardProps {
  children: React.ReactNode
  style?: React.CSSProperties
}

export const Card: React.FC<CardProps> = ({ children, style }) => {
  return (
    <div className="card" style={style}>
      {children}
    </div>
  )
}

const CardSwap: React.FC<CardSwapProps> = ({
  children,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5000,
  pauseOnHover = false
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])
  const rotationAnim = useRef<gsap.core.Timeline | null>(null)
  const isPaused = useRef(false)

  useEffect(() => {
    const cardElements = cardsRef.current
    const numCards = cardElements.length

    if (numCards === 0) return

    // Initial positioning
    cardElements.forEach((card, index) => {
      const angle = (index / numCards) * 360
      const radian = (angle * Math.PI) / 180
      const x = Math.sin(radian) * cardDistance
      const z = Math.cos(radian) * cardDistance
      const y = index * verticalDistance

      gsap.set(card, {
        x: `calc(-50% + ${x}px)`,
        y: `calc(-50% - ${y}px)`,
        z: z,
        rotationY: -angle,
        transformOrigin: '50% 50%',
        force3D: true,
        willChange: 'transform'
      })
    })

    // Create rotation animation
    rotationAnim.current = gsap.timeline({ repeat: -1 })

    cardElements.forEach((_, index) => {
      rotationAnim.current?.add(() => {
        // Bring current card to front
        gsap.to(cardElements[index], {
          duration: 1,
          x: 'calc(-50% + 0px)',
          y: 'calc(-50% + 0px)',
          z: cardDistance,
          rotationY: 0,
          ease: 'power2.inOut',
          force3D: true
        })

        // Move other cards
        cardElements.forEach((card, otherIndex) => {
          if (otherIndex !== index) {
            const relativePos = (otherIndex - index + numCards) % numCards
            const angle = (relativePos / numCards) * 360
            const radian = (angle * Math.PI) / 180
            const x = Math.sin(radian) * cardDistance
            const z = Math.cos(radian) * cardDistance
            const y = relativePos * verticalDistance

            gsap.to(card, {
              duration: 1,
              x: `calc(-50% + ${x}px)`,
              y: `calc(-50% - ${y}px)`,
              z: z,
              rotationY: -angle,
              ease: 'power2.inOut',
              force3D: true
            })
          }
        })
      }, index === 0 ? 0 : `+=${delay / 1000}`)
    })

    // Add final delay
    rotationAnim.current.set({}, {}, `+=${delay / 1000}`)

    // Pause on hover functionality
    if (pauseOnHover && containerRef.current) {
      const handleMouseEnter = () => {
        if (rotationAnim.current && !isPaused.current) {
          rotationAnim.current.pause()
          isPaused.current = true
        }
      }

      const handleMouseLeave = () => {
        if (rotationAnim.current && isPaused.current) {
          rotationAnim.current.play()
          isPaused.current = false
        }
      }

      containerRef.current.addEventListener('mouseenter', handleMouseEnter)
      containerRef.current.addEventListener('mouseleave', handleMouseLeave)

      return () => {
        containerRef.current?.removeEventListener('mouseenter', handleMouseEnter)
        containerRef.current?.removeEventListener('mouseleave', handleMouseLeave)
        rotationAnim.current?.kill()
      }
    }

    return () => {
      rotationAnim.current?.kill()
    }
  }, [children, cardDistance, verticalDistance, delay, pauseOnHover])

  const childrenArray = Children.toArray(children) as ReactElement[]

  return (
    <div ref={containerRef} className="card-swap-container">
      {childrenArray.map((child, index) => (
        <div
          key={index}
          ref={(el) => {
            if (el) cardsRef.current[index] = el
          }}
          className="card"
        >
          {child.props.children}
        </div>
      ))}
    </div>
  )
}

export default CardSwap