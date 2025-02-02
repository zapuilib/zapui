import { EnvironmentProviders, makeEnvironmentProviders, APP_INITIALIZER } from '@angular/core';
import { NGX_ZEN_CONFIG } from './tokens/zap.tokens';
import { ZapConfig } from './interfaces/config.interface';
import { ThemeService } from './theme.service';
import { defaultConfig } from './constants/default-config.constants';

export function initializeTheme(themeService: ThemeService): () => void {
  return () => themeService.applyTheme();
}

export function provideZapOptions(config: ZapConfig = defaultConfig): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: NGX_ZEN_CONFIG, useValue: config },
    ThemeService,
    { provide: APP_INITIALIZER, useFactory: initializeTheme, deps: [ThemeService], multi: true },
  ]);
}
