import { TextareaConfig } from '../../interfaces';
import {  getShapeCssValues } from '../utils/shape-utils';

export function generateComponentTextareaVariables(
  value: TextareaConfig,
  root: HTMLElement
) {
  let cssVariables = '';
  const textareaShapeValue = value.shape;

  if (textareaShapeValue) {
    const { shapeCssValue } = getShapeCssValues(textareaShapeValue, 'textarea');
    cssVariables += `--zap-textarea-border-radius: ${shapeCssValue};\n`;
  }

  return cssVariables;
}

export function getDefaultTextareaSizeCssValues(): string {
  return `--zap-textarea-padding-left: 0.75rem;\n--zap-textarea-padding-right: 0.75rem;\n--zap-textarea-padding-top: 0.5rem;\n--zap-textarea-padding-bottom: 0.5rem;\n--zap-textarea-width: 100%;\n--zap-textarea-icon-font-size: 0.875rem;\n--zap-textarea-icon-line-height: auto;\n--zap-textarea-help-text-font-size: 0.875rem;\n`;
}
