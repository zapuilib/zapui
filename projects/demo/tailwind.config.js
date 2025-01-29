/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Geist", "serif"],
      },
    },
  },
  plugins: [require('../../dist/ngx-zen/plugin')],
};
