import { describe, expect, it } from 'vitest'
import type { Question, Team } from '@/data/types'
import {
  advance,
  answer,
  createMatch,
  currentQuestionId,
  currentRound,
  currentTeam,
  playableCount,
  standings,
  totalRounds,
  undo,
} from './match'

const teams: Team[] = [
  { id: 'a', name: 'Alfa', color: 'red' },
  { id: 'b', name: 'Beta', color: 'blue' },
  { id: 'c', name: 'Gama', color: 'green' },
]

function question(id: string, difficulty: Question['difficulty'] = 'medium'): Question {
  return {
    id,
    subjectId: 's',
    type: 'multiple_choice',
    prompt: id,
    choices: [],
    answerText: '',
    explanation: '',
    difficulty,
    tags: [],
    createdAt: '',
    updatedAt: '',
  }
}

const ids = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7']

function newMatch() {
  return createMatch({ subjectId: 's', teams, questionIds: ids, shuffleQuestions: false })
}

describe('match', () => {
  it('corta as perguntas num múltiplo do número de grupos', () => {
    expect(playableCount(7, 3)).toBe(6)
    expect(playableCount(2, 3)).toBe(0)
    const match = newMatch()
    expect(match.questionIds).toEqual(ids.slice(0, 6))
    expect(totalRounds(match)).toBe(2)
  })

  it('passa a vez para o próximo grupo acertando ou errando', () => {
    let match = newMatch()
    expect(currentTeam(match).id).toBe('a')

    match = answer(match, question('q1'), { correct: true, selectedChoiceIds: [] })
    expect(match.phase).toBe('revealed')
    expect(currentTeam(match).id).toBe('a')

    match = advance(match)
    expect(currentTeam(match).id).toBe('b')
    expect(currentQuestionId(match)).toBe('q2')

    match = advance(answer(match, question('q2'), { correct: false, selectedChoiceIds: [] }))
    expect(currentTeam(match).id).toBe('c')
  })

  it('pontua pela dificuldade e só quando acerta', () => {
    let match = newMatch()
    match = advance(answer(match, question('q1', 'hard'), { correct: true, selectedChoiceIds: [] }))
    match = advance(answer(match, question('q2', 'easy'), { correct: false, selectedChoiceIds: [] }))
    const table = standings(match)
    expect(table[0]).toMatchObject({ team: { id: 'a' }, points: 30, position: 1 })
    expect(table.find((s) => s.team.id === 'b')?.points).toBe(0)
  })

  it('mostra o placar ao fechar uma rodada e termina na última pergunta', () => {
    let match = newMatch()
    for (const id of ['q1', 'q2', 'q3']) {
      match = answer(match, question(id), { correct: true, selectedChoiceIds: [] })
      match = advance(match)
    }
    expect(match.phase).toBe('standings')
    expect(currentRound(match)).toBe(2)

    match = advance(match)
    expect(match.phase).toBe('question')
    for (const id of ['q4', 'q5', 'q6']) {
      match = advance(answer(match, question(id), { correct: false, selectedChoiceIds: [] }))
    }
    expect(match.status).toBe('finished')
  })

  it('desfazer volta a jogada anterior para o ar', () => {
    let match = newMatch()
    match = advance(answer(match, question('q1'), { correct: true, selectedChoiceIds: [] }))
    match = undo(match)
    expect(match.turns).toHaveLength(0)
    expect(match.phase).toBe('question')
    expect(currentTeam(match).id).toBe('a')
  })

  it('empate de pontos e acertos divide a posição', () => {
    let match = newMatch()
    match = advance(answer(match, question('q1'), { correct: true, selectedChoiceIds: [] }))
    match = advance(answer(match, question('q2'), { correct: true, selectedChoiceIds: [] }))
    const table = standings(match)
    expect(table.map((s) => s.position)).toEqual([1, 1, 3])
  })
})
