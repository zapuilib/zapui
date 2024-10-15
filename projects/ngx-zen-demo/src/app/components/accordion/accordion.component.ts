import { Component } from '@angular/core';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
})
export class AccordionComponent {
  accordions = [
    { title: 'Accordion 1', content: 'Content for Accordion 1' },
    { title: 'Accordion 2', content: 'Content for Accordion 2' },
    { title: 'Accordion 3', content: 'Content for Accordion 3' },
  ];
  currentActiveIndex: number | null = 0;

  openAccordion(index: number) {
    this.currentActiveIndex = index;
  }

  setActiveIndex(index: number) {
    this.currentActiveIndex = index;
  }

  markdowns = [
    {
      markdown: `\`\`\`html
<ngx-zen-accordion
    title="Basic Accordion Title"
>
  <p class="text-black">Content for Basic Accordion</p>
</ngx-zen-accordion>
  \`\`\``,
      title: 'Basic Accordion',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-accordion
    title="Basic Accordion with subtitle"
    subtitle="Optional subtitle text"
>
  <p class="text-black">Content for Basic Accordion</p>
</ngx-zen-accordion>
  \`\`\``,
      title: 'Basic Accordion with subtitle',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-accordion
    title="Non-interactive Accordion"
    [disabled]="true"
>
  <p class="text-black">This content is not accessible when disabled.</p>

</ngx-zen-accordion>
  \`\`\``,
      title: 'Non-interactive Accordion',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-accordion-group [multiple]="false">
  <ngx-zen-accordion title="Accordion 1">
    <p class="text-black">Content for Accordion 1</p>
  </ngx-zen-accordion>
  <ngx-zen-accordion title="Accordion 2">
    <p class="text-black">Content for Accordion 2</p>
  </ngx-zen-accordion>
  <ngx-zen-accordion title="Accordion 3">
    <p class="text-black">Content for Accordion 3</p>
  </ngx-zen-accordion>
</ngx-zen-accordion-group>
  \`\`\``,
      title: 'Multiple',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-accordion-group [multiple]="false">
  @for (accordion of accordions; track accordion; let i = $index) {
    <ngx-zen-accordion [title]="accordion.title">
      <p class="text-black">{{ accordion.content }}</p>
    </ngx-zen-accordion>
  }
</ngx-zen-accordion-group>
  \`\`\``,
      title: 'Dynamic',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-accordion-group [multiple]="false" [activeIndex]="currentActiveIndex">
  <ngx-zen-accordion title="Accordion 1">
    <p class="text-black">Content for Accordion 1</p>
  </ngx-zen-accordion>
  <ngx-zen-accordion title="Accordion 2">
    <p class="text-black">Content for Accordion 2</p>
  </ngx-zen-accordion>
  <ngx-zen-accordion title="Accordion 3">
    <p class="text-black">Content for Accordion 3</p>
  </ngx-zen-accordion>
</ngx-zen-accordion-group>
  \`\`\``,
      title: 'Controlled',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-accordion
  title="Compact Accordion"
  size="compact"
>
  <p class="text-black">Compact size content</p>
</ngx-zen-accordion>
  \`\`\``,
      title: 'Compact Accordion',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-accordion
  title="Rounded Shape Accordion"
  shape="curve"
>
  <p class="text-black">Rounded shape content</p>
</ngx-zen-accordion>
  \`\`\``,
      title: 'Rounded Accordion',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-accordion
  title="Snappy Accordion"
  transition="snappy"
>
  <p class="text-black">Snappy transition content</p>
</ngx-zen-accordion>
  \`\`\``,
      title: 'Snappy Accordion',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-accordion
  title="Icon on left Accordion"
  iconPosition="left"
>
  <p class="text-black">Icon on left content</p>
</ngx-zen-accordion>
  \`\`\``,
      title: 'Icon on left Accordion',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-accordion
  title="Custom icons Accordion"
  openIcon="fa-chevron-up"
  closeIcon="fa-chevron-down"
>
  <p class="text-black">Accordion with custom icons</p>
</ngx-zen-accordion>
  \`\`\``,
      title: 'Custom Icon Accordion',
    },
  ];
}
