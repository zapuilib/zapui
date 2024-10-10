import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-notification-demo',
  templateUrl: './notification-demo.component.html',
  styleUrls: ['./notification-demo.component.scss'],
})
export class NotificationDemoComponent {
  markdowns = [
    {
      markdown: `\`\`\`html
<ngx-zen-notification variant="empty"></ngx-zen-notification>
  \`\`\``,
      title: 'Empty notification',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-notification variant="content" [count]="1"></ngx-zen-notification>
  \`\`\``,
      title: 'Notification with content',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-notification variant="border" [count]="99"></ngx-zen-notification>
  \`\`\``,
      title: 'Notification with border',
    },
  ];

  constructor(public route: ActivatedRoute) {}
}