import { ZapTheme, ZapConfig } from '../interfaces/config.interface';

export const defaultConfig: ZapConfig = {
  theme: 'dark',
  components: {
    global: {
      shape: 'flat',
    },
    button: {
      shape: 'flat',
      size: 'base',
    },
  },
};

export const lightTheme: ZapTheme = {
  colors: {
    primary: '#FFFFFF',
    secondary: '#09090B',
    tertiary: '#09090B',
    quaternary: '#495057',
    success: '#28a745',
    successText: '#FFFFFF',
    error: '#dc3545',
    errorText: '#FFFFFF',
    warning: '#ffc107',
    warningText: '#09090B',
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
};

export const darkTheme: ZapTheme = {
  colors: {
    primary: '#09090B',
    secondary: '#FFFFFF',
    tertiary: '#FFFFFF',
    quaternary: '#28282b',
    success: '#04E824',
    successText: '#09090B',
    warning: '#f6ad55',
    warningText: '#09090B',
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
};
