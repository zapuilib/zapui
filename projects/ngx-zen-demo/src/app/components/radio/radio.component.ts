import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
})
export class RadioComponent {
  form: FormGroup;
  customErrorMessages: Record<string, string> = {
    required: 'This field is required.',
  };
  markdowns = [
    {
      markdown: `\`\`\`html
<ngx-zen-checkbox
  id="terms"
  label="I accept the terms and conditions"
  formControlName="terms"
>
</ngx-zen-checkbox>
  \`\`\``,
      title: 'Basic checkbox',
    },
  ];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      contact: ['', Validators.required],
    });
  }
}
