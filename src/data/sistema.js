// Capacidades do sistema Undersoft Commerce mostradas no demo.
// O texto de benefício vem da página negocios.undersoft.pt. O campo `real` diz, sem exagero, o que
// existe hoje no Commerce e na StaraStore (conferido no código e na documentação em 09/10/2026).

export const ORIGEM = {
  producao: 'Em produção',
  stara: 'Em produção na StaraStore',
  misto: 'Parte em produção',
  servico: 'Feito pela Undersoft',
}

export const CAPACIDADES = [
  {
    id: 'pedidos',
    titulo: 'Pedidos num só lugar',
    resumo: 'Um quadro, sem conversas perdidas',
    cobre: 'Pedidos organizados, pedido estruturado, fluxo de estados',
    beneficio: 'Cada pedido chega estruturado: itens, adicionais, quantidades e total calculado. A equipa vê todos num quadro e avança o estado, de solicitado a concluído.',
    origem: 'producao',
    real: 'No sistema real: quadro de pedidos com cor por estado, histórico com hora de cada mudança e nomes de estados configuráveis por empresa. O quadro atualiza por consulta periódica (cerca de 20 s), não em tempo real.',
  },
  {
    id: 'acompanhamento',
    titulo: 'O cliente acompanha',
    resumo: 'Link único e avisos',
    cobre: 'Acompanhamento do pedido, avisos ao cliente',
    beneficio: 'O cliente consulta o estado pelo seu link e recebe aviso de cada mudança. Menos "já está pronto?" no WhatsApp.',
    origem: 'producao',
    real: 'No sistema real: página /pedido/:token com histórico, notificação push a cada mudança de estado e aviso por WhatsApp quando o pedido é criado ou agendado. O aviso de "pronto" por WhatsApp está previsto na base de dados, mas ainda não é enviado.',
  },
  {
    id: 'agendamento',
    titulo: 'Pedidos agendados',
    resumo: 'O pedido entra na fila na hora certa',
    cobre: 'Pedidos agendados',
    beneficio: 'O cliente escolhe quando quer ser atendido ou levantar, e o pedido entra na operação no momento certo, sem bagunçar a fila.',
    origem: 'producao',
    real: 'No sistema real: escolha de dia e hora, horários já ocupados e ativação do pedido na hora marcada. Os horários de exemplo abaixo são ilustrativos.',
  },
  {
    id: 'catalogo',
    titulo: 'Catálogo, regras e stock',
    resumo: 'Preços, limites e esgotados sob controlo',
    cobre: 'Cardápio e preços, regras de compra, controlo de stock',
    beneficio: 'Atualize produtos, preços e disponibilidade sem reenviar listas. Defina limites e adicionais permitidos. Ative o stock só onde fizer sentido: o item esgota sozinho.',
    origem: 'producao',
    real: 'No sistema real: catálogo editável, grupos de adicionais com mínimo e máximo, indisponibilidade e stock opcional por produto e variação. Regras como "combinação proibida" são desenhadas à medida na implementação.',
  },
  {
    id: 'relatorios',
    titulo: 'Histórico e relatórios',
    resumo: 'Vendas, horas de pico, clientes que voltam',
    cobre: 'Histórico e relatórios',
    beneficio: 'Veja pedidos, produtos mais vendidos, horários de pico e clientes que voltam a comprar. Os números ajudam a decidir.',
    origem: 'producao',
    real: 'Os números abaixo são de exemplo. No sistema real são calculados a partir dos pedidos da empresa.',
  },
  {
    id: 'permissoes',
    titulo: 'Permissões por pessoa',
    resumo: 'Cada pessoa vê só o que precisa',
    cobre: 'Permissões por pessoa',
    beneficio: 'O proprietário mantém o controlo enquanto os funcionários operam apenas as funções necessárias.',
    origem: 'producao',
    real: 'No sistema real há dois níveis, proprietário e equipa. A equipa não edita os itens de um pedido nem confirma pagamentos, a menos que o proprietário lhe dê essa permissão. Outras restrições são definidas na implementação.',
  },
  {
    id: 'marca',
    titulo: 'Visual feito para a marca',
    resumo: 'Cores, layout e imagens da sua empresa',
    cobre: 'Visual feito para a sua marca',
    beneficio: 'O sistema não é entregue com um visual genérico. Layout, cores e imagens são pensados para cada negócio.',
    origem: 'servico',
    real: 'A identidade é desenhada pela Undersoft na implementação (passo 2 da adesão). Não existe um editor de tema no painel: não é algo que o empresário configure sozinho.',
  },
  {
    id: 'pagamentos',
    titulo: 'Pagamentos no pedido',
    resumo: 'MB WAY, Apple Pay e Google Pay',
    cobre: 'Pagamentos no fluxo do pedido',
    beneficio: 'O pagamento acontece dentro do fluxo de compra, sem checkout externo confuso, em dispositivos compatíveis.',
    origem: 'stara',
    real: 'Na StaraStore: MB WAY (com a EuPago), Apple Pay e Google Pay ativáveis loja a loja. No Commerce a rota de pagamento existe, mas o checkout ainda não a chama. A aprovação abaixo é uma simulação.',
  },
  {
    id: 'cliente',
    titulo: 'Cliente da casa',
    resumo: 'Fidelidade e "pedir igual"',
    cobre: 'Clientes recorrentes, fidelidade',
    beneficio: 'Quem volta é recompensado e repete um pedido em dois toques.',
    origem: 'misto',
    real: 'O cartão fidelidade "a cada 10, o 11.º é grátis" existe na StaraStore, não no Commerce (que tem outro sistema de progressão). "Pedir igual" existe no perfil do cliente.',
  },
]

// Passos da adesão (texto da página negocios.undersoft.pt).
export const ADESAO = [
  ['Reunião inicial', 'Alinhamos o funcionamento do negócio, o fluxo atual dos pedidos e o que deve ou não ficar disponível para o cliente.'],
  ['Identidade visual e layout', 'Definimos paleta de cores, estilo visual e o layout da loja. O projeto é personalizado para a marca.'],
  ['Produtos e imagens reais', 'O catálogo é configurado com os produtos do negócio, com fotografias reais, se quiser.'],
  ['Regras de compra e operação', 'Definimos quantidades, adicionais, combinações, limites, esgotados e agendamentos.'],
  ['Stock e pagamentos', 'Ativamos o controlo de stock e o pagamento online com MB Way, Apple Pay e Google Pay, se fizer sentido.'],
  ['Publicação', 'Depois da configuração e validação, a loja fica disponível, normalmente em 5 a 10 dias úteis.'],
]

export const UNDERSOFT = {
  nome: 'Undersoft',
  tel: '+351 912 508 157',
  telHref: '+351912508157',
  email: 'contacto@undersoft.pt',
  site: 'https://undersoft.pt',
  paginaComercial: 'https://negocios.undersoft.pt/',
  local: 'Tarouca, Viseu',
}
