import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {
  InMemoryScrollingFeature,
  InMemoryScrollingOptions,
  provideRouter,
  withInMemoryScrolling,
} from '@angular/router';
import { ZapConfig, provideZapOptions } from 'zap';
import { provideHighlightOptions } from 'ngx-highlightjs';

import { routes } from './app.routes';

const ngxConfig: ZapConfig = {
  theme:
    typeof window !== 'undefined'
      ? (localStorage.getItem('zapdemo-theme') as 'light' | 'dark')
      : 'dark',
  components: {
    global: {
      shape: 'curve',
    },
    button: {
      styles: {
        fontSize: '0.875rem',
      },
    },
    chip: {
      shape: 'pill',
    },
  },
};

const scrollConfig: InMemoryScrollingOptions = {
  scrollPositionRestoration: 'top',
  anchorScrolling: 'enabled',
};

const inMemoryScrollingFeature: InMemoryScrollingFeature = withInMemoryScrolling(scrollConfig);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, inMemoryScrollingFeature),
    provideZapOptions(ngxConfig),
    provideHighlightOptions({
      fullLibraryLoader: () => import('highlight.js'),
      lineNumbersLoader: () => import('ngx-highlightjs/line-numbers'),
      themePath: '/assets/ir-black.css',
    }),
  ],
};
