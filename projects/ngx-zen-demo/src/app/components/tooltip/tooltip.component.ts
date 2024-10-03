import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrl: './tooltip.component.scss',
})
export class TooltipComponent {
  markdowns = [
    {
      markdown: `\`\`\`html
<ngx-zen-tooltip text="This is a tooltip"></ngx-zen-tooltip>
  \`\`\``,
      title: 'Basic tooltip',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-tooltip text="This is a tooltip" positionX="left"></ngx-zen-tooltip>
  \`\`\``,
      title: 'Position left',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-tooltip text="This is a tooltip" positionY="top"></ngx-zen-tooltip>
  \`\`\``,
      title: 'Position top',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-tooltip text="This is a tooltip" triggerType="click"></ngx-zen-tooltip>
  \`\`\``,
      title: 'Trigger on click',
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
