# Notas de estilo — referência brigadeoverland.com

## Fontes (extraídas do CSS real, app.CTQ2rFXH.min.css)
- Headings: "Special Gothic Condensed One" 400, UPPERCASE, line-height 1. Disponível no Google Fonts (sem substituição necessária).
- Corpo: "Geist" 400/600. Disponível no Google Fonts (sem substituição necessária).
- Escala real do Brigade: h1 3.25rem até 4.75rem; h2 1.75rem até 3.5rem.

## Cores do Brigade (mapeamento para Açomóveis)
- --color-1 (acento): #b43c32 -> Açomóveis #D02621
- --color-2 (tinta escura): #1a1a1a -> grafite #212121
- Fundos claros: branco e off-white -> #FFFFFF e #F4F4F4
- Tipografia body/heading/label: #1a1a1a

## Componentes
- Botão: pill (border-radius máximo), uppercase, 11-12px, semibold, letter-spacing widest, padding 16-18px x 22-25px. Variante sólida (fundo escuro) e ghost (borda 15% de opacidade).
- Eyebrow/label: texto pequeno, line-height 1.
- Hero: foto full-bleed com headline condensada gigante em cima, CTA pill.
- Grids de cards de produto com fotos grandes, espaçamentos generosos.
- Seções alternando branco / off-white / blocos escuros com foto.

## Conteúdo real raspado de acomoveis.com.br
- Comercial: (21) 98318-0196 (WhatsApp wa.me/5521983180196)
- Central: (21) 2671-0165 e (21) 2671-0566
- Fábrica: Av. Monte Castelo, 128, Jardim Gramacho, Duque de Caxias, RJ, 25055-120
- Escritório SP: Rua Maria Curupaiti, 441 Sala 3001/3002 Torre G, Santana, São Paulo, SP, 02452-001
- Instagram: instagram.com/acomoveis
- Números: 40+ anos, 10K+ clientes, 5k+ produtos
- Selos: BNDES, PROGER, ISO 9001
- Segmentos/produtos: Supermercado, Checkout, Bazar e Utilidades, Papelaria e Brinquedos, Farma e Beleza, Loja Conceito, Eletro, Magazine, Pet Shop, Aviamento, Doces, Armazenagem (porta-pallets, estantes, mezaninos), Display, Home Center.

## Steel Wood
- Linha premium aço + madeira. NÃO existe no site atual (busca WP vazia); imagens geradas via Higgsfield gpt_image_2 (sw-*.jpg).

## Imagens
- 75 arquivos reais raspados em assets/img (comprimidos 1600px q85).
- Geradas por IA: linha Steel Wood (3) + textura de aço (1).

## Tokens do Brigade (extraídos do CSS compilado app.CTQ2rFXH.min.css em 26/08)

### Cores exatas
- Fundo creme: `#e7e6dd` (--color-3-1) — usado exato como --cream
- Tinta/painéis: `#1a1a1a` (--color-2), variação `#252525` (--color-2-1)
- Acento: `#b43c32` (--color-1) -> Açomóveis `#D02621`
- Verde escuro `#323c32` e azul `#2d4650` (bg-4/bg-5, painéis) -> grafite `#232323`
- Bege `#beb69e` (--color-3), cinza quente `#7d786e` (--color-3-2)
- Hairlines: `#1a1a1a26` (15%) e `#1a1a1a33` (20%)

### Tipografia
- Headings: Special Gothic Condensed One 400; h1 3.25rem -> 4.75rem (passos 3.25/3.875/4.125/4.75); h2 1.75 -> 3.5rem; h3 1.5 -> 2.875rem
- Body: Geist 400/600 (woff2 próprios); labels 11px semibold uppercase
- Tracking: wider .05em, widest .1em (botões usam widest)

### Componentes
- Radius: lg .938rem (15px, cards/fotos), md .313rem, sm .188rem, botões pill (2147483647px)
- Botões: 11px, semibold, uppercase, tracking .1em, padding ~17x25
- Easing padrão: cubic-bezier(.4,0,.2,1) .2s; "ease-fancy": cubic-bezier(.165,.84,.44,1) (.2s hover, .8s entradas)
- Header: --header-height 58.44px mobile / 75.05px desktop; --outer-padding 1.625rem / 2.5rem

### Hero split (proporção real)
- Painel texto: 35.777% / foto: 64.222% (classes w-[35.77...%] / w-[64.22...%])

### Pattern topográfico
- No Brigade é asset SVG próprio (pattern-swirls.CZQFBFTy.min.svg, aplicado via .bg-swirls como background-image repetido)
- NÃO copiado: recriado pattern topográfico próprio equivalente em SVG inline (data URI --topo no style.css), traço 1px, opacidade baixa sobre painéis escuros
