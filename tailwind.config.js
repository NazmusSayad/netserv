/** @type {import('tailwindcss').Config} */
module.exports = {
  content: {
    files: ['./web/**/*.tsx'],
    transform: require('tailwind-variant-group').transform,
  },

  plugins: [
    function (config) {
      console.log(Object.keys(config.config))

      console.log(config.postcss.document())
    },
  ],
  theme: {
    extend: {
      screens: {
        xxs: '25em', // 400px
        xs: '31.25em', // 500px
        sm: '37.5em', // 600px
        md: '48em', // 768px
        lg: '62em', // 992px
        xl: '75em', // 1200px
        xxl: '120em', // 1920px
      },
    },
  },
}

console.log('Hello world')
