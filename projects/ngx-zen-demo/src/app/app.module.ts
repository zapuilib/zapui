import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxZenModule } from 'ngx-zen';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MAIN_COMPONENTS } from './components';
import { SHARED_COMPONENTS } from './shared/components';
import { InternalLayoutComponent } from './layout/internal-layout/internal-layout.component';

@NgModule({
  declarations: [
    AppComponent,
   ... MAIN_COMPONENTS,
    ...SHARED_COMPONENTS,
    InternalLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    NgxZenModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
