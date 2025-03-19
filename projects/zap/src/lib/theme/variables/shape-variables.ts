export function getShapeVariable(shapeValue: string, component: string): string {
  const configList = {
    default: {
      pill: 'calc(infinity * 1px)',
      curve: '0.375rem',
    },
    textarea: {
      pill: '0.75rem',
      curve: '0.25rem',
    },
    toast: {
      pill: '1rem',
      curve: '0.375rem',
      elements: {
        btn: {
          pill: 'calc(infinity * 1px)',
          curve: '0.375rem',
        },
      },
    },
    modal: {
      pill: '1rem',
      curve: '0.5rem',
    },
    checkbox: {
      pill: '0.25rem',
      curve: '0.25rem',
    },
    dialog: {
      pill: '1rem',
      curve: '0.5rem',
      elements: {
        'primary-btn': {
          pill: 'calc(infinity * 1px)',
          curve: '0.375rem',
        },
        'secondary-btn': {
          pill: 'calc(infinity * 1px)',
          curve: '0.375rem',
        },
      },
    },
    select: {
      pill: 'calc(infinity * 1px)',
      curve: '0.375rem',
      elements: {
        options: {
          pill: '1.5rem',
          curve: '0.375rem',
        },
        checkbox: {
          pill: '0.25rem',
          curve: '0.25rem',
        },
        chip: {
          pill: 'calc(infinity * 1px)',
          curve: '0.375rem',
        },
      },
    },
    'date-picker': {
      pill: 'calc(infinity * 1px)',
      curve: '0.37rem',
    },
    'dp-calendar': {
      pill: '1.5rem',
      curve: '0.375rem',
      elements: {
        day: {
          pill: 'calc(infinity * 1px)',
          curve: '0.375rem',
        },
        handler: {
          pill: 'calc(infinity * 1px)',
          curve: '0.25rem',
        },
      },
    },
    'dp-calendar-select': {
      pill: 'calc(infinity * 1px)',
      curve: '0.375rem',
      elements: {
        options: {
          pill: '0.675rem',
          curve: '0.375rem',
        },
      },
    },
    tooltip: {
      pill: 'calc(infinity * 1px)',
      curve: '0.25rem',
      elements: {
        content: {
          pill: 'calc(infinity * 1px)',
          curve: '0.25rem',
        },
        handler: {
          pill: 'calc(infinity * 1px)',
          curve: '0.25rem',
        },
      },
    },
  };
  let cssVariables = '';

  const componentConfig: any =
    configList[component as keyof typeof configList] || configList.default;

  if (componentConfig.elements) {
    Object.keys(componentConfig.elements).forEach((element: string) => {
      const elementConfig = componentConfig.elements[element];
      if (shapeValue === 'flat') {
        cssVariables += `--zap-${component}-${element}-border-radius: 0;\n`;
      } else if (elementConfig[shapeValue as keyof typeof elementConfig]) {
        cssVariables += `--zap-${component}-${element}-border-radius: ${
          elementConfig[shapeValue as keyof typeof elementConfig]
        };\n`;
      }
    });
  }

  cssVariables += `--zap-${component}-border-radius: ${
    shapeValue === 'flat' ? '0' : componentConfig[shapeValue as keyof typeof componentConfig]
  };\n`;

  return cssVariables;
}
