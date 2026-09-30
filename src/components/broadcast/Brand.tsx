import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

export const PRODUCT_NAME = 'Arena Quiz'

export function Brand({ className }: { className?: string }) {
  return (
    <Link
      to="/"
      className={cn(
        'group inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        className,
      )}
    >
      <span aria-hidden className="slant h-5 w-7 bg-primary [--slant:0.4rem]" />
      <span className="font-broadcast text-xl uppercase leading-none tracking-tight">
        {PRODUCT_NAME}
      </span>
    </Link>
  )
}
