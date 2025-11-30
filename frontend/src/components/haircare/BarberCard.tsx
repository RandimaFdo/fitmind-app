import { Link } from 'react-router-dom'
import type { Barber } from '../../types/haircare'

interface BarberCardProps {
  barber: Barber
  onBook: (barberId: string) => void
}

export function BarberCard({ barber, onBook }: BarberCardProps) {
  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-slate-900/60 p-5">
      <div className="flex items-center gap-4">
        <img src={barber.photo} alt={barber.name} className="h-16 w-16 rounded-2xl object-cover" />
        <div>
          <h3 className="text-lg font-semibold text-white">{barber.name}</h3>
          <p className="text-sm text-slate-400">{barber.specialty}</p>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{barber.experience}</p>
        </div>
      </div>
      <p className="text-sm text-slate-300">{barber.bio}</p>
      <div className="flex flex-wrap gap-3">
        <Link
          to={`/hair-care/barbers/${barber.id}`}
          className="rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-white transition hover:border-brand-neon"
        >
          View profile
        </Link>
        <button
          type="button"
          onClick={() => onBook(barber.id)}
          className="rounded-full bg-brand-aqua/80 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-brand-aqua"
        >
          Book appointment
        </button>
      </div>
    </article>
  )
}
