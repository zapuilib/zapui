import { HexCode, Padding } from './index';

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
        helpTextColor?: HexCode;
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
    helpTextFontSize?: string;
    helpTextFontWeight?: string;
    helpTextLineHeight?: string;
    helpTextLetterSpacing?: string;
  };
}
