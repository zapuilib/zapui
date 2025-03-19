import { APP_INITIALIZER, EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { NGX_ZAP_CONFIG } from './tokens/zap.tokens';
import { ZapConfig } from './interfaces/config.interface';
import { ThemeService } from './theme.service';
import { defaultConfig } from './constants/default-config.constants';

export function initializeTheme(themeService: ThemeService): () => void {
  return () => themeService.applyTheme();
}

export function provideZapOptions(config: ZapConfig = defaultConfig): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: NGX_ZAP_CONFIG, useValue: config },
    ThemeService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeTheme,
      deps: [ThemeService],
      multi: true,
    },
  ]);
}
