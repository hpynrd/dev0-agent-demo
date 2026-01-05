/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'midwest': {
          'gold': '#D4A84B',
          'wheat': '#F5DEB3',
          'sky': '#87CEEB',
          'earth': '#8B4513',
          'forest': '#228B22',
          'navy': '#1E3A5F',
        }
      }
    },
  },
  plugins: [],
}

