import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
})
export class SelectComponent {
  form: FormGroup;

  markdowns = [
    {
      markdown: `\`\`\`html
<ngx-zen-select
  label="Select"
  id="select"
  formControlName="assignee"
  placeholder="Select assignee"
  [options]="options"
></ngx-zen-select>
  \`\`\``,
      title: 'Basic select',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-select
  label="Select"
  id="select"
  formControlName="assignee"
  placeholder="Select assignee"
  [searchable]="true"
  [options]="options"
></ngx-zen-select>
  \`\`\``,
      title: 'Searchable select',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-select
  label="Select"
  id="select"
  formControlName="assignee"
  placeholder="Select assignee"
  [searchable]="true"
  searchPlaceholder="Search by name"
  [multiselect]="true"
  [options]="options"
></ngx-zen-select>
  \`\`\``,
      title: 'Multiselect searchable select',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-select
  label="Select"
  id="select"
  formControlName="assignee"
  placeholder="Select assignee"
  [searchable]="true"
  searchPlaceholder="Search by name"
  [multiselect]="true"
  [options]="options"
></ngx-zen-select>
  \`\`\``,
      title: 'Custom select',
    },
  ];
  options: any[] = [
    { label: 'Option 1', value: 'randomid' },
    { label: 'Option 2', value: 'randomid2' },
    { label: 'Option 3', value: 'randomid3' },
  ];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      assignee: ['randomid', [Validators.required]],
      assignee2: ['', [Validators.required]],
    });

    this.detectFormChanges();
  }

  detectFormChanges(): void {
    this.form.get('assignee2')?.valueChanges.subscribe((value: string) => {});
  }
}
