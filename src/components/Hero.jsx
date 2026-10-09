import { useRef } from 'react'
import { addressLine } from '../data/site'
import { useComanda } from '../store'
import { useOpenStatus } from '../lib/hooks'
import { mapsLink } from '../lib/booking'
import { gsap, SplitText, useGSAP, MASK_LINES } from '../lib/gsap'
import { Button, Icon } from './ui'

// Três arcos concêntricos (portas e nichos de pedra) que o GSAP desenha ao carregar.
const ARCHES = [
  'M20 560V200a180 180 0 0 1 360 0v360',
  'M40 560V200a160 160 0 0 1 320 0v360',
  'M60 560V200a140 140 0 0 1 280 0v360',
]

export default function Hero() {
  const ref = useRef(null)
  const setOpen = useComanda((s) => s.setOpen)
  const status = useOpenStatus()

  // Uma única coreografia de entrada. Em movimento reduzido nada é escondido nem animado.
  useGSAP(
    () => {
      const q = gsap.utils.selector(ref.current)
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const [h1] = q('h1')
        gsap.set(h1, { opacity: 1 })
        SplitText.create(h1, {
          ...MASK_LINES,
          onSplit: (self) => gsap.from(self.lines, { yPercent: 115, duration: 1.3, ease: 'power4.out', stagger: 0.14, delay: 0.15 }),
        })
        gsap.set(q('[data-hero="arch"]'), { opacity: 1 })
        gsap.from(q('[data-hero="arch"] path'), { drawSVG: 0, duration: 2, ease: 'power2.inOut', stagger: 0.25, delay: 0.2 })
        gsap.fromTo(q('[data-hero="fade"], [data-hero="pole"]'), { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out', stagger: 0.12, delay: 0.7 })
      })
      return () => mm.revert()
    },
    { scope: ref },
  )

  return (
    <section id="topo" ref={ref} className="hero surface--base" aria-labelledby="hero-titulo">
      <div className="wrap">
        <div className="hero__grid">
          <div className="hero__copy">
            <h1 id="hero-titulo">
              Aqui, cuidar{' '}
              <br />é um ofício.
            </h1>
            <p className="hero__lead" data-hero="fade">
              Corte, barba à navalha e toalha quente, servidos com a calma de uma mesa bem posta. Em Lisboa, de terça a sábado.
            </p>
            <div className="hero__cta" data-hero="fade">
              <Button onClick={() => setOpen(true)}>Reservar o meu lugar</Button>
              <a className="link" href="#carta">
                Ver a carta e os preços
              </a>
            </div>
          </div>

          <div className="arch" data-hero="arch" aria-hidden="true">
            <svg viewBox="0 0 400 560" fill="none" preserveAspectRatio="xMidYMax meet">
              {ARCHES.map((d, i) => (
                <path key={d} d={d} stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" opacity={1 - i * 0.28} />
              ))}
            </svg>
            <div className="pole" data-hero="pole">
              <span className="pole__cap" />
              <div className="pole__glass">
                <div className="pole__stripes" />
              </div>
              <span className="pole__cap" />
            </div>
          </div>
        </div>

        <ul className="hero__rail" data-hero="fade">
          <li>
            <span className={`dot ${status?.open ? 'dot--on' : ''}`} aria-hidden="true" />
            <span>{status ? status.text : 'Terça a sexta, 10:00 às 20:00'}</span>
          </li>
          <li>
            <Icon.Chat size={16} />
            <span>Pague com MB WAY, Apple Pay ou Google Pay</span>
          </li>
          <li>
            <Icon.Pin size={16} />
            <a href={mapsLink()} target="_blank" rel="noopener">
              {addressLine()}
            </a>
          </li>
        </ul>
      </div>
    </section>
  )
}
