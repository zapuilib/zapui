import { HexCode, Padding, ShapeType } from './index';

export interface TooltipConfig {
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
        contentBgColor?: HexCode;
        contentTextColor?: HexCode;
        contentBorderColor?: HexCode;
      }
    >;
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
  };
}
