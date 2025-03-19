import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  ZapFormFieldHelpTextDirective,
  ZapFormFieldIconDirective,
  ZapInput,
  ZapLabelDirective,
} from 'zap/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [
    ZapInput,
    ZapLabelDirective,
    ZapFormFieldHelpTextDirective,
    FormsModule,
    ReactiveFormsModule,
    ZapFormFieldIconDirective,
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent {
  usernameControl = new FormControl({ value: '', disabled: false }, [Validators.required]);
  usernameControl2 = new FormControl({ value: '', disabled: true }, [Validators.required]);
}
