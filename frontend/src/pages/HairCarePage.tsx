import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MapPin, Sparkles } from 'lucide-react'
import { HaircutHistory } from '../components/haircare/HaircutHistory'
import { SalonCard } from '../components/haircare/SalonCard'
import { AddSalonModal } from '../components/haircare/AddSalonModal'
import { AppointmentModal } from '../components/haircare/AppointmentModal'
import { AddHaircutModal } from '../components/haircare/AddHaircutModal'
import { useHairCare } from '../context/HairCareContext'

export function HairCarePage() {
  const navigate = useNavigate()
  const { history, salons, barbers, addHaircut, addSalon, addAppointment } = useHairCare()

  const [showAllHistory, setShowAllHistory] = useState(false)
  const [isAddHaircutOpen, setIsAddHaircutOpen] = useState(false)
  const [isAddSalonOpen, setIsAddSalonOpen] = useState(false)
  const [bookingSalonId, setBookingSalonId] = useState<string | null>(null)

  const bookingSalon = useMemo(() => salons.find((salon) => salon.id === bookingSalonId), [bookingSalonId, salons])
  const bookingBarbers = useMemo(
    () => barbers.filter((barber) => barber.salonId === bookingSalonId),
    [barbers, bookingSalonId],
  )

  const haircutEntries = showAllHistory ? history : history.slice(0, 3)

  const stats = [
    { label: 'Cuts logged', value: history.length },
    { label: 'Trusted salons', value: salons.length },
    { label: 'Preferred barbers', value: barbers.length },
  ]

  const handleBookSalon = (salonId: string) => {
    setBookingSalonId(salonId)
  }

  const handleSelectBarber = (salonId: string) => {
    const salonBarber = barbers.find((barber) => barber.salonId === salonId)
    if (salonBarber) {
      navigate(`/hair-care/barbers/${salonBarber.id}`)
    } else {
      navigate(`/hair-care/salons/${salonId}`)
    }
  }

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-white/5 bg-gradient-to-br from-brand-slate via-slate-900 to-slate-950 p-8 text-white shadow-glow">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl space-y-4">
            <p className="text-xs uppercase tracking-[0.4em] text-brand-aqua">Hair care OS</p>
            <h1 className="text-4xl font-semibold">Keep your hair workflow dialed</h1>
            <p className="text-sm text-white/80">
              Track cuts, discover precision salons, and experiment with AI styling inside one focused dashboard.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setIsAddHaircutOpen(true)}
              className="rounded-full border border-white/10 px-6 py-2 text-sm font-semibold text-white transition hover:border-brand-neon"
            >
              + Add haircut entry
            </button>
            <button
              type="button"
              onClick={() => setIsAddSalonOpen(true)}
              className="rounded-full bg-brand-aqua/80 px-6 py-2 text-sm font-semibold text-slate-950 transition hover:bg-brand-aqua"
            >
              + Add salon
            </button>
          </div>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {stats.map((stat) => (
            <article key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.4em] text-white/70">{stat.label}</p>
              <p className="mt-2 text-3xl font-semibold">{stat.value}</p>
            </article>
          ))}
        </div>
      </section>

      <HaircutHistory
        entries={haircutEntries}
        onAddNew={() => setIsAddHaircutOpen(true)}
        onViewAll={() => setShowAllHistory((prev) => !prev)}
        viewLabel={showAllHistory ? 'Collapse history' : 'View full history'}
      />

      <section className="space-y-6 rounded-3xl border border-white/5 bg-slate-900/60 p-6">
        <header className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-3">
            <MapPin className="h-10 w-10 rounded-2xl border border-white/10 p-2 text-brand-aqua" />
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-brand-aqua">Nearby</p>
              <h2 className="text-2xl font-semibold text-white">Salons & barbers</h2>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsAddSalonOpen(true)}
            className="ml-auto rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:border-brand-neon"
          >
            + Add new salon
          </button>
        </header>

        <div className="grid gap-5 lg:grid-cols-2">
          {salons.map((salon) => (
            <SalonCard
              key={salon.id}
              salon={salon}
              onSelectBarber={handleSelectBarber}
              onBook={handleBookSalon}
            />
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-white/5 bg-slate-900/70 p-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-3">
            <Sparkles className="h-10 w-10 rounded-2xl border border-white/10 p-2 text-brand-aqua" />
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-brand-aqua">AI try-on</p>
              <h2 className="text-2xl font-semibold text-white">Test hairstyles virtually</h2>
            </div>
          </div>
          <Link
            to="/hair-care/ai-try-on"
            className="ml-auto inline-flex items-center gap-2 rounded-full bg-brand-aqua/80 px-5 py-2 text-sm font-semibold text-slate-950 transition hover:bg-brand-aqua"
          >
            <Sparkles className="h-4 w-4" /> Launch AI try-on
          </Link>
        </div>
        <p className="mt-4 text-sm text-slate-300">
          Upload head photos, iterate through templates, and save the winning style into your haircut history.
        </p>
      </section>

      <AddHaircutModal
        open={isAddHaircutOpen}
        onClose={() => setIsAddHaircutOpen(false)}
        onSubmit={(entry) => addHaircut(entry)}
      />

      <AddSalonModal
        open={isAddSalonOpen}
        onClose={() => setIsAddSalonOpen(false)}
        onSubmit={(values) => addSalon(values)}
      />

      <AppointmentModal
        open={Boolean(bookingSalon)}
        salonName={bookingSalon?.name ?? 'Salon'}
        barbers={bookingBarbers}
        onClose={() => setBookingSalonId(null)}
        onSubmit={(values) => {
          if (!bookingSalon) return
          addAppointment(bookingSalon.id, values)
          setBookingSalonId(null)
        }}
      />
    </div>
  )
}
