import { beforeEach, describe, expect, it } from 'vitest'
import { LocalStorageRepository } from './localRepo'
import { SEED_QUESTIONS, SEED_SUBJECTS } from './seed'
import { createMatch, defaultTeams } from '@/domain/match'
import type { NewQuestion } from './types'

function sampleMatch(subjectId: string) {
  return createMatch({ subjectId, teams: defaultTeams(2), questionIds: ['q1', 'q2'] })
}

function newQuestion(overrides: Partial<NewQuestion> = {}): NewQuestion {
  return {
    subjectId: 's-fisiologia',
    type: 'open',
    prompt: 'Uma pergunta',
    choices: [],
    answerText: 'Uma resposta',
    explanation: '',
    difficulty: null,
    tags: [],
    ...overrides,
  }
}

describe('LocalStorageRepository', () => {
  let repo: LocalStorageRepository

  beforeEach(() => {
    localStorage.clear()
    repo = new LocalStorageRepository()
  })

  it('semeia o conteúdo inicial na primeira execução', async () => {
    expect(await repo.listSubjects()).toHaveLength(SEED_SUBJECTS.length)
    expect(await repo.listQuestions()).toHaveLength(SEED_QUESTIONS.length)
    expect(await repo.listMatches()).toEqual([])
  })

  it('não semeia por cima de dados existentes', async () => {
    await repo.deleteQuestion(SEED_QUESTIONS[0].id)
    const again = new LocalStorageRepository()
    expect(await again.listQuestions()).toHaveLength(SEED_QUESTIONS.length - 1)
  })

  it('cria assunto com id próprio e o devolve ordenado por nome', async () => {
    await repo.createSubject({ name: 'Anatomia', color: '0 72% 51%', icon: 'Bone' })
    const names = (await repo.listSubjects()).map((s) => s.name)
    expect(names[0]).toBe('Anatomia')
  })

  it('excluir assunto leva junto perguntas e partidas dele', async () => {
    const question = await repo.createQuestion(newQuestion())
    await repo.saveMatch(sampleMatch(question.subjectId))

    await repo.deleteSubject('s-fisiologia')

    expect(await repo.getSubject('s-fisiologia')).toBeNull()
    expect((await repo.listQuestions()).some((q) => q.subjectId === 's-fisiologia')).toBe(false)
    expect(await repo.listMatches()).toEqual([])
  })

  it('atualizar pergunta move o updatedAt e preserva o createdAt', async () => {
    const question = await repo.createQuestion(newQuestion())
    const updated = await repo.updateQuestion(question.id, { prompt: 'Outro enunciado' })

    expect(updated.prompt).toBe('Outro enunciado')
    expect(updated.createdAt).toBe(question.createdAt)
    expect(updated.updatedAt >= question.updatedAt).toBe(true)
  })

  it('reclama ao atualizar pergunta inexistente', async () => {
    await expect(repo.updateQuestion('fantasma', { prompt: 'x' })).rejects.toThrow(/não encontrada/i)
  })

  it('filtra perguntas por assunto, tipo e texto sem acento', async () => {
    await repo.createSubject({ name: 'Outro assunto', color: '0 72% 51%', icon: 'Bone' })
    const [otherSubject] = (await repo.listSubjects()).filter((s) => s.name === 'Outro assunto')

    await repo.createQuestion(newQuestion({ subjectId: otherSubject.id }))
    await repo.createQuestion(newQuestion({ subjectId: otherSubject.id }))
    await repo.createQuestion(
      newQuestion({
        subjectId: otherSubject.id,
        type: 'true_false',
        prompt: 'Sobre a HIPÓFISE anterior',
        choices: [
          { id: 'c1', text: 'Verdadeiro', correct: true },
          { id: 'c2', text: 'Falso', correct: false },
        ],
      }),
    )

    expect(await repo.listQuestions({ subjectId: otherSubject.id })).toHaveLength(3)
    expect((await repo.listQuestions({ type: 'true_false' })).length).toBeGreaterThan(0)
    // busca sem acento e sem caixa deve achar "HIPÓFISE"
    expect((await repo.listQuestions({ search: 'hipofise anterior' })).length).toBeGreaterThan(0)
  })

  it('bulkCreateQuestions acrescenta sem apagar o que já existe', async () => {
    const before = (await repo.listQuestions()).length
    await repo.bulkCreateQuestions([newQuestion(), newQuestion()])
    expect(await repo.listQuestions()).toHaveLength(before + 2)
  })

  it('salvar a mesma partida substitui em vez de duplicar', async () => {
    const match = sampleMatch('s-reproducao')
    await repo.saveMatch(match)
    await repo.saveMatch({ ...match, status: 'finished' })

    const matches = await repo.listMatches()
    expect(matches).toHaveLength(1)
    expect(matches[0].status).toBe('finished')
  })

  it('exporta tudo e reimporta em merge sem duplicar', async () => {
    const backup = await repo.exportAll()
    await repo.importAll(backup, 'merge')

    expect(await repo.listQuestions()).toHaveLength(SEED_QUESTIONS.length)
    expect(await repo.listSubjects()).toHaveLength(SEED_SUBJECTS.length)
  })

  it('importar em replace descarta o conteúdo anterior', async () => {
    await repo.importAll(
      { version: 1, exportedAt: new Date().toISOString(), subjects: [], questions: [] },
      'replace',
    )
    expect(await repo.listQuestions()).toEqual([])
    expect(await repo.listSubjects()).toEqual([])
  })

  it('resetToSeed volta ao conteúdo inicial e limpa as partidas', async () => {
    await repo.createSubject({ name: 'Temporário', color: '0 0% 0%', icon: 'Atom' })
    await repo.saveMatch(sampleMatch('s-reproducao'))
    await repo.resetToSeed()

    expect(await repo.listSubjects()).toHaveLength(SEED_SUBJECTS.length)
    expect(await repo.listMatches()).toEqual([])
  })

  it('preferência de som persiste entre leituras', async () => {
    await repo.updateSettings({ soundEnabled: false })
    expect((await repo.getSettings()).soundEnabled).toBe(false)
  })
})
