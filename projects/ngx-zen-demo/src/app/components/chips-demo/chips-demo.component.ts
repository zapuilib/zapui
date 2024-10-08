import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chips-demo',
  templateUrl: './chips-demo.component.html',
  styleUrl: './chips-demo.component.scss',
})
export class ChipsDemoComponent {
  markdowns = [
    {
      markdown: `\`\`\`html
<ngx-zen-chip text="Basic Chip"></ngx-zen-chip>
  \`\`\``,
      title: 'Basic chip',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-chip text="Outlined Chip" variant="outlined"></ngx-zen-chip>
  \`\`\``,
      title: 'Outlined chip',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-chip text="Primary Chip" type="primary"></ngx-zen-chip>
  \`\`\``,
      title: 'Primary chip',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-chip text="Secondary Chip" type="secondary"></ngx-zen-chip>
  \`\`\``,
      title: 'Secondary chip',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-chip text="Success Chip" type="success"></ngx-zen-chip>
  \`\`\``,
      title: 'Success chip',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-chip text="Error Chip" type="error"></ngx-zen-chip>
  \`\`\``,
      title: 'Error chip',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-chip text="Warning Chip" type="warning"></ngx-zen-chip>
  \`\`\``,
      title: 'Warning chip',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-chip text="Info Chip" type="info"></ngx-zen-chip>
  \`\`\``,
      title: 'Info chip',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-chip text="Removable Chip" [removable]="true"></ngx-zen-chip>
  \`\`\``,
      title: 'Removable chip',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-chip text="Disabled Chip" [disabled]="true"></ngx-zen-chip>
  \`\`\``,
      title: 'Disabled chip',
    },
    // New chip variations
    {
      markdown: `\`\`\`html
<ngx-zen-chip text="Small Chip" size="small"></ngx-zen-chip>
<ngx-zen-chip text="Medium Chip" size="medium"></ngx-zen-chip>
<ngx-zen-chip text="Large Chip" size="large"></ngx-zen-chip>
  \`\`\``,
      title: 'Chip Sizes',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-chip text="Leading Icon" icon="fa-user"></ngx-zen-chip>
<ngx-zen-chip text="Trailing Icon" icon="fa-cog" iconPosition="right"></ngx-zen-chip>
  \`\`\``,
      title: 'Chips with Icons',
    },
  ];

  constructor(private route: ActivatedRoute) {}
}