import { APP_INITIALIZER, EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { ZAP_CONFIG } from './tokens/zap.tokens';
import { ZapConfig } from './interfaces/config.interface';
import { ThemeService } from './theme.service';
import { defaultConfig } from './constants/default-config.constant';

export function initializeTheme(themeService: ThemeService): () => void {
  return () => themeService.applyTheme();
}

export function provideZapOptions(config: ZapConfig = defaultConfig): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: ZAP_CONFIG, useValue: config },
    ThemeService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeTheme,
      deps: [ThemeService],
      multi: true,
    },
  ]);
}
