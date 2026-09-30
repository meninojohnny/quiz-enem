import * as React from 'react'
import { GripVertical, Plus, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { RichTextEditor } from '@/components/RichTextEditor'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useStore } from '@/data/StoreProvider'
import type { Choice, Difficulty, NewQuestion, Question, QuestionType } from '@/data/types'
import { cn, createId, htmlToText } from '@/lib/utils'

const TYPE_LABEL: Record<QuestionType, string> = {
  multiple_choice: 'Múltipla escolha',
  true_false: 'Verdadeiro ou falso',
  open: 'Discursiva',
}

const DIFFICULTY_LABEL: Record<Difficulty, string> = {
  easy: 'Fácil',
  medium: 'Médio',
  hard: 'Difícil',
}

const NO_DIFFICULTY = 'none'

function emptyChoice(text = ''): Choice {
  return { id: createId('c'), text, correct: false }
}

function trueFalseChoices(trueIsCorrect: boolean): Choice[] {
  return [
    { id: createId('c'), text: 'Verdadeiro', correct: trueIsCorrect },
    { id: createId('c'), text: 'Falso', correct: !trueIsCorrect },
  ]
}

export function QuestionForm({
  open,
  onOpenChange,
  question,
  defaultSubjectId,
}: {
  open: boolean
  onOpenChange(open: boolean): void
  /** Ausente = criação. */
  question?: Question | null
  defaultSubjectId?: string | null
}) {
  const { subjects, createQuestion, updateQuestion } = useStore()

  const [subjectId, setSubjectId] = React.useState('')
  const [type, setType] = React.useState<QuestionType>('multiple_choice')
  const [prompt, setPrompt] = React.useState('')
  const [choices, setChoices] = React.useState<Choice[]>([emptyChoice(), emptyChoice()])
  const [answerText, setAnswerText] = React.useState('')
  const [explanation, setExplanation] = React.useState('')
  const [difficulty, setDifficulty] = React.useState<string>(NO_DIFFICULTY)
  const [tags, setTags] = React.useState('')
  const [saving, setSaving] = React.useState(false)

  React.useEffect(() => {
    if (!open) return
    setSubjectId(question?.subjectId ?? defaultSubjectId ?? subjects[0]?.id ?? '')
    setType(question?.type ?? 'multiple_choice')
    setPrompt(question?.prompt ?? '')
    setChoices(
      question && question.choices.length > 0
        ? question.choices
        : question?.type === 'true_false'
          ? trueFalseChoices(true)
          : [emptyChoice(), emptyChoice()],
    )
    setAnswerText(question?.answerText ?? '')
    setExplanation(question?.explanation ?? '')
    setDifficulty(question?.difficulty ?? NO_DIFFICULTY)
    setTags(question?.tags.join(', ') ?? '')
  }, [open, question, defaultSubjectId, subjects])

  function changeType(next: QuestionType) {
    setType(next)
    if (next === 'true_false') {
      setChoices(trueFalseChoices(choices[0]?.correct ?? true))
    } else if (next === 'multiple_choice' && choices.length < 2) {
      setChoices([emptyChoice(), emptyChoice()])
    }
  }

  function updateChoice(id: string, patch: Partial<Choice>) {
    setChoices((current) => current.map((c) => (c.id === id ? { ...c, ...patch } : c)))
  }

  function setTrueFalse(trueIsCorrect: boolean) {
    setChoices(trueFalseChoices(trueIsCorrect))
  }

  function validate(): string | null {
    if (!subjectId) return 'Escolha um assunto.'
    if (!htmlToText(prompt)) return 'Escreva o enunciado da pergunta.'

    if (type === 'open') {
      if (!htmlToText(answerText)) return 'Escreva a resposta esperada da discursiva.'
      return null
    }

    const filled = choices.filter((c) => c.text.trim() !== '')
    if (filled.length < 2) return 'Uma pergunta de alternativas precisa de ao menos duas opções.'
    if (!filled.some((c) => c.correct)) return 'Marque ao menos uma alternativa como correta.'
    return null
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault()
    const problem = validate()
    if (problem) {
      toast.error(problem)
      return
    }

    const payload: NewQuestion = {
      subjectId,
      type,
      prompt,
      choices:
        type === 'open'
          ? []
          : choices.filter((c) => c.text.trim() !== '').map((c) => ({ ...c, text: c.text.trim() })),
      answerText: type === 'open' ? answerText : '',
      explanation: htmlToText(explanation) ? explanation : '',
      difficulty: difficulty === NO_DIFFICULTY ? null : (difficulty as Difficulty),
      tags: tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
    }

    setSaving(true)
    try {
      if (question) {
        await updateQuestion(question.id, payload)
        toast.success('Pergunta atualizada.')
      } else {
        await createQuestion(payload)
        toast.success('Pergunta criada.')
      }
      onOpenChange(false)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Não foi possível salvar.')
    } finally {
      setSaving(false)
    }
  }

  const correctCount = choices.filter((c) => c.correct).length

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{question ? 'Editar pergunta' : 'Nova pergunta'}</DialogTitle>
          <DialogDescription>
            A resposta correta e a explicação fazem parte do cadastro da própria pergunta.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={submit} className="space-y-4 overflow-y-auto pr-1">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label>Assunto</Label>
              <Select value={subjectId} onValueChange={setSubjectId}>
                <SelectTrigger>
                  <SelectValue placeholder="Escolha…" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((subject) => (
                    <SelectItem key={subject.id} value={subject.id}>
                      {subject.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label>Tipo</Label>
              <Select value={type} onValueChange={(value) => changeType(value as QuestionType)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(Object.keys(TYPE_LABEL) as QuestionType[]).map((option) => (
                    <SelectItem key={option} value={option}>
                      {TYPE_LABEL[option]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label>Enunciado</Label>
            <RichTextEditor
              value={prompt}
              onChange={setPrompt}
              placeholder="O que você quer perguntar?"
            />
          </div>

          {type === 'true_false' && (
            <div className="space-y-1.5">
              <Label>Resposta correta</Label>
              <div className="grid grid-cols-2 gap-2">
                {[true, false].map((isTrue) => {
                  const selected = choices[0]?.correct === isTrue
                  return (
                    <button
                      key={String(isTrue)}
                      type="button"
                      onClick={() => setTrueFalse(isTrue)}
                      aria-pressed={selected}
                      className={cn(
                        'rounded-md border-2 py-2.5 text-sm font-medium transition-colors',
                        selected
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border hover:bg-accent',
                      )}
                    >
                      {isTrue ? 'Verdadeiro' : 'Falso'}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {type === 'multiple_choice' && (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label>Alternativas</Label>
                <span className="text-xs text-muted-foreground">
                  {correctCount === 0
                    ? 'Marque a correta'
                    : correctCount === 1
                      ? 'Uma correta · clique direto ao responder'
                      : `${correctCount} corretas · checkbox + confirmar ao responder`}
                </span>
              </div>

              <ul className="space-y-2">
                {choices.map((choice, index) => (
                  <li key={choice.id} className="flex items-center gap-2">
                    <GripVertical className="size-4 shrink-0 text-muted-foreground" aria-hidden />
                    <Checkbox
                      checked={choice.correct}
                      onCheckedChange={(checked) =>
                        updateChoice(choice.id, { correct: checked === true })
                      }
                      aria-label={`Alternativa ${index + 1} é correta`}
                    />
                    <Input
                      value={choice.text}
                      onChange={(event) => updateChoice(choice.id, { text: event.target.value })}
                      placeholder={`Alternativa ${index + 1}`}
                      className={cn(choice.correct && 'border-success')}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      disabled={choices.length <= 2}
                      onClick={() => setChoices((c) => c.filter((item) => item.id !== choice.id))}
                      aria-label={`Remover alternativa ${index + 1}`}
                      className="shrink-0 text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 />
                    </Button>
                  </li>
                ))}
              </ul>

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setChoices((c) => [...c, emptyChoice()])}
              >
                <Plus /> Adicionar alternativa
              </Button>
            </div>
          )}

          {type === 'open' && (
            <div className="space-y-1.5">
              <Label>Resposta esperada</Label>
              <RichTextEditor
                value={answerText}
                onChange={setAnswerText}
                placeholder="O que você deve conseguir responder…"
              />
            </div>
          )}

          <div className="space-y-1.5">
            <Label>Explicação (opcional)</Label>
            <RichTextEditor
              value={explanation}
              onChange={setExplanation}
              placeholder="Exibida depois de responder."
              minHeight="min-h-16"
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label>Dificuldade</Label>
              <Select value={difficulty} onValueChange={setDifficulty}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={NO_DIFFICULTY}>Sem nível</SelectItem>
                  {(Object.keys(DIFFICULTY_LABEL) as Difficulty[]).map((option) => (
                    <SelectItem key={option} value={option}>
                      {DIFFICULTY_LABEL[option]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="question-tags">Tags</Label>
              <Input
                id="question-tags"
                value={tags}
                onChange={(event) => setTags(event.target.value)}
                placeholder="separadas, por, vírgula"
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={saving}>
              {question ? 'Salvar' : 'Criar pergunta'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
