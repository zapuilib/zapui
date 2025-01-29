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

    if (config.shape) root.style.setProperty('--zen-shape', config.shape);

    if(config.btnSize) root.style.setProperty('--zen-btn-size', config.btnSize);


    Object.entries(theme.colors || {}).forEach(([key, value]) => {
      const kebabKey = key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
      const rgbValue = hexToRgb(value);
      root.style.setProperty(`--zen-color-${kebabKey}`, rgbValue);
    });

    function hexToRgb(hex: string): string {
      let r = 0, g = 0, b = 0;
      if (hex.length == 4) {
      r = parseInt(hex[1] + hex[1], 16);
      g = parseInt(hex[2] + hex[2], 16);
      b = parseInt(hex[3] + hex[3], 16);
      } else if (hex.length == 7) {
      r = parseInt(hex[1] + hex[2], 16);
      g = parseInt(hex[3] + hex[4], 16);
      b = parseInt(hex[5] + hex[6], 16);
      }
      return `${r}, ${g}, ${b}`;
    }

    Object.entries(theme.fontSize || {}).forEach(([key, value]) => {
      root.style.setProperty(`--zen-font-size-${key}`, value);
    });
  }
}
