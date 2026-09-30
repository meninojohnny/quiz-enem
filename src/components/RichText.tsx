import * as React from 'react'
import { sanitizeHtml } from '@/lib/sanitize'
import { cn } from '@/lib/utils'

/**
 * Única porta de entrada para conteúdo HTML do usuário na tela.
 * Sempre sanitiza — nenhum outro componente usa dangerouslySetInnerHTML.
 */
export function RichText({
  html,
  className,
  as: Tag = 'div',
}: {
  html: string
  className?: string
  as?: 'div' | 'span'
}) {
  const safe = React.useMemo(() => sanitizeHtml(html), [html])
  return <Tag className={cn('rich-text', className)} dangerouslySetInnerHTML={{ __html: safe }} />
}
