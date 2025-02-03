import { ZapTheme } from '../../interfaces/config.interface';
import { getDefaultButtonSizeCssValues } from '../components/button-theme';
import { hexToRgba } from '../utils/base-theme-utils';

/**
 * This function generates the global styles for the all the components
 * @param theme
 * @param root
 * @returns
 */
export function generateGlobalStylesVariables(
  theme: ZapTheme,
  root: HTMLElement,
  isBrowser: boolean
): string {
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
  };

  for (const [component, stylesArray] of Object.entries(styles)) {
    for (const style of stylesArray) {
      if (isBrowser) {
        const existingStyle = getComputedStyle(root)
          .getPropertyValue(`--zap-${component}-${style['label']}`)
          .trim();
        const styleExist = existingStyle || style['value'];
        cssVariables += `--zap-${component}-${style['label']}: ${styleExist};\n`;
      }
    }
  }

  cssVariables += getDefaultButtonSizeCssValues();

  return cssVariables;
}
