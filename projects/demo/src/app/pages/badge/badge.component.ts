import { Component } from '@angular/core';
import { ZapBadge } from 'zap';

import { SpacerComponent } from '../../components/spacer/spacer.component';
import { TitleComponent } from '../../components/title/title.component';
import { RowComponent } from '../../components/row/row.component';
import { CodeComponent } from '../../components/code-viewer/code/code.component';

@Component({
  selector: 'app-badge',
  imports: [CodeComponent, SpacerComponent, RowComponent, TitleComponent, ZapBadge],
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.scss',
})
export class BadgeComponent {
  variant: 'empty' | 'default' | 'outlined' = 'default';
  type: 'default' | 'info' | 'success' | 'warning' | 'error' = 'default';
  count: number = 10;
  basicComponentHtml: string = `<zap-badge [count]="10"></zap-badge>`;
  markdown: { title: string; markdown: string; language: string }[] = [
    {
      title: 'html',
      markdown: `<zap-badge [count]="10"></zap-badge>`,
      language: 'html',
    },
  ];
  markdownGlobal: { title: string; markdown: string; language: string } = {
    title: 'app.config.ts',
    markdown: `const ngxConfig: ZapConfig = {
  components: { 
    badge: {
      styles: {
        colors: {
          dark: {
            bgColor: '#1877F2',
          },
        },
      },
    }
  }
}`,
    language: 'typescript',
  };

  updateMarkdown(): void {
    const attributes = [
      this.variant !== 'default' ? `variant="${this.variant}"` : '',
      this.type !== 'default' ? `type="${this.type}"` : '',
    ]
      .filter((attr) => attr)
      .join(' ');

    this.basicComponentHtml = `<zap-badge [count]="10" ${attributes}></zap-badge>`;
    this.markdown[0].markdown = this.basicComponentHtml;
  }

  updateVariant(variant: 'empty' | 'default' | 'outlined'): void {
    this.variant = variant;
    this.updateMarkdown();
  }

  updateType(type: 'default' | 'info' | 'success' | 'warning' | 'error'): void {
    this.type = type;
    this.updateMarkdown();
  }
}
