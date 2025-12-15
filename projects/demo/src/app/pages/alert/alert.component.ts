import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ZapAlert, ZapIconDirective } from 'zap';

import { TitleComponent } from '../../components/title/title.component';
import { CodeComponent } from '../../components/code-viewer/code/code.component';
import { SpacerComponent } from '../../components/spacer/spacer.component';
import { PreviewCodeComponent } from '../../components/preview-code/preview-code.component';

@Component({
  selector: 'app-alert',
  imports: [
    CommonModule,
    ZapAlert,
    TitleComponent,
    CodeComponent,
    SpacerComponent,
    ZapIconDirective,
    PreviewCodeComponent,
  ],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
})
export class AlertComponent {
  type: 'success' | 'warning' | 'error' | 'info' | 'default' = 'default';
  shape: 'curve' | 'pill' | 'flat' | undefined = 'flat';
  variant: 'default' | 'outlined' | undefined = 'default';
  icon: string = '';
  basicComponentHtml = `<zap-alert>You have a new message</zap-alert>`;
  markdown1: { title: string; markdown: string; language: string }[] = [
    {
      title: 'html',
      markdown: `<zap-alert>You have a new message</zap-alert>`,
      language: 'html',
    },
  ];
  markdown2: { title: string; markdown: string; language: string }[] = [
    {
      title: 'html',
      markdown: `<zap-alert
  type="error"
  shape="curve"
  icon="fa-solid fa-circle-info"
  zapClass="!items-start dismiss:!top-6"
>
  <div>
    <span>There is an issue with:</span>
    <ul class="mt-1">
      <li class="list-disc ml-4">Saving the document</li>
      <li class="list-disc ml-4">Sending the email</li>
    </ul>
  </div>
</zap-alert>`,
      language: 'html',
    },
  ];
  markdownDirective: { title: string; markdown: string; language: string } = {
    title: 'html',
    markdown: `<zap-alert>
  <svg zapIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <path
      fill="currentColor"
      d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24l0 112c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-112c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"
    />
  </svg>
  You have a new message
</zap-alert>`,
    language: 'html',
  };
  markdownGlobal: { title: string; markdown: string; language: string } = {
    title: 'app.config.ts',
    markdown: `const ngxConfig: ZapConfig = {
  components: { 
    alert: {
      shape: 'curve'; 
      styles: {
        colors: {
          dark: {
            bgColor: '#FFFFFF';
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
      this.type !== 'default' ? `type="${this.type}"` : '',
      this.shape !== 'flat' ? `shape="${this.shape}"` : '',
      this.variant !== 'default' ? `variant="${this.variant}"` : '',
      this.icon ? `icon="${this.icon}"` : '',
    ]
      .filter((attr) => attr)
      .join(' ');

    this.basicComponentHtml = `<zap-alert ${attributes}>You have a new message</zap-alert>`;
    this.markdown1[0].markdown = this.basicComponentHtml;
  }

  updateType(type: 'success' | 'warning' | 'error' | 'info' | 'default'): void {
    this.type = type;
    this.updateMarkdown();
  }

  updateShape(shape: 'curve' | 'pill' | 'flat' | undefined): void {
    this.shape = shape;
    this.updateMarkdown();
  }

  updateVariant(variant: 'default' | 'outlined' | undefined): void {
    this.variant = variant;
    this.updateMarkdown();
  }

  updateIcon(icon: string): void {
    this.icon = icon;
    this.updateMarkdown();
  }
}
