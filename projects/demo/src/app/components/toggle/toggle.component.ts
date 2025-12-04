import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ZapToggle } from 'zap';

@Component({
  selector: 'app-toggle',
  imports: [ZapToggle, ReactiveFormsModule, FormsModule],
  templateUrl: './toggle.component.html',
  styleUrl: './toggle.component.scss',
})
export class ToggleComponent {
  toggleControl: FormControl = new FormControl(
    {
      value: false,
      disabled: false,
    },
    Validators.required,
  );

  toggleCheckedControl: FormControl = new FormControl(
    {
      value: null,
      disabled: false,
    },
    Validators.required,
  );

  toggleUncheckedControl: FormControl = new FormControl(
    {
      value: null,
      disabled: false,
    },
    Validators.required,
  );
}
