// Configurações centralizadas de animações

export const animationConfig = {
  // Loader
  loader: {
    duration: 3000, // Duração total do loader
    exitDuration: 600,
    exitEase: [0.43, 0.13, 0.23, 0.96] as const,
  },

  // Hero
  hero: {
    phases: {
      initialDelay: 300,
      loadingToBackground: 200,
      backgroundToNoise: 1500,
      noiseToInteractive: 800,
    },
    image: {
      fadeInDuration: 2.5,
      scaleDuration: 3,
      blurDuration: 2.5,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
      scaleEase: [0.25, 0.1, 0.25, 1] as const,
    },
    noise: {
      fadeInDuration: 2,
    },
    pixelTrail: {
      fadeInDuration: 1.5,
    }
  },

  // Page transitions
  page: {
    contentFadeIn: 1200,
    contentEase: [0.25, 0.1, 0.25, 1] as const,
    overlayDuration: 1000,
  }
}

// Utilitário para calcular delays cumulativos
export const calculateCumulativeDelay = (phases: number[]): number => {
  return phases.reduce((acc, phase) => acc + phase, 0)
}