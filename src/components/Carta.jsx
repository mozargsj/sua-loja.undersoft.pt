import { AnimatePresence, motion } from 'motion/react'
import { SERVICES } from '../data/site'
import { euro, hm } from '../lib/booking'
import { useComanda } from '../store'
import { Icon } from './ui'

function Row({ item, on, onToggle }) {
  const descId = `desc-${item.id}`
  return (
    <li className={`row ${item.featured ? 'row--featured' : ''}`}>
      <button type="button" className="row__btn" aria-pressed={on} aria-describedby={descId} onClick={onToggle}>
        <span className="row__name">{item.name}</span>
        <span className="row__leader" aria-hidden="true" />
        <span className="row__min">{hm(item.min)}</span>
        <span className="row__price">{euro(item.price)}</span>
        <span className="row__mark" aria-hidden="true">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={on ? 'on' : 'off'}
              className="row__icon"
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.4, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            >
              {on ? <Icon.Check size={18} /> : <Icon.Plus size={18} />}
            </motion.span>
          </AnimatePresence>
        </span>
      </button>
      <p id={descId} className="row__desc">
        {item.desc}
      </p>
    </li>
  )
}

export default function Carta() {
  const ids = useComanda((s) => s.ids)
  const toggle = useComanda((s) => s.toggle)

  return (
    <section id="carta" className="section surface--alt carta" aria-labelledby="carta-titulo">
      <div className="wrap">
        <header className="carta__head">
          <h2 id="carta-titulo" data-lines>
            A carta
          </h2>
          <p className="lead">Preços finais, com IVA incluído. Escolha o que quer, feche a comanda e enviamos o pedido por WhatsApp. Confirmamos a hora em poucos minutos.</p>
        </header>

        {SERVICES.map((cat) => (
          <div className="carta__cat" key={cat.id}>
            <div className="carta__catHead">
              <h3>{cat.title}</h3>
              <p>{cat.note}</p>
            </div>
            <ul className="carta__list">
              {cat.items.map((item) => (
                <Row key={item.id} item={item} on={ids.includes(item.id)} onToggle={() => toggle(item.id)} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
