// Todo o conteúdo do site vive aqui. Tudo marcado como EXEMPLO é fictício e deve
// ser substituído pelos dados reais da barbearia antes de publicar (ver projeto.md).

export const SITE = {
  name: 'Ofício', // EXEMPLO
  tagline: 'Barbearia de autor',
  url: 'https://oficio.example.pt', // EXEMPLO: domínio real
  phone: '+351 912 345 678', // EXEMPLO
  phoneHref: '+351912345678',
  whatsapp: '351912345678', // EXEMPLO: número com indicativo, sem "+"
  instagram: 'oficio.barbearia', // EXEMPLO
  address: { street: 'Rua do Ofício, 12', postal: '1200-000', city: 'Lisboa' }, // EXEMPLO
  payments: 'MB WAY, Apple Pay, Google Pay e pagamento no local',
}

export const addressLine = () => {
  const a = SITE.address
  return `${a.street}, ${a.postal} ${a.city}`
}

// Índice = dia da semana (0 = domingo). null = fechado. Horário de Lisboa.
export const HOURS = [null, null, ['10:00', '20:00'], ['10:00', '20:00'], ['10:00', '20:00'], ['10:00', '20:00'], ['09:30', '18:00']] // EXEMPLO
export const HOURS_ROWS = [
  ['Terça a sexta', '10:00 às 20:00'],
  ['Sábado', '09:30 às 18:00'],
  ['Domingo e segunda', 'Fechado'],
]

export const SERVICES = [
  {
    id: 'cabelo',
    title: 'Cabelo',
    note: 'Sempre com consulta e lavagem.',
    items: [
      { id: 'corte-autor', name: 'Corte de autor', price: 38, min: 45, desc: 'Consulta, lavagem, corte à tesoura ou máquina e finalização com pomada de cera de abelha.' },
      { id: 'degrade', name: 'Degradê e acabamento à navalha', price: 40, min: 50, desc: 'Transições limpas, contornos desenhados à navalha e toalha quente no final.' },
      { id: 'corte-junior', name: 'Corte júnior', price: 24, min: 30, desc: 'Até aos 12 anos. Paciência incluída.' },
    ],
  },
  {
    id: 'barba',
    title: 'Barba',
    note: 'Lâmina nova para cada cliente.',
    items: [
      { id: 'barba-toalha', name: 'Barba com toalha quente', price: 32, min: 35, desc: 'Vapor, óleo de pré-barba, espuma de pincel e navalha. Termina com bálsamo de cedro.' },
      { id: 'barba-aparar', name: 'Aparar e desenhar', price: 22, min: 25, desc: 'Forma, comprimento e contornos, com tesoura e máquina.' },
      { id: 'bigode', name: 'Bigode e contornos', price: 14, min: 15, desc: 'Para manter entre visitas.' },
    ],
  },
  {
    id: 'rituais',
    title: 'Rituais',
    note: 'Menus pensados para serem vividos sem relógio.',
    items: [
      { id: 'ritual-oficio', name: 'Ritual Ofício', price: 62, min: 85, desc: 'Corte de autor e barba com toalha quente, servidos com uma bica ou um Porto. Poupa 8 €.' },
      {
        id: 'degustacao',
        name: 'Menu de Degustação',
        price: 95,
        min: 120,
        featured: true,
        desc: 'Os cinco tempos por inteiro: bebida de boas-vindas, vapor, corte, navalha, máscara de argila, massagem de cabeça e finalização com óleos.',
      },
      { id: 'noivo', name: 'Ritual do Noivo', price: 140, min: 150, desc: 'Menu de Degustação com ensaio de penteado. Sob marcação, com 15 dias de antecedência.' },
    ],
  },
  {
    id: 'extras',
    title: 'Extras',
    note: 'Juntam-se a qualquer serviço.',
    items: [
      { id: 'mascara', name: 'Máscara facial de argila', price: 15, min: 15, desc: 'Limpeza profunda, com toalha morna.' },
      { id: 'massagem', name: 'Massagem de cabeça', price: 15, min: 15, desc: 'Quinze minutos para largar o dia.' },
      { id: 'cor-barba', name: 'Coloração de barba', price: 25, min: 25, desc: 'Cobertura natural dos brancos, sem efeito de tinta.' },
    ],
  },
]

export const RITUAL = [
  { title: 'Receção', text: 'Uma bica ou um Porto, e uma conversa sobre o que quer. Sem pressas e sem ecrãs.' },
  { title: 'Vapor', text: 'Toalha quente com cedro e bergamota. Abre os poros e amacia a barba antes de qualquer lâmina.' },
  { title: 'Corte', text: 'Tesoura e pente, com o tempo que a forma pede. Cada corte é desenhado para o seu rosto.' },
  { title: 'Navalha', text: 'Espuma de pincel, lâmina nova e uma passagem que se ouve. É o momento de que os clientes mais falam.' },
  { title: 'Finalização', text: 'Bálsamo, óleo e um espelho. Só no fim lhe mostramos o resultado.' },
]

export const TEAM = [
  { nome: 'Duarte Lemos', papel: 'Mestre-barbeiro e fundador', nota: 'Navalha e barbas clássicas. Aprendeu o ofício em Lisboa e afinou-o em Londres.' }, // EXEMPLO
  { nome: 'Inês Calado', papel: 'Cortes e acabamentos', nota: 'Tesoura, textura e cabelo comprido. A mão mais calma da casa.' }, // EXEMPLO
  { nome: 'Tomás Serra', papel: 'Degradês e cabelo jovem', nota: 'Transições impecáveis e um olho enorme para o detalhe.' }, // EXEMPLO
]

// EXEMPLO: avaliações fictícias de uma loja de demonstração.
export const REVIEWS = [
  { text: 'Fui por curiosidade e saí a querer marcar a próxima visita. A toalha quente e a navalha são outro nível.', nome: 'Ricardo M.' },
  { text: 'Percebe-se que ninguém tem pressa. Falaram comigo antes de pegar na tesoura e acertaram à primeira.', nome: 'André S.' },
  { text: 'Ofereci o Menu de Degustação ao meu pai no Dia do Pai. Ainda hoje fala disso.', nome: 'Marta F.' },
]

export const FAQ = [
  { q: 'Preciso de marcar?', a: 'Recomendamos. Aceitamos clientes sem marcação quando há cadeira livre, mas os rituais pedem reserva. A forma mais rápida é fechar a comanda neste site.' },
  { q: 'Como posso pagar?', a: `${SITE.payments}. Emitimos fatura com NIF, basta pedir.` },
  { q: 'E se me atrasar?', a: 'Temos 10 minutos de tolerância. Depois disso adaptamos o serviço ou reagendamos, para não prejudicar quem vem a seguir.' },
  { q: 'Posso cancelar ou alterar a marcação?', a: 'Sem qualquer custo até 12 horas antes, por WhatsApp ou telefone.' },
  { q: 'Os produtos que usam estão à venda?', a: 'Sim. As pomadas, os óleos e os bálsamos de autor estão disponíveis na receção. Experimentamos sempre primeiro.' },
  { q: 'Têm vales-presente?', a: 'Sim, com o valor que quiser, em cartão ou digital. Peça por WhatsApp e tratamos do resto.' },
]

