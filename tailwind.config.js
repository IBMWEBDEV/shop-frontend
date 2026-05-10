/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: { 50:'#fff7ed',100:'#ffedd5',500:'#f97316',600:'#ea580c',700:'#c2410c' },
        dark: { 900:'#0f0f0f', 800:'#1a1a1a', 700:'#242424' }
      },
      fontFamily: { display:['Playfair Display','serif'], body:['DM Sans','sans-serif'] },
    },
  },
  plugins: [],
}
