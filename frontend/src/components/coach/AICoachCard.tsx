export function AICoachCard() {
  return (
    <article className="rounded-3xl bg-gradient-to-br from-brand-neon/60 via-brand-aqua/40 to-brand-neon/20 p-6 text-white shadow-glow">
      <p className="text-xs uppercase tracking-[0.4em]">AI FITNESS COACH</p>
      <h3 className="mt-3 text-2xl font-semibold">Daily adaptive coaching</h3>
      <p className="mt-2 text-sm text-white/80">
        FitMind blends stress signals, timetables, and nutrition logs to tune each session. Keep scanning meals and logging
        progress to unlock smarter nudges.
      </p>
      <ul className="mt-4 space-y-2 text-sm text-white/90">
        <li>• Breath-first warmups to reset posture</li>
        <li>• Personalized intensity curve per week</li>
        <li>• Auto-linked recovery reminders</li>
      </ul>
      <button className="mt-6 rounded-full bg-white/20 px-4 py-2 text-sm font-semibold backdrop-blur">
        Request AI update
      </button>
    </article>
  )
}
