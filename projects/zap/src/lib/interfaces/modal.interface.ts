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
    dismissFontSize?: string;
    dismissFontWeight?: string;
    dismissLineHeight?: string;
    dismissLetterSpacing?: string;
  };
}
