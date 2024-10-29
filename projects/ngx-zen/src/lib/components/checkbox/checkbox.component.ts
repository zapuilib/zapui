import {
  Component,
  ElementRef,
  forwardRef,
  Input,
  ViewChild,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { ControlValueAccessorDirective } from '../../directives/control-value-accessor.directive';

@Component({
  selector: 'ngx-zen-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
  ],
})
export class CheckboxComponent<T> extends ControlValueAccessorDirective<T> {
  @ViewChild('checkbox') checkbox!: ElementRef;
  @Input() label: string = '';
  @Input() customErrorMessages: Record<string, string> = {};
  @Input() zenClass: string = '';
  @Input() id: string = '';
  @Input() shape: 'pill' | 'curve' | 'default' = 'default';
  @Input() size: 'compact' | 'default' = 'default';
  @Input() labelPosition: 'left' | 'right' = 'right';
  @Input() checked: boolean = false;

  override ngOnInit(): void {
    super.ngOnInit();
    this.handleDefultValue();
  }

  handleDefultValue(): void {
    this.control.setValue(this.checked);
  }

  getCheckboxStyle(): any {
    return {
      'background-color': this.control.value
        ? this.config.colors.tertiary
        : 'transparent',
      'border-color': this.control.value
        ? this.config.colors.tertiary
        : this.config.colors.secondary,
      'font-size': this.config.fontSize.md,
      color: this.config.colors.primary,
    };
  }
}
