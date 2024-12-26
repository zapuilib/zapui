import { ChangeDetectorRef } from '@angular/core';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { delay, map, Observable, of } from 'rxjs';

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
    { label: 'Option A', value: 'randomid' },
    { label: 'Option B', value: 'randomid2' },
    { label: 'Option C', value: 'randomid3' },
  ];

  options2: any[] = [
    { label: 'Option A', value: 'randomid' },
    { label: 'Option B', value: 'randomid2' },
    { label: 'Option C', value: 'randomid3' },
  ]
  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef) {
    this.form = this.fb.group({
      assignee: ['randomid', [Validators.required]],
      assignee2: ['', [Validators.required]],
    });

    this.detectFormChanges();
  }

  detectFormChanges(): void {
    this.form.get('assignee2')?.valueChanges.subscribe((value: string) => {});
  }

  resetForm(): void {
    this.form.reset();
  }

  getRandomFruitOptions(searchTerm: string): Observable<{ label: string; value: string }[]> {
    const fruits = [
      { label: 'Apple', value: 'apple' },
      { label: 'Banana', value: 'banana' },
      { label: 'Cherry', value: 'cherry' },
      { label: 'Date', value: 'date' },
      { label: 'Elderberry', value: 'elderberry' },
      { label: 'Fig', value: 'fig' },
      { label: 'Grape', value: 'grape' },
      { label: 'Honeydew', value: 'honeydew' },
    ];
  
    return of(fruits).pipe(
      delay(1000),
      map((allFruits) =>
        allFruits.filter((fruit) =>
          fruit.label.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    );
  }

  handleSearch(searchTerm: string): void {
    this.getRandomFruitOptions(searchTerm).subscribe((options: any) => {
      this.options = options;
    });
  }

  handleReset(): void {
    this.options = this.options2;
  }
}
