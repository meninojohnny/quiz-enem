import * as React from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
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
import { useStore } from '@/data/StoreProvider'
import type { Subject } from '@/data/types'
import { ICON_NAMES, SUBJECT_COLORS, iconFor } from '@/lib/icons'
import { cn } from '@/lib/utils'

export function SubjectForm({
  open,
  onOpenChange,
  subject,
}: {
  open: boolean
  onOpenChange(open: boolean): void
  /** Ausente = criação. */
  subject?: Subject | null
}) {
  const { createSubject, updateSubject } = useStore()
  const [name, setName] = React.useState('')
  const [color, setColor] = React.useState(SUBJECT_COLORS[0])
  const [icon, setIcon] = React.useState(ICON_NAMES[0])
  const [saving, setSaving] = React.useState(false)

  React.useEffect(() => {
    if (!open) return
    setName(subject?.name ?? '')
    setColor(subject?.color ?? SUBJECT_COLORS[0])
    setIcon(subject?.icon ?? ICON_NAMES[0])
  }, [open, subject])

  async function submit(event: React.FormEvent) {
    event.preventDefault()
    const trimmed = name.trim()
    if (!trimmed) {
      toast.error('Dê um nome ao assunto.')
      return
    }

    setSaving(true)
    try {
      if (subject) {
        await updateSubject(subject.id, { name: trimmed, color, icon })
        toast.success('Assunto atualizado.')
      } else {
        await createSubject({ name: trimmed, color, icon })
        toast.success('Assunto criado.')
      }
      onOpenChange(false)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Não foi possível salvar.')
    } finally {
      setSaving(false)
    }
  }

  const Preview = iconFor(icon)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{subject ? 'Editar assunto' : 'Novo assunto'}</DialogTitle>
          <DialogDescription>
            A cor e o ícone identificam o assunto nas listas e nas perguntas.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={submit} className="space-y-4 overflow-y-auto">
          <div className="flex items-center gap-3">
            <div
              className="rounded-lg p-3"
              style={{ backgroundColor: `hsl(${color} / 0.12)`, color: `hsl(${color})` }}
            >
              <Preview className="size-6" />
            </div>
            <div className="flex-1 space-y-1.5">
              <Label htmlFor="subject-name">Nome</Label>
              <Input
                id="subject-name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Ex.: Farmacologia"
                autoFocus
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label>Cor</Label>
            <div className="flex flex-wrap gap-2">
              {SUBJECT_COLORS.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setColor(option)}
                  aria-label={`Cor ${option}`}
                  aria-pressed={color === option}
                  className={cn(
                    'size-8 rounded-full border-2 transition-transform',
                    color === option
                      ? 'scale-110 border-foreground'
                      : 'border-transparent hover:scale-105',
                  )}
                  style={{ backgroundColor: `hsl(${option})` }}
                />
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label>Ícone</Label>
            <div className="flex max-h-32 flex-wrap gap-1.5 overflow-y-auto rounded-md border p-2">
              {ICON_NAMES.map((option) => {
                const Icon = iconFor(option)
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setIcon(option)}
                    aria-label={`Ícone ${option}`}
                    aria-pressed={icon === option}
                    className={cn(
                      'rounded-md p-2 transition-colors',
                      icon === option
                        ? 'bg-accent text-foreground ring-2 ring-ring'
                        : 'text-muted-foreground hover:bg-accent hover:text-foreground',
                    )}
                  >
                    <Icon className="size-4" />
                  </button>
                )
              })}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={saving}>
              {subject ? 'Salvar' : 'Criar assunto'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
