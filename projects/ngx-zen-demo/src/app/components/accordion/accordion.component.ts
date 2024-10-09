import { Component } from '@angular/core';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.scss',
})
export class AccordionComponent {
  markdowns = [
    {
      markdown: `\`\`\`html
<ngx-zen-accordion></ngx-zen-accordion>
  \`\`\``,
      title: 'Accordion',
    },
  ];
}
