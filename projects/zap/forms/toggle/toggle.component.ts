import { Component, Input, forwardRef } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ControlValueAccessorDirective } from '../directives/control-value-accessor.directive';
import { ValidationErrorComponent } from '../validation-error/validation-error.component';

@Component({
  selector: 'zap-toggle',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ValidationErrorComponent,
  ],
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ZapToggle),
      multi: true,
    },
  ],
})
export class ZapToggle<T> extends ControlValueAccessorDirective<T> {
  @Input() label: string = '';
  @Input() text: string = '';
  @Input() zapClass: string = '';
  @Input() customErrorMessages: Record<string, string> = {};
  //TODO: Shoudl support  custom label directive
  handleToggle(): void {
    this.control.setValue(!this.control.value);
  }

  handleFocus(): void {
    this.control.markAsTouched();
  }
}
