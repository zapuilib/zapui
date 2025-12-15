import { Component } from '@angular/core';
import { ZapChip, ZapIconDirective } from 'zap';

import { SpacerComponent } from '../../components/spacer/spacer.component';
import { TitleComponent } from '../../components/title/title.component';
import { RowComponent } from '../../components/row/row.component';
import { PreviewCodeComponent } from '../../components/preview-code/preview-code.component';
import { CodeComponent } from '../../components/code-viewer/code/code.component';

@Component({
  selector: 'app-chip',
  imports: [
    SpacerComponent,
    TitleComponent,
    RowComponent,
    PreviewCodeComponent,
    ZapChip,
    ZapIconDirective,
    CodeComponent,
  ],
  templateUrl: './chip.component.html',
  styleUrl: './chip.component.scss',
})
export class ChipComponent {
  text: string = 'Country';
  variant: 'outlined' | 'default' = 'default';
  shape: 'pill' | 'curve' | 'flat' | undefined = 'pill';
  size: 'base' | 'compact' | 'wide' = 'base';
  type: 'default' | 'info' | 'success' | 'warning' | 'error' = 'default';
  icon: string | undefined = '';
  iconPosition: 'left' | 'right' = 'left';
  basicComponentHtml: string = `<zap-chip text="Country"></zap-chip>`;
  markdown: { title: string; markdown: string; language: string }[] = [
    {
      title: 'html',
      markdown: `<zap-chip text="Country"></zap-chip>`,
      language: 'html',
    },
  ];
  markdownDirective: { title: string; markdown: string; language: string } = {
    title: 'html',
    markdown: `<zap-chip>
    <svg zapIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <path
        fill="currentColor"
        d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24l0 112c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-112c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"
      />
    </svg>
  </zap-chip>`,
    language: 'html',
  };
  markdownGlobal: { title: string; markdown: string; language: string } = {
    title: 'app.config.ts',
    markdown: `const ngxConfig: ZapConfig = {
  components: { 
    chip: {
      shape: 'pill',
      size: 'compact',
      styles: {
        colors: {
          dark: {
            bgColor: '#1877F2',
          },
        },
        borderRadius: '15px',
      },
    }
  }
}`,
    language: 'typescript',
  };

  updateMarkdown(): void {
    const attributes = [
      this.variant !== 'default' ? `variant="${this.variant}"` : '',
      this.shape !== 'flat' ? `shape="${this.shape}"` : '',
      this.size !== 'base' ? `size="${this.size}"` : '',
      this.type !== 'default' ? `type="${this.type}"` : '',
      this.icon ? `icon="${this.icon}"` : '',
      this.iconPosition !== 'left' ? `iconPosition="${this.iconPosition}"` : '',
    ]
      .filter((attr) => attr)
      .join(' ');

    this.basicComponentHtml = `<zap-chip text="Country" ${attributes}></zap-chip>`;
    this.markdown[0].markdown = this.basicComponentHtml;
  }

  updateVariant(variant: 'outlined' | 'default'): void {
    this.variant = variant;
    this.updateMarkdown();
  }

  updateShape(shape: 'pill' | 'curve' | 'flat' | undefined): void {
    this.shape = shape;
    this.updateMarkdown();
  }

  updateSize(size: 'base' | 'compact' | 'wide'): void {
    this.size = size;
    this.updateMarkdown();
  }

  updateType(type: 'default' | 'info' | 'success' | 'warning' | 'error'): void {
    this.type = type;
    this.updateMarkdown();
  }

  updateIcon(icon: string | undefined): void {
    if (icon !== this.icon) {
      this.icon = icon;
    } else {
      this.icon = '';
      this.iconPosition = 'left';
    }
    this.updateMarkdown();
  }

  updateIconPosition(position: 'left' | 'right'): void {
    this.iconPosition = position;
    this.icon = 'fa-send';
    this.updateMarkdown();
  }
}
