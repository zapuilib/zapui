import { HexCode, Padding, ZapConfig } from '../../interfaces';
import { toKebabCase } from '../utils/base-theme-utils';
import { handlePaddingStyles } from '../utils/padding-utils';

interface ComponentStyles {
  colors?: Record<string, Record<string, HexCode>>;
  padding?: Padding;
}

export function generateComponentStylesVariables(
  styles: ComponentStyles,
  componentKey: string,
  config: ZapConfig,
): string {
  let cssVariables = '';
  Object.entries(styles).forEach(([styleKey, styleValue]) => {
    if (
      (styleKey === 'padding' && typeof styleValue === 'string') ||
      (styleKey.endsWith('Padding') && typeof styleValue === 'string')
    ) {
      cssVariables += handlePaddingStyles(componentKey, styleKey, styleValue as Padding);
    } else if (styleKey === 'colors' && config.theme) {
      if (typeof styleValue === 'object' && styleValue[config.theme]) {
        Object.entries(styleValue[config.theme]).forEach(([colorKey, colorValue]) => {
          cssVariables += `--zap-${componentKey}-${toKebabCase(colorKey)}: ${colorValue};\n`;
        });
      }
    } else {
      cssVariables += `--zap-${componentKey}-${toKebabCase(styleKey)}: ${styleValue};\n`;
    }
  });
  return cssVariables;
}
