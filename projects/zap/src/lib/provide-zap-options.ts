import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { NGX_ZAP_CONFIG } from './tokens/zap.tokens';
import { ZapConfig } from './interfaces/config.interface';
import { ThemeService } from './theme.service';
import { defaultConfig } from './constants/default-config.constants';

export function provideZapOptions(config: ZapConfig = defaultConfig): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: NGX_ZAP_CONFIG, useValue: config },
    ThemeService,
  ]);
}
