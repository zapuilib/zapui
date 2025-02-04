import { ChipConfig } from '../../interfaces/config.interface';
import { getExistingShapeFor, getShapeCssValues } from '../utils/shape-utils';

/**
 * This function generates the css variables for the chip component
 * @param value - ChipConfig
 * @param root - HTMLElement
 * @returns string
 */
export function generateComponentChipVariables(
  value: ChipConfig,
  root: HTMLElement,
) {
  let cssVariables = '';
  const existingSize = getExistingChipSize(root);
  const existingShape = getExistingShapeFor('chip', root);
  const btnSizeValue = existingSize || value.size;
  const btnShapeValue = existingShape || value.shape || '';

  // this handles the shape, size of the chip component
  if (btnShapeValue) {
    const { shapeCssValue } = getShapeCssValues(btnShapeValue, 'chip');
    cssVariables += `--zap-chip-border-radius: ${shapeCssValue};\n`;
  }

  if (btnSizeValue) {
    cssVariables += getChipSizeCssValues(btnSizeValue, root);
  } else {
    cssVariables += getDefaultChipSizeCssValues();
  }

  return cssVariables;
}

export function getExistingChipSize(
  root: HTMLElement
): string {
    return root.style.getPropertyValue(`--zap-chip-size`).trim();
}

export function getChipSizeCssValues(
  btnSizeValue: string,
  root: HTMLElement,
): string {
  let cssVariables = '';

  if (btnSizeValue === 'compact') {
    cssVariables += `--zap-chip-padding-left: 0.75rem;\n`;
    cssVariables += `--zap-chip-padding-right: 0.75rem;\n`;
    cssVariables += `--zap-chip-padding-top: 0.25rem;\n`;
    cssVariables += `--zap-chip-padding-bottom: 0.25rem;\n`;
    cssVariables += `--zap-chip-font-size: 1rem;\n`;
    const existingFontSize = getExistingFontSize(root);
    const btnTextSizeValue = existingFontSize || '0.75rem';
    cssVariables += `--zap-chip-font-size: ${btnTextSizeValue};\n`;
  } else if (btnSizeValue === 'wide') {
    cssVariables += `--zap-chip-padding-left: 1rem;\n`;
    cssVariables += `--zap-chip-padding-right: 1rem;\n`;
    cssVariables += `--zap-chip-width: 100%;\n`;
  } else {
    cssVariables += getDefaultChipSizeCssValues();
  }

  return cssVariables;
}

export function getDefaultChipSizeCssValues(): string {
  return `--zap-chip-padding-left: 0.75rem;\n--zap-chip-padding-right: 0.75rem;\n--zap-chip-padding-top: 0.25rem;\n--zap-chip-padding-bottom: 0.25rem;\n--zap-chip-font-size: 0.875rem;\n`;
}

export function getExistingFontSize(
  root: HTMLElement,
): string {

    return root.style.getPropertyValue(`--zap-font-size-sm`).trim();

}
