import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Camera, MapPin, Phone, ScissorsSquare } from 'lucide-react'
import { useHairCare } from '../context/HairCareContext'
import { BarberCard } from '../components/haircare/BarberCard'
import { AppointmentModal } from '../components/haircare/AppointmentModal'
import { HaircutHistory } from '../components/haircare/HaircutHistory'

export function SalonDetails() {
  const navigate = useNavigate()
  const { salonId } = useParams()
  const { salons, barbers, history, addAppointment } = useHairCare()
  const salon = salons.find((item) => item.id === salonId)
  const salonBarbers = barbers.filter((barber) => barber.salonId === salonId)
  const salonHistory = history.filter((entry) => entry.salonId === salonId)
  const [isBookingOpen, setIsBookingOpen] = useState(false)

  const stats = useMemo(
    () => [
      { label: 'Barbers', value: salonBarbers.length },
      { label: 'Visits logged', value: salonHistory.length },
      { label: 'Services', value: salon?.services.length ?? 0 },
    ],
    [salonBarbers.length, salonHistory.length, salon?.services.length],
  )

  if (!salon) {
    return (
      <div className="space-y-4 rounded-3xl border border-white/5 bg-slate-900/70 p-6 text-white">
        <p>Salon not found.</p>
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
      <section className="overflow-hidden rounded-3xl border border-white/5 bg-slate-900/80 shadow-glow">
        <div className="relative h-64 w-full">
          <img src={salon.heroImage} alt={salon.name} className="h-full w-full object-cover" />
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full border border-white/30 bg-slate-950/40 px-4 py-2 text-sm text-white"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
        </div>
        <div className="space-y-6 p-8 text-white">
          <div className="flex flex-wrap items-center gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-brand-aqua">Salon</p>
              <h1 className="text-4xl font-semibold">{salon.name}</h1>
            </div>
            <div className="ml-auto flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setIsBookingOpen(true)}
                className="rounded-full bg-brand-aqua/80 px-6 py-2 text-sm font-semibold text-slate-950 transition hover:bg-brand-aqua"
              >
                Book appointment
              </button>
              <button
                type="button"
                className="rounded-full border border-white/10 px-6 py-2 text-sm font-semibold text-white transition hover:border-brand-neon"
              >
                Upload head photos
              </button>
            </div>
          </div>
          <div className="space-y-4 text-sm text-slate-200">
            <p className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-brand-aqua" /> {salon.address}
            </p>
            <p className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-brand-aqua" /> {salon.contact.phone} · {salon.contact.email}
            </p>
            <p className="text-slate-300">{salon.description}</p>
            <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Hours</p>
            <p>{salon.hours}</p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <article key={stat.label} className="rounded-2xl border border-white/5 bg-slate-900/60 p-4 text-white">
            <p className="text-xs uppercase tracking-[0.4em] text-slate-400">{stat.label}</p>
            <p className="mt-2 text-3xl font-semibold">{stat.value}</p>
          </article>
        ))}
      </section>

      <section className="space-y-4 rounded-3xl border border-white/5 bg-slate-900/60 p-6">
        <header className="flex items-center gap-3 text-white">
          <Camera className="h-6 w-6 text-brand-aqua" />
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-brand-aqua">Gallery</p>
            <h2 className="text-2xl font-semibold">Preview the studio</h2>
          </div>
        </header>
        <div className="grid gap-4 md:grid-cols-3">
          {salon.gallery.map((image) => (
            <img key={image} src={image} alt={`${salon.name} gallery`} className="h-48 w-full rounded-2xl object-cover" />
          ))}
        </div>
      </section>

      <section className="space-y-4 rounded-3xl border border-white/5 bg-slate-900/60 p-6">
        <header className="flex items-center gap-3 text-white">
          <ScissorsSquare className="h-6 w-6 text-brand-aqua" />
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-brand-aqua">Services</p>
            <h2 className="text-2xl font-semibold">What they offer</h2>
          </div>
        </header>
        <div className="flex flex-wrap gap-3 text-sm text-slate-200">
          {salon.services.map((service) => (
            <span key={service} className="rounded-full border border-white/10 px-4 py-1">
              {service}
            </span>
          ))}
        </div>
      </section>

      <section className="space-y-4 rounded-3xl border border-white/5 bg-slate-900/60 p-6">
        <header className="flex items-center gap-3 text-white">
          <h2 className="text-2xl font-semibold">Barbers available</h2>
        </header>
        <div className="grid gap-4 md:grid-cols-2">
          {salonBarbers.map((barber) => (
            <BarberCard key={barber.id} barber={barber} onBook={() => setIsBookingOpen(true)} />
          ))}
        </div>
      </section>

      {salonHistory.length > 0 && (
        <HaircutHistory
          entries={salonHistory}
          onAddNew={() => setIsBookingOpen(true)}
          onViewAll={() => setIsBookingOpen(true)}
          viewLabel="Book this salon"
        />
      )}

      <AppointmentModal
        open={isBookingOpen}
        salonName={salon.name}
        barbers={salonBarbers}
        defaultBarberId={salonBarbers[0]?.id}
        onClose={() => setIsBookingOpen(false)}
        onSubmit={(values) => {
          addAppointment(salon.id, values)
          setIsBookingOpen(false)
        }}
      />
    </div>
  )
}
