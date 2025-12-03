import { CommonStyles, HexCode } from './index';

export interface BreadcrumbConfig {
  size?: 'compact' | 'tight' | 'base';
  styles?: {
    colors?: Record<
      string,
      {
        textColor?: HexCode;
        mutedTextColor?: HexCode;
        separatorColor?: HexCode;
        mutedSeparatorColor?: HexCode;
        activeTextColor?: HexCode;
      }
    >;
  } & CommonStyles;
}
