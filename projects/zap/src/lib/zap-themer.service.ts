import { Inject, Injectable, Optional, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

import { NGX_ZAP_CONFIG } from './tokens/zap.tokens';
import { ThemeService } from './theme.service';
import { ZapConfig, ZapTheme } from '../public-api';
import {
  lightTheme,
  defaultConfig,
  darkTheme,
} from './constants/default-config.constants';

@Injectable({
  providedIn: 'root',
})
export class ZapThemer {
  constructor(private themeService: ThemeService) {}

  setTheme(theme: 'light' | 'dark' | ZapTheme): void {
    this.themeService.applyTheme(theme);
  }
}
