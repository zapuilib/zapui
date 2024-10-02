/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  darkMode: "selector",
  theme: {
    extend: {
      colors: {
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("./src/lib/plugins/base")],
};
