import { CommonStyles, HexCode } from "./index";

export interface BadgeConfig {
  styles?: {
    colors?: {
      [theme: string]: {
        bgColor?: HexCode;
        textColor?: HexCode;
        borderColor?: HexCode;
      };
    };
  } & CommonStyles;
}
