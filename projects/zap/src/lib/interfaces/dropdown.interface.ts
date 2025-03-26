import { HexCode } from './hexcode.type';
import { ShapeType } from './shape.type';

export interface DropdownConfig {
  shape?: ShapeType;
  styles?: {
    colors?: Record<
      string,
      {
        menuBorderColor?: HexCode;
        menuBgColor?: HexCode;
        menuItemBgColor?: HexCode;
        menuItemBgHoverColor?: HexCode;
        menuItemTextColor?: HexCode;
        menuItemTextHoverColor?: HexCode;
        menuItemDisabledTextColor?: HexCode;
        menuItemIconColor?: HexCode;
        menuShortcutTextColor?: HexCode;
        menuLabelTextColor?: HexCode;
        menuSeparatorColor?: HexCode;
      }
    >;
    menuBorderRadius?: string;
  };
}
