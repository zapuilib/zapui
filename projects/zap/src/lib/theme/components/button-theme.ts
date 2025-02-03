import { ButtonConfig } from '../../interfaces/config.interface';
import { getExistingShapeFor, getShapeCssValues } from '../utils/shape-utils';

/**
 * This function generates the css variables for the button component
 * @param value - ButtonConfig
 * @param root - HTMLElement
 * @returns string
 */
export function generateComponentButtonVariables(
  value: ButtonConfig,
  root: HTMLElement,
  isBrowser: boolean
) {
  let cssVariables = '';
  const existingSize = getExistingButtonSize(root, isBrowser);
  const existingShape = getExistingShapeFor('button', root, isBrowser);
  const btnSizeValue = existingSize || value.size;
  const btnShapeValue = existingShape || value.shape || '';

  // this handles the shape, size of the button component
  if (btnShapeValue) {
    const { shapeCssValue } = getShapeCssValues(btnShapeValue, 'button');
    cssVariables += `--zap-button-border-radius: ${shapeCssValue};\n`;
  }

  if (btnSizeValue) {
    cssVariables += getButtonSizeCssValues(btnSizeValue, root, isBrowser);
  } else {
    cssVariables += getDefaultButtonSizeCssValues();
  }

  return cssVariables;
}

export function getExistingButtonSize(
  root: HTMLElement,
  isBrowser?: boolean
): string {
  if (isBrowser) {
    return getComputedStyle(root).getPropertyValue('--zap-button-size').trim();
  }
  return '';
}

export function getButtonSizeCssValues(
  btnSizeValue: string,
  root: HTMLElement,
  isBrowser: boolean
): string {
  let cssVariables = '';

  if (btnSizeValue === 'compact') {
    cssVariables += `--zap-button-padding-left: 0.75rem;\n`;
    cssVariables += `--zap-button-padding-right: 0.75rem;\n`;
    cssVariables += `--zap-button-padding-top: 0.25rem;\n`;
    cssVariables += `--zap-button-padding-bottom: 0.25rem;\n`;
    cssVariables += `--zap-button-font-size: 1rem;\n`;
  } else if (btnSizeValue === 'tight') {
    cssVariables += `--zap-button-padding-left: 0.5rem;\n`;
    cssVariables += `--zap-button-padding-right: 0.5rem;\n`;
    cssVariables += `--zap-button-padding-top: 0.25rem;\n`;
    cssVariables += `--zap-button-padding-bottom: 0.25rem;\n`;
    const existingFontSize = getExistingFontSize(root, isBrowser);
    const btnTextSizeValue = existingFontSize || '0.875rem';
    cssVariables += `--zap-button-font-size: ${btnTextSizeValue};\n`;
  } else if (btnSizeValue === 'wide') {
    cssVariables += `--zap-button-padding-left: 1rem;\n`;
    cssVariables += `--zap-button-padding-right: 1rem;\n`;
    cssVariables += `--zap-button-padding-top: 0.5rem;\n`;
    cssVariables += `--zap-button-padding-bottom: 0.5rem;\n`;
    cssVariables += `--zap-button-width: 100%;\n`;
  } else {
    cssVariables += getDefaultButtonSizeCssValues();
  }

  return cssVariables;
}

export function getDefaultButtonSizeCssValues(): string {
  return `--zap-button-padding-left: 1rem;\n--zap-button-padding-right: 1rem;\n--zap-button-padding-top: 0.5rem;\n--zap-button-padding-bottom: 0.5rem;\n--zap-button-font-size: 1rem;\n`;
}

export function getExistingFontSize(
  root: HTMLElement,
  isBrowser: boolean
): string {
  if (isBrowser) {
    return getComputedStyle(root).getPropertyValue('--zap-font-size-sm').trim();
  }
  return '';
}
