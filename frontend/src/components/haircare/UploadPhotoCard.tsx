interface UploadPhotoCardProps {
  label: string
  preview?: string
  onUpload: (file: File) => void
}

export function UploadPhotoCard({ label, preview, onUpload }: UploadPhotoCardProps) {
  return (
    <label className="flex flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-white/10 bg-slate-900/60 p-6 text-center text-sm text-slate-300 transition hover:border-brand-aqua">
      <span className="text-xs uppercase tracking-[0.4em] text-slate-500">{label}</span>
      {preview ? (
        <img src={preview} alt={`${label} preview`} className="h-40 w-full rounded-2xl object-cover" />
      ) : (
        <div className="flex h-40 w-full items-center justify-center rounded-2xl border border-white/10 bg-slate-950/50">
          <span className="text-slate-500">Upload image</span>
        </div>
      )}
      <input
        type="file"
        accept="image/*"
        onChange={(event) => {
          const file = event.target.files?.[0]
          if (file) {
            onUpload(file)
          }
        }}
        className="hidden"
      />
    </label>
  )
}
