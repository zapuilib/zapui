import { ZapTheme } from '../../interfaces/config.interface';
import { convertColorToRgb, hexToRgb, toKebabCase } from './base-theme-utils';

export function generateColorVariables(theme: ZapTheme, root: HTMLElement): string {
  let cssVariables = '';

  Object.entries(theme.colors || {}).forEach(([key, value]) => {
    const kebabKey = toKebabCase(key);
    const existingColor = getExistingColor(root, kebabKey);
    const rgbValue = existingColor || hexToRgb(value);
    cssVariables += `--zap-color-${kebabKey}: ${rgbValue};\n`;
  });

  return cssVariables;
}

export function getExistingColor(root: HTMLElement, key: string): string {
  const existingColor = root.style.getPropertyValue(`--zap-color-${key}`).trim();
  return convertColorToRgb(existingColor);
}
