import { ModalConfig } from '../../interfaces/config.interface';
import { getExistingShapeFor, getShapeCssValues } from '../utils/shape-utils';

export function generateComponentModalVariables(
  value: ModalConfig,
  root: HTMLElement
) {
  let cssVariables = '';
  const existingShape = getExistingShapeFor('modal', root);
  const btnShapeValue = existingShape || value.shape || '';

  if (btnShapeValue) {
    const { shapeCssValue } = getShapeCssValues(btnShapeValue, 'modal');
    cssVariables += `--zap-modal-border-radius: ${shapeCssValue};\n`;
  }

  return cssVariables;
}

export function getDefaultModalSizeCssValues(): string {
  return `--zap-modal-padding-left: 1.25rem;\n--zap-modal-padding-right: 1.25rem;\n--zap-modal-padding-top: 1.25rem;\n--zap-modal-padding-bottom: 1.25rem;\n--zap-modal-dismiss-font-size: 1rem;\n--zap-modal-dismiss-font-weight: 400;\n--zap-modal-max-width: 100%;\n`;
}
