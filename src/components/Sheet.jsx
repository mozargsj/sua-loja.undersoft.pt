import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { SITE, TEAM } from '../data/site'
import { ALL, DIAS, PERIODOS, byId, euro, hm, totals, waLink } from '../lib/booking'
import { useScrollLock } from '../lib/hooks'
import { useComanda } from '../store'
import { Button, Icon } from './ui'

const BARBEIROS = ['Sem preferência', ...TEAM.map((m) => m.nome)]

function Chips({ legend, name, options, value, onChange }) {
  return (
    <fieldset className="chips">
      <legend>{legend}</legend>
      {options.map((o) => (
        <label className="chip" key={o}>
          <input type="radio" name={name} checked={value === o} onChange={() => onChange(o)} />
          <span>{o}</span>
        </label>
      ))}
    </fieldset>
  )
}

// A "comanda": resume o pedido, recolhe preferências e entrega tudo ao WhatsApp já escrito.
export default function Sheet() {
  const { ids, open, prefs, toggle, setOpen, setPref } = useComanda()
  const panel = useRef(null)
  const origem = useRef(null)
  const t = totals(ids)
  useScrollLock(open)

  useEffect(() => {
    if (!open) return
    origem.current = document.activeElement
    panel.current?.focus()
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      origem.current?.focus?.()
    }
  }, [open, setOpen])

  const livres = ALL.filter((i) => !ids.includes(i.id))

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="sheet"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          onMouseDown={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          <motion.div
            ref={panel}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby="sheet-titulo"
            className="sheet__panel surface--alt"
            initial={{ y: '6%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '6%', opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 32 }}
          >
            <header className="sheet__head">
              <h2 id="sheet-titulo">A sua comanda</h2>
              <button type="button" className="sheet__close" aria-label="Fechar comanda" onClick={() => setOpen(false)}>
                <Icon.Close size={22} />
              </button>
            </header>

            {ids.length ? (
              <ul className="sheet__lines">
                <AnimatePresence initial={false}>
                  {ids.map((id) => (
                    <motion.li key={id} layout="position" initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 12 }} transition={{ duration: 0.3 }}>
                      <span>{byId[id].name}</span>
                      <span className="sheet__price">{euro(byId[id].price)}</span>
                      <button type="button" aria-label={`Retirar ${byId[id].name}`} onClick={() => toggle(id)}>
                        <Icon.Close size={16} />
                      </button>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            ) : (
              <p className="sheet__empty">Ainda não escolheu nenhum serviço. Adicione abaixo ou peça-nos ajuda por WhatsApp.</p>
            )}

            {livres.length > 0 && (
              <details className="sheet__add" open={!ids.length}>
                <summary>Adicionar serviços</summary>
                <div className="sheet__chips">
                  {livres.map((i) => (
                    <button type="button" key={i.id} className="mini" onClick={() => toggle(i.id)}>
                      <Icon.Plus size={14} />
                      {i.name}
                      <span>{euro(i.price)}</span>
                    </button>
                  ))}
                </div>
              </details>
            )}

            {ids.length > 0 && (
              <p className="sheet__total">
                <span>Total</span>
                <strong>{euro(t.price)}</strong>
                <span>cerca de {hm(t.min)}</span>
              </p>
            )}

            <div className="sheet__prefs">
              <Chips legend="Quando lhe dá jeito" name="dia" options={DIAS} value={prefs.dia} onChange={(v) => setPref('dia', v)} />
              <Chips legend="Período" name="periodo" options={PERIODOS} value={prefs.periodo} onChange={(v) => setPref('periodo', v)} />
              <Chips legend="Barbeiro" name="barbeiro" options={BARBEIROS} value={prefs.barbeiro} onChange={(v) => setPref('barbeiro', v)} />
              <label className="field">
                <span>O seu nome (opcional)</span>
                <input type="text" autoComplete="given-name" value={prefs.nome} onChange={(e) => setPref('nome', e.target.value)} />
              </label>
            </div>

            <div className="sheet__send">
              <Button as="a" href={waLink(ids, prefs)} target="_blank" rel="noopener" onClick={() => setOpen(false)}>
                <Icon.Chat size={18} />
                Enviar pedido por WhatsApp
              </Button>
              <p>
                Confirmamos a disponibilidade por mensagem e não pedimos pagamento antecipado. Prefere ligar? <a href={`tel:${SITE.phoneHref}`}>{SITE.phone}</a>
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
