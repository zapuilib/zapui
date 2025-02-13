import { InputConfig } from '../../interfaces/config.interface';
import { getExistingShapeFor, getShapeCssValues } from '../utils/shape-utils';

export function generateComponentInputVariables(
  value: InputConfig,
  root: HTMLElement
) {
  let cssVariables = '';
  const existingSize = getExistingInputSize(root);
  const inputSizeValue = existingSize || value.size;
  const existingShape = getExistingShapeFor('input', root);
  const inputShapeValue = existingShape || value.shape || '';

  if (inputShapeValue) {
    const { shapeCssValue } = getShapeCssValues(inputShapeValue, 'input');
    cssVariables += `--zap-input-border-radius: ${shapeCssValue};\n`;
  }

    if (inputSizeValue) {
      cssVariables += getInputSizeCssValues(inputSizeValue, root);
    } else {
      cssVariables += getDefaultInputSizeCssValues();
    }

  return cssVariables;
}

export function getInputSizeCssValues(inputSizeValue: string, root: HTMLElement): string {
  let cssVariables = '';

  if (inputSizeValue === 'compact') {
    cssVariables += `--zap-input-padding-left: 0.5rem;\n`;
    cssVariables += `--zap-input-padding-right: 0.5rem;\n`;
    cssVariables += `--zap-input-padding-top: 0.375rem;\n`;
    cssVariables += `--zap-input-padding-bottom: 0.375rem;\n`;
    cssVariables += `--zap-input-icon-font-size: 0.875rem;\n`;
  } else {
    cssVariables += getDefaultInputSizeCssValues();
  }

  return cssVariables;
}

export function getExistingInputSize(root: HTMLElement): string {
  if (typeof window !== 'undefined') {
    return getComputedStyle(root).getPropertyValue(`--zap-input-size`).trim();
  }
  return '';
}

export function getDefaultInputSizeCssValues(): string {
  return `--zap-input-padding-left: 0.75rem;\n--zap-input-padding-right: 0.75rem;\n--zap-input-padding-top: 0.5rem;\n--zap-input-padding-bottom: 0.5rem;\n--zap-input-width: 100%;\n--zap-input-icon-font-size: 1rem;\n--zap-input-icon-line-height: auto;\n--zap-input-help-text-font-size: 0.875rem;\n`;
}
