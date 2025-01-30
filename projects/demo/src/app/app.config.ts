import {
  ApplicationConfig,
  provideZoneChangeDetection,
  importProvidersFrom,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { NgxZenConfig, provideZenOptions, ZenTheme } from 'ngx-zen';

import { routes } from './app.routes';

const folly: ZenTheme = {
  colors: {
    primary: '#000000',
    secondary: '#FFFFFF',
    tertiary: '#F52F57',
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
};

const ngxConfig: NgxZenConfig = {
  theme: folly,
  shape: 'pill',
  btnSize: 'default',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideZenOptions(ngxConfig),
  ],
};
