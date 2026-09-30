import { Check, X } from 'lucide-react'
import { LayoutGroup, motion, useReducedMotion } from 'motion/react'
import type { Standing } from '@/domain/match'
import { cn } from '@/lib/utils'
import { TeamMark } from './TeamMark'

/**
 * Tabela de classificação. As linhas trocam de lugar com animação de
 * layout: é a reordenação que conta para a sala quem passou quem.
 */
export function StandingsList({
  rows,
  activeTeamId,
  highlightTeamId,
  size = 'rail',
  historyLimit = 6,
}: {
  rows: Standing[]
  /** Grupo da vez: ganha a faixa amarela. */
  activeTeamId?: string
  /** Grupo que acabou de pontuar. */
  highlightTeamId?: string
  size?: 'rail' | 'board'
  historyLimit?: number
}) {
  const reduce = useReducedMotion()
  const board = size === 'board'

  return (
    <LayoutGroup>
      <ol className={cn('flex flex-col', board ? 'gap-2' : 'gap-1.5')}>
        {rows.map((row, index) => {
          const active = row.team.id === activeTeamId
          const recent = row.history.slice(-historyLimit)
          return (
            <motion.li
              key={row.team.id}
              layout={!reduce}
              transition={{
                layout: { type: 'spring', stiffness: 380, damping: 34 },
                default: { duration: 0.45, delay: board ? index * 0.07 : 0, ease: [0.16, 1, 0.3, 1] },
              }}
              initial={board && !reduce ? { opacity: 0, x: -40 } : false}
              animate={{ opacity: 1, x: 0 }}
              className={cn(
                'flex items-center rounded-sm bg-card',
                board ? 'gap-4 py-3 pl-3 pr-6 text-stage-md' : 'gap-3 py-2 pl-2 pr-4 text-[clamp(0.95rem,0.45rem+0.8vw,1.4rem)]',
                active && 'bg-secondary ring-2 ring-inset ring-primary',
              )}
            >
              <span
                className={cn(
                  'tabular w-[1.6em] shrink-0 text-right font-broadcast text-muted-foreground',
                  row.position === 1 && row.points > 0 && 'text-primary',
                )}
              >
                {row.position}º
              </span>
              <TeamMark color={row.team.color} letter={row.letter} className="text-[0.8em]" />
              <span className="min-w-0 flex-1">
                <span className="block truncate font-bold leading-tight">
                  {row.team.name}
                  {active && <span className="sr-only"> (na vez)</span>}
                </span>
                {recent.length > 0 && (
                  <span className="mt-1 flex gap-1" aria-label={`Últimas respostas: ${recent.filter(Boolean).length} certas de ${recent.length}`}>
                    {recent.map((ok, i) => (
                      <span
                        key={i}
                        className={cn(
                          'inline-flex size-[1.05em] items-center justify-center rounded-sm',
                          ok ? 'bg-success text-success-foreground' : 'bg-muted text-muted-foreground',
                        )}
                      >
                        {ok ? <Check className="size-[0.75em]" strokeWidth={3.5} /> : <X className="size-[0.75em]" strokeWidth={3.5} />}
                      </span>
                    ))}
                  </span>
                )}
              </span>
              <motion.span
                key={`${row.team.id}-${row.points}`}
                initial={!reduce && highlightTeamId === row.team.id ? { scale: 1.5, color: 'hsl(50 100% 50%)' } : false}
                animate={{ scale: 1, color: 'hsl(216 45% 96%)' }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={cn('tabular min-w-[2.6em] text-right font-broadcast', board ? 'text-[1.5em]' : 'text-[1.25em]')}
              >
                {row.points}
              </motion.span>
            </motion.li>
          )
        })}
      </ol>
    </LayoutGroup>
  )
}
