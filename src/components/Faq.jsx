import { useState } from 'react'
import { FAQ } from '../data/site'

export default function Faq() {
  const [aberta, setAberta] = useState(null)

  return (
    <section id="duvidas" className="section surface--alt faq" aria-labelledby="faq-titulo">
      <div className="wrap faq__grid">
        <h2 id="faq-titulo" data-lines>
          Dúvidas frequentes
        </h2>
        <div className="faq__list">
          {FAQ.map((f, i) => {
            const on = aberta === i
            return (
              <div className="faq__item" key={f.q} data-open={on}>
                <h3>
                  <button type="button" id={`faq-b-${i}`} aria-expanded={on} aria-controls={`faq-p-${i}`} onClick={() => setAberta(on ? null : i)}>
                    <span>{f.q}</span>
                    <span className="faq__icon" aria-hidden="true" />
                  </button>
                </h3>
                <div className="faq__panel" id={`faq-p-${i}`} role="region" aria-labelledby={`faq-b-${i}`} inert={!on}>
                  <div>
                    <p>{f.a}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
