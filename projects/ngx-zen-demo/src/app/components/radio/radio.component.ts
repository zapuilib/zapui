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
    [options]="[
        { name: 'Email 1', value: 'email1' },
        { name: 'Phone 1', value: 'phone1' },
        { name: 'None 1', value: 'none1' }
    ]"
    formControlName="contact1"
>
</ngx-zen-checkbox>
  \`\`\``,
      title: 'Basic radio',
    },
    {
      markdown: `\`\`\`html
<fieldset>
  <ngx-zen-radio
            label="Contact method"
            [options]="[
                { name: 'Email 2', value: 'email2' },
                { name: 'Phone 2', value: 'phone2' },
                { name: 'None 2', value: 'none2' }
            ]"
            formControlName="contact2"
    ></ngx-zen-radio>
</fieldset>
  \`\`\``,
      title: 'With label',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-checkbox
    [options]="[
        { name: 'Email 3', value: 'email3' },
        { name: 'Phone 3', value: 'phone3' },
        { name: 'None 3', value: 'none3' }
    ]"
    formControlName="contact3"
    variant="horizontal"
>
</ngx-zen-checkbox>
  \`\`\``,
      title: 'Horizontal radio',
    },
  ];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      contact1: ['', Validators.required],
      contact2: ['', Validators.required],
      contact3: ['', Validators.required],
    });
  }
}
