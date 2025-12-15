import { Component } from '@angular/core';
import {
  ZapAccordionContent,
  ZapAccordionGroup,
  ZapAccordionHeader,
  ZapAccordionItem,
  ZapIconDirective,
} from 'zap';

import { SpacerComponent } from '../../components/spacer/spacer.component';
import { TitleComponent } from '../../components/title/title.component';
import { RowComponent } from '../../components/row/row.component';
import { PreviewCodeComponent } from '../../components/preview-code/preview-code.component';
import { CodeComponent } from '../../components/code-viewer/code/code.component';

@Component({
  selector: 'app-accordion',
  imports: [
    ZapAccordionGroup,
    ZapAccordionContent,
    ZapAccordionHeader,
    ZapAccordionItem,
    SpacerComponent,
    TitleComponent,
    RowComponent,
    ZapIconDirective,
    PreviewCodeComponent,
    CodeComponent,
  ],
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.scss',
})
export class AccordionComponent {
  variant: 'default' | 'nounderline' = 'default';
  icon: 'chevron' | 'plus' | 'none' = 'chevron';
  multiple: boolean = false;
  accordions = [
    {
      title: 'Accordion 1',
      content: 'Content for Accordion 1',
    },
    {
      title: 'Accordion 2',
      content: 'Content for Accordion 2',
    },
    {
      title: 'Accordion 3',
      content: 'Content for Accordion 3',
    },
  ];
  basicComponentHtml: string = `
<zap-accordion-group>
  @for(accordion of accordions; track $index) {
    <zap-accordion-item>
      <zap-accordion-header>
        {{ accordion.title }}
      </zap-accordion-header>
      <zap-accordion-content>
        <p>{{ accordion.content }}</p>
      </zap-accordion-content>
    </zap-accordion-item>
  }
</zap-accordion-group>`;
  usageMarkdown: { title: string; markdown: string; language: string } = {
    title: 'Usage',
    markdown: `import {
  ZapAccordionContent,
  ZapAccordionGroup,
  ZapAccordionHeader,
  ZapAccordionItem,
  ZapIconDirective, // import this if you want to use custom icon svg etc
} from 'zap/core';
 
imports: [
  ZapAccordionGroup,
  ZapAccordionContent,
  ZapAccordionHeader,
  ZapAccordionItem,
  ZapIconDirective,
],
`,
    language: 'ts',
  };
  markdown: { title: string; markdown: string; language: string }[] = [
    {
      title: 'html',
      markdown: `<zap-accordion-group>
@for(accordion of accordions; track $index) {
  <zap-accordion-item>
    <zap-accordion-header>
      {{ accordion.title }}
    </zap-accordion-header>
    <zap-accordion-content>
      <p>{{ accordion.content }}</p>
    </zap-accordion-content>
  </zap-accordion-item>
}
</zap-accordion-group>`,
      language: 'html',
    },
    {
      title: 'ts',
      markdown: `accordions = ${JSON.stringify(this.accordions, null, 2)}`,
      language: 'typescript',
    },
  ];
  markdownDirective: { title: string; markdown: string; language: string } = {
    title: 'html',
    markdown: `<zap-accordion-group>
  @for(accordion of accordions; track $index) {
    <zap-accordion-item>
      <zap-accordion-header>
        {{ accordion.title }}
        <svg zapIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path
            fill="#606060"
            d="M234 19.5c-5.8-4.7-14.1-4.7-20 0L54 147.5c-6.9 5.5-8 15.6-2.5 22.5s15.6 8 22.5 2.5l150-120 150 120c6.9 5.5 17 4.4 22.5-2.5s4.4-17-2.5-22.5L234 19.5zm160 345c6.9-5.5 8-15.6 2.5-22.5s-15.6-8-22.5-2.5l-150 120L74 339.5c-6.9-5.5-17-4.4-22.5 2.5s-4.4 17 2.5 22.5l160 128c5.8 4.7 14.1 4.7 20 0l160-128z"
          />
        </svg>
      </zap-accordion-header>
      <zap-accordion-content>
        <p>{{ accordion.content }}</p>
      </zap-accordion-content>
    </zap-accordion-item>
  }
</zap-accordion-group>`,
    language: 'html',
  };
  markdownGlobal: { title: string; markdown: string; language: string } = {
    title: 'app.config.ts',
    markdown: `const ngxConfig: ZapConfig = {
  components: { 
    accordion: {
      styles: {
        colors: {
          dark: {
            headerBgColor: '#FFFFFF';
          };
        };
        contentPadding: '15px';
      };
    }
  }
}`,
    language: 'typescript',
  };

  updateMarkdown(): void {
    const groupAttributes = [this.multiple !== false ? '[multiple]="true"' : '']
      .filter((attr) => attr)
      .join(' ');

    const headerAttributes = [
      this.variant !== 'default' ? `variant="${this.variant}"` : '',
      this.icon !== 'chevron' ? `icon="${this.icon}"` : '',
    ]
      .filter((attr) => attr)
      .join(' ');

    this.basicComponentHtml = `<zap-accordion-group ${groupAttributes}>
      @for(accordion of accordions; track $index) {
        <zap-accordion-item>
          <zap-accordion-header ${headerAttributes}>
            {{ accordion.title }}
          </zap-accordion-header>
          <zap-accordion-content>
            <p>{{ accordion.content }}</p>
          </zap-accordion-content>
        </zap-accordion-item>
      }
    </zap-accordion-group>`;
    this.markdown[0].markdown = this.basicComponentHtml;
  }

  updateVariant(variant: 'default' | 'nounderline'): void {
    this.variant = variant;
    this.updateMarkdown();
  }

  updateIcon(icon: 'chevron' | 'plus' | 'none'): void {
    this.icon = icon;
    this.updateMarkdown();
  }

  updateMultiple(multiple: boolean): void {
    this.multiple = multiple;
    this.updateMarkdown();
  }
}
