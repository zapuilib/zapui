import { ZapTheme } from '../../interfaces/config.interface';

export function generateFontSizeVariables(theme: ZapTheme): string {
  let cssVariables = '';

  Object.entries(theme.fontSize || {}).forEach(([key, value]) => {
    cssVariables += `--zap-font-size-${key}: ${value};\n`;
  });

  return cssVariables;
}
