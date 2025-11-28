export const aiCoachService = {
  generatePlan: (userId: string, params: { goal?: string; availability?: number }) => {
    const focus = params.goal ?? 'holistic conditioning'
    const availability = params.availability ?? 4

    return {
      userId,
      focus,
      availability,
      sessions: Array.from({ length: availability }).map((_, index) => ({
        day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][index] ?? 'Sun',
        blocks: ['Mobility Primer', 'Strength Flow', 'Zone 2 Cardio', 'Mindful Cooldown'],
      })),
      recommendations: ['Hydrate before intense sets', 'Scan meals to adjust macros', 'Track HRV for recovery'],
    }
  },
}
