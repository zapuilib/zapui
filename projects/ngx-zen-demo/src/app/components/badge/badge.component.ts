import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss'],
})
export class BadgeComponent {
  markdowns = [
    {
      markdown: `\`\`\`html
<ngx-zen-badge variant="empty"></ngx-zen-badge>
  \`\`\``,
      title: 'Empty badge',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-badge variant="content" [count]="1"></ngx-zen-badge>
  \`\`\``,
      title: 'Badge with content',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-badge variant="border" [count]="99"></ngx-zen-badge>
  \`\`\``,
      title: 'Badge with border',
    },
  ];

  constructor(public route: ActivatedRoute) {}
} 