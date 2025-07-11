# Scroll Animations Guide

## Sticky Scroll Section Pattern

A seção Services implementa um padrão de **sticky scroll reveal** onde o conteúdo vai aparecendo progressivamente conforme o usuário faz scroll.

### Estrutura Básica

```tsx
// 1. Container principal com altura estendida
<section style={{ height: '400vh' }}> // Define o espaço de scroll

  // 2. Container sticky que fica fixo na viewport
  <div className="sticky-container" style={{ 
    position: 'sticky',
    top: 0,
    height: '100vh'
  }}>
    // Conteúdo vai aqui
  </div>
</section>
```

### Como Funciona

1. **Scroll Progress**: O `useScroll` do Framer Motion calcula o progresso do scroll de 0 a 1
2. **Transforms**: `useTransform` mapeia o progresso para valores de animação
3. **Motion Values**: São aplicadas diretamente como props nos elementos motion

### Exemplo de Implementação

```tsx
// Configurar o scroll tracking
const { scrollYProgress } = useScroll({
  target: containerRef,
  offset: ["start start", "end end"]
})

// Criar transforms para diferentes elementos
const titleOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1])
const titleY = useTransform(scrollYProgress, [0, 0.1], [100, 0])

// Aplicar nos elementos
<motion.h1
  style={{
    opacity: titleOpacity,  // ✅ Correto
    y: titleY              // ✅ Correto
  }}
>
```

### Timeline de Animações

Na seção Services, as animações acontecem nesta ordem:

- **0% - 10%**: Título aparece
- **15% - 25%**: Primeiro card
- **25% - 35%**: Segundo card  
- **35% - 45%**: Terceiro card
- **60% - 70%**: Seção de benefícios

### Dicas de Performance

1. Use `transform` e `opacity` (GPU accelerated)
2. Evite animar propriedades como `width`, `height`, `padding`
3. Use `will-change` com moderação
4. Para elementos pesados, considere `transform: translateZ(0)` para forçar GPU

### Problemas Comuns e Soluções

**Animações não funcionam:**
- Verifique se as motion values estão sendo aplicadas como props, não dentro de style
- Confirme que o offset está correto

**Performance ruim:**
- Reduza o número de elementos animados simultaneamente
- Use `throttle` ou `debounce` para eventos de scroll
- Desative animações complexas em mobile