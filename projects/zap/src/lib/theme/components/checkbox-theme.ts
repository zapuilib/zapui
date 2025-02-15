import { CheckboxConfig } from "../../interfaces";
import { getExistingShapeFor, getShapeCssValues } from "../utils/shape-utils";

export function generateComponentCheckboxVariables(
  value: CheckboxConfig,
  root: HTMLElement
) {
  let cssVariables = '';
  const checkboxShapeValue = value.shape;

  if (checkboxShapeValue) {
    const { shapeCssValue } = getShapeCssValues(checkboxShapeValue, 'checkbox');
    cssVariables += `--zap-checkbox-border-radius: ${shapeCssValue};\n`;
  }

  return cssVariables;
}

export function getDefaultCheckboxSizeCssValues(): string {
    return `--zap-checkbox-width: 1.25rem;\n--zap-checkbox-height: 1.25rem;\n--zap-checkbox-padding-left: 0.5rem;\n--zap-checkbox-padding-right: 0.5rem;\n--zap-checkbox-padding-top: 0.25rem;\n--zap-checkbox-padding-bottom: 0.25rem;\n--zap-checkbox-border-width: 0.125rem;\n`;
  }
  