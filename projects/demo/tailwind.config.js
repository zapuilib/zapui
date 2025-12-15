/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

module.exports = {
  important: true,
  content: ['./src/**/*.{html,ts}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Geist', 'serif'],
        mono: ['Geist Mono', 'monospace'],
      },
      colors: {
        primary: '#09090b',
        secondary: '#ffffff',
        tertiary: '#ffffff',
        quaternary: '#9ca3af',
        success: '#04e824',
        'success-text': '#09090b',
        warning: '#f6ad55',
        'warning-text': '#09090b',
        error: '#e3342f',
        'error-text': '#ffffff',
        info: '#5438dc',
        'info-text': '#ffffff',
      },
      spacing: {
        18: '4.5rem',
        34: '8.5rem',
        45: '11.25rem',
        58: '14.5rem',
        94: '23.5rem',
        110: '27.5rem',
      },
      maxWidth: {
        screen: '100vw',
      },
      animation: {
        gradient: 'gradient-shift 3s ease-in-out infinite',
      },
      keyframes: {
        'gradient-shift': {
          '0%': { backgroundPosition: '0% 50%' },
          '25%': { backgroundPosition: '50% 100%' },
          '50%': { backgroundPosition: '100% 50%' },
          '75%': { backgroundPosition: '50% 0%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      screens: {
        xs: '440px',
      },
    },
  },
  plugins: [
    require('../../dist/zap/tailwind/base'),
    require('@tailwindcss/typography'),
    plugin(function ({ addVariant }) {
      // Light mode variant
      addVariant('light', '&:where(.light, .light *)');

      // Max-width variants (Tailwind v4 style)
      addVariant('max-sm', '@media (max-width: 639px)');
      addVariant('max-md', '@media (max-width: 767px)');
      addVariant('max-lg', '@media (max-width: 1023px)');
      addVariant('max-xl', '@media (max-width: 1279px)');
      addVariant('max-2xl', '@media (max-width: 1535px)');

      // Range variants (Tailwind v4 style)
      addVariant('md:max-xl', '@media (min-width: 768px) and (max-width: 1279px)');
      addVariant('lg:max-xl', '@media (min-width: 1024px) and (max-width: 1279px)');
      addVariant('sm:max-lg', '@media (min-width: 640px) and (max-width: 1023px)');
    }),
  ],
};
