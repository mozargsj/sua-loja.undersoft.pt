import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ScrollTrigger } from '../lib/gsap'
import { CAPACIDADES, ORIGEM } from '../data/sistema'
import { useComanda } from '../store'
import { MOCKS } from './sistema/mocks'
import { Icon } from './ui'

const ease = [0.32, 0.72, 0, 1]
const N = CAPACIDADES.length

// Capítulo da camada do sistema (.chrome): identidade Undersoft, separada da da loja.
export default function Sistema() {
  const ativa = useComanda((s) => s.capacidade)
  const setAtiva = useComanda((s) => s.setCapacidade)
  const idx = Math.max(0, CAPACIDADES.findIndex((c) => c.id === ativa))
  const cap = CAPACIDADES[idx]
  const Mock = MOCKS[cap.id]
  const ref = useRef(null)
  const faixa = useRef(null)
  const primeira = useRef(true)

  // A altura muda com a aba e com as telas interativas: o GSAP precisa de recalcular o que está abaixo (pin do Ritual).
  useEffect(() => {
    let t
    const ro = new ResizeObserver(() => {
      clearTimeout(t)
      t = setTimeout(() => ScrollTrigger.refresh(), 200)
    })
    ro.observe(ref.current)
    return () => {
      ro.disconnect()
      clearTimeout(t)
    }
  }, [])

  // O cartão escolhido desliza sempre para a esquerda, deixando os seguintes à vista.
  // Só mexe na faixa (scrollTo no contentor), nunca na página.
  useEffect(() => {
    const el = faixa.current
    const card = document.getElementById(`aba-${cap.id}`)
    if (!el || !card) return
    const esquerda = card.offsetLeft - parseFloat(getComputedStyle(el).paddingLeft)
    const suave = !primeira.current && !matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollTo({ left: esquerda, behavior: suave ? 'smooth' : 'auto' })
    primeira.current = false
  }, [cap.id])

  // Setas, Home e End movem a seleção, como num menu de abas.
  const onKey = (e) => {
    const passo = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key]
    let prox = idx
    if (passo) prox = (idx + passo + N) % N
    else if (e.key === 'Home') prox = 0
    else if (e.key === 'End') prox = N - 1
    else return
    e.preventDefault()
    setAtiva(CAPACIDADES[prox].id)
    document.getElementById(`aba-${CAPACIDADES[prox].id}`)?.focus({ preventScroll: true })
  }

  return (
    <section id="sistema" ref={ref} className="section chrome surface--fundo sistema" aria-labelledby="sistema-titulo">
      <div className="wrap">
        <header className="sistema__head">
          <h2 id="sistema-titulo" data-lines>
            O que o sistema faz por trás desta loja
          </h2>
          <p className="lead">
            Isto é o que fez a loja funcionar: as capacidades do Undersoft Commerce, em telas ilustrativas. Pode mexer à vontade, nada é guardado.
          </p>
        </header>

        <div className="sistema__grid">
          <div className="sistema__ctrl">
            <p className="sistema__pos" aria-live="polite">
              {idx + 1} de {N}
            </p>
            <div className="sistema__setas">
              <button type="button" className="sistema__seta" aria-label="Capacidade anterior" disabled={idx === 0} onClick={() => setAtiva(CAPACIDADES[idx - 1].id)}>
                <Icon.Esquerda size={20} />
              </button>
              <button type="button" className="sistema__seta" aria-label="Capacidade seguinte" disabled={idx === N - 1} onClick={() => setAtiva(CAPACIDADES[idx + 1].id)}>
                <Icon.Direita size={20} />
              </button>
            </div>
          </div>

          <div ref={faixa} className="sistema__abas" role="tablist" aria-label="Capacidades do sistema" onKeyDown={onKey}>
            {CAPACIDADES.map((c) => (
              <button
                type="button"
                role="tab"
                key={c.id}
                id={`aba-${c.id}`}
                aria-selected={c.id === cap.id}
                aria-controls="painel-sistema"
                tabIndex={c.id === cap.id ? 0 : -1}
                className="sistema__aba"
                onClick={() => setAtiva(c.id)}
              >
                <span className="sistema__aba-t">{c.titulo}</span>
                <span className="sistema__aba-r">{c.resumo}</span>
              </button>
            ))}
          </div>

          <div className="sistema__painel" role="tabpanel" id="painel-sistema" aria-labelledby={`aba-${cap.id}`} tabIndex={0}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={cap.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35, ease }}>
                <div className="sistema__cab">
                  <h3>{cap.titulo}</h3>
                  <span className="sistema__origem" data-origem={cap.origem}>
                    {ORIGEM[cap.origem]}
                  </span>
                </div>
                <p className="sistema__benef">{cap.beneficio}</p>
                <Mock />
                <p className="sistema__real">{cap.real}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
