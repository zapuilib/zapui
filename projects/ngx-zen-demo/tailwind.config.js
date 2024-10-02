/** @type {import('tailwindcss').Config} */
const plugin = require("../../dist/ngx-zen/plugins/base.js");

module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {},
  },
  plugins: [plugin],
};
