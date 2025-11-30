import { useState } from 'react'
import { Download, Save, Upload } from 'lucide-react'
import { useHairCare } from '../context/HairCareContext'
import { UploadPhotoCard } from '../components/haircare/UploadPhotoCard'
import { HairstyleOptionCard } from '../components/haircare/HairstyleOptionCard'

export function AIHairTryOn() {
  const { styles, addHaircut } = useHairCare()
  const [photos, setPhotos] = useState<{ [key: string]: string }>({})
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null)

  const handleUpload = (view: string, file: File) => {
    const reader = new FileReader()
    reader.onload = () => {
      const result = typeof reader.result === 'string' ? reader.result : ''
      setPhotos((prev) => ({ ...prev, [view]: result }))
    }
    reader.readAsDataURL(file)
  }

  const handleSaveToHistory = () => {
    if (!selectedStyle) return
    const style = styles.find((item) => item.id === selectedStyle)
    if (!style) return
    addHaircut({ date: new Date().toISOString().slice(0, 10), barber: 'AI Style', style: style.name, notes: 'Saved from AI try-on' })
  }

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-white/5 bg-slate-900/70 p-6 text-white">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.4em] text-brand-aqua">AI try-on</p>
          <h1 className="text-4xl font-semibold">Simulate your next cut</h1>
          <p className="text-sm text-slate-300">
            Upload head photos, test curated styles, and save the winner directly to your hair history.
          </p>
        </div>
      </section>

      <section className="grid gap-6 rounded-3xl border border-white/5 bg-slate-900/60 p-6 md:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Step 1 · Upload photos</h2>
          <div className="grid gap-4">
            {['Front view', 'Left side', 'Right side'].map((view) => (
              <UploadPhotoCard
                key={view}
                label={view}
                preview={photos[view]}
                onUpload={(file) => handleUpload(view, file)}
              />
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Step 2 · Choose hairstyle</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {styles.map((style) => (
              <HairstyleOptionCard key={style.id} option={style} onTry={(id) => setSelectedStyle(id)} />
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-4 rounded-3xl border border-white/5 bg-slate-900/60 p-6">
        <header className="flex flex-wrap items-center gap-3 text-white">
          <Upload className="h-6 w-6 text-brand-aqua" />
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-brand-aqua">Step 3</p>
            <h2 className="text-2xl font-semibold">AI generated preview</h2>
          </div>
        </header>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2 rounded-2xl border border-white/10 bg-slate-950/40 p-4 text-center text-white">
            <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Before</p>
            <div className="h-56 rounded-2xl border border-dashed border-white/10 bg-slate-900/60">
              {photos['Front view'] ? (
                <img src={photos['Front view']} alt="Before" className="h-full w-full rounded-2xl object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center text-slate-500">Upload front view</div>
              )}
            </div>
          </div>
          <div className="space-y-2 rounded-2xl border border-white/10 bg-slate-950/40 p-4 text-center text-white">
            <p className="text-xs uppercase tracking-[0.4em] text-brand-aqua">After</p>
            <div className="h-56 rounded-2xl border border-dashed border-brand-aqua/40 bg-slate-900/60">
              {selectedStyle ? (
                <img
                  src={styles.find((style) => style.id === selectedStyle)?.image}
                  alt="After style"
                  className="h-full w-full rounded-2xl object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-slate-500">Select a style</div>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:border-brand-neon"
          >
            <Download className="h-4 w-4" /> Download image
          </button>
          <button
            type="button"
            disabled={!selectedStyle}
            onClick={handleSaveToHistory}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:border-brand-aqua disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Save className="h-4 w-4" /> Save to haircut history
          </button>
        </div>
      </section>
    </div>
  )
}
