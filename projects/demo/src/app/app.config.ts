import {
  ApplicationConfig,
  provideZoneChangeDetection,
  importProvidersFrom,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { ZapConfig, provideZapOptions } from 'zap';

import { routes } from './app.routes';

const ngxConfig: ZapConfig = {
  shape: 'flat',
  btnSize: 'base',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideZapOptions(ngxConfig),
  ],
};
