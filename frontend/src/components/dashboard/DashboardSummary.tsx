const cards = [
  { label: 'Calories', value: '1,840 kcal', detail: '+8% vs last week' },
  { label: 'Streak', value: '12 days', detail: '+4 days' },
  { label: 'Readiness', value: '82%', detail: 'Optimal range' },
]

export function DashboardSummary() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {cards.map((card) => (
        <article key={card.label} className="rounded-3xl bg-slate-900 p-6 text-white shadow-glow">
          <p className="text-xs uppercase tracking-[0.4em] text-slate-400">{card.label}</p>
          <p className="mt-3 text-3xl font-semibold">{card.value}</p>
          <p className="text-sm text-emerald-300">{card.detail}</p>
        </article>
      ))}
    </div>
  )
}
