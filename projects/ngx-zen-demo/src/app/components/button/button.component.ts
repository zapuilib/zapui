import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  markdown = [
    `\`\`\`html
<ngx-zen-button text="Submit"></ngx-zen-button>
\`\`\``,

    `\`\`\`html
<ngx-zen-button text="Submit" theme="light" shape="curve"></ngx-zen-button>
\`\`\``,
    `\`\`\`html
<ngx-zen-button text="Submit" theme="light" shape="pill"></ngx-zen-button>
\`\`\``,

    `\`\`\`html
<ngx-zen-button text="Submit" theme="light" size="compact"></ngx-zen-button>
\`\`\``,

`\`\`\`html
<ngx-zen-button text="Submit" theme="light" size="tight"></ngx-zen-button>
\`\`\``,

    `\`\`\`html
<ngx-zen-button text="Submit" theme="light" size="wide"></ngx-zen-button>
\`\`\``,

    `\`\`\`html
<ngx-zen-button text="Submit" theme="light" variant="outlined"></ngx-zen-button>
\`\`\``,

    `\`\`\`html
<ngx-zen-button
  text="Submit"
  theme="light"
  icon="fa-arrow-up"
  shape="curve"
></ngx-zen-button>
\`\`\``,

    `\`\`\`html
<ngx-zen-button text="Submit" theme="light" variant="link"></ngx-zen-button>
\`\`\``,

    `\`\`\`html
<ngx-zen-button
  text="Submit"
  theme="light"
  type="icononly"
  icon="fa-search"
  shape="pill"
></ngx-zen-button>
\`\`\``,

    `\`\`\`html
<ngx-zen-button
  text="Submit"
  theme="light"
  [disabled]="true"
></ngx-zen-button>
\`\`\``,
  ];

  constructor(private route: ActivatedRoute) {}
}
