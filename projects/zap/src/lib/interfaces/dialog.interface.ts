import { HexCode, Padding, ShapeType } from './index';

export interface DialogConfig {
  shape?: ShapeType;
  styles?: {
    colors?: Record<
      string,
      {
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
        overlayBgColor?: HexCode;
        dismissFocusColor?: HexCode;
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
    titleFontSize?: string;
    titleFontWeight?: string;
    titleLineHeight?: string;
    titleLetterSpacing?: string;
    fontSize?: string;
    fontWeight?: string;
    lineHeight?: string;
    letterSpacing?: string;
    dismissHeight?: string;
    dismissWidth?: string;
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
  };
}
