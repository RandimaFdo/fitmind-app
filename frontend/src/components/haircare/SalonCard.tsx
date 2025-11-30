import { Link } from 'react-router-dom'
import type { Salon } from '../../types/haircare'

interface SalonCardProps {
  salon: Salon
  onSelectBarber: (salonId: string) => void
  onBook: (salonId: string) => void
}

export function SalonCard({ salon, onSelectBarber, onBook }: SalonCardProps) {
  return (
    <article className="flex flex-col rounded-3xl border border-white/5 bg-slate-900/70 p-5 shadow-lg shadow-black/20">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.4em] text-brand-aqua">Salon</p>
        <h3 className="text-xl font-semibold text-white">{salon.name}</h3>
        <p className="text-sm text-slate-400">{salon.address}</p>
      </header>

      <dl className="mt-4 space-y-3 text-sm text-slate-300">
        <div>
          <dt className="text-xs uppercase tracking-[0.4em] text-slate-500">Hours</dt>
          <dd>{salon.hours}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-[0.4em] text-slate-500">Services</dt>
          <dd>{salon.services.join(' · ')}</dd>
        </div>
      </dl>

      <div className="mt-5 flex flex-wrap gap-3">
        <Link
          to={`/hair-care/salons/${salon.id}`}
          className="flex-1 rounded-full bg-brand-aqua/80 px-4 py-2 text-center text-sm font-semibold text-slate-950 transition hover:bg-brand-aqua"
        >
          View details
        </Link>
        <button
          type="button"
          onClick={() => onSelectBarber(salon.id)}
          className="rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-white transition hover:border-brand-neon"
        >
          Select barber
        </button>
        <button
          type="button"
          onClick={() => onBook(salon.id)}
          className="rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-white transition hover:border-brand-neon"
        >
          Book appointment
        </button>
      </div>
    </article>
  )
}
