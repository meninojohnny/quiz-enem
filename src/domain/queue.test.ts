import { describe, expect, it } from 'vitest'
import type { Question } from '@/data/types'
import { isCorrect } from './queue'

const AT = '2026-01-01T00:00:00.000Z'

function question(id: string, subjectId = 's1', overrides: Partial<Question> = {}): Question {
  return {
    id,
    subjectId,
    type: 'open',
    prompt: id,
    choices: [],
    answerText: '',
    explanation: '',
    difficulty: null,
    tags: [],
    createdAt: AT,
    updatedAt: AT,
    ...overrides,
  }
}

describe('isCorrect', () => {
  const single = question('q1', 's1', {
    type: 'multiple_choice',
    choices: [
      { id: 'c1', text: 'certa', correct: true },
      { id: 'c2', text: 'errada', correct: false },
    ],
  })

  const multi = question('q2', 's1', {
    type: 'multiple_choice',
    choices: [
      { id: 'c1', text: 'a', correct: true },
      { id: 'c2', text: 'b', correct: true },
      { id: 'c3', text: 'c', correct: false },
    ],
  })

  it('aceita a única alternativa correta', () => {
    expect(isCorrect(single, ['c1'])).toBe(true)
    expect(isCorrect(single, ['c2'])).toBe(false)
  })

  it('na múltipla correta exige o conjunto exato', () => {
    expect(isCorrect(multi, ['c1', 'c2'])).toBe(true)
    expect(isCorrect(multi, ['c2', 'c1'])).toBe(true)
    expect(isCorrect(multi, ['c1'])).toBe(false)
    expect(isCorrect(multi, ['c1', 'c2', 'c3'])).toBe(false)
  })

  it('sem seleção nenhuma é erro', () => {
    expect(isCorrect(single, [])).toBe(false)
    expect(isCorrect(multi, [])).toBe(false)
  })

  it('ignora ids de alternativas que não existem mais', () => {
    expect(isCorrect(single, ['c1', 'fantasma'])).toBe(false)
  })
})
