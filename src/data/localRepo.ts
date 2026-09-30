import { createId, normalize, htmlToText, nowIso } from '@/lib/utils'
import { SEED_QUESTIONS, SEED_SUBJECTS } from './seed'
import type { QuizRepository } from './repository'
import type {
  Backup,
  Match,
  NewQuestion,
  NewSubject,
  Question,
  QuestionFilter,
  Settings,
  Subject,
} from './types'

const KEYS = {
  subjects: 'studyquiz.subjects',
  questions: 'studyquiz.questions',
  matches: 'studyquiz.matches',
  settings: 'studyquiz.settings',
  seeded: 'studyquiz.seeded',
} as const

export const DEFAULT_SETTINGS: Settings = {
  soundEnabled: true,
}

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw === null ? fallback : (JSON.parse(raw) as T)
  } catch {
    // Storage indisponível (modo privado) ou JSON corrompido: segue com o padrão.
    return fallback
  }
}

function write(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error(`Não foi possível gravar em ${key}`, error)
    throw new Error('Não foi possível salvar: o armazenamento do navegador está cheio ou bloqueado.')
  }
}

function matchesFilter(question: Question, filter: QuestionFilter): boolean {
  if (filter.subjectId && question.subjectId !== filter.subjectId) return false
  if (filter.type && question.type !== filter.type) return false
  if (filter.difficulty && question.difficulty !== filter.difficulty) return false
  if (filter.tag && !question.tags.includes(filter.tag)) return false

  if (filter.search) {
    const needle = normalize(filter.search)
    const haystack = normalize(
      [
        htmlToText(question.prompt),
        htmlToText(question.answerText),
        htmlToText(question.explanation),
        ...question.choices.map((c) => htmlToText(c.text)),
        ...question.tags,
      ].join(' '),
    )
    if (!haystack.includes(needle)) return false
  }

  return true
}

export class LocalStorageRepository implements QuizRepository {
  constructor() {
    this.ensureSeeded()
  }

  /** Popula o conteúdo inicial só na primeira execução, nunca por cima de dados. */
  private ensureSeeded(): void {
    if (read<boolean>(KEYS.seeded, false)) return
    write(KEYS.subjects, SEED_SUBJECTS)
    write(KEYS.questions, SEED_QUESTIONS)
    write(KEYS.matches, [])
    write(KEYS.seeded, true)
  }

  private subjects(): Subject[] {
    return read<Subject[]>(KEYS.subjects, [])
  }

  private questions(): Question[] {
    return read<Question[]>(KEYS.questions, [])
  }

  private matches(): Match[] {
    return read<Match[]>(KEYS.matches, [])
  }

  // ---------------------------------------------------------------- Assuntos

  async listSubjects(): Promise<Subject[]> {
    return [...this.subjects()].sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'))
  }

  async getSubject(id: string): Promise<Subject | null> {
    return this.subjects().find((s) => s.id === id) ?? null
  }

  async createSubject(data: NewSubject): Promise<Subject> {
    const subject: Subject = { ...data, id: createId('s'), createdAt: nowIso() }
    write(KEYS.subjects, [...this.subjects(), subject])
    return subject
  }

  async updateSubject(id: string, patch: Partial<NewSubject>): Promise<Subject> {
    const subjects = this.subjects()
    const index = subjects.findIndex((s) => s.id === id)
    if (index === -1) throw new Error(`Assunto ${id} não encontrado`)

    const updated = { ...subjects[index], ...patch }
    subjects[index] = updated
    write(KEYS.subjects, subjects)
    return updated
  }

  /** Cascata: apaga o assunto, suas perguntas e as partidas dele. */
  async deleteSubject(id: string): Promise<void> {
    write(KEYS.subjects, this.subjects().filter((s) => s.id !== id))
    write(KEYS.questions, this.questions().filter((q) => q.subjectId !== id))
    write(KEYS.matches, this.matches().filter((m) => m.subjectId !== id))
  }

  // --------------------------------------------------------------- Perguntas

  async listQuestions(filter: QuestionFilter = {}): Promise<Question[]> {
    return this.questions().filter((q) => matchesFilter(q, filter))
  }

  async getQuestion(id: string): Promise<Question | null> {
    return this.questions().find((q) => q.id === id) ?? null
  }

  async createQuestion(data: NewQuestion): Promise<Question> {
    const at = nowIso()
    const question: Question = { ...data, id: createId('q'), createdAt: at, updatedAt: at }
    write(KEYS.questions, [...this.questions(), question])
    return question
  }

  async updateQuestion(id: string, patch: Partial<NewQuestion>): Promise<Question> {
    const questions = this.questions()
    const index = questions.findIndex((q) => q.id === id)
    if (index === -1) throw new Error(`Pergunta ${id} não encontrada`)

    const updated = { ...questions[index], ...patch, updatedAt: nowIso() }
    questions[index] = updated
    write(KEYS.questions, questions)
    return updated
  }

  async deleteQuestion(id: string): Promise<void> {
    write(KEYS.questions, this.questions().filter((q) => q.id !== id))
  }

  async bulkCreateQuestions(data: NewQuestion[]): Promise<Question[]> {
    const at = nowIso()
    const created = data.map((item) => ({
      ...item,
      id: createId('q'),
      createdAt: at,
      updatedAt: at,
    }))
    write(KEYS.questions, [...this.questions(), ...created])
    return created
  }

  // ---------------------------------------------------------------- Partidas

  async listMatches(): Promise<Match[]> {
    return [...this.matches()].sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  }

  async saveMatch(match: Match): Promise<void> {
    const others = this.matches().filter((m) => m.id !== match.id)
    write(KEYS.matches, [...others, match])
  }

  async deleteMatch(id: string): Promise<void> {
    write(KEYS.matches, this.matches().filter((m) => m.id !== id))
  }

  // ------------------------------------------------------------ Preferências

  async getSettings(): Promise<Settings> {
    return { ...DEFAULT_SETTINGS, ...read<Partial<Settings>>(KEYS.settings, {}) }
  }

  async updateSettings(patch: Partial<Settings>): Promise<Settings> {
    const settings = { ...(await this.getSettings()), ...patch }
    write(KEYS.settings, settings)
    return settings
  }

  // ------------------------------------------------------------------ Backup

  async exportAll(): Promise<Backup> {
    return {
      version: 2,
      exportedAt: nowIso(),
      subjects: this.subjects(),
      questions: this.questions(),
      matches: this.matches(),
    }
  }

  /**
   * `replace` descarta tudo. `merge` acrescenta o que ainda não existe,
   * comparando por id: reimportar o mesmo backup não duplica conteúdo.
   */
  async importAll(backup: Backup, strategy: 'merge' | 'replace'): Promise<void> {
    const incomingMatches = backup.matches ?? []

    if (strategy === 'replace') {
      write(KEYS.subjects, backup.subjects)
      write(KEYS.questions, backup.questions)
      write(KEYS.matches, incomingMatches)
      write(KEYS.seeded, true)
      return
    }

    const mergeById = <T extends { id: string }>(current: T[], incoming: T[]): T[] => {
      const seen = new Set(current.map((item) => item.id))
      return [...current, ...incoming.filter((item) => !seen.has(item.id))]
    }

    write(KEYS.subjects, mergeById(this.subjects(), backup.subjects))
    write(KEYS.questions, mergeById(this.questions(), backup.questions))
    write(KEYS.matches, mergeById(this.matches(), incomingMatches))
  }

  async resetToSeed(): Promise<void> {
    write(KEYS.subjects, SEED_SUBJECTS)
    write(KEYS.questions, SEED_QUESTIONS)
    write(KEYS.matches, [])
    write(KEYS.settings, DEFAULT_SETTINGS)
    write(KEYS.seeded, true)
  }
}
