import { HexCode, Padding, ShapeType } from './index';

export interface ToastConfig {
  shape?: ShapeType;
  styles?: {
    colors?: Record<
      string,
      {
        bgColor?: HexCode;
        textColor?: HexCode;
        borderColor?: HexCode;
        titleColor?: HexCode;
        btnBgColor?: HexCode;
        btnTextColor?: HexCode;
        btnBorderColor?: HexCode;
        btnBgHoverColor?: HexCode;
        btnTextHoverColor?: HexCode;
        btnBorderHoverColor?: HexCode;
      }
    >;
    paddingLeft?: string;
    paddingRight?: string;
    paddingTop?: string;
    paddingBottom?: string;
    padding?: Padding;
    btnPaddingLeft?: string;
    btnPaddingRight?: string;
    btnPaddingTop?: string;
    btnPaddingBottom?: string;
    btnPadding?: Padding;
    fontSize?: string;
    titleFontSize?: string;
    fontWeight?: string;
    titleFontWeight?: string;
    lineHeight?: string;
    titleLineHeight?: string;
    letterSpacing?: string;
    titleLetterSpacing?: string;
    btnFontSize?: string;
    btnFontWeight?: string;
    btnLineHeight?: string;
    btnLetterSpacing?: string;
  };
}
