/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./admin.html",
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#27B981',
        danger: '#EA4E43'
      }
    },
  },
  plugins: [],
}

