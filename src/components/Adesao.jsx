import { ADESAO, UNDERSOFT } from '../data/sistema'
import { Button } from './ui'

// Fecho do demo: como aderir e como falar com a Undersoft. Camada do sistema (.chrome).
export default function Adesao() {
  return (
    <>
    <section id="adesao" className="section chrome surface--base adesao" aria-labelledby="adesao-titulo">
      <div className="wrap adesao__grid">
        <div className="adesao__texto">
          <img className="adesao__logo" src="/undersoft-logo.png" alt="Undersoft, soluções empresariais" width="360" height="120" loading="lazy" />
          <h2 id="adesao-titulo" data-lines>
            Quero isto no meu negócio.
          </h2>
          <p className="lead">O sistema adapta o fluxo de pedidos, o catálogo, as regras, o visual e os pagamentos à operação real da sua empresa. O WhatsApp continua para o atendimento.</p>
          <p className="adesao__prazo">
            Prazo de implementação: <strong>5 a 10 dias úteis</strong>, conforme a personalização.
          </p>
          <div className="adesao__cta">
            <Button as="a" href={`mailto:${UNDERSOFT.email}?subject=${encodeURIComponent('Quero o Undersoft Commerce no meu negócio')}`}>
              Pedir uma conversa
            </Button>
            <Button as="a" variant="ghost" href={`tel:${UNDERSOFT.telHref}`}>
              {UNDERSOFT.tel}
            </Button>
          </div>
          <p className="adesao__contactos">
            <a href={`mailto:${UNDERSOFT.email}`}>{UNDERSOFT.email}</a>
            <a href={UNDERSOFT.site} target="_blank" rel="noopener">
              undersoft.pt
            </a>
            <a href={UNDERSOFT.paginaComercial} target="_blank" rel="noopener">
              Página comercial
            </a>
            <span>{UNDERSOFT.local}</span>
          </p>
        </div>

        <ol className="adesao__passos">
          {ADESAO.map(([titulo, texto]) => (
            <li key={titulo}>
              <h3>{titulo}</h3>
              <p>{texto}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
    <div className="rodape-sis chrome">
      <div className="wrap">
        <p>
          {UNDERSOFT.nome}, soluções empresariais. {UNDERSOFT.local}.
        </p>
        <p>
          <a href={UNDERSOFT.paginaComercial} target="_blank" rel="noopener">
            negocios.undersoft.pt
          </a>
        </p>
      </div>
    </div>
    </>
  )
}
