import { ChipConfig } from '../../interfaces';
import { getExistingShapeFor, getShapeCssValues } from '../utils/shape-utils';

/**
 * This function generates the css variables for the chip component
 * @param value - ChipConfig
 * @param root - HTMLElement
 * @returns string
 */
export function generateComponentChipVariables(
  value: ChipConfig,
  root: HTMLElement
) {
  let cssVariables = '';
  const chipSizeValue = value.size;
  const chipShapeValue = value.shape;

  // this handles the shape, size of the chip component
  if (chipShapeValue) {
    const { shapeCssValue } = getShapeCssValues(chipShapeValue, 'chip');    
    cssVariables += `--zap-chip-border-radius: ${shapeCssValue};\n`;
  }

  if (chipSizeValue) {
    cssVariables += getChipSizeCssValues(chipSizeValue, root);
  } else {
    cssVariables += getDefaultChipSizeCssValues();
  }

  return cssVariables;
}

export function getChipSizeCssValues(
  chipSizeValue: string,
  root: HTMLElement
): string {
  let cssVariables = '';

  if (chipSizeValue === 'compact') {
    cssVariables += `--zap-chip-padding-left: 0.75rem;\n`;
    cssVariables += `--zap-chip-padding-right: 0.75rem;\n`;
    cssVariables += `--zap-chip-padding-top: 0.25rem;\n`;
    cssVariables += `--zap-chip-padding-bottom: 0.25rem;\n`;
    cssVariables += `--zap-chip-font-size: 0.75rem;\n`;
    const existingFontSize = getExistingFontSize(root);
    const chipTextSizeValue = existingFontSize || '0.75rem';
    cssVariables += `--zap-chip-font-size: ${chipTextSizeValue};\n`;
  } else if (chipSizeValue === 'wide') {
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

export function getExistingFontSize(root: HTMLElement): string {
  return root.style.getPropertyValue(`--zap-font-size-sm`).trim();
}
