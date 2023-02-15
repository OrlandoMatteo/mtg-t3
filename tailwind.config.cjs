/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    { pattern: /^from-(red|blue|green|slate|yellow)-\d{1,3}$/, },
    { pattern: /^to-(red|blue|green|slate|yellow)-\d{1,3}$/, }
  ]

};
