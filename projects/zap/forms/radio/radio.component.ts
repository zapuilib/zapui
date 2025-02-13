import { Component, forwardRef, Input } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ControlValueAccessorDirective } from '../directives/control-value-accessor.directive';
import { ValidationErrorComponent } from '../validation-error/validation-error.component';

@Component({
  selector: 'zap-radio',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ValidationErrorComponent,
  ],
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ZapRadio),
      multi: true,
    },
  ],
})
export class ZapRadio<T> extends ControlValueAccessorDirective<T> {
  @Input() options: Array<{ name: string; value: string }> = [];
  @Input() label: string = '';
  @Input() customErrorMessages: Record<string, string> = {};
  @Input() zapClass: string = '';
  @Input() variant: 'vertical' | 'horizontal' = 'vertical';
  //TODO: Shoudl support  custom label directive
  get classes(): string[] {
    return [this.variant, this.zapClass].filter(
      (cls) => cls && cls !== 'default'
    );
  }
}
