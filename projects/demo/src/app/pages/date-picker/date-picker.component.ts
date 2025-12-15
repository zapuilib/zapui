import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ZapDatePicker, ZapLabelDirective, ZapHelpTextDirective, ZapIconDirective } from 'zap';

import { SpacerComponent } from '../../components/spacer/spacer.component';
import { TitleComponent } from '../../components/title/title.component';
import { CodeComponent } from '../../components/code-viewer/code/code.component';
import { PreviewCodeComponent } from '../../components/preview-code/preview-code.component';

@Component({
  selector: 'app-date-picker',
  imports: [
    SpacerComponent,
    TitleComponent,
    CodeComponent,
    PreviewCodeComponent,
    FormsModule,
    ReactiveFormsModule,
    ZapDatePicker,
    ZapLabelDirective,
    ZapHelpTextDirective,
    ZapIconDirective,
  ],
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.scss',
})
export class DatePickerComponent {
  datePickerControl: FormControl = new FormControl(
    {
      value: '',
      disabled: false,
    },
    [],
  );
  shape: 'pill' | 'curve' | 'flat' | undefined = 'flat';
  size: 'compact' | 'base' | 'wide' | undefined = 'base';
  position: 'top' | 'bottom' | 'auto' = 'auto';
  icon: string | undefined = '';
  iconPosition: 'left' | 'right' = 'right';
  range: boolean = false;
  dropdown: boolean = true;
  disableWeekends: boolean = false;
  disableInactive: boolean = false;
  basicComponentHtml1 = `<zap-date-picker label="Date picker"></zap-date-picker>`;
  basicComponentHtml2 = `<zap-date-picker label="Date range picker" [range]="true" ></zap-date-picker>`;
  basicComponentHtml3 = `<zap-date-picker [dropdown]="false" [disableWeekends]="true" label="Date picker"></zap-date-picker>`;
  markdown1: { title: string; markdown: string; language: string } = {
    title: 'html',
    markdown: `<zap-date-picker label="Date picker"></zap-date-picker>`,
    language: 'html',
  };
  markdown2: { title: string; markdown: string; language: string } = {
    title: 'html',
    markdown: `<zap-date-picker [range]="true" label="Date picker"></zap-date-picker>`,
    language: 'html',
  };
  markdown3: { title: string; markdown: string; language: string } = {
    title: 'html',
    markdown: `<zap-date-picker [dropdown]="false" [disableWeekends]="true" label="Date picker"></zap-date-picker>`,
    language: 'html',
  };
  markdownDirective: { title: string; markdown: string; language: string } = {
    title: 'html',
    markdown: `<zap-date-picker
  [shape]="shape"
  [size]="size"
  [position]="position"
  [icon]="icon"
  [iconPosition]="iconPosition"
  [range]="true"
  [dropdown]="dropdown"
  [disableWeekends]="disableWeekends"
  [disableInactive]="disableInactive"
  class="min-w-60"
>
  <div zapLabel class="flex items-center gap-2">
    <i class="fa-solid fa-circle-info"></i>
    <p>Select data range</p>
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
    <p>For accurate results:</p>
    <ul>
      <li class="ml-5 list-disc">
        <p>Select data not earlier than 2000</p>
      </li>
      <li class="ml-5 list-disc">
        <p>Select data not later than 2024</p>
      </li>
    </ul>
  </div>
</zap-date-picker>`,
    language: 'html',
  };
  markdownGlobal1: { title: string; markdown: string; language: string } = {
    title: 'app.config.ts',
    markdown: `const ngxConfig: ZapConfig = {
  components: { 
    'date-picker': {
      shape: 'curve',
      styles: {
        colors: {
          dark: {
            bgColor: '#1877F2',
          },
        },
        borderRadius: '15px',
      },
    }, 
    'dp-calendar': {
      shape: 'curve',
      styles: {
        colors: {
          dark: {
            bgColor: '#1877F2',
          },
        },
        borderRadius: '15px',
      },
    },
    'dp-calendar-select': {
      shape: 'curve',
      styles: {
        colors: {
          dark: {
            bgColor: '#1877F2',
          },
        },
        borderRadius: '15px',
      },
    },
  }
}`,
    language: 'typescript',
  };
  markdownGlobal2: { title: string; markdown: string; language: string } = {
    title: 'app.config.ts',
    markdown: `const ngxConfig: ZapConfig = {
components: { 
  'date-picker': {
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
}`,
    language: 'typescript',
  };
  markdownGlobal3: { title: string; markdown: string; language: string } = {
    title: 'app.config.ts',
    markdown: `const ngxConfig: ZapConfig = {
components: { 
  'date-picker': {
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
      this.range !== false ? `[range]="true"` : '',
      this.dropdown !== true ? `[dropdown]="false"` : '',
      this.disableWeekends !== false ? `[disableWeekends]="true"` : '',
      this.disableInactive !== false ? `[disableInactive]="true"` : '',
    ]
      .filter((attr) => attr)
      .join(' ');

    this.basicComponentHtml1 = `<zap-date-picker ${attributes} label="Date picker"></zap-date-picker>`;
    this.basicComponentHtml2 = `<zap-date-picker ${attributes} [range]="true" label="Date range picker"></zap-date-picker>`;
    this.basicComponentHtml3 = `<zap-date-picker ${attributes} [dropdown]="false" [disableWeekends]="true" label="Date picker"></zap-date-picker>`;
    this.markdown1.markdown = this.basicComponentHtml1;
    this.markdown2.markdown = this.basicComponentHtml2;
    this.markdown3.markdown = this.basicComponentHtml3;
  }

  updateShape(shape: 'pill' | 'curve' | 'flat' | undefined): void {
    this.shape = shape;
    this.updateMarkdown();
  }

  updateSize(size: 'compact' | 'base' | 'wide' | undefined): void {
    this.size = size;
    this.updateMarkdown();
  }

  updatePosition(position: 'top' | 'bottom' | 'auto'): void {
    this.position = position;
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

  updateRange(range: boolean): void {
    this.range = range;
    this.updateMarkdown();
  }

  updateDropdown(dropdown: boolean): void {
    this.dropdown = dropdown;
    this.updateMarkdown();
  }

  updateDisableWeekends(disableWeekends: boolean): void {
    this.disableWeekends = disableWeekends;
    this.updateMarkdown();
  }

  updateDisableInactive(disableInactive: boolean): void {
    this.disableInactive = disableInactive;
    this.updateMarkdown();
  }
}
