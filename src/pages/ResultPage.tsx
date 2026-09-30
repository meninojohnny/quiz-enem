import * as React from 'react'
import { Home, RotateCcw, Trash2, Users } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { StandingsList } from '@/components/broadcast/StandingsList'
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
import { useStore } from '@/data/StoreProvider'
import { createMatch, standings, type Standing } from '@/domain/match'
import { playFanfare } from '@/lib/sound'
import { teamVars } from '@/lib/teamStyles'
import { cn } from '@/lib/utils'
import type { SetupState } from './SetupPage'

/** Ordem visual do pódio: 2º, 1º, 3º. A altura segue a posição, então empate empata a coluna. */
const PODIUM_ORDER = [1, 0, 2]
const HEIGHT_BY_POSITION: Record<number, string> = { 1: '100%', 2: '64%', 3: '44%' }

export function ResultPage() {
  const { matchId } = useParams<{ matchId: string }>()
  const { matches, questions, subjects, activeMatch, saveMatch, deleteMatch, settings } = useStore()
  const navigate = useNavigate()
  const reduce = useReducedMotion()
  const [confirmDelete, setConfirmDelete] = React.useState(false)
  const match = matches.find((m) => m.id === matchId)

  // Fanfarra só para quem acabou de terminar, não para quem abre o histórico.
  const justFinished = !!match?.finishedAt && Date.now() - new Date(match.finishedAt).getTime() < 8000
  React.useEffect(() => {
    if (justFinished && settings.soundEnabled) playFanfare()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!match) return <Navigate to="/" replace />
  if (match.status === 'playing') return <Navigate to="/partida" replace />

  const table = standings(match)
  const podium = PODIUM_ORDER.filter((place) => table[place]).map((place) => ({
    place,
    row: table[place],
    height: HEIGHT_BY_POSITION[table[place].position] ?? '44%',
  }))
  const subject = subjects.find((s) => s.id === match.subjectId)
  const played = match.turns.length
  const hits = match.turns.filter((t) => t.correct).length
  const tiedTop = table.filter((row) => row.position === 1)

  async function rematch() {
    if (!match || !subject || activeMatch) return
    const next = createMatch({
      subjectId: subject.id,
      teams: match.teams,
      questionIds: questions.filter((q) => q.subjectId === subject.id).map((q) => q.id),
    })
    await saveMatch(next)
    navigate('/partida')
  }

  return (
    <div className="min-h-dvh pb-16">
      <TopBar />

      <main className="mx-auto flex max-w-6xl flex-col gap-12 px-4 pt-8 sm:px-6 lg:pt-12">
        <header className="flex flex-col gap-2">
          <p className="text-muted-foreground">
            {subject?.name ?? 'Assunto removido'}, {played} de {match.questionIds.length} perguntas, {hits} acertos
          </p>
          <h1 className="font-broadcast text-5xl uppercase leading-none sm:text-7xl">
            {tiedTop.length > 1 ? (
              'Empate no topo'
            ) : (
              <>
                <span className="text-primary">{table[0].team.name}</span> venceu
              </>
            )}
          </h1>
        </header>

        <section
          aria-label="Pódio"
          className="mx-auto grid h-[min(46vh,26rem)] w-full max-w-4xl items-end gap-3 sm:gap-6"
          style={{ gridTemplateColumns: `repeat(${podium.length}, minmax(0, 1fr))` }}
        >
          {podium.map(({ height, row }, i) => (
            <PodiumColumn key={row.team.id} row={row} height={height} first={row.position === 1} delay={reduce ? 0 : [0.35, 0.8, 0.1][i]} reduce={!!reduce} />
          ))}
        </section>

        <section aria-labelledby="table-heading" className="flex flex-col gap-4">
          <h2 id="table-heading" className="text-lg font-bold">Classificação final</h2>
          <StandingsList rows={table} size="board" historyLimit={12} />
        </section>

        <div className="flex flex-wrap gap-3">
          <Button variant="live" size="xl" onClick={() => void rematch()} disabled={!subject || !!activeMatch}>
            <RotateCcw /> Revanche
          </Button>
          <Button asChild variant="outline" size="lg" className="h-14">
            <Link to="/nova" state={{ subjectId: match.subjectId, teams: match.teams } satisfies SetupState}>
              <Users /> Ajustar grupos
            </Link>
          </Button>
          <Button asChild variant="ghost" size="lg" className="h-14">
            <Link to="/">
              <Home /> Início
            </Link>
          </Button>
          <Button variant="ghost" size="lg" className="ml-auto h-14 text-muted-foreground" onClick={() => setConfirmDelete(true)}>
            <Trash2 /> Apagar do histórico
          </Button>
        </div>
        {activeMatch && (
          <p className="-mt-8 text-sm text-muted-foreground">
            Revanche indisponível: há outra partida em andamento.
          </p>
        )}
      </main>

      <AlertDialog open={confirmDelete} onOpenChange={setConfirmDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Apagar esta partida do histórico?</AlertDialogTitle>
            <AlertDialogDescription>O resultado some da lista de últimas partidas. Não dá para desfazer.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground"
              onClick={() => {
                navigate('/')
                void deleteMatch(match.id)
              }}
            >
              Apagar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

function PodiumColumn({
  row,
  height,
  first,
  delay,
  reduce,
}: {
  row: Standing
  height: string
  first: boolean
  delay: number
  reduce: boolean
}) {
  return (
    <div className="flex h-full flex-col justify-end" style={teamVars(row.team.color)}>
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: delay + 0.35, duration: 0.4 }}
        className="mb-3 flex flex-col items-center gap-1 text-center"
      >
        <span className={cn('line-clamp-2 font-bold leading-tight', first ? 'text-xl sm:text-2xl' : 'text-base sm:text-xl')}>
          {row.team.name}
        </span>
        <span className={cn('tabular font-broadcast leading-none', first ? 'text-4xl text-primary sm:text-5xl' : 'text-3xl sm:text-4xl')}>
          {row.points}
        </span>
      </motion.div>
      <motion.div
        initial={reduce ? false : { scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{ height, transformOrigin: 'bottom' }}
        className="flex items-start justify-center bg-[--team] pt-4 text-[--team-ink]"
      >
        <span className="font-broadcast text-5xl leading-none sm:text-7xl">{row.position}º</span>
      </motion.div>
    </div>
  )
}
