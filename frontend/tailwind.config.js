const colors = require('tailwindcss/colors')
const defaultConfig = require('tailwindcss/defaultConfig')

module.exports = {
  purge: ['./src/**/*.js', './src/**/*.jsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      mint: '#F8FFF6',
      white: '#CDE7C7',
      black: '#111B16',
      blue: {
        darkest: '#1D3557',
        dark: '#457B9D',
        DEFAULT: '#41A3AD',
        light: '#41A3AD',
      },
      green: {
        darkest: '#111B16',
        dark: '#818F6E',
        DEFAULT: '#818F6E',
        light: '#818F6E',
        lightest: '#CDE7C7',
      },
    },
    fontFamily: {
      display: ['"Barlow Condensed"', 'Bahnschrift', 'Tahoma'],
      body: ['Source Sans Pro', 'Trebuchet MS', 'Roboto', 'Arial'],
      sans: ['Source Sans Pro', 'Trebuchet MS', 'Roboto', 'Arial'],
    },
    boxShadow: {
      button: '9px 9px 18px #aec4a9, -9px -9px 18px #ecffe5',
    },
    minHeight: {
      320: '320px',
      ...defaultConfig.theme.minHeight,
    },
    screens: {
      xs: '480px',
      ...defaultConfig.theme.screens,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
