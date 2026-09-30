import * as React from 'react'
import { FileQuestion, Pencil, Plus, Search, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { EmptyState } from '@/components/EmptyState'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useStore } from '@/data/StoreProvider'
import type { Difficulty, Question, QuestionType } from '@/data/types'
import { htmlToText, normalize, pluralize, truncate } from '@/lib/utils'
import { QuestionForm } from './QuestionForm'

const ALL = 'all'

const TYPE_LABEL: Record<QuestionType, string> = {
  multiple_choice: 'Múltipla',
  true_false: 'V ou F',
  open: 'Discursiva',
}

const DIFFICULTY_LABEL: Record<Difficulty, string> = {
  easy: 'Fácil',
  medium: 'Médio',
  hard: 'Difícil',
}

export function QuestionsTab() {
  const { subjects, questions, deleteQuestion } = useStore()

  const [search, setSearch] = React.useState('')
  const [subjectId, setSubjectId] = React.useState<string>(ALL)
  const [type, setType] = React.useState<string>(ALL)
  const [difficulty, setDifficulty] = React.useState<string>(ALL)

  const [editing, setEditing] = React.useState<Question | null>(null)
  const [formOpen, setFormOpen] = React.useState(false)
  const [doomed, setDoomed] = React.useState<Question | null>(null)

  const subjectById = React.useMemo(
    () => new Map(subjects.map((s) => [s.id, s])),
    [subjects],
  )

  const filtered = React.useMemo(() => {
    const needle = normalize(search.trim())
    return questions.filter((question) => {
      if (subjectId !== ALL && question.subjectId !== subjectId) return false
      if (type !== ALL && question.type !== type) return false
      if (difficulty !== ALL && question.difficulty !== difficulty) return false
      if (!needle) return true

      const haystack = normalize(
        [
          htmlToText(question.prompt),
          htmlToText(question.answerText),
          htmlToText(question.explanation),
          ...question.choices.map((c) => htmlToText(c.text)),
          ...question.tags,
        ].join(' '),
      )
      return haystack.includes(needle)
    })
  }, [questions, search, subjectId, type, difficulty])

  function openNew() {
    if (subjects.length === 0) {
      toast.error('Crie um assunto antes de cadastrar perguntas.')
      return
    }
    setEditing(null)
    setFormOpen(true)
  }

  async function confirmDelete() {
    if (!doomed) return
    await deleteQuestion(doomed.id)
    toast.success('Pergunta excluída.')
    setDoomed(null)
  }

  const filtersActive = search !== '' || subjectId !== ALL || type !== ALL || difficulty !== ALL

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Buscar no enunciado, alternativas, resposta ou tags…"
            className="pl-9"
            aria-label="Buscar perguntas"
          />
        </div>
        <Button onClick={openNew}>
          <Plus /> Nova pergunta
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        <Select value={subjectId} onValueChange={setSubjectId}>
          <SelectTrigger aria-label="Filtrar por assunto">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>Todos os assuntos</SelectItem>
            {subjects.map((subject) => (
              <SelectItem key={subject.id} value={subject.id}>
                {subject.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={type} onValueChange={setType}>
          <SelectTrigger aria-label="Filtrar por tipo">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>Todos os tipos</SelectItem>
            {(Object.keys(TYPE_LABEL) as QuestionType[]).map((option) => (
              <SelectItem key={option} value={option}>
                {TYPE_LABEL[option]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={difficulty} onValueChange={setDifficulty}>
          <SelectTrigger aria-label="Filtrar por dificuldade">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>Toda dificuldade</SelectItem>
            {(Object.keys(DIFFICULTY_LABEL) as Difficulty[]).map((option) => (
              <SelectItem key={option} value={option}>
                {DIFFICULTY_LABEL[option]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <p className="px-1 text-xs text-muted-foreground">
        {filtered.length} de {questions.length}{' '}
        {pluralize(questions.length, 'pergunta', 'perguntas')}
      </p>

      {filtered.length === 0 ? (
        <EmptyState
          icon={FileQuestion}
          title={filtersActive ? 'Nada encontrado' : 'Nenhuma pergunta ainda'}
          description={
            filtersActive
              ? 'Nenhuma pergunta bate com esses filtros. Tente afrouxar a busca.'
              : 'Cadastre pelo formulário ou importe um arquivo na aba Backup.'
          }
          action={!filtersActive ? <Button onClick={openNew}>Criar pergunta</Button> : undefined}
        />
      ) : (
        <ul className="space-y-2">
          {filtered.map((question) => {
            const subject = subjectById.get(question.subjectId)
            return (
              <li key={question.id} className="flex items-start gap-2 rounded-lg border bg-card p-3">
                <div className="min-w-0 flex-1 space-y-1.5">
                  <p className="text-sm leading-snug">
                    {truncate(htmlToText(question.prompt), 120)}
                  </p>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {subject && (
                      <Badge
                        className="border-transparent"
                        style={{
                          backgroundColor: `hsl(${subject.color} / 0.12)`,
                          color: `hsl(${subject.color})`,
                        }}
                      >
                        {subject.name}
                      </Badge>
                    )}
                    <Badge variant="secondary">{TYPE_LABEL[question.type]}</Badge>
                    {question.difficulty && (
                      <Badge variant="outline">{DIFFICULTY_LABEL[question.difficulty]}</Badge>
                    )}
                    {question.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="font-normal">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setEditing(question)
                    setFormOpen(true)
                  }}
                  aria-label="Editar pergunta"
                >
                  <Pencil />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setDoomed(question)}
                  aria-label="Excluir pergunta"
                  className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash2 />
                </Button>
              </li>
            )
          })}
        </ul>
      )}

      <QuestionForm
        open={formOpen}
        onOpenChange={setFormOpen}
        question={editing}
        defaultSubjectId={subjectId === ALL ? null : subjectId}
      />

      <AlertDialog open={doomed !== null} onOpenChange={(open) => !open && setDoomed(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir esta pergunta?</AlertDialogTitle>
            <AlertDialogDescription>
              O histórico de respostas dela também será apagado. Não dá para desfazer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
