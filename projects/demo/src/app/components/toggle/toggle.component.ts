import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ZapToggle } from 'zap/forms';

@Component({
  selector: 'app-toggle',
  standalone: true,
  imports: [ZapToggle, ReactiveFormsModule, FormsModule],
  templateUrl: './toggle.component.html',
  styleUrl: './toggle.component.scss',
})
export class ToggleComponent {
  toggleControl: FormControl = new FormControl({
    value: false,
    disabled: false,
  });
}
