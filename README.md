# Arena Quiz

Desafio de perguntas entre grupos, com placar ao vivo, feito para o telão da sala.
Um mediador controla o app no computador projetado; os grupos respondem em voz
alta na sua vez e o mediador marca a resposta.

## Rodar

```bash
npm install
npm run dev        # http://localhost:5173
npm test
npm run build      # tsc + vite + service worker
```

## Como a partida funciona

- **Montagem** (`/nova`): escolha o assunto e os grupos (5 por padrão, de 2 a 8,
  com nome e cor). A ordem da lista é a ordem de jogo; "Sortear ordem" embaralha.
- **Vez**: cada pergunta vai para um grupo, em rodízio. Acertou, ganha os pontos
  da pergunta (fácil 10, média 20, difícil 30); errou, não pontua. A vez passa
  sempre.
- **Rodadas**: uma rodada é uma pergunta para cada grupo. Ao fim de cada rodada
  aparece o placar em tela cheia.
- **Fim**: a partida vai até acabarem as perguntas do assunto. Para todos
  jogarem o mesmo número de vezes, entram na partida só o maior múltiplo do
  número de grupos (ex.: 93 perguntas e 5 grupos = 90 perguntas, 18 rodadas).
  O mediador também pode encerrar antes. O resultado mostra o pódio.

O placar nunca é editado à mão: ele é derivado da lista de jogadas da partida.
"Desfazer" remove a última jogada.

## Atalhos na partida

`A`–`D` ou `1`–`9` escolhem a alternativa · `Enter` confirma/avança ·
`Z` desfaz · `F` tela cheia · discursivas: `C` acertou, `E` errou.

## Onde os dados moram

`localStorage`, semeado na primeira execução com 93 perguntas de Sistema
Reprodutor. Nenhuma tela conhece o `localStorage`: todo acesso passa pela
interface [`QuizRepository`](src/data/repository.ts). Para migrar para um banco
de verdade, implemente essa interface e passe a instância em
`<StoreProvider repository={...}>` em [App.tsx](src/App.tsx).

## Importar conteúdo

Página **Perguntas**, aba **Importar e backup**. Aceita backup JSON do próprio
app (mesclar ou substituir), o JSON do app antigo (`pergunta` / `alternativas` /
`resposta`) e CSV com `pergunta`, `tipo`, `alternativas`, `corretas`,
`resposta`, `explicacao`, `dificuldade`, `tags`.

## Design

Sistema visual em [DESIGN.md](DESIGN.md); contexto de produto em
[PRODUCT.md](PRODUCT.md).

## Regenerar assets

```bash
node scripts/gen-seed.cjs    # reconstrói src/data/seed.ts
node scripts/gen-icons.cjs   # reconstrói os PNGs do PWA a partir de public/icon.svg
```
