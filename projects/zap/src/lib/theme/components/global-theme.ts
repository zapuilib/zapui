import { GlobalConfig } from '../../interfaces/config.interface';
import { getExistingShapeFor, getShapeCssValues } from '../utils/shape-utils';

export function generateComponentGlobalVariables(
  config: GlobalConfig,
  root: HTMLElement
): string {
  const components = [
    'alert',
    'button',
    'chip',
    'dialog',
    'input',
    'modal',
    'checkbox',
    'radio',
    'textarea',
    'select',
  ];
  let cssVariables = '';
  let existingShape = '';

  for (const component of components) {
    const existingShapeValue = getExistingShapeFor(component, root);
    if (existingShapeValue) {
      existingShape = existingShapeValue;
    }
    const shapeValue = existingShape || config.shape;

    if (shapeValue) {
      const { shapeCssValue } = getShapeCssValues(shapeValue, component);
      cssVariables += `--zap-${component}-border-radius: ${shapeCssValue};\n`;
      if (component === 'dialog') {
        const { shapeCssValue } = getShapeCssValues(shapeValue, 'button');
        cssVariables += `--zap-dialog-primary-btn-border-radius: ${shapeCssValue};\n`;
        cssVariables += `--zap-dialog-secondary-btn-border-radius: ${shapeCssValue};\n`;
      }
      if (component === 'select') {
        if (shapeValue === 'pill') {
          cssVariables += `--zap-select-options-border-radius: 1.5rem;\n`;
        } else {
          cssVariables += `--zap-select-options-border-radius: ${shapeCssValue};\n`;
        }
        if(shapeValue === 'pill' || shapeValue === 'curve') { 
          cssVariables += `--zap-select-checkbox-border-radius: 0.25rem;\n`;
        } else {
          cssVariables += `--zap-select-checkbox-border-radius: ${shapeCssValue};\n`;
        }
        cssVariables += `--zap-select-chip-border-radius: ${shapeCssValue};\n`;
      }
    }
  }
  return cssVariables;
}
