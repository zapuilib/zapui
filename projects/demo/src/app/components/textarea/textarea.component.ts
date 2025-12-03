import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ZapTextarea, ZapFormFieldHelpTextDirective } from 'zap';

@Component({
  selector: 'app-textarea',
  imports: [ZapTextarea, FormsModule, ReactiveFormsModule, ZapFormFieldHelpTextDirective],
  templateUrl: './textarea.component.html',
  styleUrl: './textarea.component.scss',
})
export class TextareaComponent {
  control = new FormControl('', [Validators.required]);
}
