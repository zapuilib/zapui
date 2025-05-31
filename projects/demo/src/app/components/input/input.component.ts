import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  CustomErrorMessages,
  ZapFormFieldHelpTextDirective,
  ZapFormFieldIconDirective,
  ZapInput,
  ZapLabelDirective,
} from 'zap/forms';

@Component({
  selector: 'app-input',
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
  usernameControl3 = new FormControl({ value: '', disabled: false }, [
    Validators.required,
    Validators.minLength(3),
  ]);

  hebrewErrorMessages: CustomErrorMessages = {
    required: 'שדה זה חובה',
    minlength: 'הערך קצר מדי',
    maxlength: 'הערך ארוך מדי',
  };

  handleIconClick(e: any) {
    console.log('Icon clicked', e);
  }
}
