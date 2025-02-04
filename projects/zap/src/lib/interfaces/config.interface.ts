export type HexCode = `#${string}`;

export interface ZapConfig {
  theme?: 'light' | 'dark' | string;
  themeLibrary?: { [key: string]: ZapTheme };
  components?: {
    global?: GlobalConfig;
    alert?: AlertConfig;
    button?: ButtonConfig;
    chip?: ChipConfig;
  };
}

export interface ButtonConfig {
  shape?: ShapeType;
  size?: 'compact' | 'wide' | 'tight' | 'base';
  styles?: {
    colors?: {
      [theme: string]: {
        bgColor?: HexCode;
        textColor?: HexCode;
        borderColor?: HexCode;
        bgHoverColor?: HexCode;
        textHoverColor?: HexCode;
        borderHoverColor?: HexCode;
        bgActiveColor?: HexCode;
        textActiveColor?: HexCode;
        borderActiveColor?: HexCode;
        disabledBgColor?: HexCode;
        disabledTextColor?: HexCode;
        disabledBorderColor?: HexCode;
      }
    };
    borderRadius?: string;
    paddingLeft?: string;
    paddingRight?: string;
    paddingTop?: string;
    paddingBottom?: string;
    padding?: Padding;
    width?: string;
    height?: string;
    fontSize?: string;
    fontWeight?: string;
    lineHeight?: string;
    letterSpacing?: string;
    textTransform?: string;
  };
}



export interface ChipConfig {
  shape?: ShapeType;
  styles?: {
  }
}

export interface AlertConfig {
  shape?: ShapeType;
  styles?: {
  }
}

export interface GlobalConfig {
  shape?: ShapeType;
  styles?: {
  };
}

type ShapeType = 'flat' | 'curve' | 'pill';

type Padding = `${paddingString} ${paddingString} ${paddingString} ${paddingString}` | `${paddingString} ${paddingString} ${paddingString}` | `${paddingString} ${paddingString}` | paddingString;

type paddingString = `${string}px` | `${string}rem` | `${string}em` | `${string}%`  | `${string}vw` | `${string}vh` | `${string}vmin` | `${string}vmax` | `${string}ch` | `${string}ex` | `${string}cm` | `${string}mm` | `${string}in` | `${string}pt` | `${string}pc`;

export interface ZapTheme {
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
