const fs = require('fs')
const src = require('./reproducao-data.cjs')

const AT = '2026-01-01T00:00:00.000Z'
const pad = (n) => String(n).padStart(3, '0')

const questions = src.map((q, i) => {
  const id = `q-repro-${pad(i + 1)}`
  return {
    id,
    subjectId: 's-reproducao',
    type: 'multiple_choice',
    prompt: q.prompt,
    choices: q.choices.map((text, j) => ({
      id: `${id}-c${j + 1}`,
      text,
      correct: j === q.correct,
    })),
    answerText: '',
    explanation: '',
    difficulty: q.difficulty,
    tags: [],
    createdAt: AT,
    updatedAt: AT,
  }
})

// Sanidade: toda MC precisa ter exatamente uma correta.
const bad = questions.filter((q) => q.choices.filter((c) => c.correct).length !== 1)
if (bad.length) throw new Error('MC sem exatamente uma correta: ' + bad.map((q) => q.id).join(', '))

const subjects = [
  { id: 's-reproducao', name: 'Sistema Reprodutor', color: '198 75% 52%', icon: 'Baby', createdAt: AT },
]

const banner = `/**
 * Conteúdo inicial do Quiz da Didi.
 *
 * As ${questions.length} perguntas de Sistema Reprodutor vêm dos bancos "Ludo
 * Reprodutivo", "Anatomia Funcional" e questões avulsas de imagem, todas de
 * múltipla escolha.
 *
 * ARQUIVO GERADO — para recriar, rode scripts/gen-seed.cjs.
 */
import type { Question, Subject } from './types'

export const SEED_SUBJECTS: Subject[] = ${JSON.stringify(subjects, null, 2)}

export const SEED_QUESTIONS: Question[] = ${JSON.stringify(questions, null, 2)}
`

fs.writeFileSync('src/data/seed.ts', banner)
console.log('seed.ts escrito:', questions.length, 'perguntas /', subjects.length, 'assuntos')
