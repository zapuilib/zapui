import { Inject, Injectable, Optional, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

import { NGX_ZAP_CONFIG } from './tokens/zap.tokens';
import { ButtonConfig, GlobalConfig, ZapConfig, ZapTheme } from '../public-api';
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
    @Optional() @Inject(NGX_ZAP_CONFIG) private config: ZapConfig
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    if (this.isBrowser) {
      this.applyTheme();
    }
  }

  applyTheme(customTheme?: 'light' | 'dark' | ZapTheme): void {
    const root = this.document.documentElement;
    const config = this.config || defaultConfig;

    if (customTheme && typeof customTheme === 'object') {
      if (this.deepEqual(customTheme, this.config.theme)) {
        return;
      }
    } else if (customTheme && customTheme === this.config.theme) {
      return;
    } else if (customTheme) {
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
    const existingStyleElement =
      this.document.getElementById('zap-theme-styles');
    if (existingStyleElement) {
      existingStyleElement.remove();
    }
  }

  private createStyleElement(): HTMLStyleElement {
    const styleElement = this.document.createElement('style');
    styleElement.setAttribute('id', 'zap-theme-styles');
    return styleElement;
  }

  private generateCssVariables(
    theme: ZapTheme,
    config: ZapConfig,
    root: HTMLElement
  ): string {
    let cssVariables = '';

    const timer = new Date().getTime();

    cssVariables += this.generateColorVariables(theme, root);
    cssVariables += this.generateFontSizeVariables(theme);
    cssVariables += this.generateStylesVariables(theme, root);

    if (config.components) {
      for (const [componentKey, value] of Object.entries(config.components)) {
        switch (componentKey) {
          case 'global':
            cssVariables += this.generateComponentGlobalVariables(value, root);
            break;
          case 'button':
            cssVariables += this.generateComponentButtonVariables(value, root);
            break;
          default:
            break;
        }

        // this handles all styles for the button component, if border radius, padding etc are provided, it will overrirde the shape and size values
        if (value.styles) {
          Object.entries(value.styles).forEach(([styleKey, value]) => {
            if (styleKey === 'padding') {
              cssVariables += this.handlePaddingStyles(componentKey, value);
            } else {
              cssVariables += `--zap-${componentKey}-${this.toKebabCase(
                styleKey
              )}: ${value};\n`;
            }
          });
        }
      }
    }

    return cssVariables;
  }

  //this hadles the padding styles for the components incase the user want to use css padding instead of left right etc
  private handlePaddingStyles(
    componentKey: string,
    value: string
  ): string | undefined {
    let cssVariables = '';
    let pt;
    let pr;
    let pb;
    let pl;
    if (value.split(' ').length === 4) {
      pt = value.split(' ')[0];
      pr = value.split(' ')[1];
      pb = value.split(' ')[2];
      pl = value.split(' ')[3];
    } else if (value.split(' ').length === 2) {
      pt = value.split(' ')[0];
      pb = value.split(' ')[0];
      pl = value.split(' ')[1];
      pr = value.split(' ')[1];
    } else if (value.split(' ').length === 3) {
      pt = value.split(' ')[0];
      pb = value.split(' ')[1];
      pl = value.split(' ')[2];
      pr = value.split(' ')[2];
    } else if (value.split(' ').length === 1) {
      pt = value.split(' ')[0];
      pb = value.split(' ')[0];
      pl = value.split(' ')[0];
      pr = value.split(' ')[0];
    } else {
      return;
    }

    cssVariables += `--zap-${componentKey}-padding-left: ${pl};\n`;
    cssVariables += `--zap-${componentKey}-padding-top: ${pt};\n`;
    cssVariables += `--zap-${componentKey}-padding-bottom: ${pb};\n`;
    cssVariables += `--zap-${componentKey}-padding-right: ${pr};\n`;

    return cssVariables;
  }

  /**
   * This function generates the css variables for the button component
   * @param value - ButtonConfig
   * @param root - HTMLElement
   * @returns string
   */
  private generateComponentButtonVariables(
    value: ButtonConfig,
    root: HTMLElement
  ) {
    let cssVariables = '';
    const existingSize = this.getExistingButtonSize(root);
    const existingShape = this.getExistingShapeFor('button', root);
    const btnSizeValue = existingSize || value.size;
    const btnShapeValue = existingShape || value.shape || '';

    // this handles the shape, size of the button component
    if (btnShapeValue) {
      const { shapeCssValue } = this.getShapeCssValues(btnShapeValue, 'button');
      cssVariables += `--zap-button-border-radius: ${shapeCssValue};\n`;
    }

    if (btnSizeValue) {
      cssVariables += this.getButtonSizeCssValues(btnSizeValue, root);
    } else {
      cssVariables += this.getDefaultButtonSizeCssValues();
    }

    return cssVariables;
  }

  // Below handles all the shape, sizees, font sizes, colors etc for the components
  /**
   * This function generates the global styles for the all the components
   * @param theme
   * @param root
   * @returns
   */
  private generateStylesVariables(theme: ZapTheme, root: HTMLElement): string {
    let cssVariables = '';
    const styles = {
      button: [
        {
          label: 'bg-color',
          value: theme.colors.tertiary,
        },
        {
          label: 'text-color',
          value: theme.colors.primary,
        },
        {
          label: 'border-color',
          value: theme.colors.tertiary,
        },
        {
          label: 'bg-hover-color',
          value: this.hexToRgba(theme.colors.tertiary, 0.9),
        },
        {
          label: 'text-hover-color',
          value: this.hexToRgba(theme.colors.primary, 0.9),
        },
        {
          label: 'border-hover-color',
          value: this.hexToRgba(theme.colors.tertiary, 0),
        },
        {
          label: 'bg-active-color',
          value: theme.colors.tertiary,
        },
        {
          label: 'text-active-color',
          value: theme.colors.primary,
        },
        {
          label: 'border-active-color',
          value: 'transparent',
        },
        {
          label: 'disabled-bg-color',
          value: this.hexToRgba(theme.colors.tertiary, 0.5),
        },
        {
          label: 'disabled-text-color',
          value: this.hexToRgba(theme.colors.primary, 0.5),
        },
        {
          label: 'disabled-border-color',
          value: this.hexToRgba(theme.colors.tertiary, 0),
        },
      ],
    };

    for (const [component, stylesArray] of Object.entries(styles)) {
      for (const style of stylesArray) {
        if (this.isBrowser) {
          const existingStyle = getComputedStyle(root)
            .getPropertyValue(`--zap-${component}-${style['label']}`)
            .trim();
          const styleExist = existingStyle || style['value'];
          cssVariables += `--zap-${component}-${style['label']}: ${styleExist};\n`;
        }
      }
    }

    return cssVariables;
  }

  private generateComponentGlobalVariables(
    config: GlobalConfig,
    root: HTMLElement
  ): string {
    const components = ['alert', 'button', 'chip', 'dialog', 'input', 'modal'];
    let cssVariables = '';
    let existingShape = '';

    for (const component of components) {
      const existingShapeValue = this.getExistingShapeFor(component, root);
      if (existingShapeValue) {
        existingShape = existingShapeValue;
      }
      const shapeValue = existingShape || config.shape;

      if (shapeValue) {
        const { shapeCssValue } = this.getShapeCssValues(shapeValue, component);
        cssVariables += `--zap-${component}-border-radius: ${shapeCssValue};\n`;
      }
    }
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

  private getExistingShapeFor(key: string, root: HTMLElement): string {
    if (this.isBrowser) {
      const existingShape = getComputedStyle(root)
        .getPropertyValue(`--zap-${key}-border-radius`)
        .trim();
      const validShapes = ['pill', 'curve', 'default'];
      return validShapes.includes(existingShape) ? existingShape : '';
    } else {
      return '';
    }
  }

  private getExistingColor(root: HTMLElement, key: string): string {
    if (this.isBrowser) {
      const existingColor = getComputedStyle(root)
        .getPropertyValue(`--zap-color-${key}`)
        .trim();
      return this.convertColorToRgb(existingColor);
    }
    return '';
  }

  private getShapeCssValues(
    shapeValue: string,
    component: string
  ): {
    shapeCssValue: string;
  } {
    let shapeCssValue = shapeValue;

    const shapeValues: { [key: string]: string } = {
      pill: 'calc(infinity * 1px)',
      curve: '0.375rem',
    };

    const modalDialogShapeValues: { [key: string]: string } = {
      pill: '1rem',
      curve: '0.5rem',
    };

    if (
      component === 'button' ||
      component === 'input' ||
      component === 'chip' ||
      component === 'alert'
    ) {
      shapeCssValue = shapeValues[shapeValue] || shapeCssValue;
    } else if (component === 'modal' || component === 'dialog') {
      shapeCssValue = modalDialogShapeValues[shapeValue] || shapeCssValue;
    }

    return { shapeCssValue };
  }

  private getExistingButtonSize(root: HTMLElement): string {
    if (this.isBrowser) {
      return getComputedStyle(root)
        .getPropertyValue('--zap-button-size')
        .trim();
    }
    return '';
  }

  private getButtonSizeCssValues(
    btnSizeValue: string,
    root: HTMLElement
  ): string {
    let cssVariables = '';

    if (btnSizeValue === 'compact') {
      cssVariables += `--zap-button-padding-left: 0.75rem;\n`;
      cssVariables += `--zap-button-padding-right: 0.75rem;\n`;
      cssVariables += `--zap-button-padding-top: 0.25rem;\n`;
      cssVariables += `--zap-button-padding-bottom: 0.25rem;\n`;
      cssVariables += `--zap-button-font-size: 1rem;\n`;
    } else if (btnSizeValue === 'tight') {
      cssVariables += `--zap-button-padding-left: 0.5rem;\n`;
      cssVariables += `--zap-button-padding-right: 0.5rem;\n`;
      cssVariables += `--zap-button-padding-top: 0.25rem;\n`;
      cssVariables += `--zap-button-padding-bottom: 0.25rem;\n`;
      const existingFontSize = this.getExistingFontSize(root);
      const btnTextSizeValue = existingFontSize || '0.875rem';
      cssVariables += `--zap-button-font-size: ${btnTextSizeValue};\n`;
    } else if (btnSizeValue === 'wide') {
      cssVariables += `--zap-button-padding-left: 1rem;\n`;
      cssVariables += `--zap-button-padding-right: 1rem;\n`;
      cssVariables += `--zap-button-padding-top: 0.5rem;\n`;
      cssVariables += `--zap-button-padding-bottom: 0.5rem;\n`;
      cssVariables += `--zap-button-width: 100%;\n`;
    } else {
      cssVariables += this.getDefaultButtonSizeCssValues();
    }

    return cssVariables;
  }

  private getDefaultButtonSizeCssValues(): string {
    return `--zap-button-padding-left: 1rem;\n--zap-button-padding-right: 1rem;\n--zap-button-padding-top: 0.5rem;\n--zap-button-padding-bottom: 0.5rem;\n--zap-button-font-size: 1rem;\n`;
  }

  private generateFontSizeVariables(theme: ZapTheme): string {
    let cssVariables = '';

    Object.entries(theme.fontSize || {}).forEach(([key, value]) => {
      cssVariables += `--zap-font-size-${key}: ${value};\n`;
    });

    return cssVariables;
  }

  private getExistingFontSize(root: HTMLElement): string {
    if (this.isBrowser) {
      return getComputedStyle(root)
        .getPropertyValue('--zap-font-size-sm')
        .trim();
    }
    return '';
  }

  // Utility functions
  private toKebabCase(str: string): string {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
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
  private hexToRgba(hex: string, alpha: number): string {
    let r = 0,
      g = 0,
      b = 0;
    if (hex.length === 4) {
      r = parseInt(hex[1] + hex[1], 16);
      g = parseInt(hex[2] + hex[2], 16);
      b = parseInt(hex[3] + hex[3], 16);
    } else if (hex.length === 7) {
      r = parseInt(hex[1] + hex[2], 16);
      g = parseInt(hex[3] + hex[4], 16);
      b = parseInt(hex[5] + hex[6], 16);
    }
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  private hexToRgb(hex: string): string {
    let r = 0,
      g = 0,
      b = 0;
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

  private deepEqual(obj1: any, obj2: any): boolean {
    if (obj1 === obj2) return true;
    if (
      typeof obj1 !== 'object' ||
      typeof obj2 !== 'object' ||
      obj1 === null ||
      obj2 === null
    ) {
      return false;
    }

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) return false;

    for (const key of keys1) {
      if (!keys2.includes(key)) return false;
      if (!this.deepEqual(obj1[key], obj2[key])) return false;
    }

    return true;
  }
}
