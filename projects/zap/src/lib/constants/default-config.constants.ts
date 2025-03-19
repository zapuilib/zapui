import { ZapTheme, ZapConfig } from '../interfaces/config.interface';

export const defaultConfig: ZapConfig = {
  theme: 'dark',
};

export const lightTheme: ZapTheme = {
  colors: {
    primary: '#FFFFFF',
    secondary: '#09090B',
    tertiary: '#09090B',
    success: '#22c55e',
    successText: '#09090B',
    warning: '#eab308',
    warningText: '#09090B',
    error: '#dc2626',
    errorText: '#FFFFFF',
    info: '#2563eb',
    infoText: '#FFFFFF',
  },
  fontSize: {
    '5xl': '3rem',
    '4xl': '2.25rem',
    '3xl': '1.875rem',
    '2xl': '1.5rem',
    xl: '1.25rem',
    lg: '1.125rem',
    md: '1rem',
    sm: '0.875rem',
    xs: '0.75rem',
    xxs: '0.625rem',
  },
};

export const darkTheme: ZapTheme = {
  colors: {
    primary: '#09090B',
    secondary: '#FFFFFF',
    tertiary: '#FFFFFF',
    success: '#22c55e',
    successText: '#09090B',
    warning: '#eab308',
    warningText: '#09090B',
    error: '#dc2626',
    errorText: '#FFFFFF',
    info: '#2563eb',
    infoText: '#FFFFFF',
  },
  fontSize: {
    '5xl': '3rem',
    '4xl': '2.25rem',
    '3xl': '1.875rem',
    '2xl': '1.5rem',
    xl: '1.25rem',
    lg: '1.125rem',
    md: '1rem',
    sm: '0.875rem',
    xs: '0.75rem',
    xxs: '0.625rem',
  },
};
