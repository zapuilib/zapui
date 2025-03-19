export function getSizeVariables(sizeValue: string, component: string): string {
  const configList = {
    button: {
      compact: {
        'padding-left': '0.75rem',
        'padding-right': '0.75rem',
        'padding-top': '0.25rem',
        'padding-bottom': '0.25rem',
        'font-size': '1rem',
      },
      tight: {
        'padding-left': '0.5rem',
        'padding-right': '0.5rem',
        'padding-top': '0.25rem',
        'padding-bottom': '0.25rem',
        'font-size': '0.875rem',
      },
      wide: {
        'padding-left': '1rem',
        'padding-right': '1rem',
        'padding-top': '0.5rem',
        'padding-bottom': '0.5rem',
        width: '100%',
      },
    },
    chip: {
      compact: {
        'padding-left': '0.75rem',
        'padding-right': '0.75rem',
        'padding-top': '0.25rem',
        'padding-bottom': '0.25rem',
        'font-size': '0.75rem',
      },
      wide: {
        'padding-left': '1rem',
        'padding-right': '1rem',
        width: '100%',
      },
    },
    select: {
      compact: {
        'padding-left': '0.5rem',
        'padding-right': '0.5rem',
        'padding-top': '0.375rem',
        'padding-bottom': '0.375rem',
        'font-size': '0.875rem',
        'icon-font-size': '0.875rem',
      },
    },
    input: {
      compact: {
        'padding-left': '0.875rem',
        'padding-right': '0.875rem',
        'padding-top': '0.375rem',
        'padding-bottom': '0.375rem',
        'font-size': '0.875rem',
      },
    },
    'dp-calendar': {
      pill: {
        'border-radius': '1.5rem',
        'handler-border-radius': '1.5rem',
        'day-border-radius': '1.5rem',
      },
      compact: {
        'border-radius': '0.375rem',
        'handler-border-radius': '0.375rem',
        'day-border-radius': '0.375rem',
      },
    },
  };

  let cssVariables = '';

  const config = configList[component as keyof typeof configList];

  if (!config) {
    return '';
  }

  if (!config[sizeValue as keyof typeof config]) {
    return '';
  }

  cssVariables += Object.entries(config[sizeValue as keyof typeof config])
    .map(([key, value]) => `--zap-${component}-${key}: ${value};`)
    .join('\n');

  return cssVariables;
}
