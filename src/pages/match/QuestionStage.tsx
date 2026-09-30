import { Check, Lightbulb, X } from 'lucide-react'
import { RichText } from '@/components/RichText'
import type { Question, Turn } from '@/data/types'
import { isMultiSelect } from '@/domain/queue'
import { htmlToText, cn } from '@/lib/utils'

export const CHOICE_LETTERS = 'ABCDEFGHI'

type ChoiceState = 'idle' | 'chosen' | 'correct' | 'wrong' | 'dim'

/**
 * Pergunta no palco. Quem clica é o mediador, repetindo o que o grupo
 * disse em voz alta; por isso as alternativas são linhas largas e altas.
 */
export function QuestionStage({
  question,
  revealed,
  turn,
  selected,
  showOpenAnswer,
  onChoice,
}: {
  question: Question
  revealed: boolean
  /** A jogada registrada, quando `revealed`. */
  turn: Turn | null
  /** Marcadas antes de confirmar (múltiplas corretas). */
  selected: string[]
  showOpenAnswer: boolean
  onChoice(choiceId: string): void
}) {
  const multi = isMultiSelect(question)
  const long = htmlToText(question.prompt).length > 170
  const picked = revealed ? (turn?.selectedChoiceIds ?? []) : selected

  function stateOf(choiceId: string, correct: boolean): ChoiceState {
    const chosen = picked.includes(choiceId)
    if (!revealed) return chosen ? 'chosen' : 'idle'
    if (correct) return 'correct'
    if (chosen) return 'wrong'
    return 'dim'
  }

  return (
    <div className="flex flex-col gap-[clamp(1rem,2.4vh,2rem)]">
      <RichText
        html={question.prompt}
        className={cn(
          'max-w-[46ch] text-balance font-semibold tracking-[-0.015em]',
          long ? 'text-stage-md' : 'text-stage-lg',
        )}
      />

      {multi && !revealed && (
        <p className="text-stage-sm font-semibold text-primary">
          Mais de uma alternativa correta: marque todas e confirme.
        </p>
      )}

      {question.type !== 'open' && (
        <ul className="grid gap-[clamp(0.4rem,1vh,0.75rem)]">
          {question.choices.map((choice, index) => {
            const state = stateOf(choice.id, choice.correct)
            return (
              <li key={choice.id}>
                <button
                  type="button"
                  disabled={revealed}
                  aria-pressed={picked.includes(choice.id)}
                  onClick={() => onChoice(choice.id)}
                  className={cn(
                    'group flex w-full items-stretch text-left text-stage-md transition-[background-color,color,opacity,transform] duration-200',
                    'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/60',
                    'enabled:active:scale-[0.995]',
                    state === 'idle' && 'bg-card enabled:hover:bg-secondary',
                    state === 'chosen' && 'bg-secondary ring-2 ring-inset ring-primary',
                    state === 'correct' && 'bg-success text-success-foreground',
                    state === 'wrong' && 'animate-shake bg-destructive text-destructive-foreground',
                    state === 'dim' && 'bg-card opacity-45',
                  )}
                >
                  <span
                    className={cn(
                      'flex w-[2.4em] shrink-0 items-center justify-center font-broadcast text-[1.15em]',
                      state === 'idle' && 'bg-secondary text-muted-foreground group-enabled:group-hover:text-foreground',
                      state === 'chosen' && 'bg-primary text-primary-foreground',
                      (state === 'correct' || state === 'wrong') && 'bg-black/15',
                      state === 'dim' && 'bg-secondary text-muted-foreground',
                    )}
                  >
                    {state === 'correct' ? (
                      <Check className="size-[1em]" strokeWidth={3.5} />
                    ) : state === 'wrong' ? (
                      <X className="size-[1em]" strokeWidth={3.5} />
                    ) : (
                      CHOICE_LETTERS[index]
                    )}
                  </span>
                  <RichText html={choice.text} as="span" className="flex-1 px-[0.9em] py-[0.55em] font-medium leading-snug" />
                </button>
              </li>
            )
          })}
        </ul>
      )}

      {question.type === 'open' && showOpenAnswer && (
        <div className="animate-rise bg-card p-[1.1em] text-stage-md">
          <p className="mb-2 font-broadcast text-[0.75em] uppercase text-primary">Resposta esperada</p>
          <RichText html={question.answerText || '<p>Sem resposta cadastrada.</p>'} />
        </div>
      )}

      {revealed && question.explanation && (
        <div className="flex animate-rise gap-3 text-stage-sm text-muted-foreground">
          <Lightbulb className="mt-1 size-[1.1em] shrink-0 text-primary" />
          <RichText html={question.explanation} className="max-w-[70ch]" />
        </div>
      )}
    </div>
  )
}
