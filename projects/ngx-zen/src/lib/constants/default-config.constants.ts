import { ZenTheme, NgxZenConfig } from '../interfaces/config.interface';

export const defaultConfig: NgxZenConfig = {
  theme: 'dark',
  shape: 'default',
};

export const lightTheme: ZenTheme = {
  colors: {
    primary: '#FFFFFF',
    secondary: '#000000',
    tertiary: '#000000',
    quaternary: '#495057',
    success: '#28a745',
    successText: '#FFFFFF',
    error: '#dc3545',
    errorText: '#FFFFFF',
    warning: '#ffc107',
    warningText: '#000000',
    info: '#17a2b8',
    infoText: '#FFFFFF',
  },
  fontSize: {
    '7xl': '4.5rem',
    '6xl': '3.75rem',
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
}

export const darkTheme: ZenTheme = {
  colors: {
    primary: '#000000',
    secondary: '#FFFFFF',
    tertiary: '#FFFFFF',
    quaternary: '#9CA3AF',
    success: '#04E824',
    successText: '#000000',
    warning: '#f6ad55',
    warningText: '#000000',
    error: '#e3342f',
    errorText: '#FFFFFF',
    info: '#5438DC',
    infoText: '#FFFFFF',
  },
  fontSize: {
    '7xl': '4.5rem',
    '6xl': '3.75rem',
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
}