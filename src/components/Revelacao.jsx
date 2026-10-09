import { Button } from './ui'

// O corte: aqui a loja acaba e começa a demonstração, já na identidade Undersoft.
export default function Revelacao() {
  return (
    <section id="revelacao" className="section chrome surface--fundo revelacao" aria-labelledby="revelacao-titulo">
      <div className="wrap">
        <div className="revelacao__conteudo">
          <h2 id="revelacao-titulo" data-lines>
            Esta loja não existe.
          </h2>
          <p className="revelacao__fim">
            O Ofício é uma demonstração. Foi construído com o <strong>Undersoft Commerce</strong>, o sistema que organiza os pedidos, os agendamentos, o stock e os pagamentos de um negócio. A loja é só a vitrine: o que vem a seguir é o que está por baixo.
          </p>
          <div className="revelacao__falso">
            <p>Nada disto é real:</p>
            <ul>
              {['o nome', 'a morada', 'os preços', 'a equipa', 'as avaliações'].map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
          <div className="revelacao__acoes">
            <Button as="a" href="#sistema">
              Ver o que o sistema faz
            </Button>
            <a className="link" href="#topo">
              Voltar à loja
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
