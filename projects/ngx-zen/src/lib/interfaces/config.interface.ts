type HexCode = `#${string}`;

export interface NgxZenConfig {
  theme?: 'light' | 'dark' | ZenTheme;
  shape?: 'pill' | 'curve' | 'default';
  btnSize?: 'compact' | 'wide' | 'tight' | 'default';
}

export interface ZenTheme {
  colors: {
    primary: HexCode;
    secondary: HexCode;
    tertiary: HexCode;
    quaternary: HexCode;
    success: HexCode;
    successText: HexCode;
    error: HexCode;
    errorText: HexCode;
    warning: HexCode;
    warningText: HexCode;
    info: HexCode;
    infoText: HexCode;
  };
  fontSize: {
    '7xl': string;
    '6xl': string;
    '5xl': string;
    '4xl': string;
    '3xl': string;
    '2xl': string;
    xl: string;
    lg: string;
    md: string;
    sm: string;
    xs: string;
    xxs: string;
  };
}
