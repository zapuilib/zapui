/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  safelist: [
    {
      pattern: /(bg-|text-).*/,
    },
  ],
  theme: {
    extend: {
      colors: {
        primary: ({ opacityValue }) =>
          opacityValue
            ? `rgba(var(--zen-color-primary), ${opacityValue})`
            : `rgb(var(--zen-color-primary))`,
        secondary: ({ opacityValue }) =>
          opacityValue
            ? `rgba(var(--zen-color-secondary), ${opacityValue})`
            : `rgb(var(--zen-color-secondary))`,
        tertiary: ({ opacityValue }) =>
          opacityValue
            ? `rgba(var(--zen-color-tertiary), ${opacityValue})`
            : `rgb(var(--zen-color-tertiary))`,
        quaternary: ({ opacityValue }) =>
          opacityValue
            ? `rgba(var(--zen-color-quaternary), ${opacityValue})`
            : `rgb(var(--zen-color-quaternary))`,
        success: ({ opacityValue }) =>
          opacityValue
            ? `rgba(var(--zen-color-success), ${opacityValue})`
            : `rgb(var(--zen-color-success))`,
        error: ({ opacityValue }) =>
          opacityValue
            ? `rgba(var(--zen-color-error), ${opacityValue})`
            : `rgb(var(--zen-color-error))`,
        warning: ({ opacityValue }) =>
          opacityValue
            ? `rgba(var(--zen-color-warning), ${opacityValue})`
            : `rgb(var(--zen-color-warning))`,
        info: ({ opacityValue }) =>
          opacityValue
            ? `rgba(var(--zen-color-info), ${opacityValue})`
            : `rgb(var(--zen-color-info))`,
        successText: ({ opacityValue }) =>
          opacityValue
            ? `rgba(var(--zen-color-success-text), ${opacityValue})`
            : `rgb(var(--zen-color-success-text))`,
        errorText: ({ opacityValue }) =>
          opacityValue
            ? `rgba(var(--zen-color-error-text), ${opacityValue})`
            : `rgb(var(--zen-color-error-text))`,
        warningText: ({ opacityValue }) =>
          opacityValue
            ? `rgba(var(--zen-color-warning-text), ${opacityValue})`
            : `rgb(var(--zen-color-warning-text))`,
        infoText: ({ opacityValue }) =>
          opacityValue
            ? `rgba(var(--zen-color-info-text), ${opacityValue})`
            : `rgb(var(--zen-color-info-text))`,
      },
      fontSize: {
        "7xl": "var(--zen-font-size-7xl)",
        "6xl": "var(--zen-font-size-6xl)",
        "5xl": "var(--zen-font-size-5xl)",
        "4xl": "var(--zen-font-size-4xl)",
        "3xl": "var(--zen-font-size-3xl)",
        "2xl": "var(--zen-font-size-2xl)",
        xl: "var(--zen-font-size-xl)",
        lg: "var(--zen-font-size-lg)",
        md: "var(--zen-font-size-md)",
        sm: "var(--zen-font-size-sm)",
        xs: "var(--zen-font-size-xs)",
        xxs: "var(--zen-font-size-xxs)",
      },
      fontFamily: {
        icon: ['"Font Awesome 6 Pro"'],
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("./plugin/base")],
};
