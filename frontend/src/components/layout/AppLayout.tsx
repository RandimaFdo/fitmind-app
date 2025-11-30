import { NavLink, Outlet } from 'react-router-dom'
import { UserCircle2 } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'

function linkClasses({ isActive }: { isActive: boolean }) {
  const base = 'rounded-full px-4 py-2 text-sm font-medium transition-colors'
  return isActive ? `${base} bg-white/10 text-white` : `${base} text-slate-300 hover:text-white`
}

export function AppLayout() {
  const { logout } = useAuth()

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="sticky top-0 z-50 border-b border-white/5 bg-slate-900/80 shadow-lg shadow-black/20 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <span className="text-xs uppercase tracking-[0.5em] text-slate-400">FitMind</span>
          <nav className="flex flex-1 items-center justify-end gap-3 text-sm">
            <NavLink to="/" className={linkClasses} end>
              Dashboard
            </NavLink>
            <NavLink to="/planner" className={linkClasses}>
              Planner
            </NavLink>
            <NavLink to="/fitness" className={linkClasses}>
              Fitness
            </NavLink>
            <NavLink to="/hair-care" className={linkClasses}>
              Hair Care
            </NavLink>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `rounded-full border border-white/10 p-2 transition hover:border-brand-neon hover:text-white ${
                  isActive ? 'bg-white/10 text-white' : 'text-slate-200'
                }`
              }
              aria-label="Profile"
            >
              <UserCircle2 className="h-5 w-5" />
            </NavLink>
            <button
              type="button"
              onClick={logout}
              className="rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-brand-neon hover:text-white"
            >
              Log out
            </button>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-6 py-8">
        <Outlet />
      </main>
    </div>
  )
}
