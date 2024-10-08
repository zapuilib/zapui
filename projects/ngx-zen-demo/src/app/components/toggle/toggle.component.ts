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
<ngx-zen-tooltip text="This is a tooltip" positionX="left"></ngx-zen-tooltip>
  \`\`\``,
      title: 'Position left',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-tooltip text="This is a tooltip" positionX="x-center"></ngx-zen-tooltip>
  \`\`\``,
      title: 'Position x-center',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-tooltip text="This is a tooltip" positionY="top"></ngx-zen-tooltip>
  \`\`\``,
      title: 'Position top',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-tooltip text="This is a tooltip" positionY="y-center"></ngx-zen-tooltip>
  \`\`\``,
      title: 'Position y-center',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-tooltip>
  <div>
    <h2>Title</h2>
    <p>Lorem ipsum dolor sit amet consectetur elit.</p>
  </div>
</ngx-zen-tooltip>
  \`\`\``,
      title: 'Custom body content',
    },
  ];

  constructor(private route: ActivatedRoute) {}
}
