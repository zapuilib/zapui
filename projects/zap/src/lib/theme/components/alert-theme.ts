import { AlertConfig } from "../../interfaces/config.interface";
import { getExistingShapeFor, getShapeCssValues } from "../utils/shape-utils";

export function generateComponentAlertVariables(
  value: AlertConfig,
  root: HTMLElement,
) {
  let cssVariables = '';
  const existingShape = getExistingShapeFor('alert', root);
  const btnShapeValue = existingShape || value.shape || '';

  // this handles the shape, size of the alert component
  if (btnShapeValue) {
    const { shapeCssValue } = getShapeCssValues(btnShapeValue, 'alert');
    cssVariables += `--zap-alert-border-radius: ${shapeCssValue};\n`;
  }

  return cssVariables;
}


export function getDefaultAlertSizeCssValues(): string {
  return `--zap-alert-padding-left: 1rem;\n--zap-alert-padding-right: 1rem;\n--zap-alert-padding-top: 1rem;\n--zap-alert-padding-bottom: 1rem;\n--zap-alert-font-size: 1rem;\n`;
}