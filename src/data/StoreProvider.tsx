import * as React from 'react'
import { LocalStorageRepository, DEFAULT_SETTINGS } from './localRepo'
import type { QuizRepository } from './repository'
import type {
  Backup,
  Match,
  NewQuestion,
  NewSubject,
  Question,
  Settings,
  Subject,
} from './types'

interface StoreValue {
  ready: boolean
  error: string | null
  subjects: Subject[]
  questions: Question[]
  /** Mais recentes primeiro. */
  matches: Match[]
  /** A partida em andamento, se houver; só existe uma por vez. */
  activeMatch: Match | null
  settings: Settings

  createSubject(data: NewSubject): Promise<Subject>
  updateSubject(id: string, patch: Partial<NewSubject>): Promise<void>
  deleteSubject(id: string): Promise<void>

  createQuestion(data: NewQuestion): Promise<Question>
  updateQuestion(id: string, patch: Partial<NewQuestion>): Promise<void>
  deleteQuestion(id: string): Promise<void>
  bulkCreateQuestions(data: NewQuestion[]): Promise<Question[]>

  /** As transições ficam em `domain/match`; a store só guarda o resultado. */
  saveMatch(match: Match): Promise<void>
  deleteMatch(id: string): Promise<void>

  updateSettings(patch: Partial<Settings>): Promise<void>

  exportAll(): Promise<Backup>
  importAll(backup: Backup, strategy: 'merge' | 'replace'): Promise<void>
  resetToSeed(): Promise<void>
}

const StoreContext = React.createContext<StoreValue | null>(null)

export function StoreProvider({
  children,
  repository,
}: {
  children: React.ReactNode
  /** Injetável para testes; em produção é o adapter de localStorage. */
  repository?: QuizRepository
}) {
  const repo = React.useMemo(() => repository ?? new LocalStorageRepository(), [repository])

  const [ready, setReady] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [subjects, setSubjects] = React.useState<Subject[]>([])
  const [questions, setQuestions] = React.useState<Question[]>([])
  const [matches, setMatches] = React.useState<Match[]>([])
  const [settings, setSettings] = React.useState<Settings>(DEFAULT_SETTINGS)

  const refresh = React.useCallback(async () => {
    try {
      const [nextSubjects, nextQuestions, nextMatches, nextSettings] = await Promise.all([
        repo.listSubjects(),
        repo.listQuestions(),
        repo.listMatches(),
        repo.getSettings(),
      ])
      setSubjects(nextSubjects)
      setQuestions(nextQuestions)
      setMatches(nextMatches)
      setSettings(nextSettings)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao carregar os dados.')
    } finally {
      setReady(true)
    }
  }, [repo])

  React.useEffect(() => {
    void refresh()
  }, [refresh])

  const value = React.useMemo<StoreValue>(
    () => ({
      ready,
      error,
      subjects,
      questions,
      matches,
      activeMatch: matches.find((m) => m.status === 'playing') ?? null,
      settings,

      async createSubject(data) {
        const subject = await repo.createSubject(data)
        await refresh()
        return subject
      },
      async updateSubject(id, patch) {
        await repo.updateSubject(id, patch)
        await refresh()
      },
      async deleteSubject(id) {
        await repo.deleteSubject(id)
        await refresh()
      },

      async createQuestion(data) {
        const question = await repo.createQuestion(data)
        await refresh()
        return question
      },
      async updateQuestion(id, patch) {
        await repo.updateQuestion(id, patch)
        await refresh()
      },
      async deleteQuestion(id) {
        await repo.deleteQuestion(id)
        await refresh()
      },
      async bulkCreateQuestions(data) {
        const created = await repo.bulkCreateQuestions(data)
        await refresh()
        return created
      },

      async saveMatch(match) {
        // Jogada é caminho quente: atualiza a tela primeiro, sem releitura.
        setMatches((current) => [match, ...current.filter((m) => m.id !== match.id)])
        await repo.saveMatch(match)
      },
      async deleteMatch(id) {
        setMatches((current) => current.filter((m) => m.id !== id))
        await repo.deleteMatch(id)
      },

      async updateSettings(patch) {
        setSettings(await repo.updateSettings(patch))
      },

      exportAll: () => repo.exportAll(),
      async importAll(backup, strategy) {
        await repo.importAll(backup, strategy)
        await refresh()
      },
      async resetToSeed() {
        await repo.resetToSeed()
        await refresh()
      },
    }),
    [ready, error, subjects, questions, matches, settings, repo, refresh],
  )

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore(): StoreValue {
  const store = React.useContext(StoreContext)
  if (!store) throw new Error('useStore precisa estar dentro de <StoreProvider>')
  return store
}
