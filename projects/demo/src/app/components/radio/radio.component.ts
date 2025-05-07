import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ZapRadio } from 'zap/forms';

@Component({
  selector: 'app-radio',
  imports: [FormsModule, ReactiveFormsModule, ZapRadio],
  templateUrl: './radio.component.html',
  styleUrl: './radio.component.scss',
})
export class RadioComponent {}
