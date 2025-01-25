import { Inject, Injectable, Optional } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { NGX_ZEN_CONFIG } from './tokens/ngx-zen.tokens';
import { NgxZenConfig } from '../public-api';
import {
  lightTheme,
  defaultConfig,
  darkTheme,
} from './constants/default-config.constants';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Optional() @Inject(NGX_ZEN_CONFIG) private config: NgxZenConfig
  ) {
    this.applyTheme();
  }

  applyTheme(): void {
    const root = this.document.documentElement;

    const config = this.config || defaultConfig;
    const theme =
      config.theme === 'light'
        ? lightTheme
        : config.theme === 'dark'
        ? darkTheme
        : config.theme || darkTheme;

    if (config.shape) root.style.setProperty('--shape', config.shape);

    if(config.btnSize) root.style.setProperty('--btn-size', config.btnSize);


    Object.entries(theme.colors || {}).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });

    Object.entries(theme.fontSize || {}).forEach(([key, value]) => {
      root.style.setProperty(`--font-size-${key}`, value);
    });
  }
}
