import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HeroPatternComponent } from '../../components/hero-pattern/hero-pattern.component';
import { SpacerComponent } from '../../components/spacer/spacer.component';
import { TitleComponent } from '../../components/title/title.component';
import { RowComponent } from '../../components/row/row.component';

@Component({
  selector: 'app-themes',
  imports: [RowComponent, TitleComponent, SpacerComponent, RouterModule, HeroPatternComponent],
  templateUrl: './themes.component.html',
  styleUrl: './themes.component.scss',
})
export class ThemesComponent {
  markdowns1: { title: string; markdown: string; language: string }[] = [
    {
      title: 'app.config.ts',
      markdown: `import { ApplicationConfig } from '@angular/core';
import { provideZapOptions, ZapConfig } from 'zap';

const ngxConfig: ZapConfig = {
  theme: 'light', // or 'dark' defaults to 'dark'
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZapOptions(ngxConfig),
    // Others...
  ],
};
`,
      language: 'typescript',
    },
  ];

  markdowns2: { title: string; markdown: string; language: string }[] = [
    {
      title: 'app.config.ts',
      markdown: `import { ApplicationConfig } from '@angular/core';
import { provideZapOptions, ZapConfig, ZapTheme } from 'zap';

const folly: ZapTheme = {
  colors: {
    primary: '#000000',
    secondary: '#FFFFFF',
    tertiary: '#F52F57',
    success: '#04E824',
    successText: '#000000',
    warning: '#f6ad55',
    warningText: '#000000',
    error: '#e3342f',
    errorText: '#FFFFFF',
    info: '#5438DC',
    infoText: '#FFFFFF',
  },
  fontSize: {
    '5xl': '3rem',
    '4xl': '2.25rem',
    '3xl': '1.875rem',
    '2xl': '1.5rem',
    xl: '1.25rem',
    lg: '1.125rem',
    md: '1rem',
    sm: '0.875rem',
    xs: '0.75rem',
    xxs: '0.625rem',
  },
};

const ngxConfig: ZapConfig = {
  theme: 'folly'
  themeLibrary: {
    folly,
  },
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZapOptions(ngxConfig),
    // Others...
  ],
};
`,
      language: 'typescript',
    },
  ];

  markdowns3: { title: string; markdown: string; language: string }[] = [
    {
      title: 'app.component.ts',
      markdown: `import { Component, inject, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { ZapThemer } from "zapui";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent implements OnInit {
  theme: "light" | "dark" = "dark";

  private zapThemeService: ZapThemer = inject(ZapThemer);

  toggleTheme(): void {
    this.theme = this.theme === "dark" ? "light" : "dark";
    this.zapThemeService.setTheme(this.theme);
  }
}
`,
      language: 'typescript',
    },
  ];

  markdowns4: { title: string; markdown: string; language: string }[] = [
    {
      title: 'app.component.ts',
      markdown: `import { Component, inject, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { ZapThemer } from "zapui";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent implements OnInit {
  theme: "light" | "folly" = "folly";

  private zapThemeService: ZapThemer = inject(ZapThemer);

  toggleTheme(): void {
    this.theme = this.theme === "folly" ? "light" : "folly";
    this.zapThemeService.setTheme(this.theme);
  }
}
`,
      language: 'typescript',
    },
    {
      title: 'app.config.ts',
      markdown: `import { ApplicationConfig } from '@angular/core';
import { provideZapOptions, ZapConfig, ZapTheme } from 'zap';

const folly: ZapTheme = {
  colors: {
    primary: '#000000',
    secondary: '#FFFFFF',
    tertiary: '#F52F57',
    quaternary: '#9CA3AF',
    success: '#04E824',
    successText: '#000000',
    warning: '#f6ad55',
    warningText: '#000000',
    error: '#e3342f',
    errorText: '#FFFFFF',
    info: '#5438DC',
    infoText: '#FFFFFF',
  },
  fontSize: {
    '7xl': '4.5rem',
    '6xl': '3.75rem',
    '5xl': '3rem',
    '4xl': '2.25rem',
    '3xl': '1.875rem',
    '2xl': '1.5rem',
    xl: '1.25rem',
    lg: '1.125rem',
    md: '1rem',
    sm: '0.875rem',
    xs: '0.75rem',
    xxs: '0.625rem',
  },
};

const ngxConfig: ZapConfig = {
  theme: 'folly' // if you are using dynamic theme make sure this is always set to active theme
  themeLibrary: {
    folly,
  },
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZapOptions(ngxConfig),
    // Others...
  ],
};
`,
      language: 'typescript',
    },
  ];

  markdowns5: { title: string; markdown: string; language: string }[] = [
    {
      title: 'app.config.ts',
      markdown: `import { ApplicationConfig } from '@angular/core';
import { provideZapOptions } from 'zap';

const ngxConfig: ZapConfig = {
  components: {
    global: {
      shape: 'curve',
      styles: {
        colors: {
          dark: {
            scrollbarColor: '#1877F2';
          }
        } 
      };
    },
  }
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZapOptions(ngxConfig),
    // Others...
  ],
};
`,
      language: 'typescript',
    },
  ];

  markdowns6: { title: string; markdown: string; language: string }[] = [
    {
      title: 'app.config.ts',
      markdown: `import { ApplicationConfig } from '@angular/core';
import { provideZapOptions } from 'zap';

const ngxConfig: ZapConfig = {
  components: {
    global: {
      shape: 'curve',
    },
    button: {
      shape: 'pill', // this will replace global shape
      size: 'compact',
      styles: {
        colors: {
          dark: {
            bgColor: '#1877F2',
            textColor: '#FFFFFF',
            borderColor: '#1877F2',
            bgHoverColor: '#4CB963',
            borderHoverColor: '#4CB963',
            textHoverColor: '#FFFFFF',
          },
          light: { 
            bgColor: '#FFFFFF',
            textColor: '#000000',
            borderColor: '#FFFFFF',
            bgHoverColor: '#4CB963',
            borderHoverColor: '#4CB963',
            textHoverColor: '#FFFFFF',
          }
        }
      },
      borderRadius: '15px',
      paddingLeft: '20px',
      paddingRight: '20px',
      paddingTop: '10px',
      paddingBottom: '10px',
      padding: '10px 30px', // you can use this or above padding config
      fontSize: '1.5rem',
      fontWeight: 'bold',
      lineHeight: '2',
      letterSpacing: '1px',
      textTransform: 'uppercase',
    }
  }
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZapOptions(ngxConfig),
    // Others...
  ],
};
`,
      language: 'typescript',
    },
  ];
}
