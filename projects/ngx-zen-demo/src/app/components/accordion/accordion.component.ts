// accordion.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
})
export class AccordionComponent {
  markdowns = [
    {
      markdown: `\`\`\`html
<ngx-zen-accordion title="Accordion Section 1">
  Basic content of section 1
</ngx-zen-accordion>
\`\`\``,
      title: 'Basic Accordion',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-accordion title="Accordion Section 2" [isOpen]="true">
  Default open content of section 2
</ngx-zen-accordion>
\`\`\``,
      title: 'Accordion with Default Open',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-accordion
  title="Accordion Section 3"
  zenClass="bg-gray-200 text-blue-700 shadow-md"
>
  Custom background content of section 3
</ngx-zen-accordion>
\`\`\``,
      title: 'Accordion with Custom Background',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-accordion title="Accordion Section 4">
  <ul class="list-disc list-inside">
    <li>Item 1</li>
    <li>Item 2</li>
  </ul>
</ngx-zen-accordion>
\`\`\``,
      title: 'Accordion with List Content',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-accordion title="Accordion Section 5" size="compact">
  Compact size content of section 5
</ngx-zen-accordion>
\`\`\``,
      title: 'Compact Accordion',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-accordion title="Accordion Section 6" size="large">
  Large size content of section 6
</ngx-zen-accordion>
\`\`\``,
      title: 'Large Accordion',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-accordion title="Accordion Section 7" shape="curve">
  Rounded shape content of section 7
</ngx-zen-accordion>
\`\`\``,
      title: 'Rounded Accordion',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-accordion title="Accordion Section 8" transition="snappy">
  Snappy transition content of section 8
</ngx-zen-accordion>
\`\`\``,
      title: 'Accordion with Snappy Transition',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-accordion title="Accordion Section 9" iconPosition="left">
  Icon on left content of section 9
</ngx-zen-accordion>
\`\`\``,
      title: 'Accordion with Icon on Left',
    },
  ];
}
