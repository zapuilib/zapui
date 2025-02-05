import { InputConfig } from '../../interfaces/config.interface';
import { getExistingShapeFor, getShapeCssValues } from '../utils/shape-utils';

export function generateComponentInputVariables(
  value: InputConfig,
  root: HTMLElement
) {
  let cssVariables = '';
  const existingShape = getExistingShapeFor('input', root);
  const btnShapeValue = existingShape || value.shape || '';

  if (btnShapeValue) {
    const { shapeCssValue } = getShapeCssValues(btnShapeValue, 'input');
    cssVariables += `--zap-input-border-radius: ${shapeCssValue};\n`;
  }

  return cssVariables;
}

export function getDefaultInputSizeCssValues(): string {
  return `--zap-input-padding-left: 0.75rem;\n--zap-input-padding-right: 0.75rem;\n--zap-input-padding-top: 0.5rem;\n--zap-input-padding-bottom: 0.5rem;\n--zap-input-width: 100%;\n--zap-input-icon-font-size: 0.875rem;\n--zap-input-icon-line-height: auto;\n`;
}
