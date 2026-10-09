import { SITE, addressLine } from '../data/site'

const YEAR = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="footer surface--fundo">
      <div className="wrap">
        <div className="footer__grid">
          <div>
            <p className="footer__brand">{SITE.name}</p>
            <p className="footer__tag">Loja de demonstração criada com o Undersoft Commerce.</p>
          </div>
          <address className="footer__col">
            <a href={`tel:${SITE.phoneHref}`}>{SITE.phone}</a>
            <a href={`https://instagram.com/${SITE.instagram}`} target="_blank" rel="noopener">
              Instagram @{SITE.instagram}
            </a>
            <span>{addressLine()}</span>
          </address>
          <div className="footer__col">
            <a href="https://www.livroreclamacoes.pt" target="_blank" rel="noopener">
              Livro de Reclamações
            </a>
            <span>{SITE.payments}</span>
            <span>Preços com IVA incluído</span>
          </div>
        </div>

        <details className="footer__privacy">
          <summary>Privacidade</summary>
          <p>
            Este site de demonstração não usa cookies nem guarda dados. O que escrever na comanda só sai do seu navegador se abrir o WhatsApp.
          </p>
        </details>

        <p className="footer__legal" suppressHydrationWarning>
          © {YEAR} {SITE.name}. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  )
}
