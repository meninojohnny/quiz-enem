export type QuestionType = 'multiple_choice' | 'true_false' | 'open'

export type Difficulty = 'easy' | 'medium' | 'hard'

export interface Subject {
  id: string
  name: string
  /** Cor de destaque em HSL "H S% L%", para casar com os tokens do tema. */
  color: string
  /** Nome de um ícone do lucide-react (ver ICON_NAMES em lib/icons.ts). */
  icon: string
  createdAt: string
}

export interface Choice {
  id: string
  /** HTML sanitizado na renderização. */
  text: string
  correct: boolean
}

export interface Question {
  id: string
  subjectId: string
  type: QuestionType
  /** Enunciado, HTML sanitizado na renderização. */
  prompt: string
  /** Vazio para perguntas discursivas. */
  choices: Choice[]
  /** Resposta esperada da discursiva (HTML). Vazio nos outros tipos. */
  answerText: string
  /** Explicação opcional exibida depois de responder (HTML). */
  explanation: string
  difficulty: Difficulty | null
  tags: string[]
  createdAt: string
  updatedAt: string
}

export type TeamColor = 'red' | 'blue' | 'green' | 'orange' | 'violet' | 'pink' | 'teal' | 'lime'

export interface Team {
  id: string
  name: string
  color: TeamColor
}

/** Uma jogada já decidida. O placar inteiro é derivado desta lista. */
export interface Turn {
  questionId: string
  teamId: string
  correct: boolean
  points: number
  selectedChoiceIds: string[]
  answeredAt: string
}

/**
 * `question`: pergunta no ar, esperando a resposta do grupo.
 * `revealed`: a última jogada foi registrada e a resposta está na tela.
 * `standings`: fim de rodada, placar em tela cheia.
 */
export type MatchPhase = 'question' | 'revealed' | 'standings'

export interface Match {
  id: string
  subjectId: string
  /** Na ordem em que jogam. */
  teams: Team[]
  /** Já recortada para um múltiplo do número de grupos. */
  questionIds: string[]
  turns: Turn[]
  phase: MatchPhase
  status: 'playing' | 'finished'
  createdAt: string
  finishedAt: string | null
}

export interface Settings {
  soundEnabled: boolean
}

/** Payload de exportação/importação. A versão 1 trazia `attempts`, hoje ignorado. */
export interface Backup {
  version: 1 | 2
  exportedAt: string
  subjects: Subject[]
  questions: Question[]
  matches?: Match[]
}

export interface QuestionFilter {
  subjectId?: string | null
  type?: QuestionType
  difficulty?: Difficulty
  /** Busca livre em enunciado, alternativas, resposta e tags. */
  search?: string
  tag?: string
}

export type NewSubject = Omit<Subject, 'id' | 'createdAt'>
export type NewQuestion = Omit<Question, 'id' | 'createdAt' | 'updatedAt'>
