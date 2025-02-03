import { ZapTheme } from '../../interfaces/config.interface';
import { convertColorToRgb, hexToRgb, toKebabCase } from './base-theme-utils';

export function generateColorVariables(
  theme: ZapTheme,
  root: HTMLElement,
  isBrowser: boolean
): string {
  let cssVariables = '';

  Object.entries(theme.colors || {}).forEach(([key, value]) => {
    const kebabKey = toKebabCase(key);
    const existingColor = getExistingColor(root, kebabKey, isBrowser);
    const rgbValue = existingColor || hexToRgb(value);
    cssVariables += `--zap-color-${kebabKey}: ${rgbValue};\n`;
  });

  return cssVariables;
}

export function getExistingColor(
  root: HTMLElement,
  key: string,
  isBrowser: boolean
): string {
  if (isBrowser) {
    const existingColor = getComputedStyle(root)
      .getPropertyValue(`--zap-color-${key}`)
      .trim();
    return convertColorToRgb(existingColor);
  }
  return '';
}
