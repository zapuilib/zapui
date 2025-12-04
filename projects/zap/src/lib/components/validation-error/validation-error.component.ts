import { CommonModule } from '@angular/common';
import { Component, input, OnChanges, SimpleChanges } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Component({
  selector: 'validation-error',
  imports: [CommonModule],
  templateUrl: './validation-error.component.html',
  styleUrls: ['./validation-error.component.scss'],
})
export class ValidationErrorComponent implements OnChanges {
  errors = input<Record<string, ValidationErrors> | null>({});
  customErrorMessages = input<Record<string, string> | null>({});
  zapClass = input<string>();
  color = input<string>();
  errorMessages: Record<string, string> = {
    required: 'This field is required.',
    minlength: 'Value is too short',
    maxlength: 'Value is too long',
    email: 'Invalid email address',
    min: 'Value is too low',
    max: 'Value is too high',
    pattern: 'Invalid pattern',
  };

  ngOnChanges(changes: SimpleChanges): void {
    const { customErrorMessages } = changes;
    if (customErrorMessages) {
      this.errorMessages = {
        ...this.errorMessages,
        ...customErrorMessages.currentValue,
      };
    }
  }
}
