import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(10),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^(?:\\+1)?\\s?(\\d{3})?[-.\\s]?\\d{3}[-.\\s]?\\d{4}$'
          ),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  customErrorMessages: Record<string, string> = {
    required: 'This field is required.',
    email: 'Please enter a valid email address',
    minlength: 'Minimum length required is 3',
    maxlength: 'Maximum length allowed is 10',
    pattern: 'Please enter a valid phone number',
    min: 'Minimum value allowed is 0',
    max: 'Maximum value allowed is 10',
  };
}
