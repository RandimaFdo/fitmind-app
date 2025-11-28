export function Planner() {
  return (
    <main className="space-y-8 px-4 py-8 text-white">
      <section className="rounded-3xl bg-slate-900/80 p-6 shadow-glow">
        <header>
          <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Recovery planner</p>
          <h1 className="mt-2 text-3xl font-semibold">Weekly focus</h1>
          <p className="mt-1 text-sm text-slate-300">
            Drag upcoming sessions into the slots below to keep your routine balanced.
          </p>
        </header>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {['Mobility flow', 'Strength set', 'Breath reset', 'Zone-2 ride'].map((block) => (
            <article key={block} className="rounded-2xl border border-white/5 bg-slate-900/80 p-4">
              <h2 className="text-lg font-semibold">{block}</h2>
              <p className="text-sm text-slate-400">Tap to tweak duration, intensity, or reminders.</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
