import {
  ApplicationConfig,
  provideZoneChangeDetection,
  importProvidersFrom,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { NgxZenConfig, NgxZenModule, ZenTheme } from 'ngx-zen';

const ngxConfig: NgxZenConfig = {
  theme: 'dark',
  shape: 'curve',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(NgxZenModule.forRoot(ngxConfig)),
  ],
};
