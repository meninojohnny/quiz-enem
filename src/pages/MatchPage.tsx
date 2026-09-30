import * as React from 'react'
import { Eye, Flag, LogOut, Maximize, Minimize, SkipForward, Undo2, Volume2, VolumeX } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Brand } from '@/components/broadcast/Brand'
import { StandingsList } from '@/components/broadcast/StandingsList'
import { TeamMark } from '@/components/broadcast/TeamMark'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { useStore } from '@/data/StoreProvider'
import type { Match, Question } from '@/data/types'
import {
  advance,
  answer,
  currentIndex,
  currentQuestionId,
  currentRound,
  currentTeam,
  finish,
  lastTurn,
  pointsFor,
  standings,
  teamLetter,
  totalRounds,
  undo,
} from '@/domain/match'
import { isCorrect, isMultiSelect } from '@/domain/queue'
import { playCorrect, playTurn, playWrong } from '@/lib/sound'
import { cn } from '@/lib/utils'
import { CHOICE_LETTERS, QuestionStage } from './match/QuestionStage'
import { TurnBanner } from './match/TurnBanner'

const DIFFICULTY_LABEL = { easy: 'Fácil', medium: 'Média', hard: 'Difícil' } as const

export function MatchPage() {
  const { activeMatch, matches, questions, subjects, saveMatch, settings, updateSettings } = useStore()
  if (!activeMatch) {
    // A navegação do router roda em transição; esta tela pode renderizar sem
    // partida ativa antes dela, logo depois de encerrar.
    const recent = matches[0]
    const justEnded = recent?.finishedAt && Date.now() - new Date(recent.finishedAt).getTime() < 5000
    return <Navigate to={justEnded ? `/resultado/${recent.id}` : '/'} replace />
  }

  return (
    <LiveMatch
      key={activeMatch.id}
      match={activeMatch}
      questions={questions}
      subjectName={subjects.find((s) => s.id === activeMatch.subjectId)?.name ?? 'Assunto removido'}
      save={saveMatch}
      sound={settings.soundEnabled}
      toggleSound={() => void updateSettings({ soundEnabled: !settings.soundEnabled })}
    />
  )
}

function LiveMatch({
  match,
  questions,
  subjectName,
  save,
  sound,
  toggleSound,
}: {
  match: Match
  questions: Question[]
  subjectName: string
  save(match: Match): Promise<void>
  sound: boolean
  toggleSound(): void
}) {
  const navigate = useNavigate()
  const [selected, setSelected] = React.useState<string[]>([])
  const [showOpenAnswer, setShowOpenAnswer] = React.useState(false)
  const [confirmEnd, setConfirmEnd] = React.useState(false)
  const fullscreen = useFullscreen()

  const byId = React.useMemo(() => new Map(questions.map((q) => [q.id, q])), [questions])
  const index = currentIndex(match)
  const questionId = currentQuestionId(match)
  const question = questionId ? (byId.get(questionId) ?? null) : null
  const team = currentTeam(match)
  const revealed = match.phase === 'revealed'
  const turn = revealed ? lastTurn(match) : null
  const table = standings(match)

  // Nova pergunta no ar: limpa a mesa e toca a vinheta da vez.
  React.useEffect(() => {
    setSelected([])
    setShowOpenAnswer(false)
    if (match.phase === 'question' && sound) playTurn()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, match.phase === 'question'])

  function commit(correct: boolean, selectedChoiceIds: string[]) {
    if (!question || match.phase !== 'question') return
    if (sound) (correct ? playCorrect : playWrong)()
    void save(answer(match, question, { correct, selectedChoiceIds }))
  }

  function pickChoice(choiceId: string) {
    if (!question || match.phase !== 'question') return
    if (isMultiSelect(question)) {
      setSelected((current) =>
        current.includes(choiceId) ? current.filter((id) => id !== choiceId) : [...current, choiceId],
      )
      return
    }
    commit(isCorrect(question, [choiceId]), [choiceId])
  }

  function next() {
    const moved = advance(match)
    if (moved.status === 'finished') {
      void save(moved)
      navigate(`/resultado/${moved.id}`)
      return
    }
    void save(moved)
  }

  function endMatch() {
    const ended = finish(match)
    void save(ended)
    navigate(`/resultado/${ended.id}`)
  }

  const primary = primaryAction()

  function primaryAction(): { label: string; run(): void; disabled?: boolean } | null {
    if (match.phase === 'standings') return { label: 'Próxima rodada', run: next }
    if (revealed) {
      const last = match.turns.length >= match.questionIds.length
      return { label: last ? 'Ver resultado' : 'Próxima pergunta', run: next }
    }
    if (!question) return null
    if (question.type === 'open' && !showOpenAnswer) {
      return { label: 'Mostrar resposta', run: () => setShowOpenAnswer(true) }
    }
    if (isMultiSelect(question)) {
      return {
        label: selected.length ? `Confirmar (${selected.length})` : 'Confirmar',
        run: () => commit(isCorrect(question, selected), selected),
        disabled: selected.length === 0,
      }
    }
    return null
  }

  // Atalhos: letras/números escolhem, Enter avança, Z desfaz, F tela cheia.
  const keys = React.useRef<(event: KeyboardEvent) => void>(() => {})
  keys.current = (event) => {
    const target = event.target as HTMLElement | null
    if (target?.closest('input, textarea, [contenteditable="true"], [role="dialog"], [role="alertdialog"]')) return
    if (event.metaKey || event.ctrlKey || event.altKey) return

    const key = event.key.toLowerCase()
    if (key === 'enter' && primary && !primary.disabled) {
      event.preventDefault()
      primary.run()
    } else if (key === 'z' && match.turns.length > 0) {
      void save(undo(match))
    } else if (key === 'f') {
      fullscreen.toggle()
    } else if (question && match.phase === 'question' && question.type !== 'open') {
      const byNumber = /^[1-9]$/.test(key) ? Number(key) - 1 : -1
      const byLetter = CHOICE_LETTERS.toLowerCase().indexOf(key)
      const choice = question.choices[byNumber >= 0 ? byNumber : byLetter]
      if (choice && key.length === 1) {
        event.preventDefault()
        pickChoice(choice.id)
      }
    } else if (question?.type === 'open' && showOpenAnswer && match.phase === 'question') {
      if (key === 'c') commit(true, [])
      if (key === 'e') commit(false, [])
    }
  }
  React.useEffect(() => {
    const handler = (event: KeyboardEvent) => keys.current(event)
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const questionNumber = match.phase === 'standings' ? match.turns.length : Math.min(index + 1, match.questionIds.length)
  const round = match.phase === 'standings' ? Math.floor(match.turns.length / match.teams.length) : currentRound(match)

  return (
    <div className="grid h-dvh grid-rows-[auto_minmax(0,1fr)_auto_auto] overflow-hidden">
      {/* Faixa-guia: onde a partida está, sempre visível. */}
      <header className="flex items-center gap-4 border-b px-[clamp(1rem,2.5vw,2.5rem)] py-3 text-stage-sm">
        <Brand className="hidden md:inline-flex" />
        <span className="hidden h-6 w-px bg-border md:block" />
        <span className="flex shrink-0 items-center gap-2 whitespace-nowrap font-semibold">
          <span className="size-2.5 animate-live rounded-full bg-destructive" aria-hidden />
          <span className="font-broadcast uppercase">Ao vivo</span>
        </span>
        <span className="min-w-0 truncate text-muted-foreground">{subjectName}</span>

        <div className="ml-auto flex items-center gap-5">
          <span className="tabular whitespace-nowrap">
            <span className="text-muted-foreground">Pergunta </span>
            <span className="font-broadcast">{questionNumber}</span>
            <span className="text-muted-foreground"> de {match.questionIds.length}</span>
          </span>
          <span className="tabular hidden whitespace-nowrap sm:inline">
            <span className="text-muted-foreground">Rodada </span>
            <span className="font-broadcast">{round}</span>
            <span className="text-muted-foreground"> de {totalRounds(match)}</span>
          </span>
          <div className="flex items-center gap-1">
            <IconButton label={sound ? 'Desligar som' : 'Ligar som'} onClick={toggleSound}>
              {sound ? <Volume2 /> : <VolumeX />}
            </IconButton>
            <IconButton label={fullscreen.active ? 'Sair da tela cheia (F)' : 'Tela cheia (F)'} onClick={fullscreen.toggle}>
              {fullscreen.active ? <Minimize /> : <Maximize />}
            </IconButton>
            <IconButton label="Encerrar partida" onClick={() => setConfirmEnd(true)}>
              <Flag />
            </IconButton>
            <IconButton label="Sair para o início (a partida continua salva)" asLink="/">
              <LogOut />
            </IconButton>
          </div>
        </div>
      </header>

      <main className="grid min-h-0 grid-cols-1 lg:grid-cols-[minmax(0,1fr)_clamp(20rem,30vw,34rem)]">
        <section className="min-h-0 overflow-y-auto px-[clamp(1rem,3.5vw,4rem)] py-[clamp(1rem,3vh,2.5rem)]">
          {match.phase === 'standings' ? (
            <RoundStandings match={match} round={round} />
          ) : question ? (
            <div className="flex flex-col gap-[clamp(1.25rem,3.5vh,2.75rem)]">
              <TurnBanner
                key={`${match.id}-${index}`}
                team={team}
                letter={teamLetter(match, team.id)}
                points={pointsFor(question)}
                difficulty={question.difficulty ? DIFFICULTY_LABEL[question.difficulty] : null}
              />
              <QuestionStage
                key={question.id}
                question={question}
                revealed={revealed}
                turn={turn}
                selected={selected}
                showOpenAnswer={showOpenAnswer || revealed}
                onChoice={pickChoice}
              />
            </div>
          ) : (
            <MissingQuestion onEnd={endMatch} />
          )}
        </section>

        <aside className="hidden min-h-0 flex-col gap-3 overflow-y-auto border-l bg-background px-4 py-[clamp(1rem,3vh,2.5rem)] lg:flex">
          <h2 className="px-1 font-broadcast text-stage-sm uppercase text-muted-foreground">Classificação</h2>
          <StandingsList
            rows={table}
            activeTeamId={match.phase === 'question' ? team.id : undefined}
            highlightTeamId={turn?.correct ? turn.teamId : undefined}
          />
        </aside>
      </main>

      {match.phase !== 'standings' && (
        <ScoreStrip match={match} activeTeamId={match.phase === 'question' ? team.id : undefined} />
      )}

      {/* Mesa do mediador */}
      <footer className="flex min-h-[4.75rem] flex-wrap items-center gap-3 border-t bg-card px-[clamp(1rem,2.5vw,2.5rem)] py-3">
        <ResultCallout match={match} question={question} />

        <div className="ml-auto flex flex-wrap items-center gap-2">
          {match.turns.length > 0 && (
            <Button variant="ghost" onClick={() => void save(undo(match))} title="Desfazer a última jogada (Z)">
              <Undo2 /> Desfazer
            </Button>
          )}

          {match.phase === 'question' && question && question.type !== 'open' && (
            <Button variant="outline" onClick={() => commit(false, [])} title="Conta como erro e passa a vez">
              <SkipForward /> Não respondeu
            </Button>
          )}

          {match.phase === 'question' && question?.type === 'open' && showOpenAnswer && (
            <>
              <Button variant="outline" size="lg" onClick={() => commit(false, [])} title="Errou (E)">
                Errou
              </Button>
              <Button variant="success" size="lg" onClick={() => commit(true, [])} title="Acertou (C)">
                Acertou
              </Button>
            </>
          )}

          {primary && (
            <Button variant="live" size="xl" onClick={primary.run} disabled={primary.disabled}>
              {question?.type === 'open' && !showOpenAnswer && match.phase === 'question' && <Eye />}
              {primary.label}
              <kbd className="ml-1 hidden rounded-sm bg-black/15 px-1.5 py-0.5 font-sans text-xs not-italic lg:inline">Enter</kbd>
            </Button>
          )}
        </div>
      </footer>

      <AlertDialog open={confirmEnd} onOpenChange={setConfirmEnd}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Encerrar a partida agora?</AlertDialogTitle>
            <AlertDialogDescription>
              O placar atual vira o resultado final. Faltam {match.questionIds.length - match.turns.length}{' '}
              perguntas.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Continuar jogando</AlertDialogCancel>
            <AlertDialogAction onClick={endMatch}>Encerrar e ver resultado</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

/** O que a mesa diz depois de cada jogada, e a dica de atalho antes dela. */
function ResultCallout({ match, question }: { match: Match; question: Question | null }) {
  const reduce = useReducedMotion()
  const turn = lastTurn(match)

  if (match.phase === 'revealed' && turn) {
    const team = match.teams.find((t) => t.id === turn.teamId)!
    const letter = teamLetter(match, team.id)

    return (
      <motion.div
        key={match.turns.length}
        initial={reduce ? false : { opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center gap-3 text-stage-sm"
        role="status"
      >
        <TeamMark color={team.color} letter={letter} />
        {turn.correct ? (
          <span className="flex items-baseline gap-2">
            <span className="tabular font-broadcast text-[1.6em] leading-none text-success">+{turn.points}</span>
            <span className="font-semibold">{team.name} acertou</span>
          </span>
        ) : (
          <span className="flex items-baseline gap-2">
            <span className="font-broadcast text-[1.25em] uppercase leading-none text-destructive">Errou</span>
            {question && question.type !== 'open' && (
              <span className="text-muted-foreground">
                Resposta certa: <span className="font-bold text-foreground">{correctLetters(question)}</span>
              </span>
            )}
          </span>
        )}
      </motion.div>
    )
  }

  if (match.phase === 'standings') {
    return <p className="text-sm text-muted-foreground">Placar da rodada. Enter continua.</p>
  }

  return (
    <p className="hidden text-sm text-muted-foreground md:block">
      {question?.type === 'open'
        ? 'Ouça a resposta do grupo e mostre a resposta esperada.'
        : 'Clique na alternativa que o grupo escolher, ou use as teclas A, B, C, D.'}
    </p>
  )
}

function correctLetters(question: Question): string {
  return question.choices
    .map((c, i) => (c.correct ? CHOICE_LETTERS[i] : null))
    .filter(Boolean)
    .join(', ')
}

function RoundStandings({ match, round }: { match: Match; round: number }) {
  const table = standings(match)
  const roundTurns = match.turns.slice(-match.teams.length)
  const hits = roundTurns.filter((t) => t.correct).length
  const leader = table[0]

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6">
      <div className="flex animate-wipe items-end justify-between gap-4 border-b-4 border-primary pb-3">
        <h1 className="font-broadcast text-stage-xl uppercase leading-none">Fim da rodada {round}</h1>
        <p className="tabular pb-1 text-stage-sm text-muted-foreground">
          {hits} de {roundTurns.length} acertos
        </p>
      </div>
      {leader.points > 0 && (
        <p className="text-stage-md">
          <span className="text-muted-foreground">Na liderança: </span>
          <span className="font-bold">{leader.team.name}</span>
          <span className="tabular text-muted-foreground"> com {leader.points} pontos</span>
        </p>
      )}
      <StandingsList rows={table} size="board" historyLimit={10} />
    </div>
  )
}

/** Placar compacto para quando a coluna de classificação não cabe. */
function ScoreStrip({ match, activeTeamId }: { match: Match; activeTeamId?: string }) {
  return (
    <ol aria-label="Placar" className="flex gap-2 overflow-x-auto border-t px-4 py-2 lg:hidden">
      {standings(match).map((row) => (
        <li
          key={row.team.id}
          className={cn(
            'flex shrink-0 items-center gap-2 rounded-sm bg-card py-1 pl-1 pr-3 text-sm',
            row.team.id === activeTeamId && 'bg-secondary ring-2 ring-inset ring-primary',
          )}
        >
          <TeamMark color={row.team.color} letter={row.letter} />
          <span className="max-w-[9rem] truncate font-semibold">{row.team.name}</span>
          <span className="tabular font-broadcast text-lg">{row.points}</span>
        </li>
      ))}
    </ol>
  )
}

function MissingQuestion({ onEnd }: { onEnd(): void }) {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-start gap-4 py-16">
      <h1 className="font-broadcast text-stage-lg uppercase">Pergunta não encontrada</h1>
      <p className="text-muted-foreground">
        A pergunta desta jogada foi apagada na administração. Encerre a partida para ver o
        resultado com o placar atual.
      </p>
      <Button variant="live" size="lg" onClick={onEnd}>
        Encerrar partida
      </Button>
    </div>
  )
}

function IconButton({
  label,
  onClick,
  asLink,
  children,
}: {
  label: string
  onClick?(): void
  asLink?: string
  children: React.ReactNode
}) {
  const className = cn(
    'inline-flex size-10 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&_svg]:size-5',
  )
  if (asLink) {
    return (
      <Link to={asLink} aria-label={label} title={label} className={className}>
        {children}
      </Link>
    )
  }
  return (
    <button type="button" aria-label={label} title={label} onClick={onClick} className={className}>
      {children}
    </button>
  )
}

function useFullscreen() {
  const [active, setActive] = React.useState(() => typeof document !== 'undefined' && !!document.fullscreenElement)

  React.useEffect(() => {
    const sync = () => setActive(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', sync)
    return () => document.removeEventListener('fullscreenchange', sync)
  }, [])

  const toggle = React.useCallback(() => {
    if (document.fullscreenElement) void document.exitFullscreen()
    else void document.documentElement.requestFullscreen?.().catch(() => {})
  }, [])

  return { active, toggle }
}
