import { Component, forwardRef, Input } from '@angular/core';
import {
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ControlValueAccessorDirective } from '../directives/control-value-accessor.directive';
import { ValidationErrorComponent } from '../validation-error/validation-error.component';

@Component({
  selector: 'zap-textarea',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ValidationErrorComponent,
  ],
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ZapTextarea),
      multi: true,
    },
  ],
})
export class ZapTextarea<T> extends ControlValueAccessorDirective<T> {
  @Input() label: string = '';
  @Input() id: string = '';
  @Input() rows: string = '10';
  @Input() zapClass: string = '';
  @Input() shape: 'curve' | 'flat' = 'flat';
  @Input() customErrorMessages: Record<string, string> = {};
  @Input() placeholder: string = '';
  @Input() resize: 'none' | 'vertical' | 'horizontal' | 'auto' = 'none';

  //TODO: add a help text

  adjustRows(event: Event) {
    if (this.resize === 'auto') {
      const textarea = event.target as HTMLTextAreaElement;
      textarea.rows = parseInt(this.rows);
      const newRows = Math.ceil(textarea.scrollHeight / 24) - 1;
      textarea.rows = newRows > 10 ? 10 : newRows;
    }
  }

  get classes(): string[] {
    return [this.shape, this.zapClass].filter(
      (cls) => cls && cls !== 'default'
    );
  }
}
