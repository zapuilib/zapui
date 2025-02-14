import { HexCode, Padding, ShapeType } from './index';

export interface TooltipConfig {
  shape?: ShapeType;
  styles?: {
    colors?: {
      [theme: string]: {
        handlerBgColor?: HexCode;
        handlerTextColor?: HexCode;
        handlerBorderColor?: HexCode;
        handlerBgHoverColor?: HexCode;
        handlerTextHoverColor?: HexCode;
        handlerBorderHoverColor?: HexCode;
        contentBgColor?: HexCode;
        contentTextColor?: HexCode;
        contentBorderColor?: HexCode;
      };
    };
    contentBorderRadius?: string;
    contentPaddingLeft?: string;
    contentPaddingRight?: string;
    contentPaddingTop?: string;
    contentPaddingBottom?: string;
    contentPadding?: Padding;
    contentFontSize?: string;
    contentFontWeight?: string;
    contentLineHeight?: string;
    contentLetterSpacing?: string;
    handlerBorderRadius?: string;
    handlerFontSize?: string;
    handlerFontWeight?: string;
    handlerLineHeight?: string;
    handlerLetterSpacing?: string;
  };
}
