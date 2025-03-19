import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ZapTextarea, ZapFormFieldHelpTextDirective } from 'zap/forms';

@Component({
  selector: 'app-textarea',
  standalone: true,
  imports: [ZapTextarea, FormsModule, ReactiveFormsModule, ZapFormFieldHelpTextDirective],
  templateUrl: './textarea.component.html',
  styleUrl: './textarea.component.scss',
})
export class TextareaComponent {}
