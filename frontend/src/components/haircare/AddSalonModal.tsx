import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import type { SalonFormValues } from '../../types/haircare'

interface AddSalonModalProps {
  open: boolean
  onClose: () => void
  onSubmit: (values: SalonFormValues) => void
}

const defaultValues: SalonFormValues = {
  name: '',
  address: '',
  description: '',
  services: '',
  phone: '',
  email: '',
  website: '',
  heroImage: '',
  gallery: '',
  hours: '',
}

export function AddSalonModal({ open, onClose, onSubmit }: AddSalonModalProps) {
  const [values, setValues] = useState(defaultValues)

  useEffect(() => {
    if (!open) {
      setValues(defaultValues)
    }
  }, [open])

  if (!open) return null

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    onSubmit(values)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4 py-8">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-white/10 bg-slate-900/95 p-8 shadow-2xl">
        <header className="mb-6 space-y-2">
          <p className="text-xs uppercase tracking-[0.4em] text-brand-aqua">New salon</p>
          <h2 className="text-2xl font-semibold text-white">Add curated salon / barber lab</h2>
          <p className="text-sm text-slate-400">Submit addresses you trust. They become instantly bookable.</p>
        </header>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2 text-sm text-slate-200">
              Salon name
              <input
                name="name"
                value={values.name}
                onChange={handleChange}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-2 text-white focus:border-brand-aqua focus:outline-none"
                required
              />
            </label>
            <label className="space-y-2 text-sm text-slate-200">
              Address
              <input
                name="address"
                value={values.address}
                onChange={handleChange}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-2 text-white focus:border-brand-aqua focus:outline-none"
                required
              />
            </label>
          </div>

          <label className="space-y-2 text-sm text-slate-200">
            Description
            <textarea
              name="description"
              value={values.description}
              onChange={handleChange}
              rows={3}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-2 text-white focus:border-brand-aqua focus:outline-none"
            />
          </label>

          <label className="space-y-2 text-sm text-slate-200">
            Services (comma separated)
            <textarea
              name="services"
              value={values.services}
              onChange={handleChange}
              rows={2}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-2 text-white focus:border-brand-aqua focus:outline-none"
            />
          </label>

          <div className="grid gap-4 md:grid-cols-3">
            <label className="space-y-2 text-sm text-slate-200">
              Phone
              <input
                name="phone"
                value={values.phone}
                onChange={handleChange}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-2 text-white focus:border-brand-aqua focus:outline-none"
              />
            </label>
            <label className="space-y-2 text-sm text-slate-200">
              Email
              <input
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-2 text-white focus:border-brand-aqua focus:outline-none"
              />
            </label>
            <label className="space-y-2 text-sm text-slate-200">
              Website
              <input
                name="website"
                value={values.website}
                onChange={handleChange}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-2 text-white focus:border-brand-aqua focus:outline-none"
              />
            </label>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2 text-sm text-slate-200">
              Hero image URL
              <input
                name="heroImage"
                value={values.heroImage}
                onChange={handleChange}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-2 text-white focus:border-brand-aqua focus:outline-none"
              />
            </label>
            <label className="space-y-2 text-sm text-slate-200">
              Gallery URLs (comma separated)
              <input
                name="gallery"
                value={values.gallery}
                onChange={handleChange}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-2 text-white focus:border-brand-aqua focus:outline-none"
              />
            </label>
          </div>

          <label className="space-y-2 text-sm text-slate-200">
            Opening hours
            <input
              name="hours"
              value={values.hours}
              onChange={handleChange}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-2 text-white focus:border-brand-aqua focus:outline-none"
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
              Save salon
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
