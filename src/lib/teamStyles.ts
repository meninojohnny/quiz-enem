import type { CSSProperties } from 'react'
import type { TeamColor } from '@/data/types'

/**
 * Cor de cada grupo e a tinta legível sobre ela. As claras levam tinta
 * escura: branco em verde ou lima some no projetor.
 */
const TEAM_SWATCH: Record<TeamColor, { fill: string; ink: string }> = {
  red: { fill: '#ff4757', ink: '#ffffff' },
  blue: { fill: '#2e86ff', ink: '#ffffff' },
  green: { fill: '#1fd17a', ink: '#06122b' },
  orange: { fill: '#ff8a1f', ink: '#06122b' },
  violet: { fill: '#a66bff', ink: '#ffffff' },
  pink: { fill: '#ff5fb4', ink: '#06122b' },
  teal: { fill: '#19d3c5', ink: '#06122b' },
  lime: { fill: '#b8e62e', ink: '#06122b' },
}

export function teamFill(color: TeamColor): string {
  return TEAM_SWATCH[color].fill
}

/** Variáveis CSS para usar como `bg-[--team] text-[--team-ink]`. */
export function teamVars(color: TeamColor): CSSProperties {
  const { fill, ink } = TEAM_SWATCH[color]
  return { '--team': fill, '--team-ink': ink } as CSSProperties
}
