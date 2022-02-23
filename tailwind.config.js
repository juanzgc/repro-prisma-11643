const colors = require('tailwindcss/colors')

module.exports = {
  mode: "jit",
  purge: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './utils/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#39A273',
          '50': '#B0E3CC',
          '100': '#A0DEC2',
          '200': '#82D3AF',
          '300': '#64C89C',
          '400': '#46BE88',
          '500': '#39A273',
          '600': '#2E845E',
          '700': '#246648',
          '800': '#194733',
          '900': '#0F291D'
        },
        secondary: {
          DEFAULT: '#F50057',
          '50': '#FFAECB',
          '100': '#FF99BD',
          '200': '#FF70A3',
          '300': '#FF4889',
          '400': '#FF1F6E',
          '500': '#F50057',
          '600': '#CC0049',
          '700': '#A3003A',
          '800': '#7B002C',
          '900': '#52001D'
        },
        'blue-gray': colors.blueGray,
        green: colors.emerald,
        purple: colors.violet,
        yellow: colors.amber
      },
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      cursor: ['disabled']
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
