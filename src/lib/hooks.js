import { useEffect, useState } from 'react'
import { openStatus } from './booking'

// Estado do horário. Começa a null para o HTML pré-renderizado e o cliente coincidirem.
export function useOpenStatus() {
  const [status, setStatus] = useState(null)
  useEffect(() => {
    const tick = () => setStatus(openStatus())
    tick()
    const id = setInterval(tick, 60_000)
    return () => clearInterval(id)
  }, [])
  return status
}

// Bloqueia o scroll da página enquanto um painel está aberto.
export function useScrollLock(active) {
  useEffect(() => {
    if (!active) return
    document.documentElement.style.overflow = 'hidden'
    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [active])
}

// true quando o elemento já saiu do ecrã por cima (usado para mostrar a barra de ação).
export function usePastElement(id) {
  const [past, setPast] = useState(false)
  useEffect(() => {
    const el = document.getElementById(id)
    if (!el) return
    const io = new IntersectionObserver(([e]) => setPast(!e.isIntersecting && e.boundingClientRect.top < 0))
    io.observe(el)
    return () => io.disconnect()
  }, [id])
  return past
}
