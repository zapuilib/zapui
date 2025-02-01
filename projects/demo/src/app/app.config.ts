import {
  ApplicationConfig,
  provideZoneChangeDetection,
  importProvidersFrom,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { NgxZenConfig, provideZenOptions } from 'ngx-zen';

import { routes } from './app.routes';

const ngxConfig: NgxZenConfig = {
  shape: 'flat',
  btnSize: 'base',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideZenOptions(ngxConfig),
  ],
};
