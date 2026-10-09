import { TEAM } from '../data/site'

const iniciais = (nome) =>
  nome
    .split(' ')
    .map((p) => p[0])
    .join('')

export default function Mestres() {
  return (
    <section id="mestres" className="section surface--base mestres" aria-labelledby="mestres-titulo">
      <div className="wrap">
        <header className="mestres__head">
          <h2 id="mestres-titulo" data-lines>
            Quem o recebe à porta
          </h2>
          <p className="lead">Três mestres, uma só forma de trabalhar: ouvir primeiro, cortar depois.</p>
        </header>
        <ul className="mestres__list">
          {TEAM.map((m) => (
            <li key={m.nome}>
              <div className="niche" aria-hidden="true">
                <span>{iniciais(m.nome)}</span>
              </div>
              <h3>{m.nome}</h3>
              <p className="mestres__papel">{m.papel}</p>
              <p className="mestres__nota">{m.nota}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
