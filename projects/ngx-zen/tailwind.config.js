/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  darkMode: "selector",
  theme: {
    extend: {
      colors: {},
      fontFamily: {
        icon: ['"Font Awesome 6 Pro"'],
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("./plugin/base")],
};
