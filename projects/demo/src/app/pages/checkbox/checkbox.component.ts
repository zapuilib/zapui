import { Component } from '@angular/core';
import { ZapCheckbox, ZapLabelDirective } from 'zap';

import { TitleComponent } from '../../components/title/title.component';
import { SpacerComponent } from '../../components/spacer/spacer.component';
import { RowComponent } from '../../components/row/row.component';
import { PreviewCodeComponent } from '../../components/preview-code/preview-code.component';
import { CodeComponent } from '../../components/code-viewer/code/code.component';

@Component({
  selector: 'app-checkbox',
  imports: [
    SpacerComponent,
    TitleComponent,
    RowComponent,
    ZapCheckbox,
    PreviewCodeComponent,
    ZapLabelDirective,
    CodeComponent,
  ],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss',
})
export class CheckboxComponent {
  id: string = '';
  label: string = 'Checkbox';
  shape: 'curve' | 'flat' | undefined = 'flat';
  size: 'compact' | 'base' | undefined = 'base';
  customErrorMessages: Record<string, string> = {};
  labelPosition: 'left' | 'right' = 'right';
  basicComponentHtml = `<zap-checkbox></zap-checkbox>`;
  markdown: { title: string; markdown: string; language: string }[] = [
    {
      title: 'html',
      markdown: `<zap-checkbox></zap-checkbox>`,
      language: 'html',
    },
  ];
  markdownDirective: { title: string; markdown: string; language: string } = {
    title: 'html',
    markdown: `<zap-checkbox id="checkbox">
  <label for="checkbox" zapLabel>Username or email</label>
</zap-checkbox>`,
    language: 'html',
  };
  markdownGlobal: { title: string; markdown: string; language: string } = {
    title: 'app.config.ts',
    markdown: `const ngxConfig: ZapConfig = {
  components: { 
    checkbox: {
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
      this.labelPosition !== 'right' ? `labelPosition="${this.labelPosition}"` : '',
      this.shape !== 'flat' ? `shape="${this.shape}"` : '',
      this.size !== 'base' ? `size="${this.size}"` : '',
    ]
      .filter((attr) => attr)
      .join(' ');

    this.basicComponentHtml = `<zap-checkbox ${attributes}></zap-checkbox>`;
    this.markdown[0].markdown = this.basicComponentHtml;
  }

  updateLabelPosition(labelPosition: 'left' | 'right'): void {
    this.labelPosition = labelPosition;
    this.updateMarkdown();
  }

  updateShape(shape: 'curve' | 'flat' | undefined): void {
    this.shape = shape;
    this.updateMarkdown();
  }

  updateSize(size: 'compact' | 'base' | undefined): void {
    this.size = size;
    this.updateMarkdown();
  }
}
