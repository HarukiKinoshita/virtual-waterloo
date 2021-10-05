const colors = require('tailwindcss/colors')
module.exports = {
  mode: 'jit',
  purge: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        gray: colors.trueGray,
        natural: {
          darkest: '#3F444D',
          dark: '#d1b7a1',
          DEFAULT: '#dbc2ad',
          light: '#e9d3c0',
          lightest: '#d1c0a8',
        }
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
