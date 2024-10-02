import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { COMPONENTS } from './components';
import { INTERNAL_COMPONENTS } from './components/internal';
import { NgxZenConfig } from './interfaces/config.interface';
import { NGX_ZEN_CONFIG } from './tokens/ngx-zen.tokens';
import { defaultConfig } from './constants/default-config.constants';

@NgModule({
  declarations: [INTERNAL_COMPONENTS, COMPONENTS],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [COMPONENTS],
})
export class NgxZenModule {
  static forRoot(config?: NgxZenConfig): ModuleWithProviders<NgxZenModule> {
    const global = config ? config : defaultConfig;
    return {
      ngModule: NgxZenModule,
      providers: [
        { provide: NGX_ZEN_CONFIG, useValue: global },
      ],
    };
  }
}
