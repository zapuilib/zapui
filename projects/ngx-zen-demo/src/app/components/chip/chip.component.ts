import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chip',
  templateUrl: './chip.component.html',
  styleUrl: './chip.component.scss',
})
export class ChipComponent {
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
<ngx-zen-chip text="dismissible Chip" [dismissible]="true"></ngx-zen-chip>
  \`\`\``,
      title: 'dismissible chip',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-chip text="Disabled Chip" [disabled]="true"></ngx-zen-chip>
  \`\`\``,
      title: 'Disabled chip',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-chip text="Small Chip" size="small"></ngx-zen-chip>
  \`\`\``,
      title: 'Small Chip',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-chip text="Wide Chip" size="wide"></ngx-zen-chip>
  \`\`\``,
      title: 'Wide Chip',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-chip text="Wider Chip" size="wider"></ngx-zen-chip>
  \`\`\``,
      title: 'Wider Chip',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-chip text="Leading Icon" icon="fa-user"></ngx-zen-chip>
  \`\`\``,
      title: 'Chips with Leading Icons',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-chip text="Trailing Icon" iconPosition="right" icon="fa-cog"></ngx-zen-chip>
  \`\`\``,
      title: 'Chips with Trailing Icons',
    },
  ];

  constructor(private route: ActivatedRoute) {}
}
