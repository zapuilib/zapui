/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  safelist: [
    {
      pattern: /(bg-|text-|fill-|border-|stroke-|from-|to-|via-).*/,
    },
  ],
  theme: {
    extend: {
      colors: {
        primary: ({ opacityValue }) =>
          opacityValue
            ? `rgba(var(--zap-color-primary), ${opacityValue})`
            : `rgb(var(--zap-color-primary))`,
        secondary: ({ opacityValue }) =>
          opacityValue
            ? `rgba(var(--zap-color-secondary), ${opacityValue})`
            : `rgb(var(--zap-color-secondary))`,
        tertiary: ({ opacityValue }) =>
          opacityValue
            ? `rgba(var(--zap-color-tertiary), ${opacityValue})`
            : `rgb(var(--zap-color-tertiary))`,
        quaternary: ({ opacityValue }) =>
          opacityValue
            ? `rgba(var(--zap-color-quaternary), ${opacityValue})`
            : `rgb(var(--zap-color-quaternary))`,
        success: ({ opacityValue }) =>
          opacityValue
            ? `rgba(var(--zap-color-success), ${opacityValue})`
            : `rgb(var(--zap-color-success))`,
        error: ({ opacityValue }) =>
          opacityValue
            ? `rgba(var(--zap-color-error), ${opacityValue})`
            : `rgb(var(--zap-color-error))`,
        warning: ({ opacityValue }) =>
          opacityValue
            ? `rgba(var(--zap-color-warning), ${opacityValue})`
            : `rgb(var(--zap-color-warning))`,
        info: ({ opacityValue }) =>
          opacityValue
            ? `rgba(var(--zap-color-info), ${opacityValue})`
            : `rgb(var(--zap-color-info))`,
        successText: ({ opacityValue }) =>
          opacityValue
            ? `rgba(var(--zap-color-success-text), ${opacityValue})`
            : `rgb(var(--zap-color-success-text))`,
        errorText: ({ opacityValue }) =>
          opacityValue
            ? `rgba(var(--zap-color-error-text), ${opacityValue})`
            : `rgb(var(--zap-color-error-text))`,
        warningText: ({ opacityValue }) =>
          opacityValue
            ? `rgba(var(--zap-color-warning-text), ${opacityValue})`
            : `rgb(var(--zap-color-warning-text))`,
        infoText: ({ opacityValue }) =>
          opacityValue
            ? `rgba(var(--zap-color-info-text), ${opacityValue})`
            : `rgb(var(--zap-color-info-text))`,
      },
      fontSize: {
        '7xl': 'var(--zap-font-size-7xl)',
        '6xl': 'var(--zap-font-size-6xl)',
        '5xl': 'var(--zap-font-size-5xl)',
        '4xl': 'var(--zap-font-size-4xl)',
        '3xl': 'var(--zap-font-size-3xl)',
        '2xl': 'var(--zap-font-size-2xl)',
        xl: 'var(--zap-font-size-xl)',
        lg: 'var(--zap-font-size-lg)',
        md: 'var(--zap-font-size-md)',
        sm: 'var(--zap-font-size-sm)',
        xs: 'var(--zap-font-size-xs)',
        xxs: 'var(--zap-font-size-xxs)',
      },
      fontFamily: {
        icon: ['"Font Awesome 6 Pro"'],
      },
      screens: {
        xxs: '320px',
        xs: '375px',
      },
      keyframes: {
        popup: {
          '0%': { transform: 'scale(0.9)', opacity: '0', transformOrigin: 'center' },
          '100%': { transform: 'scale(1)', opacity: '1', transformOrigin: 'center' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideRight: {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(100%)', opacity: '0' },
        },
      },
      animation: {
        popup: 'popup 0.1s ease-out',
        slideUp: 'slideUp 0.2s ease-out',
        slideRight: 'slideRight 0.2s ease-out',
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('./tailwind/base')],
};
