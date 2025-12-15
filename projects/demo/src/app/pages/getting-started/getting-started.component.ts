import { Component } from '@angular/core';
import { ZapBadge, ZapButton } from 'zap';
import { Router, RouterModule } from '@angular/router';

import { RowComponent } from '../../components/row/row.component';
import { TitleComponent } from '../../components/title/title.component';
import { SpacerComponent } from '../../components/spacer/spacer.component';
import { HeroPatternComponent } from '../../components/hero-pattern/hero-pattern.component';
import { CodeGroupComponent } from '../../components/code-viewer/code-group/code-group.component';
import { CodeComponent } from '../../components/code-viewer/code/code.component';

@Component({
  selector: 'app-getting-started',
  imports: [
    ZapButton,
    RowComponent,
    TitleComponent,
    SpacerComponent,
    RouterModule,
    HeroPatternComponent,
    CodeGroupComponent,
    CodeComponent,
    ZapBadge,
  ],
  templateUrl: './getting-started.component.html',
  styleUrl: './getting-started.component.scss',
})
export class GettingStartedComponent {
  tailwindSetupMarkdown: {
    title: string;
    markdown: string;
    language: string;
  }[] = [
    {
      title: 'bash',
      markdown: `npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p`,
      language: 'bash',
    },
  ];
  markdowns1: { title: string; markdown: string; language: string }[] = [
    {
      title: 'npm',
      markdown: `npm install zap`,
      language: 'bash',
    },
  ];

  markdowns2: { title: string; markdown: string; language: string }[] = [
    {
      title: 'app.config.ts',
      markdown: `import { ApplicationConfig } from '@angular/core';
import { provideZapOptions } from 'zap';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZapOptions(),
    // Others...
  ],
};
`,
      language: 'typescript',
    },
  ];

  markdowns5: { title: string; markdown: string; language: string }[] = [
    {
      title: 'app.module.ts',
      markdown: `import { provideZapOptions } from 'zap';

@NgModule({
  imports: [
    provideZapOptions(),
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }
`,
      language: 'typescript',
    },
  ];

  constructor(private router: Router) {}

  accessLibrary() {
    window.open('https://www.npmjs.com/package/zap');
  }

  giveStar() {
    window.open('https://github.com/zapuilib/zapui');
  }

  openComponents() {
    this.router.navigate(['/components/accordion']);
  }
}
