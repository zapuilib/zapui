import { HexCode, Padding, ShapeType } from './index';

export interface InputConfig {
  shape?: ShapeType;
  size?: 'compact' | 'base';
  styles?: {
    colors?: Record<
      string,
      {
        bgColor?: HexCode;
        textColor?: HexCode;
        borderColor?: HexCode;
        labelColor?: HexCode;
        placeholderColor?: HexCode;
        borderFocusColor?: HexCode;
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
    iconFontSize?: string;
    iconFontWeight?: string;
    iconLineHeight?: string;
    iconLetterSpacing?: string;
    helpTextFontSize?: string;
    helpTextFontWeight?: string;
    helpTextLineHeight?: string;
    helpTextLetterSpacing?: string;
    width?: string;
    height?: string;
  };
}
