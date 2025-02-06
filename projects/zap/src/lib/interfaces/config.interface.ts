export type HexCode = `#${string}`;

export interface ZapConfig {
  theme?: 'light' | 'dark' | string;
  themeLibrary?: { [key: string]: ZapTheme };
  components?: {
    global?: GlobalConfig;
    alert?: AlertConfig;
    badge?: BadgeConfig;
    button?: ButtonConfig;
    chip?: ChipConfig;
    dialog?: DialogConfig;
    modal?: ModalConfig;
    input?: InputConfig;
    checkbox?: CheckboxConfig;
    radio?: RadioConfig;
    textarea?: TextareaConfig;
  };
}

type CommonStyles = {
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
      };
    };
  } & CommonStyles;
}

export interface ChipConfig {
  shape?: ShapeType;
  size?: 'compact' | 'base' | 'wide';
  styles?: {
    colors?: {
      [theme: string]: {
        bgColor?: HexCode;
        textColor?: HexCode;
        borderColor?: HexCode;
        bgHoverColor?: HexCode;
        textHoverColor?: HexCode;
        borderHoverColor?: HexCode;
        dismissColor?: HexCode;
        dismissHoverColor?: HexCode;
      };
    };
  } & CommonStyles;
}

export interface AlertConfig {
  shape?: ShapeType;
  styles?: {
    colors?: {
      [theme: string]: {
        bgColor?: HexCode;
        textColor?: HexCode;
        borderColor?: HexCode;
        dismissColor?: HexCode;
        dismissHoverColor?: HexCode;
      };
    };
  } & CommonStyles;
}

export interface BadgeConfig {
  styles?: {
    colors?: {
      [theme: string]: {
        bgColor?: HexCode;
        textColor?: HexCode;
        borderColor?: HexCode;
      };
    };
  } & CommonStyles;
}

export interface DialogConfig {
  shape?: ShapeType;
  styles?: {
    colors?: {
      [theme: string]: {
        bgColor?: HexCode;
        textColor?: HexCode;
        titleColor?: HexCode;
        borderColor?: HexCode;
        dismissColor?: HexCode;
        dismissHoverColor?: HexCode;
        primaryBtnBgColor?: HexCode;
        primaryBtnTextColor?: HexCode;
        primaryBtnBorderColor?: HexCode;
        primaryBtnBgHoverColor?: HexCode;
        primaryBtnTextHoverColor?: HexCode;
        primaryBtnBorderHoverColor?: HexCode;
        secondaryBtnBgColor?: HexCode;
        secondaryBtnTextColor?: HexCode;
        secondaryBtnBorderColor?: HexCode;
        secondaryBtnBgHoverColor?: HexCode;
        secondaryBtnTextHoverColor?: HexCode;
        secondaryBtnBorderHoverColor?: HexCode;
      };
    };
    borderRadius?: string;
    paddingLeft?: string;
    paddingRight?: string;
    paddingTop?: string;
    paddingBottom?: string;
    padding?: Padding;
    width?: string;
    height?: string;
    titleFontSize?: string;
    titleFontWeight?: string;
    titleLineHeight?: string;
    titleLetterSpacing?: string;
    fontSize?: string;
    fontWeight?: string;
    lineHeight?: string;
    letterSpacing?: string;
    dismissFontSize?: string;
    dismissFontWeight?: string;
    dismissLineHeight?: string;
    dismissLetterSpacing?: string;
    primaryBtnFontSize?: string;
    primaryBtnFontWeight?: string;
    primaryBtnLineHeight?: string;
    primaryBtnLetterSpacing?: string;
    secondaryBtnFontSize?: string;
    secondaryBtnFontWeight?: string;
    secondaryBtnLineHeight?: string;
    secondaryBtnLetterSpacing?: string;
    primaryBtnBorderRadius?: string;
    secondaryBtnBorderRadius?: string;
    // in future we might support more features like padding, width, height, etc for both button
  };
}

export interface ModalConfig { 
  shape?: ShapeType;
  styles?: {
    colors?: {
      [theme: string]: {
        bgColor?: HexCode;
        borderColor?: HexCode;
        dismissColor?: HexCode;
        dismissHoverColor?: HexCode;
      }
    },
    borderRadius?: string;
    paddingLeft?: string;
    paddingRight?: string;
    paddingTop?: string;
    paddingBottom?: string;
    padding?: Padding;
    maxWidth?: string;
    maxHeight?: string;
    dismissFontSize?: string;
    dismissFontWeight?: string;
    dismissLineHeight?: string;
    dismissLetterSpacing?: string;
  };
}

export interface InputConfig {
  shape?: ShapeType;
  size?: 'compact' | 'base';
  styles?: {
    colors?: {
      [theme: string]: {
        bgColor?: HexCode;
        textColor?: HexCode;
        borderColor?: HexCode;
        labelColor?: HexCode;
        placeholderColor?: HexCode;
        borderFocusColor?: HexCode;
        bgFocusColor?: HexCode;
        textFocusColor?: HexCode;
        iconColor?: HexCode;
      };
    };
    borderRadius?: string;
    paddingLeft?: string;
    paddingRight?: string;
    paddingTop?: string;
    paddingBottom?: string;
    padding?: Padding;
    fontSize?: string;
    fontWeight?: string;
    lineHeight?: string;
    letterSpacing?: string;
    labelFontSize?: string;
    labelFontWeight?: string;
    labelLineHeight?: string;
    labelLetterSpacing?: string;
    placeholderFontSize?: string;
    placeholderFontWeight?: string;
    placeholderLineHeight?: string;
    placeholderLetterSpacing?: string;
    iconFontSize?: string;
    iconFontWeight?: string;
    iconLineHeight?: string;
    iconLetterSpacing?: string;
    width?: string;
    height?: string;
  };
}

export interface CheckboxConfig {
  shape?: ShapeType;
  styles?: {
    colors?: {
      [theme: string]: {
        bgColor?: HexCode;
        textColor?: HexCode;
        borderColor?: HexCode;
        bgHoverColor?: HexCode;
        textHoverColor?: HexCode;
        borderHoverColor?: HexCode;
        bgFocusColor?: HexCode;
        borderFocusColor?: HexCode;
        textCheckedColor?: HexCode;
        bgCheckedColor?: HexCode;
        borderCheckedColor?: HexCode;
        labelColor?: HexCode;
        labelHoverColor?: HexCode;
      };
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
  };
}

export interface RadioConfig {
  styles?: {
    colors?: {
      [theme: string]: {
        bgColor?: HexCode;
        textColor?: HexCode;
        borderColor?: HexCode;
        bgHoverColor?: HexCode;
        textHoverColor?: HexCode;
        borderHoverColor?: HexCode;
        bgFocusColor?: HexCode;
        borderFocusColor?: HexCode;
        labelColor?: HexCode;
        labelHoverColor?: HexCode;
        bgCheckedColor?: HexCode;
        borderCheckedColor?: HexCode;
        checkedColor?: HexCode;
      };
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
    labelFontSize?: string;
    fontWeight?: string;
    labelFontWeight?: string;
    lineHeight?: string;
    labelLineHeight?: string;
    letterSpacing?: string;
    labelLetterSpacing?: string;
  }
}

export interface TextareaConfig {
  shape?: 'flat' | 'curve';
  styles?: {
    colors?: {
      [theme: string]: {
        bgColor?: HexCode;
        textColor?: HexCode;
        borderColor?: HexCode;
        labelColor?: HexCode;
        placeholderColor?: HexCode;
        bgHoverColor?: HexCode;
        borderHoverColor?: HexCode;
        textHoverColor?: HexCode;
        borderFocusColor?: HexCode;
        ringFocusColor?: HexCode;
        bgFocusColor?: HexCode;
        textFocusColor?: HexCode;
        iconColor?: HexCode;
      };
    };
    borderRadius?: string;
    paddingLeft?: string;
    paddingRight?: string;
    paddingTop?: string;
    paddingBottom?: string;
    padding?: Padding;
    fontSize?: string;
    fontWeight?: string;
    lineHeight?: string;
    letterSpacing?: string;
    labelFontSize?: string;
    labelFontWeight?: string;
    labelLineHeight?: string;
    labelLetterSpacing?: string;
    placeholderFontSize?: string;
    placeholderFontWeight?: string;
    placeholderLineHeight?: string;
    placeholderLetterSpacing?: string;
    iconFontSize?: string;
    iconFontWeight?: string;
    iconLineHeight?: string;
    iconLetterSpacing?: string;
    width?: string;
    height?: string;
  };
}

export interface GlobalConfig {
  shape?: ShapeType;
  styles?: {}
}

type ShapeType = 'flat' | 'curve' | 'pill';

type Padding =
  | `${paddingString} ${paddingString} ${paddingString} ${paddingString}`
  | `${paddingString} ${paddingString} ${paddingString}`
  | `${paddingString} ${paddingString}`
  | paddingString;

type paddingString =
  | `${string}px`
  | `${string}rem`
  | `${string}em`
  | `${string}%`
  | `${string}vw`
  | `${string}vh`
  | `${string}vmin`
  | `${string}vmax`
  | `${string}ch`
  | `${string}ex`
  | `${string}cm`
  | `${string}mm`
  | `${string}in`
  | `${string}pt`
  | `${string}pc`;

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
