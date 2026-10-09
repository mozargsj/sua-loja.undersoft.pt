import { useRef } from 'react'
import { RITUAL } from '../data/site'
import { gsap, useGSAP } from '../lib/gsap'

const ROMAN = ['I', 'II', 'III', 'IV', 'V']

export default function Ritual() {
  const ref = useRef(null)

  // Em ecrã largo e com movimento permitido, a secção fica fixa e o scroll percorre os cinco
  // tempos. Em telemóvel ou com movimento reduzido, é uma lista normal e legível.
  useGSAP(
    () => {
      const root = ref.current
      const q = gsap.utils.selector(root)
      const mm = gsap.matchMedia()
      mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
        const steps = q('.step')
        const numerals = q('.ritual__numeral span')
        const n = steps.length
        let atual = -1
        const marcar = (i) => {
          if (i === atual) return
          atual = i
          steps.forEach((s, k) => s.toggleAttribute('data-active', k === i))
          numerals.forEach((s, k) => s.toggleAttribute('data-active', k === i))
        }
        root.dataset.mode = 'pin'
        marcar(0)
        gsap.fromTo(
          q('.ritual__fill'),
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: root,
              start: 'top top',
              end: () => `+=${window.innerHeight * 0.6 * n}`,
              pin: true,
              scrub: true,
              invalidateOnRefresh: true,
              onUpdate: (self) => marcar(Math.min(n - 1, Math.floor(self.progress * n))),
            },
          },
        )
        return () => {
          delete root.dataset.mode
          steps.forEach((s) => s.removeAttribute('data-active'))
          numerals.forEach((s) => s.removeAttribute('data-active'))
        }
      })
      return () => mm.revert()
    },
    { scope: ref },
  )

  return (
    <section id="ritual" ref={ref} className="section surface--fundo ritual" aria-labelledby="ritual-titulo">
      <div className="wrap ritual__stage">
        <div className="ritual__intro">
          <h2 id="ritual-titulo" data-lines>
            Cinco tempos, sem pressa.
          </h2>
          <p className="lead">Cada visita é servida como uma refeição: um tempo de cada vez, ao ritmo que o seu rosto pede.</p>
          <div className="ritual__numeral" aria-hidden="true">
            {RITUAL.map((s, i) => (
              <span key={s.title}>{ROMAN[i]}</span>
            ))}
          </div>
        </div>

        <div className="ritual__list">
          <span className="ritual__rail" aria-hidden="true">
            <span className="ritual__fill" />
          </span>
          <ol className="ritual__steps">
            {RITUAL.map((s, i) => (
              <li className="step" key={s.title}>
                <span className="step__n" aria-hidden="true">
                  {ROMAN[i]}
                </span>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
