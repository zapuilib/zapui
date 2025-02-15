import { TooltipConfig } from '../../interfaces';
import { getExistingShapeFor, getShapeCssValues } from '../utils/shape-utils';

export function generateComponentTooltipVariables(
  value: TooltipConfig,
  root: HTMLElement
) {
  let cssVariables = '';
  const tooltipShapeValue = value.shape || '';

  if (tooltipShapeValue) {
    const { shapeCssValue } = getShapeCssValues(tooltipShapeValue, 'tooltip');
    cssVariables += `--zap-tooltip-content-border-radius: ${shapeCssValue};\n`;
    cssVariables += `--zap-tooltip-handler-border-radius: ${shapeCssValue};\n`;
  }

  return cssVariables;
}

export function getDefaultTooltipSizeCssValues(): string {
  return `
    --zap-tooltip-content-padding-left: 0.5rem;
    --zap-tooltip-content-padding-right: 0.5rem;
    --zap-tooltip-content-padding-top: 0.25rem;
    --zap-tooltip-content-padding-bottom: 0.25rem;
    `;
}
