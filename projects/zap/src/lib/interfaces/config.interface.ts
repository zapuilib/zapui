import {
  AlertConfig,
  BadgeConfig,
  ButtonConfig,
  ChipConfig,
  CheckboxConfig,
  DialogConfig,
  InputConfig,
  ModalConfig,
  RadioConfig,
  SelectConfig,
  TextareaConfig,
  ToggleConfig,
  TooltipConfig,
  AccordionConfig,
  DPCalendarConfig,
  DatePickerConfig,
  DPCalendarSelectConfig,
  HexCode,
  ShapeType,
  ToastConfig,
} from './index';

export interface ZapConfig {
  theme?: 'light' | 'dark' | string;
  themeLibrary?: Record<string, ZapTheme>;
  components?: {
    global?: GlobalConfig;
    alert?: AlertConfig;
    badge?: BadgeConfig;
    button?: ButtonConfig;
    chip?: ChipConfig;
    dialog?: DialogConfig;
    modal?: ModalConfig;
    input?: InputConfig;
    checkbox?: CheckboxConfig;
    radio?: RadioConfig;
    textarea?: TextareaConfig;
    toggle?: ToggleConfig;
    accordion?: AccordionConfig;
    select?: SelectConfig;
    tooltip?: TooltipConfig;
    'date-picker'?: DatePickerConfig;
    'dp-calendar'?: DPCalendarConfig;
    'dp-calendar-select'?: DPCalendarSelectConfig;
    toast?: ToastConfig;
  };
}

export interface GlobalConfig {
  shape?: ShapeType;
  styles?: {
    colors?: Record<
      string,
      {
        scrollbarColor?: HexCode;
      }
    >;
  };
}

export interface ZapTheme {
  colors: {
    primary: HexCode;
    secondary: HexCode;
    tertiary: HexCode;
    success: HexCode;
    successText: HexCode;
    error: HexCode;
    errorText: HexCode;
    warning: HexCode;
    warningText: HexCode;
    info: HexCode;
    infoText: HexCode;
  };
  fontSize: {
    '5xl': string;
    '4xl': string;
    '3xl': string;
    '2xl': string;
    xl: string;
    lg: string;
    md: string;
    sm: string;
    xs: string;
    xxs: string;
  };
}
