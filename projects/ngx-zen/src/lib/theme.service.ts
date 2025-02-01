import { Inject, Injectable, Optional, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

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
  private isBrowser: boolean;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Optional() @Inject(NGX_ZEN_CONFIG) private config: NgxZenConfig
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    if (this.isBrowser) {
      this.applyTheme();
    }
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

    const existingStyleElement =
      this.document.getElementById('zen-theme-styles');

    if (existingStyleElement) {
      return;
    }

    const styleElement = this.document.createElement('style');
    styleElement.setAttribute('id', 'zen-theme-styles');
    this.document.head.appendChild(styleElement);

    let cssVariables = '';

    Object.entries(theme.colors || {}).forEach(([key, value]) => {
      const kebabKey = key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
      let existingColor = '';

      if (this.isBrowser) {
        existingColor = getComputedStyle(root)
          .getPropertyValue(`--zen-color-${kebabKey}`)
          .trim();
      }

      if (existingColor) {
        if (existingColor.startsWith('#')) {
          existingColor = this.hexToRgb(existingColor);
        } else if (existingColor.startsWith('rgb')) {
          existingColor = this.rgbToRgbNumber(existingColor);
        } else if (existingColor.startsWith('rgba')) {
          existingColor = this.rgbaToRgbNumber(existingColor);
        }
      }

      const rgbValue = existingColor || this.hexToRgb(value);
      cssVariables += `--zen-color-${kebabKey}: ${rgbValue};\n`;
    });

    Object.entries(theme.fontSize || {}).forEach(([key, value]) => {
      cssVariables += `--zen-font-size-${key}: ${value};\n`;
    });

    let existingShape = '';
    if (this.isBrowser) {
      existingShape = getComputedStyle(root)
        .getPropertyValue('--zen-shape')
        .trim();
    }

    const validShapes = ['pill', 'curve', 'default'];
    if (existingShape && !validShapes.includes(existingShape)) {
      existingShape = '';
    }

    const shapeValue = existingShape || config.shape;
    if (shapeValue) {
      let shapeCssValue = shapeValue;
      let shapeCssValueModals = shapeValue;
      if (shapeValue === 'pill') {
        shapeCssValue = 'calc(infinity * 1px)';
        shapeCssValueModals = '1rem';
      } else if (shapeValue === 'curve') {
        shapeCssValue = '0.375rem';
        shapeCssValueModals = '0.5rem';
      }
      cssVariables += `--zen-shape: ${shapeCssValue};\n`;
      cssVariables += `--zen-shape-modal: ${shapeCssValueModals};\n`;
    }

    let existingSize = '';
    if (this.isBrowser) {
      existingSize = getComputedStyle(root)
        .getPropertyValue('--zen-btn-size')
        .trim();
    }

    const btnSizeValue = existingSize || config.btnSize;
    if (btnSizeValue) {
      if (btnSizeValue === 'compact') {
        cssVariables += `--zen-btn-size-x: 0.75rem;\n`;
        cssVariables += `--zen-btn-size-y: 0.25rem;\n`;
        cssVariables += `--zen-btn-text-size: 1rem;\n`;
      } else if (btnSizeValue === 'tight') {
        cssVariables += `--zen-btn-size-x: 0.5rem;\n`;
        cssVariables += `--zen-btn-size-y: 0.25rem;\n`;
        let existingFontSize = '';
        if (this.isBrowser) {
          existingFontSize = getComputedStyle(root)
            .getPropertyValue('--zen-font-size-sm')
            .trim();
        }
        const btnTextSizeValue = existingFontSize || '0.875rem';
        cssVariables += `--zen-btn-text-size: ${btnTextSizeValue};\n`;
      } else if (btnSizeValue === 'wide') {
        cssVariables += `--zen-btn-size-x: 1rem;\n`;
        cssVariables += `--zen-btn-size-y: 0.5rem;\n`;
        cssVariables += `--zen-btn-width: 100%;\n`;
      } else {
        cssVariables += `--zen-btn-size-x: 1rem;\n`;
        cssVariables += `--zen-btn-size-y: 0.5rem;\n`;
        cssVariables += `--zen-btn-text-size: 1rem;\n`;
      }
    } else {
      cssVariables += `--zen-btn-size-x: 1rem;\n`;
      cssVariables += `--zen-btn-size-y: 0.5rem;\n`;
      cssVariables += `--zen-btn-text-size: 1rem;\n`;
    }

    styleElement.innerHTML = `:root {\n${cssVariables}}`;
  }

  private hexToRgb(hex: string): string {
    let r = 0,
      g = 0,
      b = 0;
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

  private rgbToRgbNumber(rgb: string): string {
    const result = rgb.match(/\d+/g);
    return result ? `${result[0]}, ${result[1]}, ${result[2]}` : '';
  }

  private rgbaToRgbNumber(rgba: string): string {
    const result = rgba.match(/\d+/g);
    if (result) {
      const r = parseInt(result[0]);
      const g = parseInt(result[1]);
      const b = parseInt(result[2]);
      const a = parseFloat(result[3]);
      const newR = Math.round((1 - a) * 255 + a * r);
      const newG = Math.round((1 - a) * 255 + a * g);
      const newB = Math.round((1 - a) * 255 + a * b);
      return `${newR}, ${newG}, ${newB}`;
    }
    return '';
  }
}
