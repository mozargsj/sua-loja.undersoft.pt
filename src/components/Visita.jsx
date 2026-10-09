import { SITE, HOURS_ROWS } from '../data/site'
import { mapsLink, wazeLink } from '../lib/booking'
import { useOpenStatus } from '../lib/hooks'
import { Button, Icon } from './ui'

// Linha do horário que corresponde a cada dia (0 = domingo).
const linhaDoDia = (d) => (d >= 2 && d <= 5 ? 0 : d === 6 ? 1 : 2)

export default function Visita() {
  const status = useOpenStatus()
  const hoje = status ? linhaDoDia(status.day) : -1

  return (
    <section id="visitar" className="section surface--base visita" aria-labelledby="visita-titulo">
      <div className="wrap visita__grid">
        <div>
          <h2 id="visita-titulo" data-lines>
            Venha ver como se serve.
          </h2>
          <address className="visita__morada">
            {SITE.address.street}
            <br />
            {SITE.address.postal} {SITE.address.city}
          </address>
          <div className="visita__acoes">
            <Button as="a" href={mapsLink()} target="_blank" rel="noopener">
              <Icon.Pin size={18} />
              Abrir no Google Maps
            </Button>
            <Button as="a" variant="ghost" href={wazeLink()} target="_blank" rel="noopener">
              Abrir no Waze
            </Button>
          </div>
        </div>

        <div className="visita__horario">
          <p className={`visita__estado ${status?.open ? 'is-open' : ''}`} aria-live="polite">
            <span className={`dot ${status?.open ? 'dot--on' : ''}`} aria-hidden="true" />
            {status ? status.text : 'Terça a sábado'}
          </p>
          <dl className="horas">
            {HOURS_ROWS.map(([dia, horas], i) => (
              <div key={dia} className="horas__row" data-hoje={i === hoje || undefined}>
                <dt>{dia}</dt>
                <dd>{horas}</dd>
              </div>
            ))}
          </dl>
          <p className="visita__tel">
            Prefere falar connosco? Ligue para <a href={`tel:${SITE.phoneHref}`}>{SITE.phone}</a>.
          </p>
        </div>
      </div>
    </section>
  )
}
