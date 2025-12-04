import { CommonStyles, HexCode } from './index';

export interface BreadcrumbConfig {
  size?: 'compact' | 'tight' | 'base';
  styles?: {
    colors?: Record<
      string,
      {
        textColor?: HexCode;
        textHoverColor?: HexCode;
        textActiveColor?: HexCode;
        separatorColor?: HexCode;
      }
    >;
    fontSize?: string;
    fontWeight?: string;
    lineHeight?: string;
    letterSpacing?: string;
    separatorHeight?: string;
    separatorWidth?: string;
    fontActiveWeight?: string;
  } & CommonStyles;
}
