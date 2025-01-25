type HexCode = `#${string}`;

export interface NgxZenConfig {
  theme: 'light' | 'dark' | ZenTheme;
  shape: 'pill' | 'curve' | 'default';
}

export interface ZenTheme {
  colors: {
    primary: HexCode;
    secondary: HexCode;
    tertiary: HexCode;
    quaternary: HexCode;
    success: HexCode;
    error: HexCode;
    warning: HexCode;
    info: HexCode;
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
