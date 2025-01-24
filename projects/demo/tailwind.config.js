/** @type {import('tailwindcss').Config} */
const ZenPlugin = require('../../dist/ngx-zen/plugin/base.js');

module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Plus Jakarta Sans", "sans-serif"],
      },
    },
  },
  plugins: [ZenPlugin],
};
