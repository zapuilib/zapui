/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Geist", "serif"],
      },
    },
  },
  plugins: [require('../../dist/zap/plugin')],
};
