import { HexCode, Padding, ShapeType } from './index';

export interface TextareaConfig {
  shape?: ShapeType;
  styles?: {
    colors?: Record<
      string,
      {
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
        helpTextColor?: HexCode;
      }
    >;
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
    helpTextFontSize?: string;
    helpTextFontWeight?: string;
    helpTextLineHeight?: string;
    helpTextLetterSpacing?: string;
    iconFontSize?: string;
    iconFontWeight?: string;
    iconLineHeight?: string;
    iconLetterSpacing?: string;
    width?: string;
    height?: string;
  };
}
