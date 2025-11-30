import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Quote } from 'lucide-react'
import { useHairCare } from '../context/HairCareContext'
import { AppointmentModal } from '../components/haircare/AppointmentModal'

export function BarberProfile() {
  const navigate = useNavigate()
  const { barberId } = useParams()
  const { barbers, salons, addAppointment } = useHairCare()
  const barber = barbers.find((item) => item.id === barberId)
  const salon = useMemo(() => salons.find((item) => item.id === barber?.salonId), [salons, barber?.salonId])
  const [isBookingOpen, setIsBookingOpen] = useState(false)

  if (!barber || !salon) {
    return (
      <div className="space-y-4 rounded-3xl border border-white/5 bg-slate-900/70 p-6 text-white">
        <p>Barber not found.</p>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-white"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-white/5 bg-slate-900/70 p-6 text-white">
        <div className="flex flex-wrap items-center gap-6">
          <img src={barber.photo} alt={barber.name} className="h-40 w-40 rounded-3xl object-cover" />
          <div className="flex-1 space-y-2">
            <p className="text-xs uppercase tracking-[0.4em] text-brand-aqua">Barber</p>
            <h1 className="text-4xl font-semibold">{barber.name}</h1>
            <p className="text-sm text-slate-300">{barber.specialty}</p>
            <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Experience</p>
            <p>{barber.experience}</p>
            <div className="flex flex-wrap gap-2 text-sm text-slate-400">
              <span>Rating {barber.rating.toFixed(1)}/5</span>
              <span>·</span>
              <span>{salon.name}</span>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="rounded-full border border-white/10 px-5 py-2 text-sm text-white transition hover:border-brand-neon"
            >
              <ArrowLeft className="mr-2 inline h-4 w-4" /> Back
            </button>
            <button
              type="button"
              onClick={() => setIsBookingOpen(true)}
              className="rounded-full bg-brand-aqua/80 px-6 py-2 text-sm font-semibold text-slate-950 transition hover:bg-brand-aqua"
            >
              Book with this barber
            </button>
          </div>
        </div>
        <p className="mt-4 text-sm text-slate-300">{barber.bio}</p>
      </section>

      <section className="space-y-4 rounded-3xl border border-white/5 bg-slate-900/60 p-6 text-white">
        <header className="flex items-center gap-3">
          <Quote className="h-6 w-6 text-brand-aqua" />
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-brand-aqua">Reviews</p>
            <h2 className="text-2xl font-semibold">Client notes</h2>
          </div>
        </header>
        <div className="space-y-3">
          {barber.reviews.map((review) => (
            <p key={review} className="rounded-2xl border border-white/10 bg-slate-950/40 p-4 text-sm text-slate-200">
              {review}
            </p>
          ))}
        </div>
      </section>

      <AppointmentModal
        open={isBookingOpen}
        salonName={salon.name}
        barbers={[barber]}
        defaultBarberId={barber.id}
        onClose={() => setIsBookingOpen(false)}
        onSubmit={(values) => {
          addAppointment(salon.id, values)
          setIsBookingOpen(false)
        }}
      />
    </div>
  )
}
