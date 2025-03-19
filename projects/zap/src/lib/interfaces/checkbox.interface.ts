import { HexCode, Padding, ShapeType } from './index';

export interface CheckboxConfig {
  shape?: ShapeType;
  styles?: {
    colors?: Record<
      string,
      {
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
        helpTextColor?: HexCode;
      }
    >;
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
    labelFontSize?: string;
    labelFontWeight?: string;
    labelLineHeight?: string;
    labelLetterSpacing?: string;
    helpTextFontSize?: string;
    helpTextFontWeight?: string;
    helpTextLineHeight?: string;
    helpTextLetterSpacing?: string;
  };
}
