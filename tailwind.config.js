module.exports = {
  purge: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {},
    colors:{
      'white': '#ffff',
      'blue': {
        '100': '#AAE5FD',
        '200':'#25A6DB',
      },
      'pink': {
        '100': '#EEBED3',
        '200':'#E82278',
        '300': '#CB1564',
      },
      'purple': {
        '100': '#8053FB',
        '200': '#6C38FA'
      },
      'gray': {
        'background': '#1F1E1E',
        '100': '#5B5B5B',
        '200': '#545454',
        '300': '#424242',
        '400': '#3C3945',
        '500': '#CFCFCF'
      },
      'transparent': 'transparent'
    },
    extend: {
      animation: {
        'spin-slow': 'spin 2s linear infinite',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
