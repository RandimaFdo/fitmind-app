import type { HaircutHistoryEntry } from '../../types/haircare'

interface HaircutHistoryProps {
  entries: HaircutHistoryEntry[]
  onAddNew: () => void
  onViewAll: () => void
  viewLabel?: string
}

export function HaircutHistory({ entries, onAddNew, onViewAll, viewLabel = 'View full history' }: HaircutHistoryProps) {
  return (
    <section className="space-y-4 rounded-3xl border border-white/5 bg-slate-900/70 p-6">
      <header className="flex flex-wrap items-center gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-brand-aqua">Hair routine</p>
          <h2 className="text-2xl font-semibold text-white">Haircut history</h2>
        </div>
        <div className="ml-auto flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onAddNew}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:border-brand-neon"
          >
            + Add new haircut
          </button>
          <button
            type="button"
            onClick={onViewAll}
            className="rounded-full bg-brand-aqua/80 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-brand-aqua"
          >
            {viewLabel}
          </button>
        </div>
      </header>

      <div className="space-y-4">
        {entries.map((entry) => (
          <article key={entry.id} className="flex flex-wrap items-center gap-4 rounded-2xl border border-white/10 bg-slate-900/60 p-4">
            <div className="flex-1">
              <p className="text-xs uppercase tracking-[0.4em] text-slate-500">{entry.date}</p>
              <h3 className="text-lg font-semibold text-white">{entry.style}</h3>
              <p className="text-sm text-slate-300">{entry.barber}</p>
              {entry.notes && <p className="text-xs text-slate-500">{entry.notes}</p>}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
