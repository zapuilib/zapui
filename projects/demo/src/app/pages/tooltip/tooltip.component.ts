import { Component } from '@angular/core';
import { ZapTooltip, ZapTooltipHandler, ZapTooltipContent } from 'zap';

import { SpacerComponent } from '../../components/spacer/spacer.component';
import { TitleComponent } from '../../components/title/title.component';
import { RowComponent } from '../../components/row/row.component';
import { CodeComponent } from '../../components/code-viewer/code/code.component';

@Component({
  selector: 'app-tooltip',
  imports: [
    SpacerComponent,
    TitleComponent,
    RowComponent,
    CodeComponent,
    ZapTooltip,
    ZapTooltipHandler,
    ZapTooltipContent,
  ],
  templateUrl: './tooltip.component.html',
  styleUrl: './tooltip.component.scss',
})
export class TooltipComponent {
  shape: 'curve' | 'pill' | 'flat' = 'flat';
  position: 'top' | 'bottom' | 'left' | 'right' | 'auto' = 'auto';
  basicComponentHtml = `<zap-tooltip>
  <zap-tooltip-handler>
    <button class="text-sm">Hover me</button>
  </zap-tooltip-handler>
  <zap-tooltip-content>
    <p>This is a tooltip!</p>
  </zap-tooltip-content>
</zap-tooltip>`;
  markdown: { title: string; markdown: string; language: string }[] = [
    {
      title: 'html',
      markdown: `<zap-tooltip>
  <zap-tooltip-handler>
    <button class="text-sm">Hover me</button>
  </zap-tooltip-handler>
  <zap-tooltip-content>
    <p>This is a tooltip!</p>
  </zap-tooltip-content>
</zap-tooltip>`,
      language: 'html',
    },
  ];
  markdownGlobal: { title: string; markdown: string; language: string } = {
    title: 'app.config.ts',
    markdown: `const ngxConfig: ZapConfig = {
  components: { 
    tooltip: {
      shape: 'curve'; 
      styles: {
        colors: {
          dark: {
            handlerBgColor: '#FFFFFF';
            contentBgColor: '#FFFFFF';
          };
        };
      }       
    }
  }
}`,
    language: 'typescript',
  };

  updateMarkdown(): void {
    const attributes = [
      this.shape !== 'flat' ? `shape="${this.shape}"` : '',
      this.position !== 'auto' ? `position="${this.position}"` : '',
    ]
      .filter((attr) => attr)
      .join(' ');

    this.basicComponentHtml = `<zap-tooltip>
  <zap-tooltip-handler ${attributes}>
    <button class="text-sm">Hover me</button>
  </zap-tooltip-handler>
  <zap-tooltip-content>
    <p>This is a tooltip!</p>
  </zap-tooltip-content>
</zap-tooltip>`;
    this.markdown[0].markdown = this.basicComponentHtml;
  }

  updateShape(shape: 'curve' | 'pill' | 'flat'): void {
    this.shape = shape;
    this.updateMarkdown();
  }

  updatePosition(position: 'top' | 'bottom' | 'left' | 'right' | 'auto'): void {
    this.position = position;
    this.updateMarkdown();
  }
}
