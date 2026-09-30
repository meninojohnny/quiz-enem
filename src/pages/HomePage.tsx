import { ArrowRight, Play } from 'lucide-react'
import { Link } from 'react-router-dom'
import { StandingsList } from '@/components/broadcast/StandingsList'
import { TeamMark } from '@/components/broadcast/TeamMark'
import { TopBar } from '@/components/broadcast/TopBar'
import { Button } from '@/components/ui/button'
import { useStore } from '@/data/StoreProvider'
import type { Match, Subject } from '@/data/types'
import { currentTeam, standings } from '@/domain/match'
import { iconFor } from '@/lib/icons'
import { pluralize } from '@/lib/utils'

const dateFormat = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })

export function HomePage() {
  const { subjects, questions, matches, activeMatch } = useStore()
  const finished = matches.filter((m) => m.status === 'finished').slice(0, 6)
  const subjectName = (id: string) => subjects.find((s) => s.id === id)?.name ?? 'Assunto removido'

  return (
    <div className="min-h-dvh pb-16">
      <TopBar />

      <main className="mx-auto flex max-w-6xl flex-col gap-16 px-4 pt-10 sm:px-6 lg:pt-16">
        <section className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
          <div className="flex flex-col items-start gap-6">
            <h1 className="font-broadcast text-6xl uppercase leading-[0.92] sm:text-7xl lg:text-8xl">
              Quem sabe
              <br />
              <span className="text-primary">mais?</span>
            </h1>
            <p className="max-w-[34ch] text-lg text-muted-foreground sm:text-xl">
              Desafio de perguntas entre grupos, com placar ao vivo, feito para o telão da sala.
            </p>
            <div className="flex flex-wrap gap-3">
              {activeMatch ? (
                <>
                  <Button asChild variant="live" size="xl">
                    <Link to="/partida">
                      <Play /> Continuar partida
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="h-14">
                    <Link to="/nova">Nova partida</Link>
                  </Button>
                </>
              ) : (
                <Button asChild variant="live" size="xl">
                  <Link to="/nova">
                    Nova partida <ArrowRight />
                  </Link>
                </Button>
              )}
            </div>
          </div>

          {activeMatch ? (
            <LiveCard match={activeMatch} subjectName={subjectName(activeMatch.subjectId)} />
          ) : (
            <QuestionBank subjects={subjects} counts={questions.map((q) => q.subjectId)} />
          )}
        </section>

        {finished.length > 0 && (
          <section aria-labelledby="history-heading" className="flex flex-col gap-4">
            <h2 id="history-heading" className="text-lg font-bold">Últimas partidas</h2>
            <ul className="grid gap-2 md:grid-cols-2">
              {finished.map((match) => {
                const winner = standings(match)[0]
                return (
                  <li key={match.id}>
                    <Link
                      to={`/resultado/${match.id}`}
                      className="flex items-center gap-4 rounded-md bg-card p-4 transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <TeamMark color={winner.team.color} letter={winner.letter} className="text-xl" />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-bold">{winner.team.name} venceu</span>
                        <span className="block truncate text-sm text-muted-foreground">
                          {subjectName(match.subjectId)}, {dateFormat.format(new Date(match.finishedAt ?? match.createdAt))}
                        </span>
                      </span>
                      <span className="tabular font-broadcast text-2xl">{winner.points}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </section>
        )}
      </main>
    </div>
  )
}

function LiveCard({ match, subjectName }: { match: Match; subjectName: string }) {
  const team = currentTeam(match)
  return (
    <Link
      to="/partida"
      className="group flex flex-col gap-4 rounded-md bg-card p-5 transition-colors hover:bg-secondary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div className="flex items-center gap-3">
        <span className="size-2.5 animate-live rounded-full bg-destructive" aria-hidden />
        <span className="font-broadcast uppercase">Ao vivo</span>
        <span className="truncate text-sm text-muted-foreground">{subjectName}</span>
        <span className="tabular ml-auto text-sm text-muted-foreground">
          {match.turns.length} de {match.questionIds.length}
        </span>
      </div>
      <StandingsList rows={standings(match)} activeTeamId={match.phase === 'question' ? team.id : undefined} historyLimit={4} />
    </Link>
  )
}

function QuestionBank({ subjects, counts }: { subjects: Subject[]; counts: string[] }) {
  return (
    <div className="flex flex-col gap-3 rounded-md bg-card p-5">
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="font-broadcast text-xl uppercase">Banco de perguntas</h2>
        <Link to="/admin" className="text-sm font-semibold text-primary hover:underline">
          Gerenciar
        </Link>
      </div>
      {subjects.length === 0 ? (
        <p className="text-muted-foreground">Nenhum assunto ainda. Cadastre perguntas na administração.</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {subjects.map((s) => {
            const Icon = iconFor(s.icon)
            const count = counts.filter((id) => id === s.id).length
            return (
              <li key={s.id} className="flex items-center gap-3 rounded-sm bg-background/60 p-3">
                <span
                  className="flex size-10 items-center justify-center rounded-md"
                  style={{ backgroundColor: `hsl(${s.color} / 0.18)`, color: `hsl(${s.color})` }}
                >
                  <Icon className="size-5" />
                </span>
                <span className="flex-1 truncate font-bold">{s.name}</span>
                <span className="tabular text-sm text-muted-foreground">
                  {count} {pluralize(count, 'pergunta', 'perguntas')}
                </span>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
