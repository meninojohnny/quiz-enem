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

/**
 * Contrato único de acesso a dados. Todos os métodos são assíncronos mesmo
 * quando a implementação é síncrona: é isso que permite trocar o adapter
 * (localStorage -> Supabase/IndexedDB) sem alterar as telas.
 */
export interface QuizRepository {
  listSubjects(): Promise<Subject[]>
  getSubject(id: string): Promise<Subject | null>
  createSubject(data: NewSubject): Promise<Subject>
  updateSubject(id: string, patch: Partial<NewSubject>): Promise<Subject>
  /** Remove o assunto e suas perguntas. */
  deleteSubject(id: string): Promise<void>

  listQuestions(filter?: QuestionFilter): Promise<Question[]>
  getQuestion(id: string): Promise<Question | null>
  createQuestion(data: NewQuestion): Promise<Question>
  updateQuestion(id: string, patch: Partial<NewQuestion>): Promise<Question>
  deleteQuestion(id: string): Promise<void>
  bulkCreateQuestions(data: NewQuestion[]): Promise<Question[]>

  /** Mais recentes primeiro. */
  listMatches(): Promise<Match[]>
  saveMatch(match: Match): Promise<void>
  deleteMatch(id: string): Promise<void>

  getSettings(): Promise<Settings>
  updateSettings(patch: Partial<Settings>): Promise<Settings>

  exportAll(): Promise<Backup>
  importAll(backup: Backup, strategy: 'merge' | 'replace'): Promise<void>
  /** Volta ao conteúdo inicial de exemplo, descartando tudo. */
  resetToSeed(): Promise<void>
}
