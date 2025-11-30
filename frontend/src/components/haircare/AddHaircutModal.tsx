import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import type { HaircutHistoryEntry } from '../../types/haircare'

interface AddHaircutModalProps {
  open: boolean
  onClose: () => void
  onSubmit: (entry: Omit<HaircutHistoryEntry, 'id'>) => void
}

const defaultValues = {
  date: '',
  barber: '',
  style: '',
  notes: '',
}

export function AddHaircutModal({ open, onClose, onSubmit }: AddHaircutModalProps) {
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
    onSubmit({ ...values })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4 py-8">
      <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-slate-900/95 p-8">
        <header className="space-y-2">
          <p className="text-xs uppercase tracking-[0.4em] text-brand-aqua">Log entry</p>
          <h2 className="text-2xl font-semibold text-white">Add haircut history</h2>
          <p className="text-sm text-slate-400">Keep barber visits synced with your profile.</p>
        </header>

        <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2 text-sm text-slate-200">
              Date
              <input
                type="date"
                name="date"
                value={values.date}
                onChange={handleChange}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-2 text-white focus:border-brand-aqua focus:outline-none"
                required
              />
            </label>
            <label className="space-y-2 text-sm text-slate-200">
              Barber
              <input
                name="barber"
                value={values.barber}
                onChange={handleChange}
                placeholder="e.g. Liam Cortez"
                className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-2 text-white focus:border-brand-aqua focus:outline-none"
                required
              />
            </label>
          </div>

          <label className="space-y-2 text-sm text-slate-200">
            Style
            <input
              name="style"
              value={values.style}
              onChange={handleChange}
              placeholder="e.g. Low fade crop"
              className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-2 text-white focus:border-brand-aqua focus:outline-none"
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
              className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-2 text-white focus:border-brand-aqua focus:outline-none"
            />
          </label>

          <div className="flex justify-end gap-3">
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
              Save entry
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
