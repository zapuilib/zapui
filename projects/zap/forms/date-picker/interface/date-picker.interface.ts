export interface ZapDatePickerBreakpoints {
    default?: { monthsPerView: number; maxPerRow: number };
    sm?: { monthsPerView: number; maxPerRow: number };
    md?: { monthsPerView: number; maxPerRow: number };
    base?: { monthsPerView: number; maxPerRow: number };
    lg?: { monthsPerView: number; maxPerRow: number };
    xl?: { monthsPerView: number; maxPerRow: number };
    '2xl'?: { monthsPerView: number; maxPerRow: number };
    [customBreakpoint: string]: { monthsPerView: number; maxPerRow: number } | undefined;
  }
  