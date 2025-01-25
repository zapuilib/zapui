/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: "zen-",
  content: ["./src/**/*.{html,ts}"],
  darkMode: "selector",
  safelist: [
    {
      pattern: /(zen-bg-|zen-text-).*/,
    },
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--zen-color-primary)',
        secondary: 'var(--zen-color-secondary)',
        tertiary: 'var(--zen-color-tertiary)',
        quaternary: 'var(--zen-color-quaternary)',
        success: 'var(--zen-color-success)',
        successText: 'var(--zen-color-success-text)',
        error: 'var(--zen-color-error)',
        errorText: 'var(--zen-color-error-text)',
        warning: 'var(--zen-color-warning)',
        warningText: 'var(--zen-color-warning-text)',
        info: 'var(--zen-color-info)',
        infoText: 'var(--zen-color-info-text)',
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
  plugins: [require("@tailwindcss/forms"), require("./plugin/base"),],
};
