import {
  ApplicationConfig,
  provideZoneChangeDetection,
  importProvidersFrom,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { NgxZenConfig, NgxZenModule } from 'ngx-zen';

import { routes } from './app.routes';

const ngxConfig: NgxZenConfig = {
  shape: 'pill',
  btnSize: 'wide',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(NgxZenModule.forRoot(ngxConfig)),
  ],
};
