import { Injectable } from '@angular/core';

import { ThemeService } from './theme.service';

@Injectable({
  providedIn: 'root',
})
export class ZapThemer {
  constructor(private themeService: ThemeService) {}

  setTheme(theme: 'light' | 'dark' | string): void {
    this.themeService.applyTheme(theme);
  }
}
