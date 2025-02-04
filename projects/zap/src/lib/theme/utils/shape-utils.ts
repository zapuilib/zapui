export function getExistingShapeFor(key: string, root: HTMLElement): string {
  const existingShape = root.style
    .getPropertyValue(`--zap-${key}-border-radius`)
    .trim();
  const validShapes = ['pill', 'curve', 'default'];
  return validShapes.includes(existingShape) ? existingShape : '';
}

export function getShapeCssValues(
  shapeValue: string,
  component: string
): {
  shapeCssValue: string;
} {
  let shapeCssValue = shapeValue;

  const shapeValues: { [key: string]: string } = {
    pill: 'calc(infinity * 1px)',
    curve: '0.375rem',
  };

  const modalDialogShapeValues: { [key: string]: string } = {
    pill: '1rem',
    curve: '0.5rem',
  };

  if (
    component === 'button' ||
    component === 'input' ||
    component === 'chip' ||
    component === 'alert'
  ) {
    shapeCssValue = shapeValues[shapeValue] || shapeCssValue;
  } else if (component === 'modal' || component === 'dialog') {
    shapeCssValue = modalDialogShapeValues[shapeValue] || shapeCssValue;
  }

  return { shapeCssValue };
}
