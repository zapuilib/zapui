import { Inject, Injectable, Optional, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

import { NGX_ZAP_CONFIG } from './tokens/zap.tokens';
import {
  AlertConfig,
  ButtonConfig,
  ChipConfig,
  DialogConfig,
  HexCode,
  InputConfig,
  ModalConfig,
  SelectConfig,
  TextareaConfig,
  TooltipConfig,
  ZapConfig,
  ZapTheme,
} from './interfaces';
import {
  lightTheme,
  defaultConfig,
  darkTheme,
} from './constants/default-config.constants';
import { generateComponentButtonVariables } from './theme/components/button-theme';
import {
  convertColorToHex,
  convertColorToRgb,
  deepEqual,
} from './theme/utils/base-theme-utils';
import { generateColorVariables } from './theme/utils/color-utils';
import { generateComponentGlobalVariables } from './theme/components/global-theme';
import { generateFontSizeVariables } from './theme/utils/font-utils';
import { generateGlobalStylesVariables } from './theme/services/global-styles';
import { generateComponentStylesVariables } from './theme/services/component-styles';
import { generateComponentAlertVariables } from './theme/components/alert-theme';
import { generateComponentChipVariables } from './theme/components/chip-theme';
import { generateComponentDialogVariables } from './theme/components/dialog-theme';
import { generateComponentModalVariables } from './theme/components/modal-theme';
import { generateComponentInputVariables } from './theme/components/input-theme';
import { generateComponentCheckboxVariables } from './theme/components/checkbox-theme';
import { generateComponentTextareaVariables } from './theme/components/textarea-theme';
import { generateComponentSelectVariables } from './theme/components/select-theme';
import { generateComponentTooltipVariables } from './theme/components/tooltip-theme';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private isBrowser: boolean;
  private activeTheme!: string;

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

  applyTheme(customTheme?: 'light' | 'dark' | string): void {
    const root = this.document.documentElement;
    const config = this.config || defaultConfig;
    if (
      this.activeTheme !== undefined &&
      (this.activeTheme === customTheme ||
        (this.activeTheme === config.theme && !customTheme))
    ) {
      return;
    }

    this.activeTheme = config.theme || 'dark';

    if (customTheme && typeof customTheme === 'object') {
      if (deepEqual(customTheme, this.config.theme)) {
        return;
      }
    } else if (customTheme && customTheme === this.config.theme) {
      return;
    } else if (customTheme) {
      this.config.theme = customTheme;
      this.activeTheme = customTheme;
    }

    const theme = this.getTheme(config.theme || 'dark', root);
    this.removeExistingStyleElement();
    const styleElement = this.createStyleElement();
    this.document.head.appendChild(styleElement);

    const cssVariables = this.generateCssVariables(theme, config, root);
    styleElement.innerHTML = `:root {\n${cssVariables}}`;
  }

  private getTheme(theme: string, root: HTMLElement): ZapTheme {
    if (this.isBrowser) {
      const getColor = (colorVar: string, fallback: string): HexCode => {
        const themeAttribute = this.document.documentElement.getAttribute('data-theme');
        const themeSelector = themeAttribute ? `[data-theme="${themeAttribute}"]` : ':root';
        
  //FIXME: THis is currently working with :root level colors but not data-theme level colors        
        return convertColorToHex(
          getComputedStyle(this.document.querySelector(themeSelector) as Element)
        .getPropertyValue(colorVar)
        .trim() || fallback
        ) as `#${string}`;
      };

      //FIXME: Currently all of this is only working with dark theme, we need to make the dynamic based on active theme

      const allColors: { [key in keyof typeof darkTheme.colors]: HexCode } = {
        primary: getColor('--zap-color-primary', darkTheme.colors.primary),
        secondary: getColor(
          '--zap-color-secondary',
          darkTheme.colors.secondary
        ),
        tertiary: getColor('--zap-color-tertiary', darkTheme.colors.tertiary),
        quaternary: getColor(
          '--zap-color-quaternary',
          darkTheme.colors.quaternary
        ),
        info: getColor('--zap-color-info', darkTheme.colors.info),
        success: getColor('--zap-color-success', darkTheme.colors.success),
        warning: getColor('--zap-color-warning', darkTheme.colors.warning),
        error: getColor('--zap-color-error', darkTheme.colors.error),
        infoText: getColor('--zap-color-info-text', darkTheme.colors.infoText),
        successText: getColor(
          '--zap-color-success-text',
          darkTheme.colors.successText
        ),
        warningText: getColor(
          '--zap-color-warning-text',
          darkTheme.colors.warningText
        ),
        errorText: getColor(
          '--zap-color-error-text',
          darkTheme.colors.errorText
        ),
      };

      //FIXME: once above is fixed we can return
      // return {
      //   colors: allColors,
      //   fontSize: darkTheme.fontSize,
      // };
    }
    if (theme === 'light') {
      return lightTheme;
    } else if (theme === 'dark') {
      return darkTheme;
    } else if (this.config.themeLibrary) {
      return this.config.themeLibrary[theme];
    } else {
      return darkTheme;
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
    cssVariables += generateColorVariables(theme, root); // generates galobal color variables like primary, secondary, etc
    cssVariables += generateFontSizeVariables(theme); // generates global font size variables
    cssVariables += generateGlobalStylesVariables(theme, root, this.platformId); // generates global styles for all components this will be replace by css styles if passed

    if (config.components) {
      for (const [componentKey, value] of Object.entries(config.components)) {
        switch (componentKey) {
          case 'global':
            // handles global shape for the component
            cssVariables += generateComponentGlobalVariables(value, root);
            break;
          case 'alert':
            // handles shape and size for the alert component
            cssVariables += generateComponentAlertVariables(
              value as AlertConfig,
              root
            );
            break;
          case 'button':
            // handles shape and size for the button component
            cssVariables += generateComponentButtonVariables(
              value as ButtonConfig,
              root
            );
            break;
          case 'chip':
            // handles shape and size for the chip component
            cssVariables += generateComponentChipVariables(
              value as ChipConfig,
              root
            );
            break;
          case 'dialog':
            // handles shape and size for the dialog component
            cssVariables += generateComponentDialogVariables(
              value as DialogConfig,
              root
            );
            break;
          case 'modal':
            // handles shape and size for the modal component
            cssVariables += generateComponentModalVariables(
              value as ModalConfig,
              root
            );
            break;
          case 'input':
            // handles shape and size for the input component
            cssVariables += generateComponentInputVariables(
              value as InputConfig,
              root
            );
            break;
          case 'checkbox':
            // handles shape and size for the checkbox component
            cssVariables += generateComponentCheckboxVariables(
              value as InputConfig,
              root
            );
            break;
          case 'textarea':
            // handles shape and size for the textarea component
            cssVariables += generateComponentTextareaVariables(
              value as TextareaConfig,
              root
            );
            break;
          case 'select':
            // handles shape and size for the select component
            cssVariables += generateComponentSelectVariables(
              value as SelectConfig,
              root
            );
            break;
          case 'tooltip':
            // handles shape and size for the tooltip component
            cssVariables += generateComponentTooltipVariables(
              value as TooltipConfig,
              root
            );
            break;
          default:
            break;
        }

        // handle the global css styles for the component
        if (value.styles) {
          cssVariables += generateComponentStylesVariables(
            value.styles,
            componentKey,
            this.config
          );
        }
      }
    }

    return cssVariables;
  }
}
