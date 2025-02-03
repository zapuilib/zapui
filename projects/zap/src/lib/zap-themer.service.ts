import { Injectable} from '@angular/core';

import { ThemeService } from './theme.service';
import { ZapTheme } from '../public-api';

@Injectable({
  providedIn: 'root',
})
export class ZapThemer {
  constructor(private themeService: ThemeService) {}

  setTheme(theme: 'light' | 'dark' | ZapTheme): void {
    this.themeService.applyTheme(theme);
  }
}
