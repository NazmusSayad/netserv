// tailwind.config.js
module.exports = {
  content: ['./web/**/*.{js,ts,jsx,tsx}'],
  transform: require('tailwind-variant-group').transform,
  theme: {
    extend: {},
  },
  plugins: [],
}
