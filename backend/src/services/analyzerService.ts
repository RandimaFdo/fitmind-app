export const analyzerService = {
  analyzeLevel: (metrics: { vo2max?: number; restingHr?: number; workoutsPerWeek?: number }) => {
    const vo2 = metrics.vo2max ?? 35
    const rest = metrics.restingHr ?? 65
    const frequency = metrics.workoutsPerWeek ?? 3

    const score = vo2 * 0.4 + frequency * 10 - rest * 0.3
    const band = score >= 60 ? 'advanced' : score >= 45 ? 'intermediate' : 'beginner'

    return {
      score: Math.max(0, Math.round(score)),
      band,
      recommendations: band === 'advanced'
        ? ['Introduce deload weeks', 'Track HRV to optimize recovery']
        : band === 'intermediate'
          ? ['Add progressive overload', 'Scan meals for macro balance']
          : ['Start with mobility stacks', 'Walk 20 minutes daily'],
    }
  },
}
