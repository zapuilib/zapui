import { HexCode } from './hexcode.type';
import { ShapeType } from './shape.type';

export interface DPCalendarSelectConfig {
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
        optionsBgColor?: HexCode;
        optionsTextColor?: HexCode;
        optionsBorderColor?: HexCode;
        optionTextColor?: HexCode;
        optionBgColor?: HexCode;
        optionBorderColor?: HexCode;
        optionBgHoverColor?: HexCode;
        optionTextHoverColor?: HexCode;
        optionBorderHoverColor?: HexCode;
        selectedTextColor?: HexCode;
        selectedBgColor?: HexCode;
        selectedBorderColor?: HexCode;
        selectedBgHoverColor?: HexCode;
        selectedTextHoverColor?: HexCode;
        selectedBorderHoverColor?: HexCode;
      }
    >;
    borderRadius?: string;
    paddingLeft?: string;
    paddingRight?: string;
    paddingTop?: string;
    paddingBottom?: string;
    padding?: string;
    fontSize?: string;
    fontWeight?: string;
    lineHeight?: string;
    letterSpacing?: string;
    optionsBorderRadius?: string;
    optionPaddingLeft?: string;
    optionPaddingRight?: string;
    optionPaddingTop?: string;
    optionPaddingBottom?: string;
    optionPadding?: string;
    optionFontSize?: string;
    optionFontWeight?: string;
    optionLineHeight?: string;
    optionLetterSpacing?: string;
    selectedFontSize?: string;
    selectedFontWeight?: string;
    selectedLineHeight?: string;
    selectedLetterSpacing?: string;
  };
}
