import { useEffect, useRef, useState } from 'react'
import { useComanda } from './store'
import { usePastElement } from './lib/hooks'
import { gsap, ScrollTrigger, SplitText, useGSAP, MASK_LINES } from './lib/gsap'
import Nav from './components/Nav'
import NavSistema from './components/NavSistema'
import Hero from './components/Hero'
import Carta from './components/Carta'
import Ritual from './components/Ritual'
import Mestres from './components/Mestres'
import Provas from './components/Provas'
import Presente from './components/Presente'
import Visita from './components/Visita'
import Faq from './components/Faq'
import Footer from './components/Footer'
import Revelacao from './components/Revelacao'
import Sistema from './components/Sistema'
import Adesao from './components/Adesao'
import ActionBar from './components/ActionBar'
import Sheet from './components/Sheet'

// Os títulos de secção sobem de uma máscara, linha a linha, quando entram no ecrã. Só isso:
// o resto da página fica quieto para o movimento significar alguma coisa.
// Corre depois dos filhos (Ritual cria o pin primeiro, por isso a ordem de refresh fica certa).
function useHeadingReveals(root) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        root.current.querySelectorAll('[data-lines]').forEach((el) => {
          SplitText.create(el, {
            ...MASK_LINES,
            onSplit: (self) =>
              gsap.from(self.lines, {
                yPercent: 115,
                duration: 1.1,
                ease: 'power4.out',
                stagger: 0.12,
                scrollTrigger: { trigger: el, start: 'top 88%', once: true },
              }),
          })
        })
        document.fonts?.ready.then(() => ScrollTrigger.refresh())
      })
      return () => mm.revert()
    },
    { scope: root },
  )
}

// true quando a demonstração já ocupa o topo do ecrã (a faixa de 15% de cima). Antes disso, a página é só a loja.
function useEmDemonstracao(id) {
  const [dentro, setDentro] = useState(false)
  useEffect(() => {
    const el = document.getElementById(id)
    if (!el) return
    const io = new IntersectionObserver(([e]) => setDentro(e.isIntersecting), { rootMargin: '0px 0px -85% 0px' })
    io.observe(el)
    return () => io.disconnect()
  }, [id])
  return dentro
}

export default function App() {
  const root = useRef(null)
  const sheetOpen = useComanda((s) => s.open)
  const hasItems = useComanda((s) => s.ids.length > 0)
  const pastHero = usePastElement('topo')
  const emDemo = useEmDemonstracao('demonstracao')
  useHeadingReveals(root)

  // A loja e a demonstração são duas identidades: o <html> diz em qual o visitante está (o CSS larga o grão da loja).
  useEffect(() => {
    document.documentElement.dataset.parte = emDemo ? 'demo' : 'loja'
  }, [emDemo])

  return (
    <>
      <a className="skip" href="#conteudo">
        Saltar para o conteúdo
      </a>
      <div className="site" ref={root} inert={sheetOpen}>
        {/* A loja: Ofício, sem nada do sistema por cima */}
        <Nav oculta={emDemo} />
        <main id="conteudo">
          <Hero />
          <Carta />
          <Ritual />
          <Mestres />
          <Provas />
          <Presente />
          <Visita />
          <Faq />
        </main>
        <Footer />

        {/* A demonstração: Undersoft, com navegação própria */}
        <div id="demonstracao" className="chrome parte-demo">
          <NavSistema visivel={emDemo} />
          <Revelacao />
          <Sistema />
          <Adesao />
        </div>

        <ActionBar visible={(pastHero || hasItems) && !emDemo} />
      </div>
      <Sheet />
    </>
  )
}
