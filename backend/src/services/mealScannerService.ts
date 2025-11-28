export const mealScannerService = {
  analyze: (imageUrl?: string) => ({
    status: 'mocked',
    imageUrl,
    macros: { calories: 520, protein: 32, carbs: 58, fat: 18 },
    notes: 'Placeholder inference — connect to CV model later.',
  }),
}
