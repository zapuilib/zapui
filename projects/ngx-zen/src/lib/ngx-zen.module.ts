import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { COMPONENTS } from './components';
import { INTERNAL_COMPONENTS } from './components/internal';
import { NgxZenConfig } from './interfaces/config.interface';
import { NGX_ZEN_CONFIG } from './tokens/ngx-zen.tokens';
import { defaultConfig } from './constants/default-config.constants';
import { ThemeService } from './theme.service';

@NgModule({
  declarations: [INTERNAL_COMPONENTS, COMPONENTS],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [COMPONENTS],
  providers: [
    { provide: NGX_ZEN_CONFIG, useValue: defaultConfig },
  ],
})
export class NgxZenModule {
  constructor(themeService: ThemeService) {
    themeService.applyTheme();
  }

  static forRoot(
    config: NgxZenConfig = defaultConfig
  ): ModuleWithProviders<NgxZenModule> {
    return {
      ngModule: NgxZenModule,
      providers: [{ provide: NGX_ZEN_CONFIG, useValue: config }, ThemeService],
    };
  }
}
