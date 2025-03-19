import { HexCode } from './hexcode.type';
import { ShapeType } from './shape.type';

export interface DatePickerConfig {
  shape?: ShapeType;
  styles?: {
    colors?: Record<
      string,
      {
        iconColor?: HexCode;
        borderColor?: HexCode;
        borderHoverColor?: HexCode;
        bgColor?: HexCode;
        bgHoverColor?: HexCode;
        textColor?: HexCode;
        textHoverColor?: HexCode;
        ringFocusColor?: HexCode;
        placeholderColor?: HexCode;
        labelColor?: HexCode;
        helpTextColor?: HexCode;
        disabledBgColor?: HexCode;
        disabledBorderColor?: HexCode;
        disabledTextColor?: HexCode;
        disabledLabelColor?: HexCode;
        disabledHelpTextColor?: HexCode;
      }
    >;
    borderRadius?: string;
    paddingLeft?: string;
    paddingRight?: string;
    paddingTop?: string;
    paddingBottom?: string;
    padding?: string;
    placeholderFontSize?: string;
    placeholderFontWeight?: string;
    placeholderLineHeight?: string;
    placeholderLetterSpacing?: string;
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
