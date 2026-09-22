/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        vazir:   ['Vazirmatn', 'Tahoma', 'Arial', 'sans-serif'],
        estedad: ['Estedad FD', 'Vazirmatn', 'Tahoma', 'sans-serif'],
        bebas:   ['"Bebas Neue"', 'sans-serif'],
      },
      colors: {
        ink: {
          DEFAULT: '#0a0a0f',
          50:  '#f5f0e8',
          100: '#e8e2d9',
          200: '#c8c0b4',
          300: '#a09688',
          400: '#6b7280',
          500: '#4b5563',
          600: '#1c1c22',
          700: '#141418',
          800: '#0f0f14',
          900: '#0a0a0f',
        },
        accent: {
          DEFAULT: '#e63946',
          hover:   '#c1121f',
          light:   '#f87171',
        },
        gold: {
          DEFAULT: '#f4a261',
          light:   '#fde047',
        },
      },
      backgroundImage: {
        'manga-grid': "repeating-linear-gradient(0deg,transparent,transparent 40px,rgba(255,255,255,0.013) 40px,rgba(255,255,255,0.013) 41px)",
      },
      animation: {
        'spin-slow':  'spin 0.8s linear infinite',
        'fade-in':    'fadeIn 0.2s ease',
        'slide-up':   'slideUp 0.25s ease',
        'shimmer':    'shimmer 1.4s infinite',
      },
      keyframes: {
        fadeIn:  { from: { opacity: 0 }, to: { opacity: 1 } },
        slideUp: { from: { transform: 'translateY(16px)', opacity: 0 }, to: { transform: 'none', opacity: 1 } },
        shimmer: {
          '0%':   { backgroundPosition: '-400px 0' },
          '100%': { backgroundPosition:  '400px 0' },
        },
      },
    },
  },
  plugins: [],
}
