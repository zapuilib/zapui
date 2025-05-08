import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ZapRadio } from 'zap/forms';

@Component({
  selector: 'app-radio',
  imports: [FormsModule, ReactiveFormsModule, ZapRadio],
  templateUrl: './radio.component.html',
  styleUrl: './radio.component.scss',
})
export class RadioComponent {
  radioControl = new FormControl({ value: 'no', disabled: false }, [Validators.required]);
}
