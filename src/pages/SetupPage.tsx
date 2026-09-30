import * as React from 'react'
import { Check, Plus, Shuffle, Trash2 } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { TeamMark } from '@/components/broadcast/TeamMark'
import { TopBar } from '@/components/broadcast/TopBar'
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
import { Switch } from '@/components/ui/switch'
import { useStore } from '@/data/StoreProvider'
import type { Team, TeamColor } from '@/data/types'
import {
  MAX_TEAMS,
  MIN_TEAMS,
  TEAM_COLORS,
  TEAM_COLOR_NAMES,
  createMatch,
  defaultTeams,
  finish,
  playableCount,
  shuffle,
} from '@/domain/match'
import { iconFor } from '@/lib/icons'
import { teamFill } from '@/lib/teamStyles'
import { cn, createId, pluralize } from '@/lib/utils'

export interface SetupState {
  subjectId?: string
  teams?: Team[]
}

export function SetupPage() {
  const { subjects, questions, matches, activeMatch, saveMatch } = useStore()
  const navigate = useNavigate()
  const incoming = (useLocation().state ?? {}) as SetupState

  const countBySubject = React.useMemo(() => {
    const counts = new Map<string, number>()
    for (const q of questions) counts.set(q.subjectId, (counts.get(q.subjectId) ?? 0) + 1)
    return counts
  }, [questions])

  const [subjectId, setSubjectId] = React.useState(
    () => incoming.subjectId ?? matches[0]?.subjectId ?? subjects[0]?.id ?? '',
  )
  // Os grupos da última partida voltam por padrão: a turma costuma ser a mesma.
  const [teams, setTeams] = React.useState<Team[]>(
    () => incoming.teams ?? matches[0]?.teams.map((t) => ({ ...t })) ?? defaultTeams(),
  )
  const [shuffleQuestions, setShuffleQuestions] = React.useState(true)
  const [confirmReplace, setConfirmReplace] = React.useState(false)

  const subject = subjects.find((s) => s.id === subjectId) ?? null
  const available = subject ? (countBySubject.get(subject.id) ?? 0) : 0
  const playable = playableCount(available, teams.length)
  const rounds = teams.length ? playable / teams.length : 0
  const leftOut = available - playable

  const names = teams.map((t) => t.name.trim().toLowerCase())
  const problems = [
    !subject && 'Escolha um assunto.',
    subject && playable === 0 && `O assunto precisa de pelo menos ${teams.length} perguntas.`,
    names.some((n) => !n) && 'Todo grupo precisa de um nome.',
    new Set(names).size !== names.length && 'Há dois grupos com o mesmo nome.',
  ].filter(Boolean) as string[]

  function updateTeam(id: string, patch: Partial<Team>) {
    setTeams((current) => current.map((t) => (t.id === id ? { ...t, ...patch } : t)))
  }

  function addTeam() {
    const used = new Set(teams.map((t) => t.color))
    const color = TEAM_COLORS.find((c) => !used.has(c)) ?? TEAM_COLORS[0]
    setTeams((current) => [...current, { id: createId('t'), name: `Grupo ${TEAM_COLOR_NAMES[color]}`, color }])
  }

  function start() {
    if (problems.length > 0) return
    if (activeMatch) {
      setConfirmReplace(true)
      return
    }
    void launch()
  }

  async function launch() {
    if (!subject) return
    if (activeMatch) await saveMatch(finish(activeMatch))
    const match = createMatch({
      subjectId: subject.id,
      teams: teams.map((t) => ({ ...t, name: t.name.trim() })),
      questionIds: questions.filter((q) => q.subjectId === subject.id).map((q) => q.id),
      shuffleQuestions,
    })
    await saveMatch(match)
    navigate('/partida')
  }

  return (
    <div className="min-h-dvh pb-28">
      <TopBar />

      <main className="mx-auto grid max-w-6xl gap-10 px-4 pt-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_20rem] lg:pt-12">
        <div className="flex flex-col gap-12">
          <h1 className="font-broadcast text-5xl uppercase leading-none sm:text-6xl">Nova partida</h1>

          <section aria-labelledby="subject-heading" className="flex flex-col gap-4">
            <h2 id="subject-heading" className="text-lg font-bold">Assunto</h2>
            {subjects.length === 0 ? (
              <p className="text-muted-foreground">
                Nenhum assunto cadastrado.{' '}
                <Link to="/admin" className="font-semibold text-primary underline">
                  Cadastre perguntas
                </Link>{' '}
                para começar.
              </p>
            ) : (
              <div className="grid gap-2 sm:grid-cols-2">
                {subjects.map((s) => {
                  const Icon = iconFor(s.icon)
                  const count = countBySubject.get(s.id) ?? 0
                  const active = s.id === subjectId
                  return (
                    <button
                      key={s.id}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setSubjectId(s.id)}
                      className={cn(
                        'flex items-center gap-4 rounded-md bg-card p-4 text-left transition-colors hover:bg-secondary',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                        active && 'bg-secondary ring-2 ring-inset ring-primary',
                      )}
                    >
                      <span
                        className="flex size-11 shrink-0 items-center justify-center rounded-md"
                        style={{ backgroundColor: `hsl(${s.color} / 0.18)`, color: `hsl(${s.color})` }}
                      >
                        <Icon className="size-5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-bold">{s.name}</span>
                        <span className="tabular text-sm text-muted-foreground">
                          {count} {pluralize(count, 'pergunta', 'perguntas')}
                        </span>
                      </span>
                      {active && <Check className="size-5 text-primary" strokeWidth={3} />}
                    </button>
                  )
                })}
              </div>
            )}
          </section>

          <section aria-labelledby="teams-heading" className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <h2 id="teams-heading" className="text-lg font-bold">
                Grupos <span className="tabular font-normal text-muted-foreground">({teams.length})</span>
              </h2>
              <div className="ml-auto flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setTeams((current) => shuffle(current))}
                  title="A ordem da lista é a ordem de jogo"
                >
                  <Shuffle /> Sortear ordem
                </Button>
                <Button variant="outline" size="sm" onClick={addTeam} disabled={teams.length >= MAX_TEAMS}>
                  <Plus /> Grupo
                </Button>
              </div>
            </div>

            <ol className="flex flex-col gap-2">
              {teams.map((team, index) => (
                <TeamRow
                  key={team.id}
                  team={team}
                  letter={String.fromCharCode(65 + index)}
                  takenColors={teams.filter((t) => t.id !== team.id).map((t) => t.color)}
                  canRemove={teams.length > MIN_TEAMS}
                  onChange={(patch) => updateTeam(team.id, patch)}
                  onRemove={() => setTeams((current) => current.filter((t) => t.id !== team.id))}
                />
              ))}
            </ol>
            <p className="text-sm text-muted-foreground">A ordem da lista é a ordem em que os grupos jogam.</p>
          </section>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="flex flex-col gap-5 rounded-md bg-card p-5">
            <h2 className="font-broadcast text-xl uppercase">Resumo</h2>
            <dl className="grid grid-cols-2 gap-4">
              <Stat label="Perguntas" value={playable} />
              <Stat label="Rodadas" value={rounds} />
            </dl>
            <p className="text-sm text-muted-foreground">
              Cada grupo responde {rounds} {pluralize(rounds, 'vez', 'vezes')}.
              {leftOut > 0 &&
                ` ${leftOut} ${pluralize(leftOut, 'pergunta fica', 'perguntas ficam')} de fora para todos jogarem o mesmo número de vezes.`}
            </p>

            <label className="flex items-center justify-between gap-3 text-sm font-semibold">
              Embaralhar perguntas
              <Switch checked={shuffleQuestions} onCheckedChange={setShuffleQuestions} />
            </label>

            <div className="text-sm text-muted-foreground">
              <p className="mb-1 font-semibold text-foreground">Pontuação</p>
              <p>Fácil 10, média 20, difícil 30. Errou, não pontua. A vez passa sempre.</p>
            </div>

            {problems.length > 0 && (
              <ul className="space-y-1 text-sm font-semibold text-destructive" role="alert">
                {problems.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            )}

            <Button variant="live" size="xl" onClick={start} disabled={problems.length > 0}>
              Começar partida
            </Button>
          </div>
        </aside>
      </main>

      <AlertDialog open={confirmReplace} onOpenChange={setConfirmReplace}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Há uma partida em andamento</AlertDialogTitle>
            <AlertDialogDescription>
              Ela será encerrada com o placar atual e ficará no histórico. Começar a nova partida?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Voltar</AlertDialogCancel>
            <AlertDialogAction onClick={() => void launch().catch((e: Error) => toast.error(e.message))}>
              Encerrar e começar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</dt>
      <dd className="tabular font-broadcast text-4xl leading-none">{value}</dd>
    </div>
  )
}

function TeamRow({
  team,
  letter,
  takenColors,
  canRemove,
  onChange,
  onRemove,
}: {
  team: Team
  letter: string
  takenColors: TeamColor[]
  canRemove: boolean
  onChange(patch: Partial<Team>): void
  onRemove(): void
}) {
  return (
    <li className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-3 gap-y-2 rounded-md bg-card p-2 pr-3 sm:grid-cols-[auto_minmax(0,1fr)_auto_auto]">
      <TeamMark color={team.color} letter={letter} className="text-2xl" />
      <label className="sr-only" htmlFor={`team-${team.id}`}>
        Nome do grupo {letter}
      </label>
      <input
        id={`team-${team.id}`}
        value={team.name}
        maxLength={28}
        onChange={(e) => onChange({ name: e.target.value })}
        className="h-11 w-full min-w-0 rounded-md border border-transparent bg-transparent px-3 text-lg font-bold outline-none transition-colors hover:border-input focus:border-primary"
      />
      <div
        role="radiogroup"
        aria-label={`Cor do grupo ${letter}`}
        className="order-last col-span-3 flex gap-1.5 pl-1 sm:order-none sm:col-span-1 sm:gap-1 sm:pl-0"
      >
        {TEAM_COLORS.map((color) => {
          const taken = takenColors.includes(color)
          const active = team.color === color
          return (
            <button
              key={color}
              type="button"
              role="radio"
              aria-checked={active}
              aria-label={TEAM_COLOR_NAMES[color]}
              disabled={taken}
              onClick={() => onChange({ color })}
              style={{ backgroundColor: teamFill(color) }}
              className={cn(
                'size-6 rounded-sm transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card',
                active && 'ring-2 ring-foreground ring-offset-2 ring-offset-card',
                taken && 'opacity-20',
                !taken && !active && 'hover:scale-110',
              )}
            />
          )
        })}
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={onRemove}
        disabled={!canRemove}
        aria-label={`Remover ${team.name || `grupo ${letter}`}`}
      >
        <Trash2 />
      </Button>
    </li>
  )
}
