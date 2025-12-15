import { Component } from '@angular/core';
import { ZapButton } from 'zap';

import { ExampleLoginComponent } from './components/login/login.component';
import { ExampleCookieSettingsComponent } from './components/cookie-settings/cookie-settings.component';

@Component({
  selector: 'app-examples',
  imports: [ZapButton, ExampleLoginComponent, ExampleCookieSettingsComponent],
  templateUrl: './examples.component.html',
  styleUrl: './examples.component.scss',
})
export class ExamplesComponent {}
