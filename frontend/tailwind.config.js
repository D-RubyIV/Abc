/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderCollapse: ['hover', 'focus'],
    },
  },
  plugins: [],
  darkMode: 'class',
}