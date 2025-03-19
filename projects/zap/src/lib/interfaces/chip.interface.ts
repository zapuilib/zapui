import { CommonStyles, HexCode, ShapeType } from './index';

export interface ChipConfig {
  shape?: ShapeType;
  size?: 'compact' | 'base' | 'wide';
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
        dismissColor?: HexCode;
        dismissHoverColor?: HexCode;
      }
    >;
  } & CommonStyles;
}
