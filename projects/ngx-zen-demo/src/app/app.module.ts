import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxZenModule } from 'ngx-zen';
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
    NgxZenModule,
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
