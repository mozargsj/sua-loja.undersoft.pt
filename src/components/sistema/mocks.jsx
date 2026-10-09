// Telas ILUSTRATIVAS das capacidades do sistema. Estado só local: nada é gravado e os dados são fixos
// (sem Date nem Math.random), para o HTML pré-renderizado e a hidratação coincidirem.
import { useState } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'motion/react'
import { euro } from '../../lib/booking'
import { Icon } from '../ui'

const ease = [0.32, 0.72, 0, 1]

/* 1. Pedidos --------------------------------------------------------------- */
const ESTADOS = [
  { nome: 'Solicitado', cor: 'var(--st-solicitado)' },
  { nome: 'Em atendimento', cor: 'var(--st-atendimento)' },
  { nome: 'Concluído', cor: 'var(--st-concluido)' },
]
const PEDIDOS = [
  { id: '1042', cliente: 'Rui', itens: 'Corte de autor e barba com toalha quente', total: 70, hora: '15:30', pag: 'MB WAY pago', e: 0 },
  { id: '1041', cliente: 'Marta', itens: 'Menu de Degustação', total: 95, hora: '16:30', pag: 'Pagamento no local', e: 0 },
  { id: '1040', cliente: 'André', itens: 'Degradê e acabamento à navalha', total: 40, hora: '14:30', pag: 'Apple Pay pago', e: 1 },
  { id: '1039', cliente: 'Inês', itens: 'Pomada de cera de abelha', total: 18, hora: '11:00', pag: 'MB WAY pago', e: 2 },
]

export function Pedidos() {
  const [lista, setLista] = useState(PEDIDOS)
  const avancar = (id) => setLista((l) => l.map((p) => (p.id === id ? { ...p, e: Math.min(p.e + 1, 2) } : p)))
  return (
    <div className="mk">
      <LayoutGroup>
        <div className="mk-board">
          {ESTADOS.map((st, i) => {
            const col = lista.filter((p) => p.e === i)
            return (
              <section className="mk-col" key={st.nome} aria-label={`${st.nome}: ${col.length}`} style={{ '--cor': st.cor }}>
                <h4>
                  {st.nome}
                  <span>{col.length}</span>
                </h4>
                <ul>
                  {col.map((p) => (
                    <motion.li layout layoutId={`ped-${p.id}`} key={p.id} className="mk-ped" transition={{ duration: 0.5, ease }}>
                      <div className="mk-ped__top">
                        <strong>#{p.id}</strong>
                        <span>{p.hora}</span>
                      </div>
                      <p className="mk-ped__cli">{p.cliente}</p>
                      <p className="mk-ped__itens">{p.itens}</p>
                      <div className="mk-ped__bot">
                        <span>{euro(p.total)}</span>
                        <span>{p.pag}</span>
                        {i < 2 && (
                          <button type="button" className="mk-btn" aria-label={`Avançar o pedido ${p.id} para ${ESTADOS[i + 1].nome}`} onClick={() => avancar(p.id)}>
                            Avançar
                          </button>
                        )}
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </section>
            )
          })}
        </div>
      </LayoutGroup>
      <button type="button" className="mk-link" onClick={() => setLista(PEDIDOS)}>
        Repor o exemplo
      </button>
    </div>
  )
}

/* 2. Acompanhamento -------------------------------------------------------- */
const PASSOS = ['Solicitado', 'Confirmado', 'Em atendimento', 'Concluído']
const HORAS = ['15:02', '15:04', '15:30', '16:12']

export function Acompanhamento() {
  const [n, setN] = useState(1)
  return (
    <div className="mk mk-track">
      <div className="mk-phone">
        <p className="mk-phone__cod">Pedido K7M2QX9</p>
        <ol className="mk-time">
          {PASSOS.map((p, i) => (
            <li key={p} data-feito={i <= n || undefined} data-atual={i === n || undefined}>
              <span className="mk-time__dot" aria-hidden="true" />
              <span>{p}</span>
              <time>{i <= n ? HORAS[i] : '--:--'}</time>
            </li>
          ))}
        </ol>
        <button type="button" className="mk-btn mk-btn--cheio" onClick={() => setN((x) => (x + 1) % PASSOS.length)}>
          {n === PASSOS.length - 1 ? 'Recomeçar' : 'Avançar estado'}
        </button>
      </div>

      <div className="mk-avisos">
        <figure className="mk-aviso">
          <figcaption>WhatsApp, quando o pedido é criado</figcaption>
          <p className="mk-bolha">
            Olá Rui! Recebemos o seu pedido <strong>K7M2QX9</strong> no Ofício. Pode acompanhá-lo aqui: …/pedido/K7M2QX9
          </p>
        </figure>
        <figure className="mk-aviso">
          <figcaption>Notificação no telemóvel, a cada mudança de estado</figcaption>
          <div className="mk-push" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.p key={n} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease }}>
                <strong>Ofício</strong>
                <br />O seu pedido mudou para: {PASSOS[n]}.
              </motion.p>
            </AnimatePresence>
          </div>
        </figure>
      </div>
    </div>
  )
}

/* 3. Agendamento ----------------------------------------------------------- */
const DIAS = ['Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
const OCUPADOS = {
  Terça: ['10:30', '11:00', '15:00', '16:30'],
  Quarta: ['10:00', '12:00', '12:30', '17:00'],
  Quinta: ['11:30', '14:00', '14:30', '18:00'],
  Sexta: ['10:30', '13:00', '15:30', '16:00', '16:30', '19:00'],
  Sábado: ['09:30', '10:00', '11:00', '11:30', '14:00'],
}
const fmt = (m) => `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`
const horas = (dia) => {
  const [ini, fim] = dia === 'Sábado' ? [9 * 60 + 30, 18 * 60] : [10 * 60, 20 * 60]
  const out = []
  for (let m = ini; m < fim; m += 30) out.push(fmt(m))
  return out
}

export function Agendamento() {
  const [dia, setDia] = useState('Terça')
  const [hora, setHora] = useState(null)
  return (
    <div className="mk">
      <div className="mk-chips" role="group" aria-label="Dia">
        {DIAS.map((d) => (
          <button
            type="button"
            key={d}
            className="mk-chip"
            aria-pressed={d === dia}
            onClick={() => {
              setDia(d)
              setHora(null)
            }}
          >
            {d}
          </button>
        ))}
      </div>
      <div className="mk-slots" role="group" aria-label={`Horas de ${dia}`}>
        {horas(dia).map((h) => {
          const ocupado = OCUPADOS[dia].includes(h)
          return (
            <button type="button" key={h} className="mk-slot" disabled={ocupado} aria-pressed={h === hora} onClick={() => setHora(h)}>
              {h}
            </button>
          )
        })}
      </div>
      <p className="mk-resumo" aria-live="polite">
        {hora ? (
          <>
            Pedido agendado para <strong>{dia}, às {hora}</strong>. Entra na fila da equipa às {hora}, e não antes.
          </>
        ) : (
          'Escolha uma hora livre. As horas riscadas já estão ocupadas.'
        )}
      </p>
    </div>
  )
}

/* 4. Catálogo, regras e stock --------------------------------------------- */
const PRODUTOS = [
  { id: 'pomada', nome: 'Pomada de cera de abelha', preco: 18, stock: 3, controla: true, ativo: true },
  { id: 'oleo', nome: 'Óleo de barba de cedro', preco: 22, stock: 1, controla: true, ativo: true },
  { id: 'balsamo', nome: 'Bálsamo pós-barba', preco: 16, stock: 0, controla: true, ativo: true },
  { id: 'corte', nome: 'Corte de autor', preco: 38, stock: 0, controla: false, ativo: true },
]
const EXTRAS = [
  ['toalha', 'Toalha quente', 5],
  ['massagem', 'Massagem de cabeça', 15],
  ['mascara', 'Máscara de argila', 15],
  ['oleo', 'Óleo finalizador', 8],
]
const estadoDe = (p) => (!p.ativo ? 'Indisponível' : p.controla && p.stock === 0 ? 'Esgotado' : null)

export function Catalogo() {
  const [itens, setItens] = useState(PRODUTOS)
  const [extras, setExtras] = useState([])
  const [aviso, setAviso] = useState('')
  const mudar = (id, patch) => setItens((l) => l.map((p) => (p.id === id ? { ...p, ...patch } : p)))
  const alternar = (id) => {
    if (extras.includes(id)) {
      setExtras(extras.filter((x) => x !== id))
      setAviso('')
    } else if (extras.length >= 2) {
      setAviso('Máximo de 2 extras por serviço. Este limite é definido pelo empresário.')
    } else {
      setExtras([...extras, id])
      setAviso('')
    }
  }
  return (
    <div className="mk mk-cat">
      <div className="mk-painel">
        <h4>No painel do empresário</h4>
        <ul>
          {itens.map((p) => (
            <li key={p.id} className="mk-prod">
              <span className="mk-prod__nome">{p.nome}</span>
              <label className="mk-campo">
                <span className="sr">Preço de {p.nome}, em euros</span>
                <input type="number" min="0" inputMode="numeric" value={p.preco} onChange={(e) => mudar(p.id, { preco: Math.max(0, Number(e.target.value) || 0) })} />
                <span aria-hidden="true">€</span>
              </label>
              <label className="mk-check">
                <input type="checkbox" checked={p.controla} onChange={(e) => mudar(p.id, { controla: e.target.checked, stock: e.target.checked ? Math.max(p.stock, 1) : p.stock })} />
                <span>Controlar stock</span>
              </label>
              {p.controla && (
                <span className="mk-step">
                  <button type="button" aria-label={`Menos uma unidade de ${p.nome}`} onClick={() => mudar(p.id, { stock: Math.max(0, p.stock - 1) })}>
                    −
                  </button>
                  <output aria-label={`Stock de ${p.nome}`}>{p.stock}</output>
                  <button type="button" aria-label={`Mais uma unidade de ${p.nome}`} onClick={() => mudar(p.id, { stock: p.stock + 1 })}>
                    +
                  </button>
                </span>
              )}
              <label className="mk-check">
                <input type="checkbox" checked={p.ativo} onChange={(e) => mudar(p.id, { ativo: e.target.checked })} />
                <span>Disponível</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className="mk-painel">
        <h4>O que o cliente vê na loja</h4>
        <ul>
          {itens.map((p) => {
            const est = estadoDe(p)
            return (
              <li key={p.id} className="mk-vit" data-off={est ? true : undefined}>
                <span>{p.nome}</span>
                <span>{euro(p.preco)}</span>
                <span className="mk-tag">{est ?? (p.controla ? `${p.stock} em stock` : 'Disponível')}</span>
              </li>
            )
          })}
        </ul>

        <h4 className="mk-sub">Regra de compra: até 2 extras</h4>
        <div className="mk-chips" role="group" aria-label="Extras do corte de autor">
          {EXTRAS.map(([id, nome, preco]) => (
            <button type="button" key={id} className="mk-chip" aria-pressed={extras.includes(id)} onClick={() => alternar(id)}>
              {nome} <span>+{euro(preco)}</span>
            </button>
          ))}
        </div>
        <p className="mk-aviso-regra" role="status">
          {aviso}
        </p>
      </div>
    </div>
  )
}

/* 5. Relatórios ------------------------------------------------------------ */
const PERIODOS = {
  '7 dias': {
    receita: 1860,
    pedidos: 41,
    picos: [2, 4, 3, 2, 5, 6, 4, 6, 8, 5],
    top: [['Corte de autor', 18], ['Barba com toalha quente', 14], ['Ritual Ofício', 7], ['Pomada de cera de abelha', 5]],
    voltam: [['Rui M.', 4], ['André S.', 3], ['Marta F.', 3]],
  },
  '30 dias': {
    receita: 7420,
    pedidos: 168,
    picos: [9, 14, 12, 8, 19, 22, 17, 24, 31, 20],
    top: [['Corte de autor', 71], ['Barba com toalha quente', 52], ['Ritual Ofício', 29], ['Degradê e acabamento à navalha', 24]],
    voltam: [['Rui M.', 9], ['Marta F.', 7], ['André S.', 6]],
  },
}
const HORAS_PICO = ['10', '11', '12', '13', '14', '15', '16', '17', '18', '19']

export function Relatorios() {
  const [per, setPer] = useState('7 dias')
  const d = PERIODOS[per]
  const maxPico = Math.max(...d.picos)
  const maxTop = d.top[0][1]
  return (
    <div className="mk">
      <div className="mk-chips" role="group" aria-label="Período">
        {Object.keys(PERIODOS).map((p) => (
          <button type="button" key={p} className="mk-chip" aria-pressed={p === per} onClick={() => setPer(p)}>
            {p}
          </button>
        ))}
      </div>
      <dl className="mk-kpis">
        <div>
          <dt>Receita</dt>
          <dd>{euro(d.receita)}</dd>
        </div>
        <div>
          <dt>Pedidos</dt>
          <dd>{d.pedidos}</dd>
        </div>
        <div>
          <dt>Pedido médio</dt>
          <dd>{euro(Math.round(d.receita / d.pedidos))}</dd>
        </div>
      </dl>
      <div className="mk-rel">
        <div>
          <h4>Horários de pico</h4>
          <div className="mk-barras" role="img" aria-label={`Pedidos por hora, das 10 às 19 horas. Pico: ${HORAS_PICO[d.picos.indexOf(maxPico)]} horas, com ${maxPico} pedidos.`}>
            {d.picos.map((v, i) => (
              <span key={HORAS_PICO[i]} className="mk-barra" data-pico={v === maxPico || undefined}>
                <i style={{ height: `${(v / maxPico) * 100}%` }} />
                <b>{HORAS_PICO[i]}h</b>
              </span>
            ))}
          </div>
        </div>
        <div>
          <h4>Mais vendidos</h4>
          <ul className="mk-top">
            {d.top.map(([nome, v]) => (
              <li key={nome}>
                <span>{nome}</span>
                <span className="mk-top__barra" aria-hidden="true">
                  <i style={{ width: `${(v / maxTop) * 100}%` }} />
                </span>
                <b>{v}</b>
              </li>
            ))}
          </ul>
          <h4 className="mk-sub">Clientes que voltam</h4>
          <ul className="mk-volta">
            {d.voltam.map(([nome, v]) => (
              <li key={nome}>
                <span>{nome}</span>
                <b>{v} visitas</b>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

/* 6. Permissões ------------------------------------------------------------ */
export function Permissoes() {
  const [papel, setPapel] = useState('Proprietário')
  const [pagEquipa, setPagEquipa] = useState(false)
  const dono = papel === 'Proprietário'
  const acoes = [
    ['Ver os pedidos e avançar o estado', true],
    ['Editar os itens de um pedido', dono],
    ['Confirmar um pagamento', dono || pagEquipa],
  ]
  return (
    <div className="mk">
      <div className="mk-chips" role="group" aria-label="Quem está a usar o painel">
        {['Proprietário', 'Equipa'].map((p) => (
          <button type="button" key={p} className="mk-chip" aria-pressed={p === papel} onClick={() => setPapel(p)}>
            {p}
          </button>
        ))}
      </div>
      <ul className="mk-perm">
        {acoes.map(([nome, ok]) => (
          <li key={nome} data-ok={ok || undefined}>
            <span className="mk-perm__ico" aria-hidden="true">
              {ok ? <Icon.Check size={16} /> : <Icon.Close size={16} />}
            </span>
            <span>{nome}</span>
            <b>{ok ? 'Permitido' : 'Sem permissão'}</b>
          </li>
        ))}
      </ul>
      {!dono && (
        <label className="mk-check mk-check--solto">
          <input type="checkbox" checked={pagEquipa} onChange={(e) => setPagEquipa(e.target.checked)} />
          <span>O proprietário deu a esta pessoa a permissão de confirmar pagamentos</span>
        </label>
      )}
    </div>
  )
}

/* 7. Marca ----------------------------------------------------------------- */
function MiniLoja({ tema, titulo, legenda }) {
  return (
    <figure className="mk-mini-fig">
      <div className={`mk-mini tema-${tema} surface--base`}>
        <p className="mk-mini__marca">{tema === 'oficio' ? 'Ofício' : 'Undersoft'}</p>
        <p className="mk-mini__linha">
          <span>{tema === 'oficio' ? 'Corte de autor' : 'Pedido #1042'}</span>
          <span>{tema === 'oficio' ? '38 €' : 'Recolha 20:15'}</span>
        </p>
        <span className="btn mk-mini__btn">{tema === 'oficio' ? 'Reservar' : 'Avançar status'}</span>
      </div>
      <figcaption>
        <strong>{titulo}</strong>
        <span>{legenda}</span>
      </figcaption>
    </figure>
  )
}

export function Marca() {
  return (
    <div className="mk">
      <div className="mk-minis">
        <MiniLoja tema="oficio" titulo="A loja que acabou de ver" legenda="Verde-garrafa, marfim e latão, com tipografia serifada." />
        <MiniLoja tema="undersoft" titulo="A identidade do sistema" legenda="Azul-noite e laranja, que é o que está a ler agora." />
      </div>
      <p className="mk-resumo">Cada negócio tem a sua identidade, e o sistema adapta-se a ela. Nesta página, a loja e o sistema têm identidades diferentes e convivem sem se misturar.</p>
    </div>
  )
}

/* 8. Pagamentos ------------------------------------------------------------ */
export function Pagamentos() {
  const [metodo, setMetodo] = useState(null)
  const [fase, setFase] = useState('idle') // idle | aguarda | ok
  const escolher = (m) => {
    setMetodo(m)
    setFase(m === 'mbway' ? 'idle' : 'ok')
  }
  const MET = [['mbway', 'MB WAY'], ['apple', 'Apple Pay'], ['google', 'Google Pay'], ['local', 'Pagar no local']]
  return (
    <div className="mk">
      <p className="mk-resumo">Total do pedido de exemplo: <strong>70&nbsp;€</strong></p>
      <div className="mk-chips" role="group" aria-label="Método de pagamento">
        {MET.map(([id, nome]) => (
          <button type="button" key={id} className="mk-chip" aria-pressed={metodo === id} onClick={() => escolher(id)}>
            {nome}
          </button>
        ))}
      </div>
      <div className="mk-pay" aria-live="polite">
        {metodo === 'mbway' && fase === 'idle' && (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              setFase('aguarda')
            }}
          >
            <label className="mk-campo mk-campo--largo">
              <span>Número do telemóvel</span>
              <input type="tel" inputMode="tel" autoComplete="off" placeholder="9XX XXX XXX" />
            </label>
            <button type="submit" className="mk-btn mk-btn--cheio">
              Enviar pedido de pagamento
            </button>
          </form>
        )}
        {metodo === 'mbway' && fase === 'aguarda' && (
          <div>
            <p>Pedido enviado à app MB WAY. À espera da aprovação…</p>
            <span className="mk-prog" aria-hidden="true">
              <motion.i initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 3, ease: 'linear' }} onAnimationComplete={() => setFase('ok')} />
            </span>
          </div>
        )}
        {fase === 'ok' && metodo && (
          <p className="mk-pay__ok">
            <Icon.Check size={18} />
            {metodo === 'local' ? 'Pagamento à chegada. O pedido segue como "a pagar no local".' : 'Pagamento aprovado. O pedido passa a pago e entra na fila.'}
          </p>
        )}
        {!metodo && <p>Escolha um método para ver o fluxo.</p>}
      </div>
    </div>
  )
}

/* 9. Cliente da casa ------------------------------------------------------- */
const ULTIMOS = [
  ['Corte de autor e barba com toalha quente', 70],
  ['Ritual Ofício', 62],
]

export function Cliente() {
  const [carimbos, setCarimbos] = useState(7)
  const [repetido, setRepetido] = useState(null)
  const cheio = carimbos >= 10
  return (
    <div className="mk mk-cli">
      <div>
        <h4>Cartão fidelidade</h4>
        <ol className="mk-cartao" aria-label={`${carimbos} de 10 carimbos`}>
          {Array.from({ length: 10 }, (_, i) => (
            <li key={i} data-on={i < carimbos || undefined}>
              {i < carimbos ? <Icon.Check size={16} /> : null}
            </li>
          ))}
        </ol>
        <p className="mk-resumo" aria-live="polite">
          {cheio ? 'Brinde desbloqueado: o próximo serviço é oferta.' : `Faltam ${10 - carimbos} carimbos para o brinde. Só contam os pedidos concluídos.`}
        </p>
        <button type="button" className="mk-btn" onClick={() => setCarimbos((c) => (c >= 10 ? 0 : c + 1))}>
          {cheio ? 'Recomeçar o cartão' : 'Concluir um pedido'}
        </button>
      </div>
      <div>
        <h4>Últimos pedidos</h4>
        <ul className="mk-ult">
          {ULTIMOS.map(([nome, total]) => (
            <li key={nome}>
              <span>{nome}</span>
              <span>{euro(total)}</span>
              <button type="button" className="mk-btn" onClick={() => setRepetido(nome)}>
                Pedir igual
              </button>
            </li>
          ))}
        </ul>
        <p className="mk-resumo" role="status">
          {repetido ? `Itens de "${repetido}" juntos num novo pedido.` : ''}
        </p>
      </div>
    </div>
  )
}

export const MOCKS = {
  pedidos: Pedidos,
  acompanhamento: Acompanhamento,
  agendamento: Agendamento,
  catalogo: Catalogo,
  relatorios: Relatorios,
  permissoes: Permissoes,
  marca: Marca,
  pagamentos: Pagamentos,
  cliente: Cliente,
}
