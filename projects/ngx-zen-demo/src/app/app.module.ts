import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxZenConfig, NgxZenModule } from 'ngx-zen';
import { ReactiveFormsModule } from '@angular/forms';
import { CLIPBOARD_OPTIONS, ClipboardButtonComponent, MarkdownModule } from 'ngx-markdown';
import { CommonModule } from '@angular/common';

import 'prismjs';
import 'prismjs/components/prism-typescript.min.js';
import 'prismjs/plugins/line-numbers/prism-line-numbers.js';
import 'prismjs/plugins/line-highlight/prism-line-highlight.js';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MAIN_COMPONENTS } from './components';
import { SHARED_COMPONENTS } from './shared/components';
import { InternalLayoutComponent } from './layout/internal-layout/internal-layout.component';

const ngxZenConfig: NgxZenConfig = {
  colors: {
    primary: '#FFFFFF',
    secondary: '#000000',
    tertiary: '#2563eb',
    quaternary: '#374151',
    success: '#38c172',
    error: '#b91c1c',
    warning: '#ffed4a',
    info: '#3490dc',
  },
  fontSize: {
    '7xl': '5rem',
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


@NgModule({
  declarations: [
    AppComponent,
    InternalLayoutComponent,
    ...MAIN_COMPONENTS,
    ...SHARED_COMPONENTS,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    NgxZenModule.forRoot(ngxZenConfig),
    MarkdownModule.forRoot({
      clipboardOptions: {
        provide: CLIPBOARD_OPTIONS,
        useValue: {
          buttonComponent: ClipboardButtonComponent,
        },
      },
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
