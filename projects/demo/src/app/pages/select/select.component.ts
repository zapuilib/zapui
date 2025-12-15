import { Component } from '@angular/core';
import { ZapSelect, ZapLabelDirective, ZapHelpTextDirective, ZapIconDirective } from 'zap';

import { SpacerComponent } from '../../components/spacer/spacer.component';
import { TitleComponent } from '../../components/title/title.component';
import { RowComponent } from '../../components/row/row.component';
import { PreviewCodeComponent } from '../../components/preview-code/preview-code.component';
import { CodeComponent } from '../../components/code-viewer/code/code.component';

@Component({
  selector: 'app-select',
  imports: [
    SpacerComponent,
    TitleComponent,
    RowComponent,
    PreviewCodeComponent,
    CodeComponent,
    ZapSelect,
    ZapLabelDirective,
    ZapHelpTextDirective,
    ZapIconDirective,
  ],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
})
export class SelectComponent {
  shape: 'pill' | 'curve' | 'flat' | undefined = 'flat';
  size: 'compact' | 'base' | undefined = 'base';
  icon: string | undefined = '';
  iconPosition: 'left' | 'right' = 'left';
  position: 'top' | 'bottom' | 'auto' = 'auto';
  multiselect: boolean = false;
  searchable: boolean = true;
  async: boolean = false;
  options: { label: string; value: any; [key: string]: any }[] = [
    { label: 'Australia', value: 'au' },
    { label: 'Canada', value: 'ca' },
    { label: 'France', value: 'fr' },
    { label: 'Germany', value: 'de' },
    { label: 'Italy', value: 'it' },
    { label: 'UK', value: 'uk' },
    { label: 'US', value: 'us' },
  ];
  basicComponentHtml = `<zap-select label="Select a country" placeholder="Country" [options]="options"></zap-select>`;
  markdown: { title: string; markdown: string; language: string }[] = [
    {
      title: 'html',
      markdown: `<zap-select label="Select a country" placeholder="Country" [options]="options"></zap-select>`,
      language: 'html',
    },
    {
      title: 'ts',
      markdown: `options = ${JSON.stringify(this.options, null, 2)}`,
      language: 'typescript',
    },
  ];
  markdownTemplate: { title: string; markdown: string; language: string }[] = [
    {
      title: 'component',
      markdown: `<zap-select
  label="Select a country"
  placeholder="Country"
  [options]="options"
  [optionTemplate]="customOptionTmp"
  [selectedTemplate]="customSelectedTmp"
></zap-select>`,
      language: 'html',
    },
    {
      title: 'optionTemplate',
      markdown: `<ng-template #customOptionTmp let-option>
  <div class="custom-option">
    <span class="block">{{ option.label }}</span>
    <span class="block text-zinc-500">Country code: {{ option.value }}</span>
  </div>
</ng-template>`,
      language: 'html',
    },
    {
      title: 'selectedTemplate',
      markdown: `<ng-template #customSelectedTmp let-option>
  <div class="custom-option">
    <span class="text-purple-500">Selected: {{ option.label }}</span>
  </div>
</ng-template>`,
      language: 'html',
    },
  ];
  markdownDirective: { title: string; markdown: string; language: string } = {
    title: 'html',
    markdown: `<zap-select
  label="Select a country"
  placeholder="Country"
  [options]="options"
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
    <p>How to correctly choose a country?</p>
    <ul>
      <li class="ml-1 flex items-center gap-2">
        <i class="fa-solid fa-xmark-large text-error"></i>
        <p>Close your eyes and smash the keyboard with your face</p>
      </li>
      <li class="ml-1 flex items-center gap-2">
        <i class="fa-solid fa-xmark-large text-error"></i>
        <p>Use a fake ID</p>
      </li>
      <li class="ml-1 flex items-center gap-2">
        <i class="fa-solid fa-check text-success"></i>
        <p>Select the country you actually live in</p>
      </li>
    </ul>
  </div>
</zap-select>`,
    language: 'html',
  };
  markdownGlobal: { title: string; markdown: string; language: string } = {
    title: 'app.config.ts',
    markdown: `const ngxConfig: ZapConfig = {
components: { 
  select: {
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
}`,
    language: 'typescript',
  };

  updateMarkdown(): void {
    const attributes = [
      this.shape !== 'flat' ? `shape="${this.shape}"` : '',
      this.size !== 'base' ? `size="${this.size}"` : '',
      this.icon ? `icon="${this.icon}"` : '',
      this.iconPosition !== 'left' ? `iconPosition="${this.iconPosition}"` : '',
      this.position !== 'auto' ? `position="${this.position}"` : '',
      this.multiselect !== false ? `[multiselect]="true"` : '',
      this.searchable !== true ? `[searchable]="false"` : '',
      this.async !== false ? `[async]="true"` : '',
    ]
      .filter((attr) => attr)
      .join(' ');

    this.basicComponentHtml = `<zap-select ${attributes} label="Select a country" placeholder="Country" [options]="options"></zap-select>`;
    this.markdown[0].markdown = this.basicComponentHtml;
  }

  updateShape(shape: 'pill' | 'curve' | 'flat' | undefined): void {
    this.shape = shape;
    this.updateMarkdown();
  }

  updateSize(size: 'compact' | 'base' | undefined): void {
    this.size = size;
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
    this.icon = 'fa-globe';
    this.updateMarkdown();
  }

  updatePosition(position: 'top' | 'bottom' | 'auto'): void {
    this.position = position;
    this.updateMarkdown();
  }

  updateMultiselect(multiselect: boolean): void {
    this.multiselect = multiselect;
    this.updateMarkdown();
  }

  updateSearchable(searchable: boolean): void {
    this.searchable = searchable;
    this.updateMarkdown();
  }

  updateAsync(async: boolean): void {
    this.async = async;
    this.updateMarkdown();
  }
}
