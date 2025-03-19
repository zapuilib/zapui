import { HexCode } from './hexcode.type';
import { ShapeType } from './shape.type';

export interface DPCalendarConfig {
  shape?: ShapeType;
  styles?: {
    colors?: Record<
      string,
      {
        bgColor?: HexCode;
        borderColor?: HexCode;
        handlerBorderColor?: HexCode;
        handlerBgColor?: HexCode;
        handlerColor?: HexCode;
        handlerBgHoverColor?: HexCode;
        handlerBorderHoverColor?: HexCode;
        dayTextColor?: HexCode;
        dayBgColor?: HexCode;
        dayBorderColor?: HexCode;
        dayTextHoverColor?: HexCode;
        dayBgHoverColor?: HexCode;
        dayBorderHoverColor?: HexCode;
        dayOfWeekTextColor?: HexCode;
        dayOfWeekBgColor?: HexCode;
        dayOfWeekBorderColor?: HexCode;
        dayOfWeekTextHoverColor?: HexCode;
        dayOfWeekBgHoverColor?: HexCode;
        dayOfWeekBorderHoverColor?: HexCode;
        inRangeBgColor?: HexCode;
        inRangeBorderColor?: HexCode;
        inRangeTextColor?: HexCode;
        dayActiveMonthBgColor?: HexCode;
        dayActiveMonthBorderColor?: HexCode;
        dayActiveMonthTextColor?: HexCode;
        dayActiveMonthTextHoverColor?: HexCode;
        dayActiveMonthBgHoverColor?: HexCode;
        dayActiveMonthBorderHoverColor?: HexCode;
        todayTextColor?: HexCode;
        todayBgColor?: HexCode;
        todayBorderColor?: HexCode;
        todayTextHoverColor?: HexCode;
        todayBgHoverColor?: HexCode;
        todayBorderHoverColor?: HexCode;
        inRangeActiveMonthBgColor?: HexCode;
        inRangeActiveMonthBorderColor?: HexCode;
        inRangeActiveMonthTextColor?: HexCode;
        selectedActiveMonthBgColor?: HexCode;
        selectedActiveMonthBorderColor?: HexCode;
        selectedActiveMonthTextColor?: HexCode;
        selectedActiveMonthTextHoverColor?: HexCode;
        selectedActiveMonthBgHoverColor?: HexCode;
        selectedActiveMonthBorderHoverColor?: HexCode;
        selectedBgColor?: HexCode;
        selectedBorderColor?: HexCode;
        selectedTextColor?: HexCode;
        selectedTextHoverColor?: HexCode;
        selectedBgHoverColor?: HexCode;
        selectedBorderHoverColor?: HexCode;
      }
    >;
    borderRadius?: string;
    paddingLeft?: string;
    paddingRight?: string;
    paddingTop?: string;
    paddingBottom?: string;
    padding?: string;
    handlerBorderRadius?: string;
    handlerHeight?: string;
    handlerWidth?: string;
    handlerPaddingLeft?: string;
    handlerPaddingRight?: string;
    handlerPaddingTop?: string;
    handlerPaddingBottom?: string;
    handlerPadding?: string;
    dayHeight?: string;
    dayWidth?: string;
    dayBorderRadius?: string;
    dayOfWeekHeight?: string;
    dayOfWeekWidth?: string;
    dayOfWeekBorderRadius?: string;
  };
}
