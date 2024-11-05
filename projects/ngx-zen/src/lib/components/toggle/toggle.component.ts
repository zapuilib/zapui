import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { ControlValueAccessorDirective } from '../../directives/control-value-accessor.directive';

import type { Styles } from '../../interfaces/style.interface';

@Component({
  selector: 'ngx-zen-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ToggleComponent),
      multi: true,
    },
  ],
})
export class ToggleComponent<T> extends ControlValueAccessorDirective<T> {
  @Input() label: string = '';
  @Input() text: string = '';
  @Input() zenClass: string = '';
  @Input() customErrorMessages: Record<string, string> = {};

  getLabelStyle(): Styles {
    return {
      fontSize: this.config.fontSize.md,
      color: this.config.colors.secondary,
    };
  }

  getTextStyle(): Styles {
    return {
      fontSize: this.config.fontSize.md,
      color: this.colorUtility.hexToRgba(this.config.colors.secondary, 0.5),
    };
  }

  getToggleStyle(): Styles {
    return {
      backgroundColor: this.control.value
        ? this.config.colors.tertiary
        : this.colorUtility.hexToRgba(this.config.colors.quaternary, 0.5),
      borderColor: this.config.colors.tertiary,
      fontSize: this.config.fontSize.md,
      color: this.config.colors.primary,
    };
  }

  getRollerStyle(): Styles {
    return {
      backgroundColor: this.config.colors.primary,
    };
  }

  handleToggle(): void {
    this.control.setValue(!this.control.value);
  }

  handleFocus(): void {
    this.control.markAsTouched();
  }
}
