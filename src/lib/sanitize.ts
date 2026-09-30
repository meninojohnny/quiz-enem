import DOMPurify from 'dompurify'

/**
 * Todo HTML de conteúdo (enunciado, alternativas, resposta, explicação) passa
 * por aqui antes de virar `dangerouslySetInnerHTML`. O conteúdo é de autoria do
 * próprio usuário, mas importação de arquivo é uma porta de entrada externa.
 */
const ALLOWED_TAGS = [
  'b', 'strong', 'i', 'em', 'u', 's', 'p', 'br', 'ul', 'ol', 'li',
  'code', 'pre', 'sub', 'sup', 'blockquote', 'h3', 'h4', 'span',
]

export function sanitizeHtml(html: string): string {
  if (!html) return ''
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS,
    ALLOWED_ATTR: [],
  })
}
