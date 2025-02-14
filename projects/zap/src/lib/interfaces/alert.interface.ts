
import { CommonStyles, HexCode, ShapeType } from "./index";

export interface AlertConfig {
  shape?: ShapeType;
  styles?: {
    colors?: {
      [theme: string]: {
        bgColor?: HexCode;
        textColor?: HexCode;
        borderColor?: HexCode;
        dismissColor?: HexCode;
        dismissHoverColor?: HexCode;
      };
    };
  } & CommonStyles;
}
