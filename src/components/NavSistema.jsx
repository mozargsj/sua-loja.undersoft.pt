import { AnimatePresence, motion } from 'motion/react'
import { Button } from './ui'

// Navegação do SISTEMA. Só existe quando o visitante já saiu da loja: a do Ofício sai de cena e entra esta.
export default function NavSistema({ visivel }) {
  return (
    <AnimatePresence>
      {visivel && (
        <motion.header
          className="nav-sis chrome"
          initial={{ y: -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -24, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
        >
          <a className="nav-sis__logo" href="#revelacao" aria-label="Undersoft, início da demonstração">
            <img src="/undersoft-logo.png" width="360" height="120" alt="" />
          </a>
          <nav className="nav-sis__links" aria-label="Demonstração">
            <a href="#sistema">O que o sistema faz</a>
            <a href="#adesao">Como aderir</a>
          </nav>
          <div className="nav-sis__acoes">
            <Button as="a" variant="ghost" href="#topo" aria-label="Voltar à loja">
              <span className="so-largo">Voltar à loja</span>
              <span className="so-estreito" aria-hidden="true">Loja</span>
            </Button>
            <Button as="a" href="#adesao" aria-label="Falar connosco">
              <span className="so-largo">Falar connosco</span>
              <span className="so-estreito" aria-hidden="true">Contactar</span>
            </Button>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  )
}
