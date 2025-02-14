import { HexCode, Padding } from './index';

export interface AccordionConfig {
  styles?: {
    colors?: {
      [theme: string]: {
        headerBgColor?: HexCode;
        headerTextColor?: HexCode;
        itemBorderColor?: HexCode;
        headerBgHoverColor?: HexCode;
        headerTextHoverColor?: HexCode;
        contentTextColor?: HexCode;
        contentBgColor?: HexCode;
      };
    };
    headerPaddingLeft?: string;
    headerPaddingRight?: string;
    headerPaddingTop?: string;
    headerPaddingBottom?: string;
    contentPaddingLeft?: string;
    contentPaddingRight?: string;
    contentPaddingTop?: string;
    contentPaddingBottom?: string;
    headerPadding?: Padding;
    contentPadding?: Padding;
  };
}
