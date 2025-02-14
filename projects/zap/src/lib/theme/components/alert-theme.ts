import { AlertConfig } from "../../interfaces";
import { getExistingShapeFor, getShapeCssValues } from "../utils/shape-utils";

export function generateComponentAlertVariables(
  value: AlertConfig,
  root: HTMLElement,
) {
  let cssVariables = '';
  const existingShape = getExistingShapeFor('alert', root);
  const alertShapeValue = existingShape || value.shape || '';

  // this handles the shape, size of the alert component
  if (alertShapeValue) {
    const { shapeCssValue } = getShapeCssValues(alertShapeValue, 'alert');
    cssVariables += `--zap-alert-border-radius: ${shapeCssValue};\n`;
  }

  return cssVariables;
}


export function getDefaultAlertSizeCssValues(): string {
  return `--zap-alert-padding-left: 1rem;\n--zap-alert-padding-right: 1rem;\n--zap-alert-padding-top: 1rem;\n--zap-alert-padding-bottom: 1rem;\n--zap-alert-font-size: 1rem;\n--zap-alert-icon-height: 1rem;\n--zap-alert-icon-width: 1rem;\n`;
}