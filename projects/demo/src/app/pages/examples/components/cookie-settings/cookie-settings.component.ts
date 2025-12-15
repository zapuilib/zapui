import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ZapToggle, ZapButton } from 'zap';

@Component({
  selector: 'example-cookie-settings',
  imports: [ZapToggle, FormsModule, ReactiveFormsModule, ZapButton],
  templateUrl: './cookie-settings.component.html',
  styleUrl: './cookie-settings.component.scss',
})
export class ExampleCookieSettingsComponent {
  marketing: FormControl = new FormControl({
    value: false,
    disabled: false,
  });
  necessary: FormControl = new FormControl({
    value: true,
    disabled: true,
  });
  analytics: FormControl = new FormControl({
    value: false,
    disabled: false,
  });
}
