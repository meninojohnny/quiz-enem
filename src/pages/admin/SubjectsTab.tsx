import * as React from 'react'
import { FolderPlus, Pencil, Plus, Trash2 } from 'lucide-react'
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
import { Button } from '@/components/ui/button'
import { useStore } from '@/data/StoreProvider'
import type { Subject } from '@/data/types'
import { iconFor } from '@/lib/icons'
import { pluralize } from '@/lib/utils'
import { SubjectForm } from './SubjectForm'

export function SubjectsTab() {
  const { subjects, questions, deleteSubject } = useStore()
  const [editing, setEditing] = React.useState<Subject | null>(null)
  const [formOpen, setFormOpen] = React.useState(false)
  const [doomed, setDoomed] = React.useState<Subject | null>(null)

  const countFor = (subjectId: string) =>
    questions.filter((q) => q.subjectId === subjectId).length

  function openNew() {
    setEditing(null)
    setFormOpen(true)
  }

  function openEdit(subject: Subject) {
    setEditing(subject)
    setFormOpen(true)
  }

  async function confirmDelete() {
    if (!doomed) return
    const count = countFor(doomed.id)
    await deleteSubject(doomed.id)
    toast.success(
      count === 0
        ? 'Assunto excluído.'
        : `Assunto excluído junto com ${count} ${pluralize(count, 'pergunta', 'perguntas')}.`,
    )
    setDoomed(null)
  }

  return (
    <div className="space-y-3">
      <Button onClick={openNew} className="w-full sm:w-auto">
        <Plus /> Novo assunto
      </Button>

      {subjects.length === 0 ? (
        <EmptyState
          icon={FolderPlus}
          title="Nenhum assunto cadastrado"
          description="Assuntos agrupam suas perguntas. Crie o primeiro para começar."
          action={<Button onClick={openNew}>Criar assunto</Button>}
        />
      ) : (
        <ul className="space-y-2">
          {subjects.map((subject) => {
            const Icon = iconFor(subject.icon)
            const count = countFor(subject.id)
            return (
              <li
                key={subject.id}
                className="flex items-center gap-3 rounded-lg border bg-card p-3"
              >
                <div
                  className="rounded-lg p-2.5"
                  style={{
                    backgroundColor: `hsl(${subject.color} / 0.12)`,
                    color: `hsl(${subject.color})`,
                  }}
                >
                  <Icon className="size-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{subject.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {count} {pluralize(count, 'pergunta', 'perguntas')}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => openEdit(subject)}
                  aria-label={`Editar ${subject.name}`}
                >
                  <Pencil />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setDoomed(subject)}
                  aria-label={`Excluir ${subject.name}`}
                  className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash2 />
                </Button>
              </li>
            )
          })}
        </ul>
      )}

      <SubjectForm open={formOpen} onOpenChange={setFormOpen} subject={editing} />

      <AlertDialog open={doomed !== null} onOpenChange={(open) => !open && setDoomed(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir “{doomed?.name}”?</AlertDialogTitle>
            <AlertDialogDescription>
              {doomed && countFor(doomed.id) > 0
                ? `Isso apaga também ${countFor(doomed.id)} ${pluralize(
                    countFor(doomed.id),
                    'pergunta',
                    'perguntas',
                  )} e todo o histórico de respostas delas. Não dá para desfazer.`
                : 'O assunto não tem perguntas. Não dá para desfazer.'}
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
