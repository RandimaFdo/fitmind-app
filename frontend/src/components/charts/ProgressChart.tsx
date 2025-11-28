import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const data = [
  { week: 'W1', weight: 75, readiness: 68 },
  { week: 'W2', weight: 74, readiness: 72 },
  { week: 'W3', weight: 73, readiness: 79 },
  { week: 'W4', weight: 72, readiness: 82 },
]

export function ProgressChart() {
  return (
    <article className="rounded-3xl bg-slate-900 p-6 text-white">
      <h3 className="text-xl font-semibold">Progress Trends</h3>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data}>
          <XAxis dataKey="week" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #1f2937' }} />
          <Line type="monotone" dataKey="weight" stroke="#34d399" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="readiness" stroke="#60a5fa" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </article>
  )
}
