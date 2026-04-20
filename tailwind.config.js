/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#dc2626',
          'red-dark': '#b91c1c',
          'red-light': '#ef4444',
        },
        dark: {
          950: '#050508',
          900: '#0d0d12',
          800: '#141419',
          700: '#1c1c24',
          600: '#26262f',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-red': '0 0 20px rgba(220, 38, 38, 0.3)',
        'glow-red-lg': '0 0 40px rgba(220, 38, 38, 0.4)',
      },
    },
  },
  plugins: [],
}
