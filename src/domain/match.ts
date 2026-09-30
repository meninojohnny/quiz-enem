import type { Difficulty, Match, Question, Team, TeamColor, Turn } from '@/data/types'
import { createId, nowIso } from '@/lib/utils'

export const MIN_TEAMS = 2
export const MAX_TEAMS = 8
export const DEFAULT_TEAM_COUNT = 5

export const TEAM_COLORS: TeamColor[] = ['red', 'blue', 'green', 'orange', 'violet', 'pink', 'teal', 'lime']

export const TEAM_COLOR_NAMES: Record<TeamColor, string> = {
  red: 'Vermelho',
  blue: 'Azul',
  green: 'Verde',
  orange: 'Laranja',
  violet: 'Roxo',
  pink: 'Rosa',
  teal: 'Turquesa',
  lime: 'Lima',
}

export const POINTS: Record<Difficulty, number> = { easy: 10, medium: 20, hard: 30 }

export function pointsFor(question: Pick<Question, 'difficulty'>): number {
  return question.difficulty ? POINTS[question.difficulty] : POINTS.easy
}

/** Letra fixa do grupo pela posição em que foi criado: A, B, C... */
export function teamLetter(match: Pick<Match, 'teams'>, teamId: string): string {
  const index = match.teams.findIndex((t) => t.id === teamId)
  return String.fromCharCode(65 + Math.max(index, 0))
}

export function defaultTeams(count = DEFAULT_TEAM_COUNT): Team[] {
  return TEAM_COLORS.slice(0, count).map((color) => ({
    id: createId('t'),
    name: `Grupo ${TEAM_COLOR_NAMES[color]}`,
    color,
  }))
}

export function shuffle<T>(items: T[], random = Math.random): T[] {
  const out = [...items]
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

/**
 * Quantas perguntas entram na partida: o maior múltiplo do número de grupos,
 * para todo grupo responder a mesma quantidade de vezes.
 */
export function playableCount(questionCount: number, teamCount: number): number {
  if (teamCount <= 0) return 0
  return questionCount - (questionCount % teamCount)
}

export function createMatch({
  subjectId,
  teams,
  questionIds,
  shuffleQuestions = true,
  random = Math.random,
}: {
  subjectId: string
  teams: Team[]
  questionIds: string[]
  shuffleQuestions?: boolean
  random?: () => number
}): Match {
  const ordered = shuffleQuestions ? shuffle(questionIds, random) : questionIds
  return {
    id: createId('m'),
    subjectId,
    teams,
    questionIds: ordered.slice(0, playableCount(ordered.length, teams.length)),
    turns: [],
    phase: 'question',
    status: 'playing',
    createdAt: nowIso(),
    finishedAt: null,
  }
}

/** Índice da pergunta que está na tela (a revelada conta como a atual). */
export function currentIndex(match: Match): number {
  return match.phase === 'revealed' ? match.turns.length - 1 : match.turns.length
}

export function currentQuestionId(match: Match): string | null {
  return match.questionIds[currentIndex(match)] ?? null
}

export function currentTeam(match: Match): Team {
  return match.teams[currentIndex(match) % match.teams.length]
}

export function totalRounds(match: Match): number {
  return Math.max(1, Math.ceil(match.questionIds.length / match.teams.length))
}

/** Rodada 1-based da pergunta na tela. */
export function currentRound(match: Match): number {
  return Math.min(totalRounds(match), Math.floor(currentIndex(match) / match.teams.length) + 1)
}

export function lastTurn(match: Match): Turn | null {
  return match.turns.at(-1) ?? null
}

export function answer(
  match: Match,
  question: Question,
  { correct, selectedChoiceIds }: { correct: boolean; selectedChoiceIds: string[] },
): Match {
  if (match.phase !== 'question' || match.status !== 'playing') return match
  const turn: Turn = {
    questionId: question.id,
    teamId: currentTeam(match).id,
    correct,
    points: correct ? pointsFor(question) : 0,
    selectedChoiceIds,
    answeredAt: nowIso(),
  }
  return { ...match, turns: [...match.turns, turn], phase: 'revealed' }
}

/** Sai da resposta revelada: abre o placar ao fim da rodada ou vai à próxima. */
export function advance(match: Match): Match {
  if (match.phase === 'question') return match

  const done = match.turns.length >= match.questionIds.length
  if (done) return finish(match)

  const roundClosed = match.turns.length % match.teams.length === 0
  if (match.phase === 'revealed' && roundClosed) return { ...match, phase: 'standings' }
  return { ...match, phase: 'question' }
}

export function undo(match: Match): Match {
  if (match.turns.length === 0) return match
  return {
    ...match,
    turns: match.turns.slice(0, -1),
    phase: 'question',
    status: 'playing',
    finishedAt: null,
  }
}

export function finish(match: Match): Match {
  return { ...match, status: 'finished', phase: 'standings', finishedAt: nowIso() }
}

export interface Standing {
  team: Team
  letter: string
  points: number
  correct: number
  answered: number
  /** Resultados em ordem cronológica. */
  history: boolean[]
  /** 1-based; empates dividem a posição. */
  position: number
}

/**
 * Classificação: pontos, depois acertos, depois a ordem de jogo. Empate
 * real (mesmos pontos e acertos) divide a posição.
 */
export function standings(match: Match, turns: Turn[] = match.turns): Standing[] {
  const rows = match.teams.map((team, order) => {
    const own = turns.filter((t) => t.teamId === team.id)
    return {
      order,
      team,
      letter: String.fromCharCode(65 + order),
      points: own.reduce((sum, t) => sum + t.points, 0),
      correct: own.filter((t) => t.correct).length,
      answered: own.length,
      history: own.map((t) => t.correct),
    }
  })

  rows.sort((a, b) => b.points - a.points || b.correct - a.correct || a.order - b.order)

  const result: Standing[] = []
  rows.forEach((row, index) => {
    const previous = result[index - 1]
    const tied = previous && previous.points === row.points && previous.correct === row.correct
    const { order: _order, ...rest } = row
    result.push({ ...rest, position: tied ? previous.position : index + 1 })
  })
  return result
}
