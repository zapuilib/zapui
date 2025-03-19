import { Padding } from '../../interfaces';

export function handlePaddingStyles(
  componentKey: string,
  styleKey: string,
  value: Padding,
): string | undefined {
  let cssVariables = '';
  let pt;
  let pr;
  let pb;
  let pl;
  if (value.split(' ').length === 4) {
    pt = value.split(' ')[0];
    pr = value.split(' ')[1];
    pb = value.split(' ')[2];
    pl = value.split(' ')[3];
  } else if (value.split(' ').length === 2) {
    pt = value.split(' ')[0];
    pb = value.split(' ')[0];
    pl = value.split(' ')[1];
    pr = value.split(' ')[1];
  } else if (value.split(' ').length === 3) {
    pt = value.split(' ')[0];
    pb = value.split(' ')[1];
    pl = value.split(' ')[2];
    pr = value.split(' ')[2];
  } else if (value.split(' ').length === 1) {
    pt = value.split(' ')[0];
    pb = value.split(' ')[0];
    pl = value.split(' ')[0];
    pr = value.split(' ')[0];
  } else {
    return;
  }

  let component = componentKey;

  if (styleKey.endsWith('Padding')) {
    component = `${componentKey}-${styleKey.split('Padding')[0]}`;
  }

  cssVariables += `--zap-${component}-padding-left: ${pl};\n`;
  cssVariables += `--zap-${component}-padding-top: ${pt};\n`;
  cssVariables += `--zap-${component}-padding-bottom: ${pb};\n`;
  cssVariables += `--zap-${component}-padding-right: ${pr};\n`;

  return cssVariables;
}
