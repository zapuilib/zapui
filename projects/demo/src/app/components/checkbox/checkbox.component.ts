import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ZapCheckbox, ZapLabelDirective } from 'zap/forms';

@Component({
  selector: 'app-checkbox',
  imports: [FormsModule, ReactiveFormsModule, ZapCheckbox, ZapLabelDirective],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss',
})
export class CheckboxComponent {
  checkboxControl = new FormControl({ value: false, disabled: false }, [Validators.required]);
  checked = false;
}
