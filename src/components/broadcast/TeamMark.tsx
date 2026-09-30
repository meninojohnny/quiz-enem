import type { TeamColor } from '@/data/types'
import { teamVars } from '@/lib/teamStyles'
import { cn } from '@/lib/utils'

/** Plaqueta do grupo: letra sobre a cor, para a cor nunca ser o único sinal. */
export function TeamMark({
  color,
  letter,
  className,
}: {
  color: TeamColor
  letter: string
  className?: string
}) {
  return (
    <span
      aria-hidden
      style={teamVars(color)}
      className={cn(
        'slant inline-flex shrink-0 items-center justify-center bg-[--team] font-broadcast text-[--team-ink] [--slant:0.35em]',
        'h-[1.6em] w-[2.1em] text-[1em] leading-none',
        className,
      )}
    >
      {letter}
    </span>
  )
}
