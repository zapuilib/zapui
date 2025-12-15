import { Component } from '@angular/core';
import { ZapInput, ZapLabelDirective, ZapHelpTextDirective, ZapIconDirective } from 'zap';

import { SpacerComponent } from '../../components/spacer/spacer.component';
import { TitleComponent } from '../../components/title/title.component';
import { RowComponent } from '../../components/row/row.component';
import { PreviewCodeComponent } from '../../components/preview-code/preview-code.component';
import { CodeComponent } from '../../components/code-viewer/code/code.component';

@Component({
  selector: 'app-input',
  imports: [
    SpacerComponent,
    TitleComponent,
    RowComponent,
    PreviewCodeComponent,
    CodeComponent,
    ZapInput,
    ZapLabelDirective,
    ZapHelpTextDirective,
    ZapIconDirective,
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent {
  type: 'password' | 'text' | 'number' | 'email' | 'tel' = 'text';
  size: 'compact' | 'base' | undefined = 'base';
  shape: 'pill' | 'curve' | 'flat' | undefined = 'flat';
  icon: string = '';
  iconPosition: 'left' | 'right' = 'left';
  basicComponentHtml = `<zap-input label="Email" placeholder="Enter your email"></zap-input>`;
  markdown: { title: string; markdown: string; language: string } = {
    title: 'html',
    markdown: `<zap-input label="Email" placeholder="Enter your email"></zap-input>`,
    language: 'html',
  };
  markdownDirective: { title: string; markdown: string; language: string } = {
    title: 'html',
    markdown: `<zap-input
  placeholder="Choose a username"
  iconPosition="right"
  zapClass="!min-w-80"
>
  <div zapLabel class="flex items-center gap-2">
    <i class="fa-solid fa-user"></i>
    <p>Username</p>
  </div>

  <svg
    zapFormFieldIcon
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
  >
    <path
      fill="currentColor"
      d="M133.9 232L65.8 95.9 383.4 232l-249.5 0zm0 48l249.5 0L65.8 416.1l68-136.1zM44.6 34.6C32.3 29.3 17.9 32.3 8.7 42S-2.6 66.3 3.4 78.3L92.2 256 3.4 433.7c-6 12-3.9 26.5 5.3 36.3s23.5 12.7 35.9 7.5l448-192c11.8-5 19.4-16.6 19.4-29.4s-7.6-24.4-19.4-29.4l-448-192z"
    />
  </svg>

  <div zapFormFieldHelpText>
    <p>Your username must be:</p>
    <ul>
      <li class="list-disc ml-4">Unique</li>
      <li class="list-disc ml-4">Be at least 6 characters long</li>
      <li class="list-disc ml-4">Not contain any special characters</li>
    </ul>
  </div>
</zap-input>`,
    language: 'html',
  };
  markdownGlobal: { title: string; markdown: string; language: string } = {
    title: 'app.config.ts',
    markdown: `const ngxConfig: ZapConfig = {
components: {
  input: {
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
      this.type !== 'text' ? `type="${this.type}"` : '',
      this.size !== 'base' ? `size="${this.size}"` : '',
      this.shape !== 'flat' ? `shape="${this.shape}"` : '',
      this.icon ? `icon="${this.icon}"` : '',
      this.iconPosition !== 'left' ? `iconPosition="${this.iconPosition}"` : '',
    ]
      .filter((attr) => attr)
      .join(' ');

    this.basicComponentHtml = `<zap-input ${attributes} label="Email" placeholder="Enter your email"></zap-input>`;
    this.markdown.markdown = this.basicComponentHtml;
  }

  updateType(type: 'password' | 'text' | 'number' | 'email' | 'tel'): void {
    this.type = type;
    this.updateMarkdown();
  }

  updateSize(size: 'compact' | 'base' | undefined): void {
    this.size = size;
    this.updateMarkdown();
  }

  updateShape(shape: 'pill' | 'curve' | 'flat' | undefined): void {
    this.shape = shape;
    this.updateMarkdown();
  }

  updateIcon(icon: string): void {
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
