import { Component, ElementRef, forwardRef, Input, ViewChild } from '@angular/core';
import {
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';

import { ControlValueAccessorDirective } from '../directives/control-value-accessor.directive';
import { CommonModule } from '@angular/common';
import { ValidationErrorComponent } from '../validation-error/validation-error.component';

@Component({
  selector: 'zap-checkbox',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ValidationErrorComponent,
  ],
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ZapCheckbox),
      multi: true,
    },
  ],
})
export class ZapCheckbox<T> extends ControlValueAccessorDirective<T> {
  @ViewChild('checkbox') checkbox!: ElementRef;
  @Input() label: string = '';
  @Input() customErrorMessages: Record<string, string> = {};
  @Input() zapClass: string = '';
  @Input() id: string = '';
  @Input() shape: 'curve' | 'flat' = 'flat';
  @Input() size: 'compact' | 'base' = 'base';
  @Input() labelPosition: 'left' | 'right' = 'right';
  @Input() checked: boolean = false;

  override ngOnInit(): void {
    super.ngOnInit();
    this.handleDefultValue();
  }

  handleDefultValue(): void {
    this.control.setValue(this.checked);
  }

  get classes(): string[] {
    return [this.shape, this.size, this.labelPosition, this.zapClass].filter(
      (cls) => cls && cls !== 'default'
    );
  }
}
