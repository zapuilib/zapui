import { Component } from '@angular/core';
import { ZapButton, ZapIconDirective } from 'zap/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [ZapButton, ZapIconDirective],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {}
