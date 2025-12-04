import { Component } from '@angular/core';
import { ZapButton, ZapIconDirective } from 'zap';

@Component({
  selector: 'app-button',
  imports: [ZapButton, ZapIconDirective],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  onClick(event: Event): void {
    console.log('onClick', event);
  }
}
