import { AnimatePresence, motion } from 'motion/react'
import { SITE } from '../data/site'
import { euro, hm, totals } from '../lib/booking'
import { useComanda } from '../store'
import { Button, Icon } from './ui'

// Barra fixa em baixo. No telemóvel aparece depois do topo; em ecrã largo só com serviços escolhidos.
export default function ActionBar({ visible }) {
  const ids = useComanda((s) => s.ids)
  const setOpen = useComanda((s) => s.setOpen)
  const t = totals(ids)
  const filled = ids.length > 0

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={`bar ${filled ? 'bar--filled' : ''}`}
          initial={{ y: '130%' }}
          animate={{ y: 0 }}
          exit={{ y: '130%' }}
          transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
        >
          {filled ? (
            <>
              <p className="bar__sum">
                <strong>{euro(t.price)}</strong>
                <span>
                  {ids.length} {ids.length === 1 ? 'serviço' : 'serviços'}, {hm(t.min)}
                </span>
              </p>
              <Button onClick={() => setOpen(true)}>Fechar comanda</Button>
            </>
          ) : (
            <>
              <Button as="a" variant="ghost" href={`tel:${SITE.phoneHref}`}>
                <Icon.Phone size={18} />
                Ligar
              </Button>
              <Button onClick={() => setOpen(true)}>Reservar</Button>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
