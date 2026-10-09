import { REVIEWS } from '../data/site'

export default function Provas() {
  return (
    <section id="provas" className="section surface--alt provas" aria-labelledby="provas-titulo">
      <div className="wrap">
        <header className="provas__head">
          <h2 id="provas-titulo" data-lines>
            O que dizem à saída
          </h2>
          
        </header>
        <div className="provas__quotes">
          {REVIEWS.map((r, i) => (
            <figure className={`quote quote--${i + 1}`} key={r.nome}>
              <blockquote>
                <p>“{r.text}”</p>
              </blockquote>
              <figcaption>{r.nome}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
