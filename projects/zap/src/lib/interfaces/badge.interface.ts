import { CommonStyles, HexCode } from './index';

export interface BadgeConfig {
  styles?: {
    colors?: Record<
      string,
      {
        bgColor?: HexCode;
        textColor?: HexCode;
        borderColor?: HexCode;
      }
    >;
  } & CommonStyles;
}
