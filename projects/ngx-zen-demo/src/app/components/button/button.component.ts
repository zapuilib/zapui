import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  markdowns = [
    {
      markdown: `\`\`\`html
<ngx-zen-button text="Submit"></ngx-zen-button>
  \`\`\``,
      title: 'Basic button',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-button text="Submit" shape="curve"></ngx-zen-button>
  \`\`\``,
      title: 'Curve button',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-button text="Submit" shape="pill"></ngx-zen-button>
  \`\`\``,
      title: 'Pill button',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-button text="Submit" size="compact"></ngx-zen-button>
  \`\`\``,
      title: 'Compact button',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-button text="Submit" size="tight"></ngx-zen-button>
  \`\`\``,
      title: 'Tight button',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-button text="Submit" size="wide"></ngx-zen-button>
  \`\`\``,
      title: 'Wide Button',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-button text="Submit" variant="outlined"></ngx-zen-button>
  \`\`\``,
      title: 'Outlined button',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-button
  text="Submit"
  icon="fa-arrow-up"
  shape="curve"
></ngx-zen-button>
  \`\`\``,
      title: 'Curve button with icon',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-button text="Submit" variant="link"></ngx-zen-button>
  \`\`\``,
      title: 'Link button',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-button
  text="Submit"
  type="icononly"
  icon="fa-search"
  shape="pill"
></ngx-zen-button>
\`\`\``,
      title: 'Icon only pill Button',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-button
  text="Submit"
  [disabled]="true"
></ngx-zen-button>
\`\`\``,
      title: 'Disabled Button',
    },
  ];

  constructor(private route: ActivatedRoute) {}
}
