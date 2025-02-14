import { HexCode, ShapeType } from './index';

export interface ToggleConfig {
  shape?: ShapeType;
  styles?: {
    colors?: {
      [theme: string]: {
        bgColor?: HexCode;
        rollerColor?: HexCode;
        bgOnColor?: HexCode;
        rollerOnColor?: HexCode;
        labelColor?: HexCode;
        helpTextColor?: HexCode;
      };
    };
    width?: string;
    height?: string;
    rollerWidth?: string;
    rollerHeight?: string;
    labelFontSize?: string;
    labelFontWeight?: string;
    labelLineHeight?: string;
    labelLetterSpacing?: string;
    fontSize?: string;
    fontWeight?: string;
    lineHeight?: string;
    letterSpacing?: string;
    helpTextFontSize?: string;
    helpTextFontWeight?: string;
    helpTextLineHeight?: string;
    helpTextLetterSpacing?: string;
  };
}
