import { HexCode, Padding, ShapeType } from './index';

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
