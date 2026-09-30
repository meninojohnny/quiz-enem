import type { Team } from '@/data/types'
import { teamVars } from '@/lib/teamStyles'

/**
 * Tarja do grupo da vez, no estilo das tarjas de transmissão. Remonta a
 * cada pergunta (a `key` fica com quem usa) para a varredura rodar de novo.
 */
export function TurnBanner({
  team,
  letter,
  points,
  difficulty,
}: {
  team: Team
  letter: string
  points: number
  difficulty: string | null
}) {
  return (
    <div className="flex items-stretch gap-2 text-stage-md" style={teamVars(team.color)}>
      <div className="slant-right flex animate-wipe items-center gap-[0.6em] bg-[--team] py-[0.35em] pl-[0.7em] pr-[1.6em] text-[--team-ink] [--slant:1.1em]">
        <span className="font-broadcast text-[2.1em] leading-none">{letter}</span>
        <span className="flex flex-col">
          <span className="font-broadcast text-[0.62em] uppercase leading-none opacity-80">Na vez</span>
          <span className="font-broadcast text-[1.5em] uppercase leading-[1.05]">{team.name}</span>
        </span>
      </div>
      <div
        className="slant flex animate-wipe flex-col justify-center bg-card px-[1.3em] [--slant:1.1em] [animation-delay:120ms]"
        aria-label={`Vale ${points} pontos`}
      >
        <span className="tabular font-broadcast text-[1.35em] leading-none text-primary">+{points}</span>
        <span className="text-[0.55em] font-semibold uppercase tracking-wide text-muted-foreground">
          {difficulty ?? 'pontos'}
        </span>
      </div>
    </div>
  )
}
