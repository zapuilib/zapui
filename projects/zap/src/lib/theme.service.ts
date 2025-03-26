import { Inject, Injectable, Optional, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

import { ZAP_CONFIG } from './tokens/zap.tokens';
import { GlobalConfig, ZapConfig, ZapTheme } from './interfaces';
import { zapLight, defaultConfig, zapDark } from './constants/default-config.constant';
import { deepEqual } from './theme/utils/base-theme-utils';
import { generateColorVariables } from './theme/utils/color-utils';
import { generateFontSizeVariables } from './theme/utils/font-utils';
import { generateGlobalStylesVariables } from './theme/services/global-styles';
import {
  getShapeVariable,
  getSizeVariables,
  generateComponentGlobalVariables,
} from './theme/variables';
import { generateComponentStylesVariables } from './theme/services/component-styles';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private isBrowser: boolean;
  private activeTheme!: string;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: object,
    @Optional() @Inject(ZAP_CONFIG) private config: ZapConfig,
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    if (this.isBrowser) {
      this.applyTheme();
    }
  }

  applyTheme(customTheme?: 'light' | 'dark' | string): void {
    const root = this.document.documentElement;
    const config = this.config || defaultConfig;
    if (
      this.activeTheme !== undefined &&
      (this.activeTheme === customTheme || (this.activeTheme === config.theme && !customTheme))
    ) {
      return;
    }

    this.activeTheme = config.theme || 'dark';

    if (customTheme && typeof customTheme === 'object') {
      if (
        typeof customTheme === 'object' &&
        deepEqual(customTheme, this.config.theme as unknown as Record<string, unknown>)
      ) {
        return;
      }
    } else if (customTheme && customTheme === this.config.theme) {
      return;
    } else if (customTheme) {
      this.config.theme = customTheme;
      this.activeTheme = customTheme;
    }

    const theme = this.getTheme(config.theme || 'dark');
    this.removeExistingStyleElement();
    const styleElement = this.createStyleElement();
    this.document.head.appendChild(styleElement);

    const cssVariables = this.generateCssVariables(theme, config, root);
    styleElement.innerHTML = `:root {\n${cssVariables}}`;
  }

  private getTheme(theme: string): ZapTheme {
    if (theme === 'light') {
      return zapLight;
    } else if (theme === 'dark') {
      return zapDark;
    } else if (this.config.themeLibrary) {
      return this.config.themeLibrary[theme];
    } else {
      return zapDark;
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
    cssVariables += generateColorVariables(theme, root);
    cssVariables += generateFontSizeVariables(theme);
    cssVariables += generateGlobalStylesVariables(theme);

    if (config?.components && Object.keys(config.components).length > 0) {
      for (const [componentKey, value] of Object.entries(config.components)) {
        if (!value) continue;
        cssVariables += this.generateComponentVariables(componentKey, value);
      }
    }

    return cssVariables;
  }

  private generateComponentVariables(componentKey: string, value: any): string {
    let variables = '';

    if (componentKey === 'global') {
      variables += generateComponentGlobalVariables(value as GlobalConfig);
    }

    if ('shape' in value && value.shape) {
      variables += this.generateShapeVariables(componentKey, value.shape);
    }

    if ('size' in value && value.size) {
      variables += getSizeVariables(value.size, componentKey);
    }

    if ('styles' in value && value.styles) {
      variables += generateComponentStylesVariables(value.styles, componentKey, this.config);
    }

    return variables;
  }

  private generateShapeVariables(componentKey: string, shape: any): string {
    const shapeMap = new Map([
      ['date-picker', ['dp-calendar', 'dp-calendar-select']],
      ['dp-calendar', ['dp-calendar-select']],
    ]);

    let variables = '';

    if (shapeMap.has(componentKey)) {
      const relatedComponents = shapeMap.get(componentKey) || [];
      relatedComponents.forEach((component) => {
        variables += getShapeVariable(shape, component);
      });
    }

    variables += getShapeVariable(shape, componentKey);

    return variables;
  }
}
