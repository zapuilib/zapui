import { Inject, Injectable, Optional, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

import { NGX_ZEN_CONFIG } from './tokens/zap.tokens';
import { ZapConfig, ZapTheme } from '../public-api';
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
    @Optional() @Inject(NGX_ZEN_CONFIG) private config: ZapConfig
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    if (this.isBrowser) {
      this.applyTheme();
    }
  }

  applyTheme(customTheme?: 'light' | 'dark' | ZapTheme): void {
    const root = this.document.documentElement;
    const config = this.config || defaultConfig;

    if (customTheme) {
      this.config.theme = customTheme;
    }

    const theme = this.getTheme(config.theme || 'dark');
    this.removeExistingStyleElement();
    const styleElement = this.createStyleElement();
    this.document.head.appendChild(styleElement);

    const cssVariables = this.generateCssVariables(theme, config, root);
    styleElement.innerHTML = `:root {\n${cssVariables}}`;
  }

  private getTheme(theme: string | ZapTheme): ZapTheme {
    if (theme === 'light') {
      return lightTheme;
    } else if (theme === 'dark') {
      return darkTheme;
    } else {
      return typeof theme === 'string' ? darkTheme : theme;
    }
  }

  private removeExistingStyleElement(): void {
    const existingStyleElement = this.document.getElementById('zap-theme-styles');
    if (existingStyleElement) {
      existingStyleElement.remove();
    }
  }

  private createStyleElement(): HTMLStyleElement {
    const styleElement = this.document.createElement('style');
    styleElement.setAttribute('id', 'zap-theme-styles');
    return styleElement;
  }

  private generateCssVariables(theme: ZapTheme, config: ZapConfig, root: HTMLElement): string {
    let cssVariables = '';

    cssVariables += this.generateColorVariables(theme, root);
    cssVariables += this.generateFontSizeVariables(theme);
    cssVariables += this.generateShapeVariables(config, root);
    cssVariables += this.generateButtonSizeVariables(config, root);

    return cssVariables;
  }

  private generateColorVariables(theme: ZapTheme, root: HTMLElement): string {
    let cssVariables = '';

    Object.entries(theme.colors || {}).forEach(([key, value]) => {
      const kebabKey = this.toKebabCase(key);
      const existingColor = this.getExistingColor(root, kebabKey);
      const rgbValue = existingColor || this.hexToRgb(value);
      cssVariables += `--zap-color-${kebabKey}: ${rgbValue};\n`;
    });

    return cssVariables;
  }

  private generateFontSizeVariables(theme: ZapTheme): string {
    let cssVariables = '';

    Object.entries(theme.fontSize || {}).forEach(([key, value]) => {
      cssVariables += `--zap-font-size-${key}: ${value};\n`;
    });

    return cssVariables;
  }

  private generateShapeVariables(config: ZapConfig, root: HTMLElement): string {
    let cssVariables = '';
    const existingShape = this.getExistingShape(root);
    const shapeValue = existingShape || config.shape;

    if (shapeValue) {
      const { shapeCssValue, shapeCssValueModals } = this.getShapeCssValues(shapeValue);
      cssVariables += `--zap-shape: ${shapeCssValue};\n`;
      cssVariables += `--zap-shape-modal: ${shapeCssValueModals};\n`;
    }

    return cssVariables;
  }

  private generateButtonSizeVariables(config: ZapConfig, root: HTMLElement): string {
    let cssVariables = '';
    const existingSize = this.getExistingButtonSize(root);
    const btnSizeValue = existingSize || config.btnSize;

    if (btnSizeValue) {
      cssVariables += this.getButtonSizeCssValues(btnSizeValue, root);
    } else {
      cssVariables += this.getDefaultButtonSizeCssValues();
    }

    return cssVariables;
  }

  private toKebabCase(str: string): string {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  }

  private getExistingColor(root: HTMLElement, key: string): string {
    if (this.isBrowser) {
      const existingColor = getComputedStyle(root).getPropertyValue(`--zap-color-${key}`).trim();
      return this.convertColorToRgb(existingColor);
    }
    return '';
  }

  private convertColorToRgb(color: string): string {
    if (color.startsWith('#')) {
      return this.hexToRgb(color);
    } else if (color.startsWith('rgb')) {
      return this.rgbToRgbNumber(color);
    } else if (color.startsWith('rgba')) {
      return this.rgbaToRgbNumber(color);
    }
    return '';
  }

  private getExistingShape(root: HTMLElement): string {
    if (this.isBrowser) {
      const existingShape = getComputedStyle(root).getPropertyValue('--zap-shape').trim();
      const validShapes = ['pill', 'curve', 'default'];
      return validShapes.includes(existingShape) ? existingShape : '';
    }
    return '';
  }

  private getShapeCssValues(shapeValue: string): { shapeCssValue: string; shapeCssValueModals: string } {
    let shapeCssValue = shapeValue;
    let shapeCssValueModals = shapeValue;

    if (shapeValue === 'pill') {
      shapeCssValue = 'calc(infinity * 1px)';
      shapeCssValueModals = '1rem';
    } else if (shapeValue === 'curve') {
      shapeCssValue = '0.375rem';
      shapeCssValueModals = '0.5rem';
    }

    return { shapeCssValue, shapeCssValueModals };
  }

  private getExistingButtonSize(root: HTMLElement): string {
    if (this.isBrowser) {
      return getComputedStyle(root).getPropertyValue('--zap-btn-size').trim();
    }
    return '';
  }

  private getButtonSizeCssValues(btnSizeValue: string, root: HTMLElement): string {
    let cssVariables = '';

    if (btnSizeValue === 'compact') {
      cssVariables += `--zap-btn-size-x: 0.75rem;\n`;
      cssVariables += `--zap-btn-size-y: 0.25rem;\n`;
      cssVariables += `--zap-btn-text-size: 1rem;\n`;
    } else if (btnSizeValue === 'tight') {
      cssVariables += `--zap-btn-size-x: 0.5rem;\n`;
      cssVariables += `--zap-btn-size-y: 0.25rem;\n`;
      const existingFontSize = this.getExistingFontSize(root);
      const btnTextSizeValue = existingFontSize || '0.875rem';
      cssVariables += `--zap-btn-text-size: ${btnTextSizeValue};\n`;
    } else if (btnSizeValue === 'wide') {
      cssVariables += `--zap-btn-size-x: 1rem;\n`;
      cssVariables += `--zap-btn-size-y: 0.5rem;\n`;
      cssVariables += `--zap-btn-width: 100%;\n`;
    } else {
      cssVariables += this.getDefaultButtonSizeCssValues();
    }

    return cssVariables;
  }

  private getExistingFontSize(root: HTMLElement): string {
    if (this.isBrowser) {
      return getComputedStyle(root).getPropertyValue('--zap-font-size-sm').trim();
    }
    return '';
  }

  private getDefaultButtonSizeCssValues(): string {
    return `--zap-btn-size-x: 1rem;\n--zap-btn-size-y: 0.5rem;\n--zap-btn-text-size: 1rem;\n`;
  }

  private hexToRgb(hex: string): string {
    let r = 0, g = 0, b = 0;
    if (hex.length === 4) {
      r = parseInt(hex[1] + hex[1], 16);
      g = parseInt(hex[2] + hex[2], 16);
      b = parseInt(hex[3] + hex[3], 16);
    } else if (hex.length === 7) {
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
