import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrl: './textarea.component.scss'
})
export class TextareaComponent {
  form: FormGroup;
  markdowns = [
    {
      markdown: `\`\`\`html
<ngx-zen-textarea
  label="Description"
  id="description"
  formControlName="description"
  rows="5"
  placeholder="Add a description"
  >
</ngx-zen-textarea>
  \`\`\``,
      title: 'Basic textarea',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-textarea
  id="description"
  formControlName="description"
  rows="3"
  shape="curve"
  placeholder="Add a description"
  >
</ngx-zen-textarea>
  \`\`\``,
      title: 'Curved textarea without label',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-textarea
  id="description"
  formControlName="description"
  rows="1"
  shape="curve"
  placeholder="Add a description"
  resize="vertical"
  >
</ngx-zen-textarea>
  \`\`\``,
      title: 'Textarea with resize',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-textarea
  id="description"
  formControlName="description"
  rows="1"
  shape="curve"
  placeholder="Add a description"
  resize="auto"
  >
</ngx-zen-textarea>
  \`\`\``,
      title: 'Textarea with auto resize',
    },
  ];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(10),
        ],
      ],
      description2: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(10),
        ],
      ],
    });
  }
}
