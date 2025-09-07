/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'zora-black': '#000000',
        'zora-white': '#FFFFFF',
      },
    },
  },
  plugins: [],
}
