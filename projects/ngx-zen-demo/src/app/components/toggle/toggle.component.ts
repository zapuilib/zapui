import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrl: './toggle.component.scss',
})
export class ToggleComponent {
  form: FormGroup;
  markdowns = [
    {
      markdown: `\`\`\`html
<ngx-zen-toggle></ngx-zen-toggle>
  \`\`\``,
      title: 'Basic toggle',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-toggle label="Label"></ngx-zen-toggle>
  \`\`\``,
      title: 'With label',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-toggle label="Label" text="Help text"></ngx-zen-toggle>
  \`\`\``,
      title: 'With label and help text',
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
