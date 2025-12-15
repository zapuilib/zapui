import { Component } from '@angular/core';
import { ZapButton, ZapInput } from 'zap';

import { TitleComponent } from '../../components/title/title.component';
import { SpacerComponent } from '../../components/spacer/spacer.component';
import { RowComponent } from '../../components/row/row.component';
import { PreviewCodeComponent } from '../../components/preview-code/preview-code.component';

@Component({
  selector: 'app-zapclass',
  imports: [
    TitleComponent,
    SpacerComponent,
    RowComponent,
    PreviewCodeComponent,
    ZapButton,
    ZapInput,
  ],
  templateUrl: './zapclass.component.html',
  styleUrl: './zapclass.component.scss',
})
export class ZapclassComponent {
  markdowns1: { title: string; markdown: string; language: string }[] = [
    {
      title: 'tailwind.config.js',
      markdown: `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Geist", "serif"],
      },
    },
  },
  plugins: [require('zap/tailwind')],
};
`,
      language: 'typescript',
    },
  ];
  markdowns2: { title: string; markdown: string; language: string }[] = [
    {
      title: 'style.css',
      markdown: `@import "zap/tailwind/v4";`,
      language: 'css',
    },
  ];
  buttonMarkdown: { title: string; markdown: string; language: string } = {
    title: 'Button',
    markdown: `<zap-button zapClass="!bg-pink-500 !border-pink-500 !text-white">Primary</zap-button>`,
    language: 'html',
  };
  inputMarkdown: { title: string; markdown: string; language: string } = {
    title: 'Button',
    markdown: `  <zap-input
  label="Email"
  placeholder="Enter your email"
  zapClass="input:!border-pink-500 label:!text-pink-500 input-placeholder:!text-pink-500 input:!text-pink-500 input-hover:!text-pink-500"
></zap-input>`,
    language: 'html',
  };
  zapClassOption1Markdowns: {
    title: string;
    markdown: string;
    language: string;
  }[] = [
    {
      title: 'tailwind.config.js',
      markdown: `/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true, // Add this line
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Geist", "serif"],
      },
    },
  },
  plugins: [require('zap/tailwind')],
};
`,
      language: 'typescript',
    },
  ];
  zapClassOption2Markdowns: {
    title: string;
    markdown: string;
    language: string;
  }[] = [
    {
      title: 'scss',
      markdown: `@layer components {
  .custom-btn {
    @apply px-4 py-2 bg-blue-500 text-white rounded-md #{!important};
  }
}`,
      language: 'css',
    },
    {
      title: 'html',
      markdown: `<zap-button zapClass="custom-btn"></zap-button>`,
      language: 'css',
    },
  ];
  zapClassOption3Markdowns: {
    title: string;
    markdown: string;
    language: string;
  }[] = [
    {
      title: 'scss',
      markdown: `@utility btn-primary {
  @apply bg-green-600/20 text-green-400 border-green-700 hover:border-green-600 text-sm light:bg-zinc-950 light:border-zinc-950 light:text-white light:hover:border-zinc-950 light:hover:opacity-80 ;
}`,
      language: 'css',
    },
    {
      title: 'html',
      markdown: `<zap-button zapClass="!btn-primary"></zap-button> // Add ! to apply the utility class`,
      language: 'html',
    },
  ];
}
