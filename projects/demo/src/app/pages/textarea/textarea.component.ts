import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ZapTextarea, ZapLabelDirective, ZapHelpTextDirective } from 'zap';

import { SpacerComponent } from '../../components/spacer/spacer.component';
import { TitleComponent } from '../../components/title/title.component';
import { RowComponent } from '../../components/row/row.component';
import { PreviewCodeComponent } from '../../components/preview-code/preview-code.component';
import { CodeComponent } from '../../components/code-viewer/code/code.component';

@Component({
  selector: 'app-textarea',
  imports: [
    SpacerComponent,
    TitleComponent,
    RowComponent,
    ZapTextarea,
    ZapLabelDirective,
    ZapHelpTextDirective,
    ReactiveFormsModule,
    FormsModule,
    PreviewCodeComponent,
    CodeComponent,
  ],
  templateUrl: './textarea.component.html',
  styleUrl: './textarea.component.scss',
})
export class TextareaComponent {
  shape: 'curve' | 'pill' | 'flat' = 'flat';
  resize: 'auto' | 'none' | 'vertical' | 'horizontal' = 'none';
  label = '';
  id = '';
  rows = '10';
  zapClass = '';
  customErrorMessages: Record<string, string> = {};
  placeholder = '';
  helpText = '';
  basicComponentHtml = `<zap-textarea label="Textarea" placeholder="Enter your message"></zap-textarea>`;
  markdown: { title: string; markdown: string; language: string }[] = [
    {
      title: 'html',
      markdown: `<zap-textarea label="Textarea" placeholder="Enter your message"></zap-textarea>`,
      language: 'html',
    },
  ];
  markdownDirective: { title: string; markdown: string; language: string } = {
    title: 'html',
    markdown: `<zap-textarea placeholder="Enter your message">
  <div zapLabel class="flex items-center gap-2">
    <i class="fa-regular fa-pen-to-square"></i>
    <p>Provide a description</p>
  </div>
  <div zapFormFieldHelpText class="flex items-center gap-2">
    <i class="fa-regular fa-send"></i>
    <p class="text-sinc-300">Press enter to send</p>
  </div>
</zap-textarea>`,
    language: 'html',
  };
  markdownGlobal: { title: string; markdown: string; language: string } = {
    title: 'app.config.ts',
    markdown: `const ngxConfig: ZapConfig = {
  components: { 
    textarea: {
      shape: 'curve',
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
      this.shape !== 'flat' ? `shape="${this.shape}"` : '',
      this.resize !== 'none' ? `resize="${this.resize}"` : '',
    ]
      .filter((attr) => attr)
      .join(' ');

    this.basicComponentHtml = `<zap-textarea label="Textarea" placeholder="Enter your message" ${attributes}></zap-textarea>`;
    this.markdown[0].markdown = this.basicComponentHtml;
  }

  updateShape(shape: 'curve' | 'pill' | 'flat') {
    this.shape = shape;
    this.updateMarkdown();
  }

  updateResize(resize: 'auto' | 'none' | 'vertical' | 'horizontal') {
    this.resize = resize;
    this.updateMarkdown();
  }
}
