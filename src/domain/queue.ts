import type { Question } from '@/data/types'

/**
 * Correção de múltipla escolha e verdadeiro/falso.
 * Na múltipla correta o conjunto marcado precisa bater exatamente com o
 * conjunto de corretas — nem faltando, nem sobrando.
 */
export function isCorrect(question: Question, selectedChoiceIds: string[]): boolean {
  const valid = new Set(question.choices.map((c) => c.id))
  const selected = new Set(selectedChoiceIds.filter((id) => valid.has(id)))
  if (selected.size !== selectedChoiceIds.length) return false
  if (selected.size === 0) return false

  const correct = question.choices.filter((c) => c.correct).map((c) => c.id)
  if (correct.length !== selected.size) return false
  return correct.every((id) => selected.has(id))
}

/** Quantidade de alternativas corretas — decide a interação da tela. */
export function correctCount(question: Question): number {
  return question.choices.filter((c) => c.correct).length
}

/** Múltipla correta usa checkbox + confirmar; única correta usa clique direto. */
export function isMultiSelect(question: Question): boolean {
  return correctCount(question) > 1
}
