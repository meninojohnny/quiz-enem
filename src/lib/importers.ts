import { createId, normalize } from './utils'
import type { Backup, Choice, Difficulty, NewQuestion, QuestionType } from '@/data/types'

/**
 * Importação de conteúdo externo.
 *
 * Três formatos são aceitos:
 *  - `legacy`    o JSON do app anterior: { pergunta, alternativas, resposta }
 *  - `questions` uma lista de perguntas já no modelo atual
 *  - `backup`    o export completo do Arena Quiz (tratado fora daqui, em importAll)
 * mais CSV, detectado pela extensão do arquivo.
 */

export interface ImportError {
  /** 1-based. No CSV inclui o cabeçalho; no JSON é o índice do item + 1. */
  line: number
  message: string
}

export interface ImportResult {
  questions: NewQuestion[]
  errors: ImportError[]
}

export type ImportFormat = 'legacy' | 'questions' | 'backup' | 'unknown'

const MULTI_SEPARATOR = '|'

// ------------------------------------------------------------------ detecção

export function detectFormat(data: unknown): ImportFormat {
  if (data && typeof data === 'object' && !Array.isArray(data)) {
    const record = data as Record<string, unknown>
    if (Array.isArray(record.questions) && Array.isArray(record.subjects)) return 'backup'
    return 'unknown'
  }

  if (Array.isArray(data) && data.length > 0) {
    const first = data[0] as Record<string, unknown>
    if (typeof first?.pergunta === 'string') return 'legacy'
    if (typeof first?.prompt === 'string') return 'questions'
  }

  return 'unknown'
}

export function isBackup(data: unknown): data is Backup {
  return detectFormat(data) === 'backup'
}

// -------------------------------------------------------------------- comuns

function blankQuestion(subjectId: string): NewQuestion {
  return {
    subjectId,
    type: 'open',
    prompt: '',
    choices: [],
    answerText: '',
    explanation: '',
    difficulty: null,
    tags: [],
  }
}

function makeChoices(texts: string[], correctIndexes: Set<number>): Choice[] {
  return texts.map((text, index) => ({
    id: createId('c'),
    text: text.trim(),
    correct: correctIndexes.has(index),
  }))
}

function parseDifficulty(raw: string): Difficulty | null {
  const value = normalize(raw.trim())
  if (!value) return null
  if (['facil', 'easy', '1'].includes(value)) return 'easy'
  if (['media', 'medio', 'medium', '2'].includes(value)) return 'medium'
  if (['dificil', 'hard', '3'].includes(value)) return 'hard'
  return null
}

function parseType(raw: string): QuestionType | null {
  const value = normalize(raw.trim())
  if (!value) return null
  if (['multipla', 'multipla escolha', 'multiple_choice', 'mc'].includes(value)) {
    return 'multiple_choice'
  }
  if (['vf', 'verdadeiro falso', 'verdadeiro_falso', 'true_false', 'tf'].includes(value)) {
    return 'true_false'
  }
  if (['discursiva', 'aberta', 'open'].includes(value)) return 'open'
  return null
}

function trueFalseChoices(answer: string): Choice[] {
  const isTrue = ['v', 'verdadeiro', 'true', 'sim', '1'].includes(normalize(answer.trim()))
  return [
    { id: createId('c'), text: 'Verdadeiro', correct: isTrue },
    { id: createId('c'), text: 'Falso', correct: !isTrue },
  ]
}

// -------------------------------------------------------------- formato antigo

interface LegacyQuestion {
  pergunta?: unknown
  alternativas?: unknown
  resposta?: unknown
}

export function parseLegacy(items: LegacyQuestion[], subjectId: string): ImportResult {
  const questions: NewQuestion[] = []
  const errors: ImportError[] = []

  items.forEach((item, index) => {
    const line = index + 1
    const prompt = typeof item.pergunta === 'string' ? item.pergunta.trim() : ''
    const answer = typeof item.resposta === 'string' ? item.resposta : ''
    const alternatives = Array.isArray(item.alternativas)
      ? item.alternativas.filter((a): a is string => typeof a === 'string')
      : []

    if (!prompt) {
      errors.push({ line, message: 'Pergunta sem enunciado.' })
      return
    }

    if (alternatives.length === 0) {
      questions.push({ ...blankQuestion(subjectId), type: 'open', prompt, answerText: answer })
      return
    }

    // No formato antigo, `resposta` é o texto exato da alternativa correta.
    const correctIndex = alternatives.findIndex((text) => text === answer)
    if (correctIndex === -1) {
      errors.push({
        line,
        message: `A resposta não corresponde a nenhuma alternativa: "${answer}".`,
      })
      return
    }

    questions.push({
      ...blankQuestion(subjectId),
      type: 'multiple_choice',
      prompt,
      choices: makeChoices(alternatives, new Set([correctIndex])),
    })
  })

  return { questions, errors }
}

// -------------------------------------------------------------- formato novo

export function parseQuestionList(items: unknown[], subjectId: string): ImportResult {
  const questions: NewQuestion[] = []
  const errors: ImportError[] = []

  items.forEach((raw, index) => {
    const line = index + 1
    const item = raw as Partial<NewQuestion>
    const prompt = typeof item.prompt === 'string' ? item.prompt.trim() : ''

    if (!prompt) {
      errors.push({ line, message: 'Pergunta sem enunciado.' })
      return
    }

    const choices = Array.isArray(item.choices)
      ? item.choices.map((c) => ({
          id: c.id ?? createId('c'),
          text: String(c.text ?? ''),
          correct: Boolean(c.correct),
        }))
      : []

    const type: QuestionType =
      item.type === 'multiple_choice' || item.type === 'true_false' || item.type === 'open'
        ? item.type
        : choices.length > 0
          ? 'multiple_choice'
          : 'open'

    if (type !== 'open' && !choices.some((c) => c.correct)) {
      errors.push({ line, message: 'Nenhuma alternativa foi marcada como correta.' })
      return
    }

    questions.push({
      subjectId,
      type,
      prompt,
      choices: type === 'open' ? [] : choices,
      answerText: type === 'open' ? String(item.answerText ?? '') : '',
      explanation: String(item.explanation ?? ''),
      difficulty: item.difficulty ?? null,
      tags: Array.isArray(item.tags) ? item.tags.map(String) : [],
    })
  })

  return { questions, errors }
}

// ----------------------------------------------------------------------- CSV

/** Divide uma linha de CSV respeitando aspas e aspas duplas escapadas. */
export function splitCsvLine(line: string): string[] {
  const fields: string[] = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i]

    if (inQuotes) {
      if (char === '"') {
        if (line[i + 1] === '"') {
          current += '"'
          i += 1
        } else {
          inQuotes = false
        }
      } else {
        current += char
      }
      continue
    }

    if (char === '"') {
      inQuotes = true
    } else if (char === ',') {
      fields.push(current)
      current = ''
    } else {
      current += char
    }
  }

  fields.push(current)
  return fields
}

/** Nomes de coluna aceitos, normalizados (sem acento, minúsculos). */
const CSV_COLUMNS: Record<string, string[]> = {
  prompt: ['pergunta', 'enunciado', 'prompt'],
  type: ['tipo', 'type'],
  choices: ['alternativas', 'opcoes', 'choices'],
  correct: ['corretas', 'correta', 'gabarito', 'correct'],
  answer: ['resposta', 'answer'],
  explanation: ['explicacao', 'explanation', 'comentario'],
  difficulty: ['dificuldade', 'difficulty', 'nivel'],
  tags: ['tags', 'etiquetas'],
}

function mapHeader(header: string[]): Record<string, number> {
  const normalized = header.map((h) => normalize(h.trim()))
  const map: Record<string, number> = {}

  for (const [field, aliases] of Object.entries(CSV_COLUMNS)) {
    const index = normalized.findIndex((h) => aliases.includes(h))
    if (index !== -1) map[field] = index
  }

  return map
}

/**
 * Resolve quais alternativas são corretas. Aceita índices 1-based
 * ("1" ou "1|3") ou o texto exato da alternativa — este último por
 * compatibilidade com o formato antigo.
 */
function resolveCorrect(
  raw: string,
  alternatives: string[],
): { indexes: Set<number> } | { error: string } {
  const tokens = raw
    .split(MULTI_SEPARATOR)
    .map((t) => t.trim())
    .filter(Boolean)

  if (tokens.length === 0) return { error: 'Nenhuma alternativa foi marcada como correta.' }

  const indexes = new Set<number>()

  for (const token of tokens) {
    if (/^\d+$/.test(token)) {
      const index = Number(token) - 1
      if (index < 0 || index >= alternatives.length) {
        return {
          error: `Índice de correta fora do intervalo: ${token} (há ${alternatives.length} alternativas).`,
        }
      }
      indexes.add(index)
      continue
    }

    const byText = alternatives.findIndex((text) => normalize(text.trim()) === normalize(token))
    if (byText === -1) {
      return { error: `A correta "${token}" não corresponde a nenhuma alternativa.` }
    }
    indexes.add(byText)
  }

  return { indexes }
}

export function parseCsv(content: string, subjectId: string): ImportResult {
  const questions: NewQuestion[] = []
  const errors: ImportError[] = []

  const rows = content.split(/\r?\n/)
  const headerRow = rows.findIndex((row) => row.trim() !== '')
  if (headerRow === -1) {
    return { questions, errors: [{ line: 1, message: 'Arquivo vazio.' }] }
  }

  const columns = mapHeader(splitCsvLine(rows[headerRow]))
  if (columns.prompt === undefined) {
    return {
      questions,
      errors: [
        {
          line: headerRow + 1,
          message: 'O CSV precisa de uma coluna "pergunta" (ou "enunciado").',
        },
      ],
    }
  }

  const cell = (fields: string[], field: string): string => {
    const index = columns[field]
    return index === undefined ? '' : (fields[index] ?? '').trim()
  }

  for (let i = headerRow + 1; i < rows.length; i += 1) {
    if (rows[i].trim() === '') continue

    const line = i + 1
    const fields = splitCsvLine(rows[i])
    const prompt = cell(fields, 'prompt')

    if (!prompt) {
      errors.push({ line, message: 'Pergunta sem enunciado.' })
      continue
    }

    const alternatives = cell(fields, 'choices')
      .split(MULTI_SEPARATOR)
      .map((t) => t.trim())
      .filter(Boolean)

    const answer = cell(fields, 'answer')
    const declaredType = parseType(cell(fields, 'type'))
    const type: QuestionType =
      declaredType ?? (alternatives.length > 0 ? 'multiple_choice' : 'open')

    const base: NewQuestion = {
      ...blankQuestion(subjectId),
      type,
      prompt,
      explanation: cell(fields, 'explanation'),
      difficulty: parseDifficulty(cell(fields, 'difficulty')),
      tags: cell(fields, 'tags')
        .split(MULTI_SEPARATOR)
        .map((t) => t.trim())
        .filter(Boolean),
    }

    if (type === 'true_false') {
      questions.push({ ...base, choices: trueFalseChoices(cell(fields, 'correct') || answer) })
      continue
    }

    if (type === 'open') {
      questions.push({ ...base, answerText: answer })
      continue
    }

    if (alternatives.length < 2) {
      errors.push({ line, message: 'Múltipla escolha precisa de ao menos duas alternativas.' })
      continue
    }

    // Sem coluna "corretas", cai no formato antigo: a resposta é o texto da correta.
    const resolved = resolveCorrect(cell(fields, 'correct') || answer, alternatives)
    if ('error' in resolved) {
      errors.push({ line, message: resolved.error })
      continue
    }

    questions.push({ ...base, choices: makeChoices(alternatives, resolved.indexes) })
  }

  return { questions, errors }
}

// ------------------------------------------------------------------ entrada

/** Ponto de entrada: escolhe o parser pela extensão e pelo formato do conteúdo. */
export function parseImportFile(
  content: string,
  fileName: string,
  subjectId: string,
): ImportResult {
  if (fileName.toLowerCase().endsWith('.csv')) {
    return parseCsv(content, subjectId)
  }

  let data: unknown
  try {
    data = JSON.parse(content)
  } catch {
    return { questions: [], errors: [{ line: 1, message: 'JSON inválido: não foi possível ler o arquivo.' }] }
  }

  switch (detectFormat(data)) {
    case 'legacy':
      return parseLegacy(data as LegacyQuestion[], subjectId)
    case 'questions':
      return parseQuestionList(data as unknown[], subjectId)
    case 'backup':
      return parseQuestionList((data as Backup).questions, subjectId)
    default:
      return {
        questions: [],
        errors: [
          {
            line: 1,
            message:
              'Formato não reconhecido. Esperado um backup do Arena Quiz, uma lista de perguntas ou o JSON do app antigo.',
          },
        ],
      }
  }
}
