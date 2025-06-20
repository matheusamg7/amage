# Implementação de Transições - AMAGE

## Visão Geral
Este documento detalha a implementação do sistema de transições entre o loader e o conteúdo principal do site AMAGE.

## Solução Final Implementada

### Estrutura Simples e Eficiente
```tsx
// page.tsx
const [isLoading, setIsLoading] = useState(true)

<AnimatePresence mode="wait">
  {isLoading ? (
    <motion.div exit={{ x: "-100%" }}>
      <Loader onLoadComplete={() => setIsLoading(false)} />
    </motion.div>
  ) : (
    <motion.main initial={{ x: "100%" }} animate={{ x: 0 }}>
      <Content />
    </motion.main>
  )}
</AnimatePresence>
```

### Por que funciona:
1. **Estado único** - Apenas `isLoading` controla toda a transição
2. **AnimatePresence mode="wait"** - Garante que um componente sai completamente antes do outro entrar
3. **Transições complementares** - Loader sai pela esquerda, conteúdo entra pela direita
4. **Timing sincronizado** - 0.8s com curva bezier [0.76, 0, 0.24, 1]

## Lições Aprendidas

### ❌ O que NÃO fazer:

1. **Múltiplos useEffects desnecessários**
   ```tsx
   // EVITAR
   useEffect(() => {
     if (percentage >= 100) {
       onLoadComplete()
     }
   }, [percentage])
   ```

2. **Estados redundantes**
   ```tsx
   // EVITAR
   const [isLoading, setIsLoading] = useState(true)
   const [showContent, setShowContent] = useState(false)
   ```

3. **Atualizar estado durante render**
   ```tsx
   // ERRO COMUM
   setPercentage(prev => {
     if (next >= 100) {
       onLoadComplete() // ❌ Não fazer isso!
     }
   })
   ```

4. **Delays e timeouts desnecessários**
   ```tsx
   // EVITAR
   setTimeout(() => {
     setIsLoading(false)
     setTimeout(() => {
       setShowContent(true)
     }, 600)
   }, 100)
   ```

### ✅ O que FAZER:

1. **Use requestAnimationFrame para sincronização**
   ```tsx
   if (next === 100 && prev < 100) {
     requestAnimationFrame(() => {
       onLoadComplete()
     })
   }
   ```

2. **Mantenha a lógica simples**
   - Um estado controla tudo
   - Transições declarativas com Framer Motion
   - Sem lógica complexa de sincronização

3. **Aproveite o AnimatePresence**
   - `mode="wait"` para transições sequenciais
   - `exit` animations para saídas suaves
   - `initial` e `animate` para entradas controladas

## Implementação do Loader

### Contagem de Porcentagem
```tsx
const timer = setInterval(() => {
  setPercentage(prev => {
    const next = Math.min(prev + increment, 100)
    
    if (next === 100 && prev < 100) {
      requestAnimationFrame(() => {
        onLoadComplete()
      })
    }
    
    return next
  })
}, interval)
```

### Por que funciona:
- `Math.min` garante que nunca passa de 100
- Verifica `prev < 100` para executar apenas uma vez
- `requestAnimationFrame` evita problemas de renderização

## Otimizações de Performance

### WebGL Context
1. **Tratamento de Context Lost**
   ```tsx
   const [contextLost, setContextLost] = useState(false)
   
   canvas.addEventListener('webglcontextlost', (e) => {
     e.preventDefault()
     setContextLost(true)
   })
   ```

2. **Configurações otimizadas**
   ```tsx
   gl={{ 
     antialias: false,
     preserveDrawingBuffer: false,
     powerPreference: "high-performance",
     failIfMajorPerformanceCaveat: false
   }}
   dpr={Math.min(window.devicePixelRatio, 2)}
   ```

### Prevenção de Scroll
```tsx
useEffect(() => {
  document.body.style.overflow = isLoading ? 'hidden' : 'unset'
  return () => {
    document.body.style.overflow = 'unset'
  }
}, [isLoading])
```

## Princípios de Design

1. **Simplicidade acima de tudo** - Menos estados, menos efeitos, menos complexidade
2. **Transições declarativas** - Use Framer Motion ao invés de manipular DOM
3. **Performance first** - Otimize WebGL, limite DPR, desabilite features desnecessárias
4. **Feedback imediato** - Transição começa exatamente em 100%, sem delays

## Resultado Final

- Transição suave e profissional
- Zero erros de console
- Performance otimizada
- Código limpo e manutenível
- UX fluida e responsiva

## Referências
- [Framer Motion AnimatePresence](https://www.framer.com/motion/animate-presence/)
- [React setState in render error](https://react.dev/link/setstate-in-render)
- [WebGL Context Lost handling](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/isContextLost)