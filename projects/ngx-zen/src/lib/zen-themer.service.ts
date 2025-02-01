import { Inject, Injectable, Optional, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

import { NGX_ZEN_CONFIG } from './tokens/ngx-zen.tokens';
import { ThemeService } from './theme.service';
import { NgxZenConfig, ZenTheme } from '../public-api';
import {
  lightTheme,
  defaultConfig,
  darkTheme,
} from './constants/default-config.constants';

@Injectable({
  providedIn: 'root',
})
export class ZenThemer {
  constructor(private themeService: ThemeService) {}

  setTheme(theme: 'light' | 'dark' | ZenTheme): void {
    this.themeService.applyTheme(theme);
  }
}
