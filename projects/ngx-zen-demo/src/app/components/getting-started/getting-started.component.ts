import { Component } from '@angular/core';

@Component({
  selector: 'app-getting-started',
  templateUrl: './getting-started.component.html',
  styleUrl: './getting-started.component.scss',
})
export class GettingStartedComponent {
  markdown = [
    `\`\`\`terminal
npm install -D tailwindcss
npx tailwindcss init
\`\`\``,

    `\`\`\`javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
\`\`\``,

    `\`\`\`terminal
@tailwind base;
@tailwind components;
@tailwind utilities;
\`\`\``,

    `\`\`\`javascript
/** @type {import('tailwindcss').Config} */
const plugin = require('ngx-zen/tailwind');
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [plugin],
}
\`\`\``,

    `\`\`\`javascript
import { NgxZenModule } from 'ngx-zen';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports = [
    // other imports
    CommonModule,
    ReactiveFormsModule,
    NgxZenModule.forRoot(),
  ];
  providers: [],
  bootstrap: [AppComponent],
})
\`\`\``,
  ];
}
