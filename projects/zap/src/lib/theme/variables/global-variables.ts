import { GlobalConfig } from '../../interfaces/config.interface';
import { getShapeVariable } from './shape-variables';

export function generateComponentGlobalVariables(config: GlobalConfig): string {
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
    'tooltip',
    'dp-calendar',
    'date-picker',
    'dp-calendar-select',
    'toast',
  ];
  let cssVariables = '';

  for (const component of components) {
    const shapeValue = config.shape;

    if (shapeValue) {
      cssVariables += getShapeVariable(shapeValue, component);
    }
  }
  return cssVariables;
}
