import { HOURS, SERVICES, SITE, addressLine } from '../data/site'

export const ALL = SERVICES.flatMap((c) => c.items)
export const byId = Object.fromEntries(ALL.map((i) => [i.id, i]))

export const euro = (n) => `${n} €`

export const hm = (min) => {
  const h = Math.floor(min / 60)
  const m = min % 60
  if (!h) return `${m} min`
  return m ? `${h}h${String(m).padStart(2, '0')}` : `${h}h`
}

export const totals = (ids) =>
  ids.reduce((t, id) => ({ price: t.price + byId[id].price, min: t.min + byId[id].min }), { price: 0, min: 0 })

const SEM = 'Sem preferência'
export const DIAS = ['O mais cedo possível', 'Esta semana', 'Na próxima semana', 'Ao sábado']
export const PERIODOS = [SEM, 'De manhã', 'À tarde', 'Ao fim da tarde']

export function waLink(ids, prefs) {
  const t = totals(ids)
  const msg = ids.length
    ? [
        `Olá, ${SITE.name}! Gostaria de marcar:`,
        ...ids.map((id) => `- ${byId[id].name} (${euro(byId[id].price)})`),
        `Total: ${euro(t.price)}, cerca de ${hm(t.min)}.`,
        `Quando: ${prefs.dia.toLowerCase()}.`,
        prefs.periodo !== SEM && `Período: ${prefs.periodo.toLowerCase()}.`,
        prefs.barbeiro !== SEM && `Barbeiro: ${prefs.barbeiro}.`,
        prefs.nome.trim() && `Nome: ${prefs.nome.trim()}.`,
        'Obrigado!',
      ]
        .filter(Boolean)
        .join('\n')
    : `Olá, ${SITE.name}! Gostaria de marcar um serviço. Que horários têm disponíveis?`
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(msg)}`
}

export const giftLink = () =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(`Olá, ${SITE.name}! Gostaria de oferecer um vale-presente. Que opções têm?`)}`

export const mapsLink = () => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressLine())}`
export const wazeLink = () => `https://waze.com/ul?q=${encodeURIComponent(addressLine())}&navigate=yes`

// --- Estado do horário, sempre na hora de Lisboa ---
const NOME_DIA = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado']
const WD = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }
const toMin = (hhmm) => {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}

export function lisbonNow(date = new Date()) {
  const p = Object.fromEntries(
    new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Lisbon', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })
      .formatToParts(date)
      .map((x) => [x.type, x.value]),
  )
  return { day: WD[p.weekday], min: Number(p.hour) * 60 + Number(p.minute) }
}

export function openStatus(date) {
  const { day, min } = lisbonNow(date)
  const hoje = HOURS[day]
  if (hoje && min >= toMin(hoje[0]) && min < toMin(hoje[1])) return { open: true, day, text: `Aberto agora, até às ${hoje[1]}` }
  for (let i = 0; i < 7; i++) {
    const d = (day + i) % 7
    const h = HOURS[d]
    if (!h || (i === 0 && min >= toMin(h[1]))) continue
    const quando = i === 0 ? 'hoje' : i === 1 ? 'amanhã' : d === 6 ? 'no sábado' : `na ${NOME_DIA[d]}`
    return { open: false, day, text: `Fechado. Abrimos ${quando} às ${h[0]}` }
  }
  return { open: false, day, text: 'Fechado' }
}
