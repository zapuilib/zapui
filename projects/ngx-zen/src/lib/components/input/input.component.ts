import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { ControlValueAccessorDirective } from '../../directives/control-value-accessor.directive';

type InputType = 'password' | 'text' | 'number' | 'email' | 'tel';

@Component({
  selector: 'ngx-zen-input',
  templateUrl: 'input.component.html',
  styleUrls: ['input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent<T> extends ControlValueAccessorDirective<T> {
  @Input() type: InputType = 'text';
  @Input() label: string = '';
  @Input() id: string = '';
  @Input() placeholder: string = '';
  @Input() customErrorMessages: Record<string, string> = {};
  @Input() zenClass: string = '';
  @Input() size: 'compact' | 'default' = 'default';
  @Input() shape: 'pill' | 'curve' | 'default' = 'default';
  @Input() icon!: string;
  @Input() iconPosition: 'left' | 'right' = 'left';
  @Input() autoComplete: string = 'off';

  getInputStyle() {
    return {
      color: this.config.colors.secondary,
      'border-color': this.config.colors.secondary,
      'font-size': this.config.fontSize.md,
    };
  }

  getStyle() {
    return {
      color: this.config.colors.secondary,
    };
  }

  getErrorColor() {
    return this.config.colors.error;
  }
}
