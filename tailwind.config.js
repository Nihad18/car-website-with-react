/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  important: true,
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      keyframes: {
        leave: {
          '0%' : { opacity: 1 },
          '100%' : { opacity: 0 }
        },
        decreasingWidth: {
          '0%' : { width: 100 },
          '100%' : { width: 0 }
        },
      },
      animation: {
        leaving: 'leave 0.5s forwards'
    },
  },
  plugins: [],
}}
