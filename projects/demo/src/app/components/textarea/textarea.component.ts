import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ZapTextarea, ZapHelpTextDirective } from 'zap';

@Component({
  selector: 'app-textarea',
  imports: [ZapTextarea, FormsModule, ReactiveFormsModule, ZapHelpTextDirective],
  templateUrl: './textarea.component.html',
  styleUrl: './textarea.component.scss',
})
export class TextareaComponent {
  control = new FormControl('', [Validators.required]);
}
