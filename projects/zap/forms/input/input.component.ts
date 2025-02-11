import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
} from '@angular/core';
import {
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ControlValueAccessorDirective } from '../directives/control-value-accessor.directive';
import { ValidationErrorComponent } from '../validation-error/validation-error.component';

type InputType = 'password' | 'text' | 'number' | 'email' | 'tel';

@Component({
  selector: 'zap-input',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ValidationErrorComponent,
  ],
  templateUrl: 'input.component.html',
  styleUrls: ['input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ZapInputComponent),
      multi: true,
    },
  ],
})
export class ZapInputComponent<T> extends ControlValueAccessorDirective<T> {
  @Output() iconClick: EventEmitter<void> = new EventEmitter<void>();
  @Input() type: InputType = 'text';
  @Input() label: string = '';
  @Input() id: string = '';
  @Input() placeholder: string = '';
  @Input() customErrorMessages: Record<string, string> = {};
  @Input() zapClass: string = '';
  @Input() size: 'compact' | 'base' = 'base';
  @Input() shape!: 'pill' | 'curve' | 'flat';
  @Input() icon!: string;
  @Input() iconPosition: 'left' | 'right' = 'left';
  @Input() autoComplete: string = 'off';

  handleIconClick(event: any): void {
    event.stopPropagation();
    this.iconClick.emit();
  }

  //TODO: Support custom icon (not a font) via iconTemplate

  get classes(): string[] {
    return [
      this.shape,
      this.zapClass,
      this.size,
      this.icon ? this.iconPosition : '',
    ].filter((cls) => cls && cls !== 'default');
  }
}
