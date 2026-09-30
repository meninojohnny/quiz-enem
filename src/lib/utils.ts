import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

// Sem isto, `text-stage-md` (tamanho) e `text-primary` (cor) se anulam.
const twMerge = extendTailwindMerge({
  extend: { classGroups: { 'font-size': [{ text: ['stage-sm', 'stage-md', 'stage-lg', 'stage-xl'] }] } },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Id curto e único o bastante para uso local. */
export function createId(prefix = ''): string {
  const random =
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID().slice(0, 12)
      : Math.random().toString(36).slice(2, 14)
  return prefix ? `${prefix}-${random}` : random
}

export function nowIso(): string {
  return new Date().toISOString()
}

export function formatPercent(value: number, digits = 0): string {
  return `${(value * 100).toFixed(digits)}%`
}

export function pluralize(count: number, singular: string, plural: string): string {
  return count === 1 ? singular : plural
}

/** Texto puro a partir de HTML — para busca, listagens e truncagem. */
export function htmlToText(html: string): string {
  return html
    .replace(/<li[^>]*>/gi, '• ')
    .replace(/<\/(li|p|div|ul|ol)>/gi, ' ')
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim()
}

export function truncate(text: string, max: number): string {
  return text.length <= max ? text : `${text.slice(0, max - 1).trimEnd()}…`
}

/** Normaliza para busca sem acento e sem caixa. */
export function normalize(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}
