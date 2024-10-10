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
<ngx-zen-accordion
    title="Accordion Section 1"
    zenClass="text-black bg-gray-200"
>
  <div class="bg-gray-100 py-3 px-2">
    <p class="text-black">Basic content of section 1</p>
  </div>
</ngx-zen-accordion>
  \`\`\``,
      title: 'Basic Accordion',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-accordion
    title="Accordion Section 2"
    [isOpen]="true"
    zenClass="text-black bg-gray-200"
>
  <div class="bg-gray-100 py-3 px-2 border border-color-gray-100">
    <p class="text-black">Default open content of section 2</p>
  </div>
</ngx-zen-accordion>
  \`\`\``,
      title: 'Accordion with Default Open',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-accordion
    title="Accordion Section 3"
    zenClass="text-black bg-gray-200"
>
  <ul class="list-disc list-inside px-2 py-2">
    <li class="text-black">Item 1</li>
    <li class="text-black">Item 2</li>
  </ul>
  <ol class="list-decimal list-inside px-2 py-2">
    <li class="text-black">Item 1</li>
    <li class="text-black">Item 2</li>
  </ol>
</ngx-zen-accordion>
  \`\`\``,
      title: 'Accordion with List Content',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-accordion
    title="Accordion Section 4"
    size="compact"
    zenClass="text-black bg-gray-200"
>
  <div class="bg-gray-100 p-2 text-sm">
    <p class="text-black">Compact size content of section 4</p>
  </div>
</ngx-zen-accordion>
  \`\`\``,
      title: 'Compact Accordion',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-accordion
    title="Accordion Section 5"
    size="large"
    zenClass="text-black bg-gray-200"
>
  <div class="bg-gray-100 p-6 text-lg">
    <p class="text-black">Large size content of section 5</p>
  </div>
</ngx-zen-accordion>
  \`\`\``,
      title: 'Large Accordion',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-accordion
    title="Accordion Section 6"
    shape="curve"
    zenClass="text-black bg-gray-200"
>
  <div class="bg-gray-100 py-3 px-2 rounded-lg">
    <p class="text-black">Rounded shape content of section 6</p>
  </div>
</ngx-zen-accordion>
  \`\`\``,
      title: 'Rounded Accordion',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-accordion
    title="Accordion Section 7"
    transition="snappy"
    zenClass="text-black bg-gray-200"
>
  <div class="bg-gray-100 py-3 px-2">
    <p class="text-black">Snappy transition content of section 7</p>
  </div>
</ngx-zen-accordion>
  \`\`\``,
      title: 'Accordion with Snappy Transition',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-accordion
    title="Accordion Section 8"
    iconPosition="left"
    zenClass="text-black bg-gray-200"
>
  <div class="bg-gray-100 py-3 px-2">
    <p class="text-black">Icon on left content of section 8</p>
  </div>
</ngx-zen-accordion>
  \`\`\``,
      title: 'Accordion with Icon on Left',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-accordion
    title="Accordion Section 9"
    iconPosition="left"
    openIcon="fa-chevron-up"
    closeIcon="fa-chevron-down"
    zenClass="text-black bg-gray-200"
>
  <div class="bg-gray-100 py-3 px-2">
    <p class="text-black">Accordion with different open and close icons</p>
  </div>
</ngx-zen-accordion>
  \`\`\``,
      title: 'Accordion with Custom Icons for Open and Close',
    },
  ];
}
