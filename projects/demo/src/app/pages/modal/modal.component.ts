import { Component } from '@angular/core';
import { ZapButton, ZapModal, ZapInput } from 'zap';

import { SpacerComponent } from '../../components/spacer/spacer.component';
import { TitleComponent } from '../../components/title/title.component';
import { PreviewCodeComponent } from '../../components/preview-code/preview-code.component';
import { CodeComponent } from '../../components/code-viewer/code/code.component';

@Component({
  selector: 'app-modal',
  imports: [
    SpacerComponent,
    TitleComponent,
    PreviewCodeComponent,
    ZapModal,
    ZapInput,
    ZapButton,
    CodeComponent,
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  shape: 'curve' | 'pill' | 'flat' = 'flat';
  size: 'compact' | 'wide' | 'tight' | 'base' | 'full' = 'full';
  modalOpen = false;
  basicComponentHtml = `<zap-modal zapClass="!absolute" (close)="onClose()">
  <p class="!text-xl font-semibold">Enter your details</p>
  <zap-input
    label="Email"
    placeholder="Enter your email"
    type="email"
    zapClass="!mt-4"
  ></zap-input>
  <zap-input
    class="!mt-10"
    label="Password"
    placeholder="Enter your password"
    type="password"
    zapClass="!mt-4"
  ></zap-input>
  <zap-button zapClass="!mt-6" text="Login" color="primary"></zap-button>
</zap-modal>`;
  markdown: { title: string; markdown: string; language: string }[] = [
    {
      title: 'html',
      markdown: `<zap-modal zapClass="!absolute" (close)="onClose()">
  <p class="!text-xl font-semibold">Enter your details</p>
  <zap-input
    label="Email"
    placeholder="Enter your email"
    type="email"
    zapClass="!mt-4"
  ></zap-input>
  <zap-input
    class="!mt-10"
    label="Password"
    placeholder="Enter your password"
    type="password"
    zapClass="!mt-4"
  ></zap-input>
  <zap-button zapClass="!mt-6" text="Login" color="primary"></zap-button>
</zap-modal>`,
      language: 'html',
    },
  ];
  markdownGlobal: { title: string; markdown: string; language: string } = {
    title: 'app.config.ts',
    markdown: `const ngxConfig: ZapConfig = {
  components: { 
    modal: {
      shape: 'curve'; 
      size: 'wide';
      styles: {
        colors: {
          dark: {
            bgColor: '#FFFFFF';
          };
        };
        borderRadius: '15px';
      }       
    }
  }
}`,
    language: 'typescript',
  };

  updateMarkdown(): void {
    const attributes = [
      this.shape !== 'curve' ? `shape="${this.shape}"` : '',
      this.size !== 'tight' ? `size="${this.size}"` : '',
    ]
      .filter((attr) => attr)
      .join(' ');

    this.basicComponentHtml = `<zap-modal zapClass="!absolute" ${attributes} (close)="onClose()">
  <p class="!text-xl font-semibold">Enter your details</p>
  <zap-input
    label="Email"
    placeholder="Enter your email"
    type="email"
    zapClass="!mt-4"
  ></zap-input>
  <zap-input
    class="!mt-10"
    label="Password"
    placeholder="Enter your password"
    type="password"
    zapClass="!mt-4"
  ></zap-input>
  <zap-button zapClass="!mt-6" text="Login" color="primary"></zap-button>
</zap-modal>`;
    this.markdown[0].markdown = this.basicComponentHtml;
  }

  updateShape(shape: 'curve' | 'pill' | 'flat'): void {
    this.shape = shape;
    this.updateMarkdown();
  }

  updateSize(size: 'compact' | 'wide' | 'tight' | 'base' | 'full'): void {
    this.size = size;
    this.updateMarkdown();
  }

  onClose(): void {
    this.modalOpen = false;
  }
}
