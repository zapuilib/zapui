import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { ControlValueAccessorDirective } from '../../directives/control-value-accessor.directive';

import type { Styles } from '../../interfaces/style.interface';

@Component({
  selector: 'ngx-zen-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioComponent),
      multi: true,
    },
  ],
})
export class RadioComponent<T> extends ControlValueAccessorDirective<T> {
  @Input() options: { name?: string; value: string }[] = [];
  @Input() customErrorMessages: Record<string, string> = {};
  @Input() zenClass: string = '';
  @Input() variant: 'vertical' | 'horizontal' = 'vertical';

  getLabelStyle(): Styles {
    return {
      color: this.config.colors.secondary,
      fontSize: this.config.fontSize.md,
    };
  }

  getRadioStyle(): Styles {
    return {
      backgroundColor: 'transparent',
      borderColor: this.config.colors.secondary,
    };
  }
}
