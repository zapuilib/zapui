import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent {
  form: FormGroup;
  customErrorMessages: Record<string, string> = {
    required: 'This field is required.',
    email: 'Please enter a valid email address',
    minlength: 'Minimum length required is 3',
    maxlength: 'Maximum length allowed is 10',
    pattern: 'Please enter a valid phone number',
    min: 'Minimum value allowed is 0',
    max: 'Maximum value allowed is 10',
  };
  markdowns = [
    {
      markdown: `\`\`\`html
<ngx-zen-input
  #username
  label="Username"
  id="username"
  type="text"
  formControlName="username"
  placeholder="Enter your username"
></ngx-zen-input>
  \`\`\``,
      title: 'Basic input',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-input
  #username
  id="username"
  type="text"
  formControlName="username"
  placeholder="Enter your username"
></ngx-zen-input>
  \`\`\``,
      title: 'Input without label',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-input
  #username
  id="username"
  type="text"
  icon="fa-user"
  formControlName="username"
  placeholder="Enter your username"
></ngx-zen-input>
  \`\`\``,
      title: 'Input with icon',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-input
  #search
  id="search"
  type="text"
  icon="fa-search"
  iconPosition="right"
  formControlName="search"
  placeholder="Enter your search"
></ngx-zen-input>
  \`\`\``,
      title: 'Input with icon on right',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-input
  #search
  id="search"
  type="text"
  size="compact"
  formControlName="search"
  placeholder="Enter your search"
></ngx-zen-input>
  \`\`\``,
      title: 'Compact input',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-input
  #search
  id="search"
  type="text"
  shape="pill"
  formControlName="search"
  placeholder="Enter your search"
></ngx-zen-input>
  \`\`\``,
      title: 'Pill input',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-input
  #search
  id="search"
  type="text"
  shape="curve"
  formControlName="search"
  placeholder="Enter your search"
></ngx-zen-input>
  \`\`\``,
      title: 'Curve input',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-input
  #email
  id="email"
  type="email"
  formControlName="email"
  placeholder="Enter your email"
></ngx-zen-input>
  \`\`\``,
      title: 'Email input',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-input
  #password
  id="password"
  type="password"
  formControlName="password"
  placeholder="Enter your password"
></ngx-zen-input>
  \`\`\``,
      title: 'Password input',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-input
  #age
  id="age"
  type="number"
  formControlName="age"
  placeholder="Enter your age"
></ngx-zen-input>
  \`\`\``,
      title: 'Number input',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-input
  #phone
  id="phone"
  type="tel"
  formControlName="phone"
  placeholder="Enter your phone"
></ngx-zen-input>
  \`\`\``,
      title: 'Tel input',
    },
  ];

  usages = [
    `\`\`\`typeScript
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
      search: ['', []],
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
      age: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
}
  \`\`\``,
`\`\`\`javascript
  customErrorMessages: Record<string, string> = {
    required: 'This field is required.',
    email: 'Please enter a valid email address',
    minlength: 'Minimum length required is 3',
    maxlength: 'Maximum length allowed is 10',
    pattern: 'Please enter a valid phone number',
    min: 'Minimum value allowed is 0',
    max: 'Maximum value allowed is 10',
  };
\`\`\``,
  ];

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
      username2: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(10),
        ],
      ],
      username3: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(10),
        ],
      ],
      search: ['', []],
      search2: ['', []],
      search3: ['', []],
      search4: ['', []],
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
      age: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
}