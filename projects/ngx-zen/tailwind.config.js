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
        '7xl': 'var(--zen-font-size-7xl)',
        '6xl': 'var(--zen-font-size-6xl)',
        '5xl': 'var(--zen-font-size-5xl)',
        '4xl': 'var(--zen-font-size-4xl)',
        '3xl': 'var(--zen-font-size-3xl)',
        '2xl': 'var(--zen-font-size-2xl)',
        xl: 'var(--zen-font-size-xl)',
        lg: 'var(--zen-font-size-lg)',
        md: 'var(--zen-font-size-md)',
        sm: 'var(--zen-font-size-sm)',
        xs: 'var(--zen-font-size-xs)',
        xxs: 'var(--zen-font-size-xxs)',
      },
      fontFamily: {
        icon: ['"Font Awesome 6 Pro"'],
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("./plugin/base"),],
};
