import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { ControlValueAccessorDirective } from '../../directives/control-value-accessor.directive';

@Component({
  selector: 'ngx-zen-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextareaComponent),
      multi: true,
    },
  ],
})
export class TextareaComponent<T> extends ControlValueAccessorDirective<T> {
  @Input() label: string = '';
  @Input() id: string = '';
  @Input() rows: string = '10';
  @Input() zenClass: string = '';
  @Input() shape: 'curve' | 'default' = 'default';
  @Input() customErrorMessages: Record<string, string> = {};
  @Input() placeholder: string = '';
  @Input() resize: 'none' | 'vertical' | 'auto' = 'none';

  adjustRows(event: Event) {
    if (this.resize === 'auto') {
      const textarea = event.target as HTMLTextAreaElement;
      textarea.rows = parseInt(this.rows);
      const newRows = Math.ceil(textarea.scrollHeight / 24) - 1;
      textarea.rows = newRows > 10 ? 10 : newRows;
    }
  }
}
