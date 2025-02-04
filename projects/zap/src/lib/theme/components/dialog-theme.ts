import { DialogConfig } from '../../interfaces/config.interface';
import { getExistingShapeFor, getShapeCssValues } from '../utils/shape-utils';

export function generateComponentDialogVariables(
  value: DialogConfig,
  root: HTMLElement
) {
  let cssVariables = '';
  const existingShape = getExistingShapeFor('dialog', root);
  const btnShapeValue = existingShape || value.shape || '';

  if (btnShapeValue) {
    const { shapeCssValue } = getShapeCssValues(btnShapeValue, 'dialog');
    cssVariables += `--zap-dialog-border-radius: ${shapeCssValue};\n`;
  }

  return cssVariables;
}

export function getDefaultDialogSizeCssValues(): string {
  return `--zap-dialog-padding-left: 1.25rem;\n--zap-dialog-padding-right: 1.25rem;\n--zap-dialog-padding-top: 1.25rem;\n--zap-dialog-padding-bottom: 1.25rem;\n--zap-dialog-title-font-size: 1.25rem;\n--zap-dialog-title-font-weight: 600;\n--zap-dialog-dismiss-font-size: 0.875rem;\n--zap-dialog-font-size: 1rem;\n--zap-dialog-dismiss-font-weight: 600;\n--zap-dialog-font-weight: 400;\n`;
}
