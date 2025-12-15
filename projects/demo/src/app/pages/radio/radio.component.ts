import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ZapRadio, ZapLabelDirective } from 'zap';

import { SpacerComponent } from '../../components/spacer/spacer.component';
import { TitleComponent } from '../../components/title/title.component';
import { RowComponent } from '../../components/row/row.component';
import { PreviewCodeComponent } from '../../components/preview-code/preview-code.component';
import { CodeComponent } from '../../components/code-viewer/code/code.component';

@Component({
  selector: 'app-radio',
  imports: [
    SpacerComponent,
    TitleComponent,
    RowComponent,
    ZapRadio,
    ZapLabelDirective,
    ReactiveFormsModule,
    FormsModule,
    PreviewCodeComponent,
    CodeComponent,
  ],
  templateUrl: './radio.component.html',
  styleUrl: './radio.component.scss',
})
export class RadioComponent {
  formControl1: FormControl = new FormControl({
    value: false,
    disabled: false,
  });
  formControl2: FormControl = new FormControl({
    value: false,
    disabled: false,
  });
  options: { name: string; value: string }[] = [
    {
      name: 'Option 1',
      value: 'option1',
    },
    {
      name: 'Option 2',
      value: 'option2',
    },
    {
      name: 'Option 3',
      value: 'option3',
    },
  ];
  options2: { name: string; value: string }[] = [
    {
      name: 'US',
      value: 'us',
    },
    {
      name: 'UK',
      value: 'uk',
    },
  ];
  variant: 'vertical' | 'horizontal' = 'vertical';
  basicComponentHtml = `<zap-radio [options]="options"></zap-radio>`;
  markdown: { title: string; markdown: string; language: string }[] = [
    {
      title: 'html',
      markdown: `<zap-radio [options]="options"></zap-radio>`,
      language: 'html',
    },
    {
      title: 'ts',
      markdown: `options = ${JSON.stringify(this.options, null, 2)}`,
      language: 'typescript',
    },
  ];
  markdownDirective: { title: string; markdown: string; language: string } = {
    title: 'html',
    markdown: `<zap-radio [options]="options">
  <div zapLabel class="flex items-centre gap-3">
    <i class="fa-solid fa-location-dot"></i>
    <label>Select a country</label>
  </div>
</zap-radio>`,
    language: 'html',
  };
  markdownGlobal: { title: string; markdown: string; language: string } = {
    title: 'app.config.ts',
    markdown: `const ngxConfig: ZapConfig = {
  components: { 
    radio: {
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
    const attributes = [this.variant !== 'vertical' ? `variant="${this.variant}"` : '']
      .filter((attr) => attr)
      .join(' ');

    this.basicComponentHtml = `<zap-radio [options]="options" ${attributes}></zap-radio>`;
    this.markdown[0].markdown = this.basicComponentHtml;
  }

  updateVariant(variant: 'vertical' | 'horizontal') {
    this.variant = variant;
    this.updateMarkdown();
  }
}
