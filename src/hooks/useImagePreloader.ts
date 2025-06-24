'use client'

import { useState, useEffect } from 'react'

interface UseImagePreloaderReturn {
  loaded: boolean
  error: boolean
  progress: number
}

export function useImagePreloader(src: string): UseImagePreloaderReturn {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!src) return

    // Criar nova imagem
    const img = new window.Image()
    
    // Simular progresso para melhor UX
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) return prev
        return prev + Math.random() * 15
      })
    }, 100)

    // Handlers
    const handleLoad = () => {
      clearInterval(progressInterval)
      setProgress(100)
      setTimeout(() => {
        setLoaded(true)
      }, 50)
    }

    const handleError = () => {
      clearInterval(progressInterval)
      setError(true)
      setLoaded(false)
    }

    // Configurar imagem
    img.onload = handleLoad
    img.onerror = handleError
    
    // Iniciar carregamento
    img.src = src

    // Cleanup
    return () => {
      clearInterval(progressInterval)
      img.onload = null
      img.onerror = null
    }
  }, [src])

  return { loaded, error, progress }
}

// Hook para pré-carregar múltiplas imagens
export function useMultipleImagePreloader(srcs: string[]): {
  allLoaded: boolean
  loadedCount: number
  totalCount: number
  errors: string[]
} {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set())
  const [errors, setErrors] = useState<string[]>([])

  useEffect(() => {
    if (!srcs.length) return

    const loadImage = (src: string) => {
      const img = new window.Image()
      
      img.onload = () => {
        setLoadedImages(prev => new Set(prev).add(src))
      }
      
      img.onerror = () => {
        setErrors(prev => [...prev, src])
      }
      
      img.src = src
    }

    // Carregar todas as imagens
    srcs.forEach(loadImage)
  }, [srcs])

  return {
    allLoaded: loadedImages.size === srcs.length,
    loadedCount: loadedImages.size,
    totalCount: srcs.length,
    errors
  }
}