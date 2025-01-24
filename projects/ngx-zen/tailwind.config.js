/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  darkMode: "selector",
  safelist: [
    {
      pattern: /(bg-|text-).*/,
    }
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        tertiary: 'var(--color-tertiary)',
        quaternary: 'var(--color-quaternary)',
        success: 'var(--color-success)',
        error: 'var(--color-error)',
        warning: 'var(--color-warning)',
        info: 'var(--color-info)',
      },
      fontSize: {
        '7xl': 'var(--font-size-7xl)',
        '6xl': 'var(--font-size-6xl)',
        '5xl': 'var(--font-size-5xl)',
        '4xl': 'var(--font-size-4xl)',
        '3xl': 'var(--font-size-3xl)',
        '2xl': 'var(--font-size-2xl)',
        xl: 'var(--font-size-xl)',
        lg: 'var(--font-size-lg)',
        md: 'var(--font-size-md)',
        sm: 'var(--font-size-sm)',
        xs: 'var(--font-size-xs)',
        xxs: 'var(--font-size-xxs)',
      },
      fontFamily: {
        icon: ['"Font Awesome 6 Pro"'],
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("./plugin/base")],
};
