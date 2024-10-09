import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrl: './toggle.component.scss',
})
export class ToggleComponent {
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

  constructor(private route: ActivatedRoute) {}
}
