import { Suspense, lazy } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Toaster } from 'sonner'
import { StoreProvider, useStore } from '@/data/StoreProvider'
import { HomePage } from '@/pages/HomePage'
import { MatchPage } from '@/pages/MatchPage'
import { ResultPage } from '@/pages/ResultPage'
import { SetupPage } from '@/pages/SetupPage'

// A administração carrega o editor de texto rico, que o palco não usa.
const AdminPage = lazy(() => import('@/pages/AdminPage').then((m) => ({ default: m.AdminPage })))

function Loading() {
  return (
    <div className="flex min-h-dvh items-center justify-center" role="status" aria-label="Carregando">
      <span className="slant h-6 w-10 animate-live bg-primary [--slant:0.5rem]" />
    </div>
  )
}

function Shell() {
  const { ready, error } = useStore()

  if (!ready) return <Loading />

  if (error) {
    return (
      <div className="flex min-h-dvh items-center justify-center p-6 text-center">
        <div className="space-y-2">
          <p className="font-bold">Não foi possível carregar os dados</p>
          <p className="text-sm text-muted-foreground">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/nova" element={<SetupPage />} />
        <Route path="/partida" element={<MatchPage />} />
        <Route path="/resultado/:matchId" element={<ResultPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  )
}

export default function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <Shell />
        <Toaster position="top-center" theme="dark" richColors closeButton />
      </BrowserRouter>
    </StoreProvider>
  )
}
