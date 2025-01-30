import {
  ApplicationConfig,
  provideZoneChangeDetection,
  importProvidersFrom,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { NgxZenConfig, NgxZenModule, provideZenOptions } from 'ngx-zen';

import { routes } from './app.routes';

const ngxConfig: NgxZenConfig = {
  shape: 'pill',
  btnSize: 'default',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    // importProvidersFrom(NgxZenModule.forRoot(ngxConfig)),
    provideZenOptions(ngxConfig),
  ],
};
