import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ZapCheckbox } from 'zap/forms';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, ZapCheckbox],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss',
})
export class CheckboxComponent {
  checkboxControl = new FormControl({ value: false, disabled: false });
}
