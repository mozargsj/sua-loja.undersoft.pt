import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { SITE } from '../data/site'
import { useComanda } from '../store'
import { useScrollLock } from '../lib/hooks'
import { Button } from './ui'

const LINKS = [
  ['A carta', '#carta'],
  ['O ritual', '#ritual'],
  ['Os mestres', '#mestres'],
  ['Visitar', '#visitar'],
]

const ease = [0.32, 0.72, 0, 1]

export default function Nav({ oculta = false }) {
  const [menu, setMenu] = useState(false)
  const count = useComanda((s) => s.ids.length)
  const setOpen = useComanda((s) => s.setOpen)
  // Quando a demonstração começa esta navegação sai de cena, e o menu não pode ficar aberto por trás.
  const aberto = menu && !oculta
  useScrollLock(aberto)

  const reservar = () => {
    setMenu(false)
    setOpen(true)
  }

  return (
    <header className={`nav ${oculta ? 'nav--oculta' : ''}`}>
      <div className="nav__pill">
        <a className="nav__brand" href="#topo" aria-label={`${SITE.name}, início`}>
          {SITE.name}
        </a>
        <nav className="nav__links" aria-label="Principal">
          {LINKS.map(([label, href]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>
        <Button className="nav__cta" onClick={reservar}>
          {count ? `Reservar (${count})` : 'Reservar'}
        </Button>
        <button type="button" className="nav__toggle" aria-expanded={aberto} aria-controls="menu-mobile" aria-label={aberto ? 'Fechar menu' : 'Abrir menu'} onClick={() => setMenu((m) => !m)}>
          <span />
          <span />
        </button>
      </div>

      <AnimatePresence>
        {aberto && (
          <motion.nav
            id="menu-mobile"
            className="menu"
            aria-label="Menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease }}
          >
            <ul>
              {LINKS.map(([label, href], i) => (
                <motion.li key={href} initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.7, ease, delay: 0.08 + i * 0.07 }}>
                  <a href={href} onClick={() => setMenu(false)}>
                    {label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.7, ease, delay: 0.45 }}>
              <Button onClick={reservar}>{count ? `Fechar comanda (${count})` : 'Reservar o meu lugar'}</Button>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
