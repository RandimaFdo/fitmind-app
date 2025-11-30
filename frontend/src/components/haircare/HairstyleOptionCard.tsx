import type { HairstyleOption } from '../../types/haircare'

interface HairstyleOptionCardProps {
  option: HairstyleOption
  onTry: (styleId: string) => void
}

export function HairstyleOptionCard({ option, onTry }: HairstyleOptionCardProps) {
  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-slate-900/60 p-4">
      <img src={option.image} alt={option.name} className="h-40 w-full rounded-2xl object-cover" />
      <div>
        <h3 className="text-lg font-semibold text-white">{option.name}</h3>
        <p className="text-sm text-slate-400">{option.description}</p>
      </div>
      <button
        type="button"
        onClick={() => onTry(option.id)}
        className="rounded-full bg-brand-aqua/80 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-brand-aqua"
      >
        Try this style
      </button>
    </article>
  )
}
