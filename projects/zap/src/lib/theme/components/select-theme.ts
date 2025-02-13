import { SelectConfig } from '../../interfaces/config.interface';
import { getExistingShapeFor, getShapeCssValues } from '../utils/shape-utils';

export function generateComponentSelectVariables(
  value: SelectConfig,
  root: HTMLElement
) {
  let cssVariables = '';
  const existingSize = getExistingSelectSize(root);
  const selectSizeValue = existingSize || value.size;
  const existingShape = getExistingShapeFor('select', root);
  const selectShapeValue = existingShape || value.shape || '';

  if (selectShapeValue) {
    const { shapeCssValue } = getShapeCssValues(selectShapeValue, 'select');
    cssVariables += `--zap-select-border-radius: ${shapeCssValue};\n`;
    if (selectShapeValue === 'pill') {
      cssVariables += `--zap-select-options-border-radius: 1.5rem;\n`;
    } else {
      cssVariables += `--zap-select-options-border-radius: ${shapeCssValue};\n`;
    }
    if (selectShapeValue === 'pill' || selectShapeValue === 'curve') {
      cssVariables += `--zap-select-checkbox-border-radius: 0.25rem;\n`;
    } else {
      cssVariables += `--zap-select-checkbox-border-radius: ${shapeCssValue};\n`;
    }
    cssVariables += `--zap-select-chip-border-radius: ${shapeCssValue};\n`;
  }

  if (selectSizeValue) {
    cssVariables += getSelectSizeCssValues(selectSizeValue, root);
  } else {
    cssVariables += getDefaultSelectSizeCssValues();
  }

  return cssVariables;
}

export function getSelectSizeCssValues(
  selectSizeValue: string,
  root: HTMLElement
): string {
  let cssVariables = '';

  if (selectSizeValue === 'compact') {
    cssVariables += `--zap-select-padding-left: 0.5rem;\n`;
    cssVariables += `--zap-select-padding-right: 0.5rem;\n`;
    cssVariables += `--zap-select-padding-top: 0.375rem;\n`;
    cssVariables += `--zap-select-padding-bottom: 0.375rem;\n`;
    cssVariables += `--zap-select-font-size: 0.375rem;\n`;
    cssVariables +' `--zap-select-icon-font-size: 0.875rem;\n';
    
  } else {
    cssVariables += getDefaultSelectSizeCssValues();
  }

  return cssVariables;
}

export function getExistingSelectSize(root: HTMLElement): string {
  if (typeof window !== 'undefined') {
    return getComputedStyle(root).getPropertyValue(`--zap-select-size`).trim();
  }
  return '';
}

export function getDefaultSelectSizeCssValues(): string {
  return `
        --zap-select-padding-left: 0.75rem;
        --zap-select-padding-right: 1.325rem;
        --zap-select-padding-top: 0.5rem;
        --zap-select-padding-bottom: 0.5rem;
        --zap-select-search-padding-left: 2.25rem;
        --zap-select-search-padding-right: 0.5rem;
        --zap-select-search-padding-top: 0.5rem;
        --zap-select-search-padding-bottom: 0.5rem;
        --zap-select-font-size: 0.5rem;
        --zap-select-option-padding-left: 0.75rem;
        --zap-select-option-padding-right: 0.75rem;
        --zap-select-option-padding-top: 0.5rem;
        --zap-select-option-padding-bottom: 0.5rem;
        --zap-select-chip-padding-left: 0.5rem;
        --zap-select-chip-padding-right: 1.25rem;
        --zap-select-chip-padding-top: 0.12rem;
        --zap-select-chip-padding-bottom: 0.12rem;
        --zap-select-chip-font-size: 0.875rem;
        --zap-select-chip-dismiss-font-size: 0.75rem;
        --zap-select-checkbox-width: 1.25rem;
        --zap-select-checkbox-height: 1.25rem;
        --zap-select-checkbox-padding-left: 0.5rem;
        --zap-select-checkbox-padding-right: 0.5rem;
        --zap-select-checkbox-padding-top: 0.25rem;
        --zap-select-checkbox-padding-bottom: 0.25rem;
        --zap-select-checkbox-border-width: 0.125rem;
        --zap-select-help-text-font-size: 0.875rem;
        --zap-select-icon-font-size: 1rem;
    `;
}
