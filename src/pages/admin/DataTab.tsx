import * as React from 'react'
import { AlertTriangle, Download, RotateCcw, Upload } from 'lucide-react'
import { toast } from 'sonner'
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
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useStore } from '@/data/StoreProvider'
import type { Backup, NewQuestion } from '@/data/types'
import { detectFormat, isBackup, parseImportFile, type ImportError } from '@/lib/importers'
import { pluralize } from '@/lib/utils'

interface Preview {
  fileName: string
  questions: NewQuestion[]
  errors: ImportError[]
  backup: Backup | null
}

export function DataTab() {
  const { subjects, questions, matches, bulkCreateQuestions, importAll, exportAll, resetToSeed } =
    useStore()

  const fileInput = React.useRef<HTMLInputElement>(null)
  const [targetSubject, setTargetSubject] = React.useState<string>(subjects[0]?.id ?? '')
  const [preview, setPreview] = React.useState<Preview | null>(null)
  const [confirmReset, setConfirmReset] = React.useState(false)
  const [busy, setBusy] = React.useState(false)

  React.useEffect(() => {
    if (!targetSubject && subjects.length > 0) setTargetSubject(subjects[0].id)
  }, [subjects, targetSubject])

  async function handleFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return

    const content = await file.text()

    // Um backup completo traz assuntos e histórico — não é anexado a um assunto.
    if (file.name.toLowerCase().endsWith('.json')) {
      try {
        const data: unknown = JSON.parse(content)
        if (isBackup(data)) {
          setPreview({ fileName: file.name, questions: [], errors: [], backup: data })
          return
        }
        if (detectFormat(data) === 'unknown') {
          toast.error('Formato de JSON não reconhecido.')
          return
        }
      } catch {
        toast.error('JSON inválido: não foi possível ler o arquivo.')
        return
      }
    }

    if (!targetSubject) {
      toast.error('Crie um assunto antes de importar perguntas.')
      return
    }

    const result = parseImportFile(content, file.name, targetSubject)
    if (result.questions.length === 0 && result.errors.length > 0) {
      toast.error(result.errors[0].message)
    }
    setPreview({ fileName: file.name, ...result, backup: null })
  }

  async function confirmImport(strategy: 'merge' | 'replace' = 'merge') {
    if (!preview) return
    setBusy(true)
    try {
      if (preview.backup) {
        await importAll(preview.backup, strategy)
        toast.success(
          strategy === 'replace'
            ? 'Backup restaurado, substituindo o conteúdo anterior.'
            : 'Backup mesclado ao conteúdo atual.',
        )
      } else {
        await bulkCreateQuestions(preview.questions)
        toast.success(
          `${preview.questions.length} ${pluralize(preview.questions.length, 'pergunta importada', 'perguntas importadas')}.`,
        )
      }
      setPreview(null)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Falha ao importar.')
    } finally {
      setBusy(false)
    }
  }

  async function handleExport() {
    const backup = await exportAll()
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = `quiz-da-didi-backup-${backup.exportedAt.slice(0, 10)}.json`
    anchor.click()
    URL.revokeObjectURL(url)
    toast.success('Backup exportado.')
  }

  async function handleReset() {
    await resetToSeed()
    setConfirmReset(false)
    toast.success('Conteúdo restaurado para o exemplo inicial.')
  }

  return (
    <div className="space-y-3">
      <Card>
        <CardContent className="space-y-3 p-4">
          <div>
            <h3 className="font-semibold">Importar perguntas</h3>
            <p className="text-sm text-muted-foreground">
              Aceita JSON no formato do Arena Quiz, o JSON do app antigo (
              <code className="rounded bg-muted px-1 text-xs">pergunta / alternativas / resposta</code>
              ) e CSV.
            </p>
          </div>

          <details className="rounded-md border bg-muted/30 p-3 text-xs">
            <summary className="cursor-pointer font-medium">Formato do CSV</summary>
            <div className="mt-2 space-y-1.5 text-muted-foreground">
              <p>
                Colunas: <code>pergunta</code>, <code>tipo</code>, <code>alternativas</code>,{' '}
                <code>corretas</code>, <code>resposta</code>, <code>explicacao</code>,{' '}
                <code>dificuldade</code>, <code>tags</code>. Só <code>pergunta</code> é obrigatória.
              </p>
              <p>
                Alternativas e tags são separadas por <code>|</code>. Em <code>corretas</code> use
                índices começando em 1 (<code>1</code> ou <code>1|3</code>) ou o texto exato da
                alternativa.
              </p>
              <pre className="overflow-x-auto rounded bg-background p-2">
{`pergunta,tipo,alternativas,corretas
Qual é a capital?,multipla,Brasília|Rio,1`}
              </pre>
            </div>
          </details>

          {subjects.length > 0 && (
            <div className="space-y-1.5">
              <Label>Importar para o assunto</Label>
              <Select value={targetSubject} onValueChange={setTargetSubject}>
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
              <p className="text-xs text-muted-foreground">
                Ignorado quando o arquivo é um backup completo do Arena Quiz.
              </p>
            </div>
          )}

          <input
            ref={fileInput}
            type="file"
            accept=".json,.csv,application/json,text/csv"
            onChange={handleFile}
            className="hidden"
          />
          <Button variant="outline" onClick={() => fileInput.current?.click()}>
            <Upload /> Escolher arquivo
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex items-center gap-3 p-4">
          <div className="flex-1">
            <h3 className="font-semibold">Exportar backup</h3>
            <p className="text-sm text-muted-foreground">
              {subjects.length} {pluralize(subjects.length, 'assunto', 'assuntos')} ·{' '}
              {questions.length} {pluralize(questions.length, 'pergunta', 'perguntas')} ·{' '}
              {matches.length} {pluralize(matches.length, 'partida', 'partidas')}
            </p>
          </div>
          <Button variant="outline" onClick={handleExport}>
            <Download /> Exportar
          </Button>
        </CardContent>
      </Card>

      <Card className="border-destructive/30">
        <CardContent className="flex items-center gap-3 p-4">
          <AlertTriangle className="size-5 shrink-0 text-destructive" />
          <div className="flex-1">
            <h3 className="font-semibold">Restaurar conteúdo de exemplo</h3>
            <p className="text-sm text-muted-foreground">
              Apaga tudo e volta ao conteúdo inicial. Exporte um backup antes.
            </p>
          </div>
          <Button variant="outline" onClick={() => setConfirmReset(true)}>
            <RotateCcw /> Restaurar
          </Button>
        </CardContent>
      </Card>

      {/* Confirmação da importação */}
      <AlertDialog open={preview !== null} onOpenChange={(open) => !open && setPreview(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {preview?.backup ? 'Restaurar backup' : 'Confirmar importação'}
            </AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div className="space-y-2">
                <p>
                  <span className="font-medium text-foreground">{preview?.fileName}</span>
                  {preview?.backup
                    ? ` — backup com ${preview.backup.subjects.length} ${pluralize(
                        preview.backup.subjects.length,
                        'assunto',
                        'assuntos',
                      )}, ${preview.backup.questions.length} perguntas e ${preview.backup.matches?.length ?? 0} partidas.`
                    : ` — ${preview?.questions.length ?? 0} ${pluralize(
                        preview?.questions.length ?? 0,
                        'pergunta pronta',
                        'perguntas prontas',
                      )} para importar.`}
                </p>

                {preview && preview.errors.length > 0 && (
                  <div className="max-h-32 space-y-1 overflow-y-auto rounded-md border border-destructive/30 bg-destructive/5 p-2 text-xs">
                    <p className="font-medium text-destructive">
                      {preview.errors.length}{' '}
                      {pluralize(preview.errors.length, 'linha ignorada', 'linhas ignoradas')}:
                    </p>
                    {preview.errors.slice(0, 8).map((error) => (
                      <p key={`${error.line}-${error.message}`}>
                        Linha {error.line}: {error.message}
                      </p>
                    ))}
                    {preview.errors.length > 8 && <p>…e mais {preview.errors.length - 8}.</p>}
                  </div>
                )}
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            {preview?.backup && (
              <Button variant="destructive" disabled={busy} onClick={() => void confirmImport('replace')}>
                Substituir tudo
              </Button>
            )}
            <AlertDialogAction
              disabled={busy || (!preview?.backup && (preview?.questions.length ?? 0) === 0)}
              onClick={(event) => {
                event.preventDefault()
                void confirmImport('merge')
              }}
            >
              {preview?.backup ? 'Mesclar' : 'Importar'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Confirmação do reset */}
      <AlertDialog open={confirmReset} onOpenChange={setConfirmReset}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Restaurar o conteúdo de exemplo?</AlertDialogTitle>
            <AlertDialogDescription>
              Todos os assuntos, perguntas e o histórico de respostas serão apagados e substituídos
              pelo conteúdo inicial. Não dá para desfazer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleReset}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Restaurar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
