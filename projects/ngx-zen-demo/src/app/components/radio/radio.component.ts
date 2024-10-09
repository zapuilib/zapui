import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
})
export class RadioComponent {
  form: FormGroup;
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
    {
      markdown: `\`\`\`html
<ngx-zen-checkbox
  id="terms"
  formControlName="terms"
>
</ngx-zen-checkbox>
  \`\`\``,
      title: 'Checkbox without label',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-checkbox
  id="terms"
  formControlName="terms"
  shape="curve"
>
</ngx-zen-checkbox>
  \`\`\``,
      title: 'Curved checkbox',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-checkbox
  id="terms"
  formControlName="terms"
  shape="pill"
>
</ngx-zen-checkbox>
  \`\`\``,
      title: 'Pill checkbox',
    },
  ];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      terms: ['', [Validators.required]],
      terms2: ['', [Validators.required]],
      terms3: ['', [Validators.required]],
      terms4: ['', [Validators.required]],
    });
  }
}
