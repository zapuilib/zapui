import { Component } from '@angular/core';
import { ZapButton, ZapIconDirective } from 'zap';
import { CommonModule } from '@angular/common';

import { TitleComponent } from '../../components/title/title.component';
import { CodeComponent } from '../../components/code-viewer/code/code.component';
import { SpacerComponent } from '../../components/spacer/spacer.component';
import { RowComponent } from '../../components/row/row.component';
import { PreviewCodeComponent } from '../../components/preview-code/preview-code.component';

@Component({
  selector: 'app-button',
  imports: [
    CommonModule,
    ZapButton,
    TitleComponent,
    CodeComponent,
    SpacerComponent,
    RowComponent,
    ZapIconDirective,
    PreviewCodeComponent,
  ],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  size: 'compact' | 'wide' | 'tight' | 'base' | undefined = 'base';
  shape: 'pill' | 'curve' | 'flat' | undefined = 'flat';
  icon: string = '';
  iconPosition: 'left' | 'right' = 'left';
  type: 'info' | 'success' | 'warning' | 'error' | 'default' = 'default';
  img: string | undefined = '';
  imagePosition: 'left' | 'right' = 'left';
  variant: 'outlined' | 'default' | 'link' = 'default';
  basicComponentHtml: string = `<zap-button text="Continue"></zap-button>`;
  markdown: { title: string; markdown: string; language: string }[] = [
    {
      title: 'html',
      markdown: `<zap-button text="Continue"></zap-button>`,
      language: 'html',
    },
  ];
  markdownDirective: { title: string; markdown: string; language: string } = {
    title: 'html',
    markdown: `<zap-button text="Check information" size="base" iconPosition="left">
  <svg zapIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <path
      fill="currentColor"
      d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24l0 112c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-112c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"
    />
  </svg>
</zap-button>`,
    language: 'html',
  };
  markdownGlobal: { title: string; markdown: string; language: string } = {
    title: 'app.config.ts',
    markdown: `const ngxConfig: ZapConfig = {
  components: { 
    button: {
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
      this.size !== 'base' ? `size="${this.size}"` : '',
      this.shape !== 'flat' ? `shape="${this.shape}"` : '',
      this.icon ? `icon="${this.icon}"` : '',
      this.iconPosition !== 'left' ? `iconPosition="${this.iconPosition}"` : '',
      this.img ? `img="${this.img}"` : '',
      this.imagePosition !== 'left' ? `imgPosition="${this.imagePosition}"` : '',
      this.variant !== 'default' ? `variant="${this.variant}"` : '',
    ]
      .filter((attr) => attr)
      .join(' ');

    this.basicComponentHtml = `<zap-button text="Continue" ${attributes}></zap-button>`;
    this.markdown[0].markdown = this.basicComponentHtml;
  }

  updateShape(shape: 'pill' | 'curve' | 'flat' | undefined): void {
    this.shape = shape;
    this.updateMarkdown();
  }

  updateSize(size: 'compact' | 'wide' | 'tight' | 'base' | undefined): void {
    this.size = size;
    this.updateMarkdown();
  }

  updateIcon(icon: string): void {
    if (icon !== this.icon) {
      this.icon = icon;
      this.img = '';
      this.imagePosition = 'left';
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

  updateType(type: 'info' | 'success' | 'warning' | 'error' | 'default'): void {
    this.type = type;
    this.updateMarkdown();
  }

  updateImage(img: string | undefined): void {
    if (img !== this.img) {
      this.icon = '';
      this.img = img;
    } else {
      this.img = '';
    }
    this.updateMarkdown();
  }

  updateImagePosition(position: 'left' | 'right'): void {
    this.imagePosition = position;
    this.icon = '';
    this.img =
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png';
    this.updateMarkdown();
  }

  updateVariant(variant: 'outlined' | 'default' | 'link'): void {
    this.variant = variant;
  }
}
