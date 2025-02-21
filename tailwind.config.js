/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./*.js"],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    fontFamily: {
      'sans': ['"Nunito Sans"', 'sans-serif'],
    },
    letterSpacing: {
     tightest: '-.075em',
    tighter: '-.05em',
    tight: '-.025em',
    normal: '0',
    wide: '.025em',
    wider: '.05em',
    widest: '.25em',
   },
    extend: {},
  },
  plugins: [],
}
