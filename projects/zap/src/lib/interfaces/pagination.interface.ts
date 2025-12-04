import { CommonStyles, HexCode, ShapeType } from './index';

export interface PaginationConfig {
  shape?: ShapeType;
  styles?: {
    colors?: Record<
      string,
      {
        linkBgColor?: HexCode;
        linkTextColor?: HexCode;
        linkBorderColor?: HexCode;
        linkBgHoverColor?: HexCode;
        linkTextHoverColor?: HexCode;
        linkBorderHoverColor?: HexCode;
        linkBgActiveColor?: HexCode;
        linkTextActiveColor?: HexCode;
        linkBorderActiveColor?: HexCode;
        prevNextBgColor?: HexCode;
        prevNextTextColor?: HexCode;
        prevNextBorderColor?: HexCode;
        prevNextBgHoverColor?: HexCode;
        prevNextTextHoverColor?: HexCode;
        prevNextBorderHoverColor?: HexCode;
        prevNextBgDisabledColor?: HexCode;
        prevNextTextDisabledColor?: HexCode;
        prevNextBorderDisabledColor?: HexCode;
        ellipsisTextColor?: HexCode;
      }
    >;
    fontSize?: string;
    fontWeight?: string;
    lineHeight?: string;
    letterSpacing?: string;
  } & CommonStyles;
}
