import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { COMPONENTS } from './components';
import { INTERNAL_COMPONENTS } from './components/internal';

@NgModule({
  declarations: [INTERNAL_COMPONENTS, COMPONENTS],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [COMPONENTS],
})
export class NgxZenModule {}
