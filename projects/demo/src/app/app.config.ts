import {
  ApplicationConfig,
  provideZoneChangeDetection,
  importProvidersFrom,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { NgxZenConfig, NgxZenModule } from 'ngx-zen';

const ngxConfig: NgxZenConfig = {
  colors: {
    primary: '#FFFFFF',
    secondary: '#000000',
    tertiary: '#2563eb',
    quaternary: '#374151',
    success: '#38c172',
    warning: '#f6ad55',
    error: '#e3342f',
    info: '#4299e1',
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

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(NgxZenModule),
  ],
};
