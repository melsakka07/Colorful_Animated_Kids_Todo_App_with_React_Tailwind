/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        comic: ['"Comic Neue"', 'cursive']
      },
      keyframes: {
        confetti: {
          '0%': { transform: 'translateY(-100%) rotate(0deg)' },
          '100%': { transform: 'translateY(100vh) rotate(360deg)' },
        }
      },
      animation: {
        confetti: 'confetti 3s linear infinite',
      }
    },
  },
  plugins: [],
}
