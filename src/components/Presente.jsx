import { giftLink } from '../lib/booking'
import { Button } from './ui'

export default function Presente() {
  return (
    <section id="presente" className="section surface--destaque presente" aria-labelledby="presente-titulo">
      <div className="wrap presente__grid">
        <div>
          <h2 id="presente-titulo" data-lines>
            Ofereça um ritual.
          </h2>
          <p className="lead">Vale-presente com o valor que quiser, em cartão ou digital. Pensado para o Dia do Pai, para o Natal e para o dia do casamento.</p>
        </div>
        <Button as="a" href={giftLink()} target="_blank" rel="noopener">
          Pedir um vale-presente
        </Button>
      </div>
    </section>
  )
}
