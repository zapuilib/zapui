import { HexCode, Padding, ShapeType } from './index';

export interface ModalConfig {
  shape?: ShapeType;
  styles?: {
    colors?: Record<
      string,
      {
        bgColor?: HexCode;
        borderColor?: HexCode;
        dismissColor?: HexCode;
        dismissHoverColor?: HexCode;
        overlayBgColor?: HexCode;
        dismissFocusColor?: HexCode;
      }
    >;
    borderRadius?: string;
    paddingLeft?: string;
    paddingRight?: string;
    paddingTop?: string;
    paddingBottom?: string;
    padding?: Padding;
    maxWidth?: string;
    maxHeight?: string;
    dismissHeight?: string;
    dismissWidth?: string;
  };
}
