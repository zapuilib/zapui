import { NgxZenConfig } from '../interfaces/config.interface';

export const defaultConfig: NgxZenConfig = {
  colors: {
    primary: '#FFFFFF', 
    secondary: '#000000', 
    tertiary: '#2563eb', 
    quaternary: '#374151',
    success: '#15803d', 
    error: '#b91c1c', 
    warning: '#f59e0b', 
    info: '#3b82f6', 
  },
  fontSize: {
    '7xl': '5rem', // 80px
    '6xl': '3.75rem', // 60px
    '5xl': '3rem', // 48px
    '4xl': '2.25rem', // 36px
    '3xl': '1.875rem', // 30px
    '2xl': '1.5rem', // 24px
    xl: '1.25rem', // 20px
    lg: '1.125rem', // 18px
    md: '1rem', // 16px
    sm: '0.875rem', // 14px
    xs: '0.75rem', // 12px
    xxs: '0.625rem', // 10px
  },
};
