import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { Link, type Location, useLocation, useNavigate } from 'react-router-dom'

interface LoginValues {
  email: string
  password: string
}

function createDemoToken(email: string) {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
  const payload = btoa(
    JSON.stringify({
      sub: email,
      exp: Math.floor(Date.now() / 1000) + 60 * 60, // valid for 1h
    }),
  )
  return `${header}.${payload}.demo`
}

export function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>()

  const redirectPath = useMemo(() => {
    const fromState = location.state as { from?: Location } | undefined
    return fromState?.from?.pathname ?? '/'
  }, [location.state])

  const onSubmit = handleSubmit(async (values: LoginValues) => {
    localStorage.setItem('fitmind_token', createDemoToken(values.email))
    await new Promise((resolve) => setTimeout(resolve, 600))
    navigate(redirectPath, { replace: true })
  })

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-8 text-white">
      <section className="w-full max-w-md space-y-8 rounded-3xl bg-slate-900/70 p-10 shadow-glow">
        <header className="space-y-3 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-slate-400">FitMind</p>
          <h1 className="text-3xl font-semibold">Welcome back</h1>
          <p className="text-sm text-slate-300">Sign in to see today&apos;s recovery insights.</p>
        </header>

        <form className="space-y-5" onSubmit={onSubmit}>
          <label className="block text-sm">
            Email
            <input
              type="email"
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 focus:border-brand-neon focus:outline-none"
              placeholder="you@fitmind.io"
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && <span className="mt-1 block text-xs text-rose-400">{errors.email.message}</span>}
          </label>

          <label className="block text-sm">
            Password
            <input
              type="password"
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 focus:border-brand-neon focus:outline-none"
              placeholder="••••••••"
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Password must be at least 6 characters' },
              })}
            />
            {errors.password && (
              <span className="mt-1 block text-xs text-rose-400">{errors.password.message}</span>
            )}
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-2xl bg-brand-neon/80 py-3 text-sm font-semibold text-white transition hover:bg-brand-neon disabled:opacity-70"
          >
            {isSubmitting ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <p className="text-center text-sm text-slate-300">
          New to FitMind?{' '}
          <Link to="/register" className="text-brand-aqua hover:text-brand-neon">
            Create an account
          </Link>
        </p>
      </section>
    </main>
  )
}
