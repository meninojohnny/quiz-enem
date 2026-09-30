import type * as React from 'react'
import { cn } from '@/lib/utils'

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 0 a 1. */
  value: number
  /** Cor HSL "H S% L%"; sem ela usa a cor primária. */
  color?: string
}

export function Progress({ value, color, className, ...props }: ProgressProps) {
  const pct = Math.max(0, Math.min(1, Number.isFinite(value) ? value : 0)) * 100
  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn('h-2 w-full overflow-hidden rounded-full bg-muted', className)}
      {...props}
    >
      <div
        className="h-full rounded-full transition-[width] duration-500 ease-out"
        style={{
          width: `${pct}%`,
          backgroundColor: color ? `hsl(${color})` : 'hsl(var(--primary))',
        }}
      />
    </div>
  )
}
