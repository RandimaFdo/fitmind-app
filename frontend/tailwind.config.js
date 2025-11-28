import defaultTheme from 'tailwindcss/defaultTheme'
import plugin from 'tailwindcss/plugin'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Outfit"', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        brand: {
          neon: '#8B5CF6',
          aqua: '#22D3EE',
          slate: '#0F172A',
        },
      },
      boxShadow: {
        glow: '0 0 30px rgba(139,92,246,0.45)',
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.glass': {
          backdropFilter: 'blur(14px)',
          backgroundColor: 'rgba(15,23,42,0.7)',
        },
      })
    }),
  ],
}
