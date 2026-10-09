# Projeto: Ofício, a loja que revela ser uma demonstração do Undersoft Commerce

> Última atualização: 09/10/2026

Site estático, em português de Portugal, em **duas partes com identidades separadas**:

1. **A loja (Ofício)**: uma barbearia de autor de Lisboa, completa e imersiva, na sua identidade própria (verde-garrafa, marfim, latão, Bodoni). Não tem nada do sistema por cima.
2. **A demonstração (Undersoft)**: depois do rodapé da loja, a página revela que "esta loja não existe", muda para a identidade da Undersoft (azul-noite e laranja) e mostra o que o sistema Undersoft Commerce faz por baixo, em telas ilustrativas, seguido da adesão.

**O que este projeto não é:** não implementa as funcionalidades do sistema. Não há backend, painel funcional, banco de dados nem pagamentos. As telas do capítulo do sistema são ilustrações interativas com estado local, que não gravam nada. Esta delimitação foi pedida expressamente pelo utilizador.

Todo o conteúdo da loja (nome, morada, preços, equipa, avaliações) é **fictício**. A página assume-o logo a seguir à loja (secção 4).

---

## 1. Estado atual e pendências

**Feito e verificado tecnicamente (09/10/2026):**
- Estrutura em duas partes, com identidades que não se misturam (provado por varredura automática, secção 8).
- Revelação ("Esta loja não existe") e navegação própria do sistema, que substitui a da loja quando a demonstração começa.
- Capítulo "O que o sistema faz" com 9 abas cobrindo as 12 funcionalidades da página comercial da Undersoft, com selo de origem honesto.
- Secção de adesão, 6 passos, contactos da Undersoft.
- `npm run build` e `npm run lint` limpos (restam 2 avisos de *fast refresh*, sem efeito); testes funcionais automáticos no Edge sem erros de consola.

**Pendente, e é seu:**
1. **Validação visual** (por regra, manual). Pontos a olhar em 8.3.
2. **Confirmar as afirmações sobre o sistema real** (secção 5). Foram tiradas da leitura do código e da documentação em 09/10/2026, não de testes contra produção.
3. Decidir o que fazer com a demo: hoje corre só em local. Não foi publicada, e não houve commit, push nem deploy.

## 2. História do pedido (para não repetir os erros)

1. **Pedido:** "utilize essa estrutura pronta, porém com as cores tema da Undersoft, para utilizar como demonstração das funcionalidades do sistema, baseado na StaraStore e no undersoft-commerce".
2. **Primeira correção do utilizador:** *"não é para fazer a funcionalidade, é para demonstrar as capacidades do sistema"*. O âmbito caiu de "mini-sistema simulado" (plano de um subagente Opus) para uma vitrine de telas ilustrativas.
3. **Segunda correção do utilizador:** *"está tudo misturado com a Ofício, partes Undersoft, partes Ofício; a ideia de ter a Ofício no início e depois informar que é um demonstrativo é boa, mas está mal feita"*. A primeira versão tratava o Undersoft como tema padrão da página toda, com uma faixa de demonstração fixa no topo, notas dentro da loja e um interruptor global de marca. Isso foi **desfeito**: a loja ficou 100 % Ofício e a demonstração 100 % Undersoft.

## 3. As duas identidades

**Princípio:** a loja e o sistema têm identidades diferentes e convivem sem se misturar. Implementação em `src/theme.css`, com tokens por *papel* (base, alt, destaque...) e não por cor, para os componentes não saberem em que identidade estão:

- `:root` e `.tema-oficio` guardam a identidade da **loja**.
- `.chrome` e `.tema-undersoft` guardam a do **sistema**. A classe `.chrome` está no invólucro `#demonstracao` e em cada secção do sistema.
- `.tema-*` existem para mostrar as duas lado a lado (aba "Visual feito para a marca").

| Papel | Loja (Ofício) | Sistema (Undersoft) |
|---|---|---|
| Fundo (html, rodapé, barras) | `#0a1511` | `#050a12` |
| Superfície principal | `#12271f` verde-garrafa | `#0b111c` |
| Superfície alternada | `#e7e1ce` marfim (o "papel" da carta) | `#111a27` |
| Texto / atenuado | `#e7e1ce` / `.68` | `#f7f8fa` / `#a6afbc` |
| Acento | `#b8914a` latão (`#7c5b22` sobre marfim) | `#ff5a0a` laranja |
| Botão primário | latão sólido, texto `#0a1511` | gradiente `#ff8a22 → #ff5a0a → #ff3c00`, texto `#0b0c0e`, sombra laranja |
| Destaque | bordô `#5e1b26` | o gradiente laranja, com texto **escuro** |
| Tipografia | Bodoni Moda (títulos) e Instrument Sans | só Instrument Sans |
| Grão de filme | ligado (.07) | desligado |

**Fonte do tema Undersoft:** o CSS de `negocios.undersoft.pt` tem **dois** blocos `:root`; o segundo ("Identidade visual Undersoft") sobrepõe o primeiro e é o que vale. Um resumo automático da página tinha dito "teal/ciano", o que estava errado: o acento da marca é o laranja. O `undersoft_apresentacao` usa o mesmo laranja. Os dois temas têm contrastes calculados (WCAG): todos os pares de texto ≥ 4,5:1 e bordas de controlos ≥ 3:1. **Texto branco sobre o laranja é proibido** (2,94:1); sobre o laranja só entra texto escuro.

**Como a passagem acontece** (`src/App.jsx`):
- Um `IntersectionObserver` olha para `#demonstracao` (que vai da revelação ao fim da página) e marca `html[data-parte]` como `loja` ou `demo`.
- Em `demo`: a navegação da loja sai de cena (`.nav--oculta`), a barra de ação da loja desaparece, o grão de filme desliga-se e a navegação do sistema (`NavSistema`: logótipo, "O que o sistema faz", "Como aderir", "Voltar à loja", "Falar connosco") entra com Motion.
- Ao voltar para cima, tudo reverte.
- A fonte do tema muda **por região, não por alternância global**: não existe nenhum interruptor de marca.

## 4. Estrutura da página

**Parte 1, a loja (Ofício):** navegação flutuante → topo → A carta → O ritual (fixo no scroll) → Mestres → Avaliações → Vale-presente → Visita → Dúvidas → rodapé ("Loja de demonstração criada com o Undersoft Commerce.", a primeira pista, discreta).

**Parte 2, a demonstração (Undersoft):**
- **A revelação:** "Esta loja não existe." Explica que o Ofício é uma demonstração construída com o Undersoft Commerce e risca o que é fictício: o nome, a morada, os preços, a equipa, as avaliações. Dois caminhos: "Ver o que o sistema faz" e "Voltar à loja".
- **O que o sistema faz:** um **carrossel horizontal** com 9 cartões. O cartão escolhido desliza sempre para a esquerda e os seguintes ficam à vista; isso vale para o clique, para as setas do teclado (Home, End incluídos) e para os botões "anterior/seguinte" (com o contador "n de 9"). O último cartão também chega à esquerda (a faixa tem um espaço no fim). Por baixo, o painel em largura total traz título, selo de origem, benefício, tela ilustrativa e a nota "no sistema real". Em ecrãs de toque a faixa também se arrasta com o dedo, com ajuste ao cartão mais próximo.
- **Quero isto no meu negócio:** os 6 passos de adesão da página comercial, o prazo (5 a 10 dias úteis), os contactos da Undersoft (+351 912 508 157, contacto@undersoft.pt, undersoft.pt, Tarouca, Viseu) e um rodapé curto.

**Primeira impressão:** o título da aba, a descrição e o favicon são os da loja Ofício. Quem abrir o link vê primeiro uma barbearia. A página tem `noindex` e `robots.txt` com `Disallow`, e não declara dados estruturados: uma barbearia fictícia não deve aparecer no Google como real. Se partilhar o link e a pré-visualização mostrar "Ofício, barbearia de autor", é por desenho; mude em `index.html` se preferir que anuncie a demonstração.

## 5. O que o sistema faz de verdade (e o que é simulação)

Fontes: `undersoft-commerce/PROJETO.md` e `worker/src/*.ts`, `StaraStore/PROJETO.md`, `sr.silva`, e a página comercial. **Conferido em 09/10/2026 por leitura, não por teste em produção.**

| Aba | Funcionalidades da Undersoft que cobre | Selo | No sistema real |
|---|---|---|---|
| Pedidos num só lugar | Pedidos num só lugar, menos erros de anotação, fluxo de estados | Em produção | Quadro com cor por estado, histórico com hora, estados configuráveis. **Atualiza por consulta periódica (~20 s), não em tempo real** |
| O cliente acompanha | Cliente acompanha, avisos | Em produção | `/pedido/:token`, push a cada mudança de estado, WhatsApp **só** ao criar/agendar. **O aviso de "pronto" por WhatsApp está previsto na base de dados (`dispara_whatsapp`), mas nenhum código o envia** |
| Pedidos agendados | Pedidos agendados | Em produção | Dia/hora, horários ocupados, ativação na hora marcada |
| Catálogo, regras e stock | Cardápio e preços, regras de compra, stock | Em produção | CRUD, grupos de adicionais com mínimo/máximo, indisponibilidade, stock opcional. **"Combinação proibida" não existe como regra pronta**: é desenhada à medida |
| Histórico e relatórios | Histórico e relatórios | Em produção | Calculado dos pedidos da empresa. Os números mostrados são de exemplo |
| Permissões por pessoa | Permissões por pessoa | Em produção | Dois níveis (proprietário, equipa). A equipa não edita itens de pedidos nem confirma pagamentos, a menos que o proprietário dê a permissão |
| Visual feito para a marca | Visual feito para a sua marca | **Feito pela Undersoft** | A identidade é desenhada na implementação (passo 2 da adesão). **Não existe editor de tema no painel** |
| Pagamentos no pedido | Pagamentos no fluxo do pedido | Em produção na StaraStore | MB WAY (EuPago), Apple Pay e Google Pay ativáveis loja a loja. **No Commerce a rota existe, mas o checkout ainda não a chama.** A aprovação mostrada é simulada |
| Cliente da casa | Clientes recorrentes, fidelidade | Parte em produção | O cartão "a cada 10, o 11.º é grátis" é da StaraStore; **o Commerce não o tem**. "Pedir igual" existe no perfil |

A comanda da loja abre o **WhatsApp**, que é o fluxo de uma barbearia *sem* o sistema. Não há nota a dizer o contrário dentro da loja: a revelação é que explica o contraste.

## 6. Stack e integração

| Camada | Uso |
|---|---|
| Frontend Design | Duas identidades separadas; regras anti-genérico mantidas na loja (sem rótulos em maiúsculas, sem cartões idênticos, sem setas nos botões) |
| GSAP + ScrollTrigger | Entrada do topo, revelação dos títulos (inclui o da revelação), ritual fixo. O capítulo do sistema avisa o ScrollTrigger quando muda de altura (`ResizeObserver` + `refresh()`) |
| Motion | Navegação do sistema (entrada/saída), abas (`layoutId`), troca de painel, quadro de pedidos (`layout` entre colunas), avisos, progresso do MB WAY simulado |
| Integração | Cada propriedade tem um único dono; estado partilhado pequeno em Zustand (comanda e aba aberta) |
| Three.js / R3F | Instalados e não usados |

Sem dependências novas nesta fase.

## 7. Ficheiros

```
index.html              título/descrição/favicon da loja; noindex; sem JSON-LD
public/                 favicon (Ofício), undersoft-logo.png (reduzido, 18 kB), robots.txt (Disallow)
src/
  theme.css             tokens por papel: loja (raiz), sistema (.chrome), .tema-* para comparações
  styles.css            componentes da loja + regras da passagem (html[data-parte], .nav--oculta)
  sistema.css           navegação do sistema, revelação, capítulo, telas (mk-*), adesão, rodapé
  data/site.js          conteúdo da loja de exemplo
  data/sistema.js       as 9 capacidades, selos, passos de adesão, contactos da Undersoft
  store.js              comanda + aba aberta
  components/           da loja: Nav, Hero, Carta, Ritual, Mestres, Provas, Presente, Visita, Faq, Footer, ActionBar, Sheet, ui
                        do sistema: NavSistema, Revelacao, Sistema, sistema/mocks.jsx, Adesao
```

## 8. Verificação

### 8.1 Técnica
- `npm run build` (cliente, servidor, pré-render) e `npm run lint`: sem erros.
- Peso: JS ≈ 531 kB (178 kB gzip), CSS ≈ 44 kB (10 kB gzip).

### 8.2 Funcional (teste automático no Edge via DevTools Protocol, sem erros ou avisos de consola em nenhuma passagem, o que inclui a hidratação do HTML pré-renderizado)
- **Varredor de mistura de identidades** (cores calculadas de cada elemento): na loja, **401 elementos e nenhuma cor do Undersoft**; na demonstração, **142 elementos e nenhuma cor do Ofício** (fora das miniaturas de comparação, que mostram as duas de propósito).
- **Passagem:** ao chegar à revelação, `html[data-parte]` passa a `demo`, a navegação da loja fica oculta, a do sistema aparece, a barra de ação da loja sai, o grão fica a 0 e o fundo do html muda. "Voltar à loja" reverte tudo.
- **A loja continua inteira:** comanda, mensagem de WhatsApp em pt-PT, Esc, ritual fixo (passo 0 → 4), barra de ação, sem faixa nem notas de demonstração.
- **Carrossel:** em 1440, 1000 e 390 px, cada um dos 9 cartões, clicado para a frente, para trás e em saltos longos, fica alinhado à esquerda (desvio 0 px) com o seguinte à vista; o movimento desliza (não salta); botões anterior/seguinte, Home, End e setas do teclado também; sem animação com movimento reduzido; a página não rola ao clicar.
- **As 9 abas** selecionam, com o selo certo. Interações: quadro de pedidos, estado do acompanhamento e push, agendamento, stock a zero marca "Esgotado", limite de 2 extras, relatórios por período, permissões, MB WAY simulado, fidelidade. Teclado nas abas (setas, End, circular).
- **Mobile 390 px:** sem scroll horizontal em nenhuma aba; a navegação do sistema cabe (rótulos curtos em ecrã estreito); "Voltar à loja" volta ao topo.
- **Movimento reduzido:** nada escondido, sem máscaras de texto, sem pin, poste parado.

O Edge headless suspende animações sem as flags `--disable-features=CalculateNativeWinOcclusion --disable-renderer-backgrounding --disable-backgrounding-occluded-windows --disable-background-timer-throttling`; sem elas o teste dá falsos negativos. **Teste cada largura numa sessão nova do navegador:** recarregar com outras métricas de ecrã na mesma sessão faz a página reagir com um passo de atraso e gera falhas que não existem no site.

### 8.3 Fica para si
Validação visual, por regra manual. Olhe com atenção para:
1. **O momento da passagem.** Rolar do rodapé da loja até "Esta loja não existe." A mudança de verde para azul-noite e laranja, o desaparecimento do grão e a troca de navegação têm de parecer uma revelação, não um erro. É a parte de maior risco.
2. **A revelação em si:** o tamanho do título, a lista riscada ("o nome, a morada...") e se o laranja dos botões pesa.
3. **A loja pura**: confirmar que agora lê como uma barbearia coerente, do topo ao rodapé, sem vestígios do sistema.
4. **As telas ilustrativas** (quadro de pedidos, gráfico de horas, permissões) e a aba "Visual feito para a marca" com as duas miniaturas lado a lado.
5. **A navegação do sistema** no telemóvel (logótipo + "Loja" + "Contactar").

**Não verificado por mim:** Safari/iOS e Firefox, Lighthouse e Core Web Vitals reais, leitor de ecrã real.

## 9. Como usar

```bash
npm install
npm run dev       # http://localhost:5173 (sem pré-render)
npm run build     # produção: cliente + servidor + pré-render em dist/
npm run preview   # servir o dist/ em http://localhost:4173
npm run lint
```

## 10. Riscos e decisões em aberto

- **O servidor de desenvolvimento no Windows pode ficar com um módulo em cache** se um arquivo for reescrito de forma não atómica (aconteceu com `store.js`). Sintoma: "does not provide an export named". Reinicie o `npm run dev`.
- **A revelação depende do scroll**: quem usar o link `#sistema` ou `#adesao` entra direto na parte 2 e vê a navegação do sistema, mas sem ter passado pela loja. É aceitável (a revelação continua logo acima).
- **As afirmações "no sistema real"** envelhecem. Se o Commerce passar a enviar o aviso de "pronto" por WhatsApp, ligar o checkout ao pagamento ou ganhar fidelidade, atualize `src/data/sistema.js` e a tabela da secção 5.
- **Logótipo e contactos da Undersoft** foram tirados do site da própria Undersoft. Confirme que são os que quer mostrar.
- **Se o exemplo devesse ser de outro setor** (restauração, por exemplo), o conteúdo está todo em `src/data/`. Mas o conceito "loja primeiro, revelação depois" aguenta qualquer setor.
- **Peso:** 178 kB gzip de JS. Aceitável para uma demo.
