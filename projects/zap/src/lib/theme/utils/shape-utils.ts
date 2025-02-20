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

  const checkboxValues: { [key: string]: string } = {
    pill: '0.25rem',
    curve: '0.25rem',
  };

   if (component === 'modal' || component === 'dialog') {
    shapeCssValue = modalDialogShapeValues[shapeValue] || shapeCssValue;
  } else if (component === 'checkbox') {
    shapeCssValue = checkboxValues[shapeValue] || shapeCssValue;
  } else {
    shapeCssValue = shapeValues[shapeValue] || shapeCssValue;
  } 

  return { shapeCssValue };
}
