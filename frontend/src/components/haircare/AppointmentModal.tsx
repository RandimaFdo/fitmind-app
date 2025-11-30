import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import type { AppointmentFormValues, Barber } from '../../types/haircare'

interface AppointmentModalProps {
  open: boolean
  salonName: string
  barbers: Barber[]
  defaultBarberId?: string
  onClose: () => void
  onSubmit: (values: AppointmentFormValues) => void
}

const blankValues: AppointmentFormValues & { barberId: string } = {
  date: '',
  time: '',
  barberId: '',
  service: '',
  notes: '',
}

export function AppointmentModal({ open, salonName, barbers, defaultBarberId, onClose, onSubmit }: AppointmentModalProps) {
  const [values, setValues] = useState(blankValues)

  useEffect(() => {
    if (open) {
      setValues({ ...blankValues, barberId: defaultBarberId ?? '' })
    }
  }, [open, defaultBarberId])

  if (!open) return null

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    onSubmit({
      ...values,
      barberId: values.barberId ? values.barberId : defaultBarberId,
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4 py-8">
      <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-slate-900/95 p-8">
        <header className="space-y-2">
          <p className="text-xs uppercase tracking-[0.4em] text-brand-aqua">Book</p>
          <h2 className="text-2xl font-semibold text-white">Reserve {salonName}</h2>
          <p className="text-sm text-slate-400">Lock a chair with your preferred barber and service.</p>
        </header>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2 text-sm text-slate-200">
              Date
              <input
                type="date"
                name="date"
                value={values.date}
                onChange={handleChange}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-2 text-white focus:border-brand-aqua focus:outline-none"
                required
              />
            </label>
            <label className="space-y-2 text-sm text-slate-200">
              Time
              <input
                type="time"
                name="time"
                value={values.time}
                onChange={handleChange}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-2 text-white focus:border-brand-aqua focus:outline-none"
                required
              />
            </label>
          </div>

          <label className="space-y-2 text-sm text-slate-200">
            Barber
            <select
              name="barberId"
              value={values.barberId}
              onChange={handleChange}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-2 text-white focus:border-brand-aqua focus:outline-none"
            >
              <option value="">Any barber</option>
              {barbers.map((barber) => (
                <option key={barber.id} value={barber.id}>
                  {barber.name}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-2 text-sm text-slate-200">
            Service
            <input
              type="text"
              name="service"
              value={values.service}
              placeholder="e.g. Skin fade + beard sculpt"
              onChange={handleChange}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-2 text-white focus:border-brand-aqua focus:outline-none"
              required
            />
          </label>

          <label className="space-y-2 text-sm text-slate-200">
            Notes
            <textarea
              name="notes"
              value={values.notes}
              onChange={handleChange}
              rows={3}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-2 text-white focus:border-brand-aqua focus:outline-none"
            />
          </label>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-white/10 px-5 py-2 text-sm font-medium text-slate-200 transition hover:border-brand-neon"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-full bg-brand-aqua/80 px-6 py-2 text-sm font-semibold text-slate-950 transition hover:bg-brand-aqua"
            >
              Confirm booking
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
