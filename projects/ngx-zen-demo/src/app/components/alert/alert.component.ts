import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
})
export class AlertComponent {
  markdowns = [
    {
      markdown: `\`\`\`html
<ngx-zen-alert>You have a new alert</ngx-zen-alert>
  \`\`\``,
      title: 'Basic alert',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-alert type="info">A new version is available</ngx-zen-alert>
  \`\`\``,
      title: 'Info alert',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-alert type="success">Sucessfully exported</ngx-zen-alert>
  \`\`\``,
      title: 'Success alert',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-alert type="error">Something went wrong</ngx-zen-alert>
  \`\`\``,
      title: 'Error alert',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-alert type="warning">You have 5 days left until deadline</ngx-zen-alert>
  \`\`\``,
      title: 'Warning alert',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-alert type="success" variant="classic">Sucessfully exported</ngx-zen-alert>
  \`\`\``,
      title: 'Classic alert',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-alert type="success" shape="curve">Sucessfully exported</ngx-zen-alert>
  \`\`\``,
      title: 'Curve alert',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-alert type="info" icon="fa-circle-info">A new version is available</ngx-zen-alert>
  \`\`\``,
      title: 'Custom icon alert',
    },
  ];
}
