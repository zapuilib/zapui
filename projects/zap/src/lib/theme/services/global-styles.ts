import { getDefaultAlertSizeCssValues } from '../components/alert-theme';
import { getDefaultBadgeSizeCssValues } from '../components/badge-theme';
import { getDefaultButtonSizeCssValues } from '../components/button-theme';
import { ZapTheme } from '../../interfaces/config.interface';
import { hexToRgba } from '../utils/base-theme-utils';
import { getDefaultChipSizeCssValues } from '../components/chip-theme';
import { getDefaultDialogSizeCssValues } from '../components/dialog-theme';
import { getDefaultModalSizeCssValues } from '../components/modal-theme';
import { getDefaultInputSizeCssValues } from '../components/input-theme';
import { getDefaultCheckboxSizeCssValues } from '../components/checkbox-theme';

/**
 * This function generates the global styles for the all the components
 * @param theme
 * @param root
 * @returns
 */
export function generateGlobalStylesVariables(
  theme: ZapTheme,
  root: HTMLElement
): string {
  let cssVariables = '';
  const styles = {
    alert: [
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
        label: 'dismiss-color',
        value: theme.colors.primary,
      },
      {
        label: 'dismiss-hover-color',
        value: hexToRgba(theme.colors.primary, 0.7),
      },
    ],
    badge: [
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
        label: 'border-radius',
        value: 'calc(infinity * 1px)',
      },
    ],
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
        value: hexToRgba(theme.colors.tertiary, 0.9),
      },
      {
        label: 'text-hover-color',
        value: hexToRgba(theme.colors.primary, 0.9),
      },
      {
        label: 'border-hover-color',
        value: hexToRgba(theme.colors.tertiary, 0),
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
        value: hexToRgba(theme.colors.tertiary, 0.5),
      },
      {
        label: 'disabled-text-color',
        value: hexToRgba(theme.colors.primary, 0.5),
      },
      {
        label: 'disabled-border-color',
        value: hexToRgba(theme.colors.tertiary, 0),
      },
    ],
    chip: [
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
        value: theme.colors.tertiary,
      },
      {
        label: 'text-hover-color',
        value: theme.colors.primary,
      },
      {
        label: 'border-hover-color',
        value: theme.colors.tertiary,
      },
      {
        label: 'dismiss-color',
        value: theme.colors.primary,
      },
      {
        label: 'dismiss-hover-color',
        value: hexToRgba(theme.colors.primary, 0.7),
      },
    ],
    dialog: [
      {
        label: 'bg-color',
        value: theme.colors.primary,
      },
      {
        label: 'border-color',
        value: hexToRgba(theme.colors.secondary, 0.1),
      },
      {
        label: 'text-color',
        value: theme.colors.secondary,
      },
      {
        label: 'title-color',
        value: theme.colors.secondary,
      },
      {
        label: 'dismiss-color',
        value: theme.colors.secondary,
      },
      {
        label: 'dismiss-hover-color',
        value: hexToRgba(theme.colors.secondary, 0.7),
      },
      {
        label: 'primary-btn-bg-color',
        value: theme.colors.error,
      },
      {
        label: 'primary-btn-border-color',
        value: theme.colors.error,
      },
      {
        label: 'primary-btn-text-color',
        value: theme.colors.primary,
      },
      {
        label: 'primary-btn-bg-hover-color',
        value: hexToRgba(theme.colors.error, 0.9),
      },
      {
        label: 'primary-btn-border-hover-color',
        value: hexToRgba(theme.colors.error, 0.9),
      },
      {
        label: 'primary-btn-text-hover-color',
        value: hexToRgba(theme.colors.primary, 0.9),
      },
      {
        label: 'secondary-btn-bg-color',
        value: 'transparent',
      },
      {
        label: 'secondary-btn-border-color',
        value: hexToRgba(theme.colors.secondary, 0.15),
      },
      {
        label: 'secondary-btn-text-color',
        value: theme.colors.secondary,
      },
      {
        label: 'secondary-btn-bg-hover-color',
        value: 'transparent',
      },
      {
        label: 'secondary-btn-border-hover-color',
        value: hexToRgba(theme.colors.secondary, 0.2),
      },
      {
        label: 'secondary-btn-text-hover-color',
        value: hexToRgba(theme.colors.secondary, 0.8),
      },
    ],
    modal: [
      {
        label: 'bg-color',
        value: theme.colors.primary,
      },
      {
        label: 'border-color',
        value: hexToRgba(theme.colors.secondary, 0.1),
      },
      {
        label: 'text-color',
        value: theme.colors.secondary,
      },
      {
        label: 'dismiss-color',
        value: theme.colors.secondary,
      },
      {
        label: 'dismiss-hover-color',
        value: hexToRgba(theme.colors.secondary, 0.7),
      },
    ],
    input: [
      {
        label: 'bg-color',
        value: 'transparent',
      },
      {
        label: 'border-color',
        value: theme.colors.secondary,
      },
      {
        label: 'text-color',
        value: theme.colors.secondary,
      },
      {
        label: 'placeholder-color',
        value: hexToRgba(theme.colors.secondary, 0.5),
      },
      {
        label: 'border-focus-color',
        value: theme.colors.secondary,
      },
      {
        label: 'icon-color',
        value: hexToRgba(theme.colors.secondary, 0.5),
      },
    ],
    checkbox: [
      {
        label: 'bg-color',
        value: 'transparent',
      },
      {
        label: 'border-color',
        value: theme.colors.secondary,
      },
      {
        label: 'text-color',
        value: theme.colors.secondary,
      },
      {
        label: 'bg-checked-color',
        value: theme.colors.secondary,
      },
      {
        label: 'text-checked-color',
        value: theme.colors.primary,
      },
      {
        label: 'bg-focus-color',
        value: theme.colors.secondary,
      },
      {
        label: 'text-focus-color',
        value: theme.colors.primary,
      },
      {
        label: 'border-focus-color',
        value: theme.colors.secondary,
      },
      
    ],
  };

  for (const [component, stylesArray] of Object.entries(styles)) {
    for (const style of stylesArray) {
      const existingStyle = root.style
        .getPropertyValue(`--zap-${component}-${style['label']}`)
        .trim();
      const styleExist = existingStyle || style['value'];
      cssVariables += `--zap-${component}-${style['label']}: ${styleExist};\n`;
    }
  }

  cssVariables += getDefaultAlertSizeCssValues();
  cssVariables += getDefaultBadgeSizeCssValues();
  cssVariables += getDefaultButtonSizeCssValues();
  cssVariables += getDefaultChipSizeCssValues();
  cssVariables += getDefaultDialogSizeCssValues();
  cssVariables += getDefaultModalSizeCssValues();
  cssVariables += getDefaultInputSizeCssValues();
  cssVariables += getDefaultCheckboxSizeCssValues();

  return cssVariables;
}
