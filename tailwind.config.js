/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Space Grotesk", sans-serif',
          {
            ...defaultTheme.fontFamily.sans,
            fontFeatureSettings: '"cv11"',
            fontVariationSettings: "normal",
          }
        ],
      },
    },
  },
  plugins: [],
}