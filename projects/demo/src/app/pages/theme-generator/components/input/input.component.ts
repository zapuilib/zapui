import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ZapHelpTextDirective, ZapIconDirective, ZapInput, ZapLabelDirective } from 'zap';

@Component({
  selector: 'demo-input',
  standalone: true,
  imports: [
    ZapInput,
    ZapLabelDirective,
    ZapHelpTextDirective,
    FormsModule,
    ReactiveFormsModule,
    ZapIconDirective,
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class DemoInputComponent {
  usernameControl = new FormControl({ value: '', disabled: false }, [Validators.required]);
  usernameControl2 = new FormControl({ value: '', disabled: true }, [Validators.required]);
}
