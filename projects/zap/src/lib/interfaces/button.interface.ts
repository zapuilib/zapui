import { CommonStyles, HexCode, ShapeType } from "./index";

export interface ButtonConfig {
  shape?: ShapeType;
  size?: 'compact' | 'wide' | 'tight' | 'base';
  styles?: {
    colors?: {
      [theme: string]: {
        bgColor?: HexCode;
        textColor?: HexCode;
        borderColor?: HexCode;
        bgHoverColor?: HexCode;
        textHoverColor?: HexCode;
        borderHoverColor?: HexCode;
        bgActiveColor?: HexCode;
        textActiveColor?: HexCode;
        borderActiveColor?: HexCode;
        disabledBgColor?: HexCode;
        disabledTextColor?: HexCode;
        disabledBorderColor?: HexCode;
        iconColor?: HexCode;
      };
    };
  } & CommonStyles;
}
