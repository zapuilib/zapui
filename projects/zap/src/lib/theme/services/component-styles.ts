import { HexCode } from '../../interfaces';
import { toKebabCase } from '../utils/base-theme-utils';
import { handlePaddingStyles } from '../utils/padding-utils';

interface ComponentStyles {
  colors?: {
    [theme: string]: {
      [key: string]: HexCode;
    };
  };
  padding?: string;
}

export function generateComponentStylesVariables(
  styles: ComponentStyles,
  componentKey: string,
  config: any
): string {
  let cssVariables = '';
  Object.entries(styles).forEach(([styleKey, styleValue]) => {
    if ((styleKey === 'padding'  && typeof styleValue === 'string') || (styleKey.endsWith('Padding') && typeof styleValue === 'string')) {
      cssVariables += handlePaddingStyles(componentKey, styleValue);
    } else if (styleKey === 'colors' && config.theme) {
      if (typeof styleValue === 'object' && styleValue[config.theme]) {
        Object.entries(styleValue[config.theme]).forEach(
          ([colorKey, colorValue]) => {
            cssVariables += `--zap-${componentKey}-${toKebabCase(
              colorKey
            )}: ${colorValue};\n`;
          }
        );
      }
    } else {
      cssVariables += `--zap-${componentKey}-${toKebabCase(
        styleKey
      )}: ${styleValue};\n`;
    }
  });
  return cssVariables;
}
