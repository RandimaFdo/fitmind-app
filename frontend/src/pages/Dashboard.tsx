import { DashboardSummary } from '../components/dashboard/DashboardSummary'
import { ProgressChart } from '../components/charts/ProgressChart'
import { AICoachCard } from '../components/coach/AICoachCard'

export function Dashboard() {
  return (
    <div className="space-y-8 px-4 py-8">
      <DashboardSummary />
      <div className="grid gap-6 md:grid-cols-2">
        <ProgressChart />
        <AICoachCard />
      </div>
    </div>
  )
}
