import * as React from 'react'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Placeholder } from '@tiptap/extensions'
import { Bold, Italic, List, ListOrdered, Redo2, Undo2 } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Editor de conteúdo do cadastro de perguntas.
 *
 * Deliberadamente pobre: negrito, itálico e listas. É o que o conteúdo atual
 * usa (`<ul>`, `<b>`) e o que a tela sabe renderizar com segurança depois de
 * passar pelo sanitizador.
 */
export function RichTextEditor({
  value,
  onChange,
  placeholder,
  minHeight = 'min-h-24',
}: {
  value: string
  onChange(html: string): void
  placeholder?: string
  minHeight?: string
}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
        codeBlock: false,
        horizontalRule: false,
        blockquote: false,
        link: false,
      }),
      Placeholder.configure({ placeholder: placeholder ?? 'Escreva aqui…' }),
    ],
    content: value,
    onUpdate: ({ editor: instance }) => onChange(instance.getHTML()),
    editorProps: {
      attributes: {
        class: cn('rich-text tiptap px-3 py-2 text-sm focus:outline-none', minHeight),
      },
    },
  })

  // Conteúdo trocado de fora (abrir outra pergunta no mesmo formulário).
  React.useEffect(() => {
    if (editor && !editor.isDestroyed && value !== editor.getHTML()) {
      editor.commands.setContent(value, { emitUpdate: false })
    }
  }, [editor, value])

  if (!editor) {
    return <div className={cn('rounded-md border bg-background', minHeight)} />
  }

  return (
    <div className="overflow-hidden rounded-md border bg-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background">
      <div className="flex items-center gap-0.5 border-b bg-muted/50 px-1 py-1">
        <ToolbarButton
          label="Negrito"
          active={editor.isActive('bold')}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold className="size-4" />
        </ToolbarButton>
        <ToolbarButton
          label="Itálico"
          active={editor.isActive('italic')}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic className="size-4" />
        </ToolbarButton>
        <ToolbarButton
          label="Lista com marcadores"
          active={editor.isActive('bulletList')}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List className="size-4" />
        </ToolbarButton>
        <ToolbarButton
          label="Lista numerada"
          active={editor.isActive('orderedList')}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered className="size-4" />
        </ToolbarButton>

        <span className="mx-1 h-5 w-px bg-border" />

        <ToolbarButton label="Desfazer" onClick={() => editor.chain().focus().undo().run()}>
          <Undo2 className="size-4" />
        </ToolbarButton>
        <ToolbarButton label="Refazer" onClick={() => editor.chain().focus().redo().run()}>
          <Redo2 className="size-4" />
        </ToolbarButton>
      </div>

      <EditorContent editor={editor} />
    </div>
  )
}

function ToolbarButton({
  children,
  label,
  active,
  onClick,
}: {
  children: React.ReactNode
  label: string
  active?: boolean
  onClick(): void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={active}
      title={label}
      className={cn(
        'rounded p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground',
        active && 'bg-accent text-foreground',
      )}
    >
      {children}
    </button>
  )
}
