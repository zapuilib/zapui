import { InputConfig } from '../../interfaces/config.interface';
import { getExistingShapeFor, getShapeCssValues } from '../utils/shape-utils';

export function generateComponentInputVariables(
  value: InputConfig,
  root: HTMLElement
) {
  let cssVariables = '';
  const existingSize = getExistingInputSize(root);
  const btnSizeValue = existingSize || value.size;
  const existingShape = getExistingShapeFor('input', root);
  const btnShapeValue = existingShape || value.shape || '';

  if (btnShapeValue) {
    const { shapeCssValue } = getShapeCssValues(btnShapeValue, 'input');
    cssVariables += `--zap-input-border-radius: ${shapeCssValue};\n`;
  }

    if (btnSizeValue) {
      cssVariables += getInputSizeCssValues(btnSizeValue, root);
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
  } else {
    cssVariables += getDefaultInputSizeCssValues();
  }

  return cssVariables;
}

export function getExistingInputSize(root: HTMLElement): string {
  return root.style.getPropertyValue(`--zap-input-size`).trim();
}

export function getDefaultInputSizeCssValues(): string {
  return `--zap-input-padding-left: 0.75rem;\n--zap-input-padding-right: 0.75rem;\n--zap-input-padding-top: 0.5rem;\n--zap-input-padding-bottom: 0.5rem;\n--zap-input-width: 100%;\n--zap-input-icon-font-size: 0.875rem;\n--zap-input-icon-line-height: auto;\n`;
}
