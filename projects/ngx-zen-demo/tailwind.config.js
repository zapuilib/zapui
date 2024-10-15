/** @type {import('tailwindcss').Config} */
const plugin = require("../../dist/ngx-zen/plugins/base.js");

module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Plus Jakarta Sans", "sans-serif"],
      },
    },
  },
  plugins: [plugin],
};
