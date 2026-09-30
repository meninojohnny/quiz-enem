import type { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { Brand } from './Brand'

const LINKS = [
  { to: '/', label: 'Início', end: true },
  { to: '/nova', label: 'Nova partida', end: false },
  { to: '/admin', label: 'Perguntas', end: false },
]

/** Barra das telas fora do palco. A tela da partida tem a sua própria faixa. */
export function TopBar({ actions }: { actions?: ReactNode }) {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-4 sm:px-6">
        <Brand />
        <nav aria-label="Principal" className="ml-auto flex items-center gap-1">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                cn(
                  'relative hidden rounded-md px-3 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:block',
                  isActive &&
                    'text-foreground after:absolute after:inset-x-3 after:-bottom-[13px] after:h-[3px] after:bg-primary',
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
          {actions}
        </nav>
      </div>
    </header>
  )
}
