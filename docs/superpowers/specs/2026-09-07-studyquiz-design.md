# StudyQuiz — design

Data: 2026-09-07
Status: implementado (fases 1–5)

## Problema

O app anterior (`perguntas-ludo`) é HTML/JS puro com Firebase, mono-assunto
(fisiologia endócrina), com o conteúdo num `perguntas.json` estático e um único
flag `respondida: bool` por pergunta. Não há como cadastrar assunto novo, editar
pergunta pela interface, medir desempenho nem revisar o que se errou.

## Decisões estruturantes

### 1. Persistência trocável, mock agora

Os dados são mockados em `localStorage` por decisão do usuário; o banco real
fica para depois. Para que essa troca não custe uma reescrita, todo acesso a
dados passa por uma interface única, `QuizRepository` (`src/data/repository.ts`),
cujos métodos são **todos assíncronos mesmo sendo síncronos por dentro**.
Trocar `LocalStorageRepository` por um adapter Supabase/IndexedDB não altera
nenhuma chamada de tela.

### 2. Histórico de tentativas, não flag de respondida

`Attempt` é append-only e registra questão, assunto, acerto, modo, seleção,
autoavaliação, instante e duração. **Nenhuma estatística é armazenada**:
cobertura, taxa de acerto, streak, série temporal e fila de revisão são todas
derivadas em `src/domain/stats.ts` e `src/domain/queue.ts`. Isso impede
contadores de dessincronizar e permite responder a mesma pergunta várias vezes
mostrando evolução real.

`subjectId` é desnormalizado dentro de `Attempt` para que estatística por
assunto seja um único passe sobre o array, sem join.

### 3. Um motor de resposta, três modos

`<QuestionCard>` é usado por Estudo, Teste e Revisão. O que muda entre modos é
apenas a *política*, passada por prop (`canRevealBeforeAnswer`) e o `mode`
gravado na tentativa. Evita três telas de pergunta divergindo com o tempo.

### 4. Verdadeiro/falso é múltipla escolha

Por baixo, V/F são duas alternativas fixas. Um só motor de correção. O campo
`type` existe para o formulário do admin e para o visual.

### 5. Interação depende do número de corretas

- **Uma correta:** clique direto, verde/vermelho na hora (mantém a interação do
  app atual, que funciona bem).
- **Várias corretas:** clique direto é impossível — vira checkbox + Confirmar.
  A correção exige o conjunto exato: nem faltando, nem sobrando.

### 6. Revisão exige erro, não ausência

Uma pergunta entra na fila de revisão quando **já foi tentada e a última
tentativa foi errada**. Pergunta nunca tentada não é erro pendente — ela
pertence ao modo Estudo. Sem essa restrição, "revisão de erros" traria o banco
inteiro no primeiro uso.

### 7. Espiar não conta

No modo Estudo dá para revelar a resposta antes de responder. Isso **não grava
tentativa** — inflar a cobertura com perguntas espiadas tornaria a estatística
mentirosa.

### 8. Excluir assunto é cascata confirmada

Excluir um assunto apaga suas perguntas e as tentativas delas, com um diálogo
que nomeia quantas perguntas vão junto. Excluir pergunta apaga o histórico dela:
estatística não deve citar fantasma.

## Gráficos

Seguem a skill `dataviz`.

- **Resultado da sessão:** número-herói + medidor de duas partes, **não** pizza —
  uma razão contra um total se lê melhor num medidor, e pizza de duas fatias é
  ruído.
- **Evolução:** linha de acerto diário, série única (sem legenda). Dias sem
  estudo viram **lacuna**, nunca 0% — um dia sem estudar não é um dia em que se
  errou tudo.
- **Cor:** verde e vermelho ficam a ΔE 7,4 sob deuteranopia (medido por
  `validate_palette.js`), o que só é legal com codificação secundária. Por isso
  todo par certo/errado carrega ícone ✓/✕ e rótulo direto; a cor nunca informa
  sozinha.

## Arquitetura

```
src/
  data/        types · repository (contrato) · localRepo · seed · StoreProvider
  domain/      stats · queue          (funções puras, testadas sem UI)
  components/  QuestionCard (motor) · RichText · RichTextEditor · AppBar · charts/
  pages/       Home · Subject · Session · Result · Stats · Admin(+ abas)
  lib/         utils · sanitize · icons · importers
```

`Admin` e `Stats` são carregados sob demanda (`React.lazy`): o TipTap e os
gráficos não pesam no caminho quente, que é estudar.

## Segurança do conteúdo

Todo HTML de conteúdo passa por `sanitizeHtml` (DOMPurify, lista branca de tags)
antes de virar `dangerouslySetInnerHTML`. `RichText` é o único componente que
injeta HTML — nenhum outro usa `dangerouslySetInnerHTML`.

## Importação

`parseImportFile` reconhece três formatos: backup do StudyQuiz, lista de
perguntas no modelo atual e **o JSON do app antigo** (`pergunta` /
`alternativas` / `resposta`, onde `resposta` é o texto exato da alternativa
correta). CSV é detectado pela extensão, com cabeçalho tolerante a acento e
caixa. Linhas inválidas viram erros numerados, não abortam a importação.

## Fora de escopo

Autenticação, múltiplos usuários, correção automática de discursivas por IA,
modo multiplayer.
