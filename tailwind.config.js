export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        base: '#080706',
        surface: '#111009',
        card: '#181510',
        border: '#2a2520',
        muted: '#6b6560',
        accent: '#c9a96e',
        gold: '#b5885a',
        warm: '#f0ede8',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.35s ease-out',
        'slide-up': 'slideUp 0.35s ease-out',
        'ring-pulse': 'ringPulse 2.5s ease-in-out infinite',
        'breathe': 'breathe 4s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
        slideUp: { from: { opacity: 0, transform: 'translateY(16px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        ringPulse: {
          '0%,100%': { transform: 'scale(1)', opacity: 0.3 },
          '50%': { transform: 'scale(1.06)', opacity: 0.7 },
        },
        breathe: {
          '0%,100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.12)' },
        },
      },
    },
  },
  plugins: [],
}
